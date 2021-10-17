import * as React from 'react'
import { StoreProvider } from 'easy-peasy'
import { Row, Col } from 'antd'
import store from './store'
import SearchBar from './components/SearchBar'
import PlayerProfile from './components/PlayerProfile'

const App = () => (
  <StoreProvider store={store}>
    <header>
      <Row className="search-bar">
        <Col sm={{ span: 20, offset: 2 }} xs={{ span: 22, offset: 1 }}>
          <h1 className="page-title">⚽ Player Archive ⚽</h1>
        </Col>
      </Row>
      <SearchBar />
    </header>
    <main>
      <PlayerProfile />
    </main>
  </StoreProvider>
)

export default App
