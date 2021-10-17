import * as React from 'react'
import axios, { AxiosResponse, Canceler, CancelTokenStatic } from 'axios'
import { Button, Tooltip, Row, Col, Input } from 'antd'
import { AudioOutlined } from '@ant-design/icons'
import * as _ from 'lodash'
import { createSpeechlySpeechRecognition } from '@speechly/speech-recognition-polyfill'
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition'
import { useStoreActions, useStoreState } from '../../store'
import './styles.css'

interface ReactSpeach {
  transcript: string
  listening: boolean
  interimTranscript: string
  finalTranscript: string
  resetTranscript: () => void
  browserSupportsSpeechRecognition: boolean
}

const CancelToken: CancelTokenStatic = axios.CancelToken
let searchTimer: any = null
let cancel: Canceler

const appId: string = process.env.SPEECHLY_ID || ''
const SpeechlySpeechRecognition = createSpeechlySpeechRecognition(appId)
;(SpeechRecognition as any).applyPolyfill(SpeechlySpeechRecognition)

const SearchBar = () => {
  const [query, setQuery] = React.useState<string>('')
  const searchLoading = useStoreState((state) => state.search.searchLoading)
  const searchResult = useStoreState((state) => state.search.searchResult)
  const setSearchResult = useStoreActions(
    (actions) => actions.search.setSearchResult,
  )
  const setSearchLoading = useStoreActions(
    (actions) => actions.search.setSearchLoading,
  )
  const setProfileData = useStoreActions(
    (actions) => actions.profile.setProfileData,
  )
  const setProfileLoading = useStoreActions(
    (actions) => actions.profile.setProfileLoading,
  )
  const { transcript, listening, browserSupportsSpeechRecognition } =
    useSpeechRecognition() as ReactSpeach

  const handleGetProfile = React.useCallback(
    (playerID: string) => {
      setProfileLoading(true)
      axios
        .get(
          `https://web-sandbox.onefootball.com/assignments/player/profile/${encodeURIComponent(
            playerID.toLocaleLowerCase(),
          )}`,
        )
        .then((response: AxiosResponse) => {
          setProfileData(response.data)
          setProfileLoading(false)
        })
        .catch(() => {
          setProfileData(null)
          setProfileLoading(false)
        })
    },
    [setProfileData, setProfileLoading],
  )

  const handleSearchPlayer = React.useCallback(
    (searchQuery: string) => {
      setQuery(searchQuery)
      if (cancel) cancel()
      clearTimeout(searchTimer)
      if (searchQuery && searchQuery.length > 0) {
        searchTimer = setTimeout(() => {
          setSearchLoading(true)
          axios
            .get(
              `https://web-sandbox.onefootball.com/assignments/player/data/${encodeURIComponent(
                searchQuery.toLocaleLowerCase(),
              )}.json`,
              {
                cancelToken: new CancelToken((c) => (cancel = c)),
              },
            )
            .then((response: AxiosResponse) => {
              if (response?.data?.active === 'true') {
                handleGetProfile(response.data['profile-id'])
              }
              setSearchResult(response.data)
              setSearchLoading(false)
            })
            .catch((error) => {
              setSearchResult(error.__CANCEL__ ? null : { active: 'false' })
              setSearchLoading(false)
              setProfileData(null)
            })
        }, 500)
      } else {
        setSearchResult(null)
        setSearchLoading(false)
        setProfileData(null)
      }
    },
    [setSearchLoading, setSearchResult, handleGetProfile, setProfileData],
  )

  React.useEffect(() => {
    handleSearchPlayer(transcript)
  }, [transcript, handleSearchPlayer])

  const handleStartListening = () => {
    if (browserSupportsSpeechRecognition) {
      SpeechRecognition.startListening()
    } else {
      alert('Browser does not support speech recognition.')
    }
  }

  const handleChangeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    handleSearchPlayer(e.target.value)
  }

  return (
    <Row className="search-bar">
      <Col sm={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
        <Input
          className="search-input"
          onChange={handleChangeSearchInput}
          placeholder="Search a player..."
          size="large"
          value={query}
          suffix={
            browserSupportsSpeechRecognition ? <Tooltip title={listening ? 'Stop Listening' : 'Search by voice!'}>
              <Button
                className="voice-search"
                style={{ marginLeft: '5px' }}
                disabled={searchLoading}
                type={listening || searchLoading ? 'primary' : 'dashed'}
                shape="circle"
                icon={<AudioOutlined />}
                onClick={
                  listening
                    ? SpeechRecognition.stopListening
                    : handleStartListening
                }
              />
            </Tooltip> : null
          }
          allowClear
        />
        {!searchLoading && listening && (
          <p className="search-state">Listening...</p>
        )}
        {searchLoading && <p className="search-state">Loading Player...</p>}
        {!searchLoading &&
          !listening &&
          _.get(searchResult, 'active') === 'false' && (
            <p className="search-state error">Player is not available</p>
          )}
        {!searchLoading &&
          !listening &&
          _.get(searchResult, 'active') === 'true' && (
            <p className="search-state success">Player is available</p>
          )}
      </Col>
    </Row>
  )
}

export default SearchBar
