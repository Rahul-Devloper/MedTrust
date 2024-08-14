import { Col, Row, Card, Progress, Tag } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ArrowRightOutlined } from '@ant-design/icons'
import { getDoctorProfileDataAction } from '../../../redux/actions/patientActions'
import ProfileCard2 from '../../../components/Cards/ProfileCard2'
import MaleAvatar from '../../../assets/images/illustrations/doctorMaleAvatar.png'
import FemaleAvatar from '../../../assets/images/illustrations/doctorFemaleAvatar.png'
import MenuFooter from '../../../layouts/components/footer'
import { getAllReviewsAction } from '../../../redux/actions/reviewActions'
import moment from 'moment'
import { RiSearch2Fill } from 'react-icons/ri'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTooltip,
  VictoryTheme,
} from 'victory'

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [ok, setOk] = useState(false)
  const [doctorData, setDoctorData] = useState([])
  const [reviewsList, setReviewsList] = useState([])
  const history = useHistory()

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      getDoctorProfileDataAction({
        setOk,
        setDoctorData,
        physicianName: user?.name,
        physicianId: user?.gmcNumber,
      })
    )

    dispatch(
      getAllReviewsAction({
        setOk,
        setReviewsList,
        physicianId: user?.gmcNumber,
      })
    )
  }, [dispatch, user?.name, user?.gmcNumber])

  const paragraph = {
    label: 'Your Care Commitment',
    value: doctorData?.professionalInfo?.careCommitment,
  }

  const averageRating =
    reviewsList.length > 0
      ? reviewsList.reduce((acc, item) => acc + item.rating, 0) /
        reviewsList.length
      : 0

  const customDoctorFormat = (value) => (
    <span style={{ fontSize: '24px', color: 'black' }}>
      {reviewsList?.length}
    </span>
  )

  const handleChildClick = (child) => {
    const formattedChild = child.trim().replace(/\s+/g, '-')
    history.push(`/doctor/${formattedChild}`)
  }

  // Prepare data for the bar chart
  const getReviewHistoryData = (reviews) => {
    return reviews.map((review) => ({
      month: moment(review.date).format('MMM YYYY'),
      rating: review.rating,
    }))
  }

  const reviewHistoryData = getReviewHistoryData(reviewsList)

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24}>
          <h2
            style={{
              marginLeft: '10px',
            }}>
            Welcome, {user?.name.split(' ')[0]} 👋
          </h2>
        </Col>
      </Row>

      {/* First Row: Profile Card on left, Patient Reviews on right */}
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <ProfileCard2
            avatar={
              user?.ImgUrl ||
              (doctorData?.personalInfo?.gender === 'Male'
                ? MaleAvatar
                : FemaleAvatar)
            }
            title={`${doctorData?.personalInfo?.name}, ${doctorData?.personalInfo?.degree}`}
            description={doctorData?.professionalInfo?.specialty}
            details={[
              {
                label: 'GMC Number',
                value: doctorData?.gmcNumber,
              },
              {
                label: 'Hospital',
                value: doctorData?.professionalInfo?.hospitalAffiliations[0],
              },
            ]}
            progressBarSize='100px'
            paragraph={paragraph}
          />
        </Col>

        <Col span={12}>
          <Card
            style={{ cursor: 'pointer' }}
            onClick={() => handleChildClick('patient-reviews')}>
            <Row align='middle'>
              <Col span={4}>
                <Progress
                  strokeColor={{
                    '0%': '#108ee9',
                    '100%': '#87d068',
                  }}
                  type='circle'
                  percent={100}
                  width={150}
                  format={customDoctorFormat}
                />
              </Col>
              <Col span={16} style={{ textAlign: 'center' }}>
                <h3>Check Out your Reviews </h3>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                <ArrowRightOutlined />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Second Row: Average Rating on left, Review History on right */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col span={12}>
          {reviewsList.length > 0 ? (
            <Card style={{ marginTop: '20px' }}>
              <h3>Average Rating</h3>
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
              <p>No average rating as there are no reviews available yet.</p>
            </Card>
          )}
          <Card hoverable bordered={false} style={{ marginTop: '20px' }}>
            <p>Your last activity was on:</p>
            <Tag color='blue'>
              {moment(user?.lastActive).format('MMMM Do YYYY, h:mm:ss a')}
            </Tag>
          </Card>
        </Col>

        <Col span={12}>
          {reviewsList.length > 0 ? (
            <Card>
              <h3>Review History</h3>
              <VictoryChart
                theme={VictoryTheme.material}
                domainPadding={20}
                height={250} // Adjust the height as needed
                padding={{ top: 20, bottom: 40, left: 50, right: 50 }}>
                <VictoryAxis
                  tickFormat={reviewHistoryData.map((item) => item.month)}
                  style={{ tickLabels: { fontSize: 10, angle: -45 } }}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x}`}
                  style={{ tickLabels: { fontSize: 10 } }}
                />
                <VictoryBar
                  data={reviewHistoryData}
                  x='month'
                  y='rating'
                  labels={({ datum }) => `Rating: ${datum.rating}`}
                  labelComponent={<VictoryTooltip />}
                  style={{
                    data: { fill: '#4c72b0' },
                  }}
                />
              </VictoryChart>
            </Card>
          ) : (
            <Card title='Review History'>
              <p>No reviews history available yet.</p>
            </Card>
          )}
        </Col>
      </Row>

      <br />
      <MenuFooter />
    </>
  )
}

export default DoctorDashboard
