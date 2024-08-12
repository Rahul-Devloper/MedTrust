import { Col, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDoctorProfileDataAction } from '../../../redux/actions/patientActions'
import ProfileCard2 from '../../../components/Cards/ProfileCard2'
import CardGrid from '../../../components/Cards/CardGrid'

import MaleAvatar from '../../../assets/images/illustrations/doctorMaleAvatar.png'
import FemaleAvatar from '../../../assets/images/illustrations/doctorFemaleAvatar.png'
import MenuFooter from '../../../layouts/components/footer'

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

  const paragraph = {
    label: 'Your Care Commitment',
    value: doctorData?.professionalInfo?.careCommitment,
  }
  console.log(
    'doctorImgUrl==>',
    user?.ImgUrl ||
      (doctorData?.personalInfo?.gender === 'Male' ? MaleAvatar : FemaleAvatar)
  )
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
          <ProfileCard2
            avatar={
              doctorData?.ImgUrl ||
              (doctorData?.personalInfo?.gender === 'Male'
                ? MaleAvatar
                : FemaleAvatar)
            }
            title={`${doctorData?.personalInfo?.name}, ${doctorData?.personalInfo?.degree}`}
            description={doctorData?.professionalInfo?.specialty}
            // ratingData={{
            //   label: 'Overall Effectiveness',
            //   value: doctorData?.ratings?.overallEffectiveness || 0,
            //   color: 'magenta',
            // }}
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
            progressBars={[
              {
                label: `Your Overall Rating`,
                value: doctorData?.ratings?.overallEffectiveness || 0,
                color: 'magenta',
              },
            ]}
            progressBarSize='100px'
            paragraph={paragraph}
          />
        </Col>
      </Row>
      <h2>Select what you want to do</h2>
      <Row gutter={[16, 16]} justify='center'>
        <Col span={10}>
          <CardGrid
            children={[
              'Patient Reviews',
              'Performance Metrics',
              //   'Average Rating',
              //   'Your Profile',
            ]}
            gridStyle={{ width: '50%', textAlign: 'center' }}
            // targetOffset={targetOffset}
            isSticky={false}
            viewPath={'/doctor/'}
            toRenderView={true}
            isHorizontal={true}
            alignment='center'
          />
        </Col>
      </Row>
      <br />
      <MenuFooter />
    </>
  )
}

export default DoctorDashboard
