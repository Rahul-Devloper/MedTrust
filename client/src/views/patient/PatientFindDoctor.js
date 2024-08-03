import React, { useEffect, useState } from 'react'
import { Image, Input, Row, Col, Card, Typography, Tag, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllDoctorsAction } from '../../redux/actions/patientActions'
import { FindDoctor } from '../../assets/images/index'
import { FaArrowRightLong, FaEye } from 'react-icons/fa6'
import { useHistory } from 'react-router-dom'

import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import InfoCard from '../../components/Cards/InfoCard'
import CardGrid from '../../components/Cards/CardGrid'
const { Text } = Typography

const PatientFindDoctor = () => {
  const [ok, setOk] = useState(false)
  const [doctorsList, setDoctorsList] = useState([])

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
  }, [dispatch, setOk, setDoctorsList])

  const filteredDoctors = doctorsList
    .filter((doctor) => doctor.ratings?.overallEffectiveness >= 4.5)
    .slice(0, 6)
  console.log('filteredDoctors==>', filteredDoctors)

  const onViewMore = (doctorGmcNumber, doctorName) => {
    console.log('doctorGmcNumber==>', doctorGmcNumber)
    const formattedDoctorName = doctorName
      .replace(/^(Dr\.\s*)?/g, '')
      .toLowerCase()
    history.push(`/patient/physician/${formattedDoctorName}-${doctorGmcNumber}`)
  }

  const categories = [
    'Family Doctor',
    'Dermatology',
    'Dentistry',
    'Orthopedics',
  ]

  return (
    <div style={{ padding: '20px' }}>
      <Input.Group
        style={{
          width: '100%',
          marginBottom: '20px',
          position: 'absolute',
          top: '25%',
          left: '20%',
          zIndex: '9999',
        }}
        compact>
        <Input
          style={{
            width: '30%',
          }}
          placeholder='Search Doctor, Speciality, Degree'
        />
        <Input
          style={{
            width: '25%',
          }}
          placeholder='Search with City'
        />
      </Input.Group>
      <Image
        style={{ width: '100%' }}
        src={FindDoctor}
        alt='Banner Image'
        preview={false}
      />
      <br />
      <br />
      <h2>Popular Categories</h2>
      <CardGrid
        toRenderView={true}
        viewPath={'/patient/speciality/'}
        children={categories}
      />
      <br />
      <Row justify={'end'}>
        <div className='site-button-ghost-wrapper'>
          <Button
            ghost
            icon={<FaEye />}
            onClick={() => history.push('/patient/speciality-directory')}>
            View All Specialities
          </Button>
        </div>
      </Row>

      <section className='doctorCard'>
        <h2>Popular Doctors</h2>
        <Row gutter={[16, 16]}>
          {doctorsList &&
            filteredDoctors?.map((doctor, index) => {
              return (
                <Col key={doctor._id} xs={24} sm={12} md={8} lg={8}>
                  <InfoCard
                    avatar={
                      doctor?.personalInfo?.gender === 'Male'
                        ? doctorMaleAvatar
                        : doctorFemaleAvatar
                    }
                    title={doctor?.personalInfo?.name}
                    description={
                      <>
                        <p>
                          <strong>Specialty:</strong>{' '}
                          {doctor?.professionalInfo.specialty}
                        </p>
                        <p>
                          <strong>Hospital:</strong>{' '}
                          {doctor?.professionalInfo
                            ?.hospitalAffiliations?.[0] || 'N/A'}
                        </p>
                        <p>
                          <strong>Overall Effectiveness:</strong>{' '}
                          {doctor.ratings?.overallEffectiveness || 'N/A'}
                        </p>
                      </>
                    }
                    buttonText='View Profile'
                    onButtonClick={() =>
                      onViewMore(doctor?.gmcNumber, doctor?.personalInfo?.name)
                    }
                  />
                </Col>
              )
            })}
        </Row>
      </section>
    </div>
  )
}

export default PatientFindDoctor
