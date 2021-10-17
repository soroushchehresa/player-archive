import * as React from 'react'
import { Row, Col, Card, Table } from 'antd'
import { useStoreState } from '../../store'
import * as _ from 'lodash'
import './styles.css'

const SearchHistoryList = () => {
  const profileData = useStoreState((state) => state.profile.profileData)
  const profileLoading = useStoreState((state) => state.profile.profileLoading)

  return (
    <Row gutter={20}>
      {profileLoading && (
        <Col span={20} offset={2} className="section">
          <h2 className="section-title loading">Loading player details...</h2>
        </Col>
      )}
      {!profileLoading && profileData && (
        <React.Fragment>
          {_.get(profileData, 'id') && (
            <Col
              xxl={{ span: 4, offset: 2 }}
              xl={{ span: 8, offset: 2 }}
              lg={{ span: 10, offset: 2 }}
              md={{ span: 10, offset: 2 }}
              sm={{ span: 20, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
              className="section"
            >
              <h2 className="section-title">Player:</h2>
              <Card
                hoverable
                style={{ width: '100%' }}
                cover={
                  <img
                    alt="Player Profile"
                    src={_.get(profileData, ['profile', 'picture'])}
                  />
                }
              >
                <Card.Meta
                  title={`${_.get(profileData, 'id')
                    .slice(0, 1)
                    .toUpperCase()}${_.get(profileData, 'id').slice(
                    1,
                  )} (Age ${_.get(profileData, ['profile', 'age'], '')})`}
                  description={`${_.get(
                    profileData,
                    ['profile', 'team'],
                    '',
                  )} - ${_.get(profileData, ['profile', 'role'], '')}`}
                />
              </Card>
            </Col>
          )}
          {_.get(profileData, 'stats') && (
            <Col
              xxl={{ span: 16, offset: 0 }}
              xl={{ span: 12, offset: 0 }}
              lg={{ span: 10, offset: 0 }}
              md={{ span: 10, offset: 0 }}
              sm={{ span: 20, offset: 2 }}
              xs={{ span: 22, offset: 1 }}
              className="section"
            >
              <h2 className="section-title">Statistics:</h2>
              <Table
                pagination={{
                  defaultPageSize: 6,
                  showSizeChanger: true,
                  pageSizeOptions: ['6', '12', '24'],
                }}
                rowKey="stat"
                dataSource={Object.keys(_.get(profileData, 'stats')).map(
                  (item) => ({
                    stat: item,
                    value: _.get(profileData, ['stats', item]),
                  }),
                )}
                columns={[
                  {
                    title: 'Item',
                    dataIndex: 'stat',
                    key: 'stat',
                    width: '50%',
                  },
                  {
                    title: 'Value',
                    dataIndex: 'value',
                    key: 'stat',
                  },
                ]}
              />
            </Col>
          )}
        </React.Fragment>
      )}
    </Row>
  )
}

export default SearchHistoryList
