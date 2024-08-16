import React, { useEffect, useState } from 'react'
import { Row, Col, Card, Progress, Tag } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import MenuFooter from '../../../layouts/components/footer'
import moment from 'moment'
import { ArrowRightOutlined } from '@ant-design/icons'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
} from 'victory'
import { RiSearch2Fill } from 'react-icons/ri'
import { getAllReviewsByPatientAction } from '../../../redux/actions/reviewActions'

const PatientDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [ok, setOk] = useState(false)
  const [reviewList, setReviewsList] = useState([])

  useEffect(() => {
    dispatch(
      getAllReviewsByPatientAction({
        setOk,
        setReviewsList,
        patientNHSNumber: user?.nhsNumber,
      })
    )
  }, [dispatch, ok, user?.nhsNumber])

  // Function to group reviews by month and calculate average ratings
  const getRatingsByMonth = () => {
    const monthlyData = {}

    reviewList.forEach((review) => {
      const month = moment(review.date).format('MMM YYYY')
      if (!monthlyData[month]) {
        monthlyData[month] = { totalRating: 0, count: 0 }
      }
      monthlyData[month].totalRating += review.rating
      monthlyData[month].count += 1
    })

    return Object.keys(monthlyData).map((month) => ({
      month,
      rating: monthlyData[month].totalRating / monthlyData[month].count,
    }))
  }

  const ratingsData = getRatingsByMonth()

  // Calculate average rating
  const averageRating =
    reviewList.length > 0
      ? reviewList.reduce((acc, item) => acc + item.rating, 0) /
        reviewList.length
      : 0

  return (
    <div>
      <section style={{ minHeight: '80vh', marginBottom: '20px' }}>
        <Row gutter={[32, 0]}>
          <Col span={24}>
            <h2
              style={{
                marginLeft: '10px',
              }}>
              Welcome, {user?.name.split(' ')[0]} 👋
            </h2>
          </Col>
        </Row>
        <div className='site-card-wrapper'>
          {/* First Row: Find a Doctor and Last Active */}
          <Row gutter={16} justify='center'>
            <Col span={12}>
              <Card
                hoverable
                style={{ cursor: 'pointer' }}
                onClick={() => (window.location.href = '/patient/find-doctor')}>
                <Row align='middle'>
                  <Col span={4}>
                    <RiSearch2Fill
                      style={{ fontSize: '32px', color: '#57ddbe' }}
                    />
                  </Col>
                  <Col span={16} style={{ textAlign: 'center' }}>
                    <h2>Find a Doctor </h2>
                  </Col>
                  <Col span={4} style={{ textAlign: 'right' }}>
                    <ArrowRightOutlined />
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={12}>
              <Card hoverable bordered={false} style={{ height: '100%' }}>
                <p>Your last activity was on:</p>
                <Tag color='blue'>
                  {moment(user?.lastActive).format('MMMM Do YYYY, h:mm:ss a')}
                </Tag>
              </Card>
            </Col>
          </Row>

          {/* Second Row: Rating History and Average Ratings */}
          <Row gutter={16} style={{ marginTop: '24px' }}>
            <Col span={12}>
              {reviewList.length > 0 ? (
                <Card>
                  <h3>Rating History</h3>
                  <VictoryChart
                    theme={VictoryTheme.material}
                    domainPadding={20}
                    height={250}
                    padding={{ top: 20, bottom: 50, left: 50, right: 50 }}>
                    <VictoryAxis
                      tickFormat={ratingsData.map((item) => item.month)}
                      style={{ tickLabels: { fontSize: 10, angle: -45 } }}
                    />
                    <VictoryAxis
                      dependentAxis
                      tickFormat={(x) => `${x}`}
                      style={{ tickLabels: { fontSize: 10 } }}
                    />
                    <VictoryBar
                      data={ratingsData}
                      x='month'
                      y='rating'
                      labels={({ datum }) =>
                        `Rating: ${datum.rating.toFixed(1)}`
                      }
                      labelComponent={<VictoryTooltip />}
                      style={{
                        data: { fill: '#4c72b0' },
                      }}
                    />
                  </VictoryChart>
                </Card>
              ) : (
                <Card title='Rating History'>
                  <p>No reviews history available.</p>
                </Card>
              )}
            </Col>
            <Col span={12}>
              {reviewList.length > 0 ? (
                <Card title='Average Rating'>
                  <p>Your average rating given to doctors is shown below</p>
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Progress
                      type='circle'
                      percent={averageRating * 20} // Assuming ratings are out of 5, scale to 100%
                      format={() => `${averageRating.toFixed(1)} / 5`}
                      width={150} // Adjust size to make it larger
                      strokeWidth={10} // Adjust the stroke width
                    />
                  </div>
                </Card>
              ) : (
                <Card title='Average Rating'>
                  <p>
                    No average rating as you have not made any reviews till
                    date.
                  </p>
                </Card>
              )}
            </Col>
          </Row>
        </div>
      </section>

      <MenuFooter />
    </div>
  )
}

export default PatientDashboard
