import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Row, Col, Card, Progress } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'

import {
  getAllDoctorsAction,
  getAllPatientsAction,
} from '../../../redux/actions/patientActions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getAllUsersAction } from '../../../redux/actions/userActions'
import moment from 'moment'
import CustomPieChart from '../../../components/Charts/CustomPieChart'
import CustomBarChart from '../../../components/Charts/CustomBarChart'

const AdminDashboard = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector((state) => state.auth)
  const [ok, setOk] = useState(false)
  const [doctorsList, setDoctorsList] = useState([])
  const [patientsList, setPatientsList] = useState([])
  const [demographicsData, setDemographicsData] = useState([])
  const [usersList, setUsersList] = useState([])

  useEffect(() => {
    // Dispatch actions to fetch data
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
    dispatch(getAllPatientsAction({ setOk, setPatientsList }))
    dispatch(getAllUsersAction({ setOk, setUsersList }))
  }, [dispatch])

  useEffect(() => {
    // Update demographics data when doctorsList and patientsList change
    if (doctorsList?.length > 0 || patientsList?.length > 0) {
      const data = [
        {
          label: 'Doctors',
          value: doctorsList?.length || 0,
        },
        {
          label: 'Patients',
          value: patientsList?.length || 0,
        },
      ]
      setDemographicsData(data)
    }
  }, [doctorsList, patientsList])

  // Format data for VictoryPie
  const pieData = demographicsData?.map((item) => ({
    x: item.label,
    y: item.value,
    label: `${item.label}: ${item.value}`,
  }))

  const customPatientFormat = (value) => (
    <span style={{ fontSize: '24px', color: 'black' }}>
      {patientsList?.length}
    </span>
  )

  const customDoctorFormat = (value) => (
    <span style={{ fontSize: '24px', color: 'black' }}>
      {doctorsList?.length}
    </span>
  )

  const handleChildClick = (child) => {
    const formattedChild = child.trim().replace(/\s+/g, '-')
    history.push(`/admin/${formattedChild}`)
  }

  // Function to get user registrations per month
  const getRegistrationsPerMonth = (list) => {
    const monthlyData = {}

    list.forEach((item) => {
      const month = moment(item.createdAt).format('MMM YYYY')
      if (!monthlyData[month]) {
        monthlyData[month] = { doctors: 0, patients: 0 }
      }
      if (item.role === 'doctor') {
        monthlyData[month].doctors += 1
      } else if (item.role === 'patient') {
        monthlyData[month].patients += 1
      }
    })

    return Object.keys(monthlyData).map((month) => ({
      month,
      ...monthlyData[month],
    }))
  }

  const barChartData = getRegistrationsPerMonth(usersList)

  return (
    <>
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
      {/* First Row: Patients on the left, Doctors on the right */}
      <Row gutter={[32, 0]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            style={{ cursor: 'pointer' }}
            onClick={() => handleChildClick('manage-patients')}>
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
                  format={customPatientFormat}
                />
              </Col>
              <Col span={16} style={{ textAlign: 'center' }}>
                <h2>Patients </h2>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                <ArrowRightOutlined />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Card
            onClick={() => handleChildClick('manage-doctors')}
            style={{ cursor: 'pointer' }}>
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
                <h2>Doctors</h2>
              </Col>
              <Col span={4} style={{ textAlign: 'right' }}>
                <ArrowRightOutlined />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      {/* Second Row: Pie Chart on the left, Bar Chart on the right */}
      <Row gutter={[16, 16]} style={{ marginTop: '24px' }}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CustomPieChart title='User Demographics' data={pieData} />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <CustomBarChart
            title='User Registrations per Month'
            data={barChartData}
          />
        </Col>
      </Row>
    </>
  )
}

export default AdminDashboard
