import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctorProfileDataAction } from '../../../redux/actions/patientActions'
import ProfileCard2 from '../../../components/Cards/ProfileCard2'

import MaleAvatar from '../../../assets/images/illustrations/doctorMaleAvatar.png'
import FemaleAvatar from '../../../assets/images/illustrations/doctorFemaleAvatar.png'

const DoctorDashboard = () => {
  const { user } = useSelector((state) => state.auth)
  const [ok, setOk] = useState(false)
  const [doctorData, setDoctorData] = useState([])

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

    // dispatch(getAllReviewsAction({ setOk, setReviewsList, physicianId }))
  }, [dispatch, user?.name, user?.gmcNumber])
  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={18}>
          <h2
            style={{
              marginLeft: '10px',
            }}>
            Welcome, {user?.name.split(' ')[0]} 👋
          </h2>
          <ProfileCard2
            avatar={
              doctorData?.personalInfo?.gender === 'Male'
                ? MaleAvatar
                : FemaleAvatar
            }
            title={`${doctorData?.personalInfo?.name}, ${doctorData?.personalInfo?.degree}`}
            description={doctorData?.professionalInfo?.specialty}
            ratingData={{
              label: 'Overall Effectiveness',
              value: doctorData?.ratings?.overallEffectiveness || 0,
              color: 'magenta',
            }}
            details={[
              {
                label: 'Gender',
                value: doctorData?.personalInfo?.gender,
              },
            ]}
            paragraph={doctorData?.professionalInfo?.careCommitment || ''}
          />
        </Col>
      </Row>
    </>
  )
}

export default DoctorDashboard
