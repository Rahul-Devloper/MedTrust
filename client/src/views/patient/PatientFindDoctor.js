import React, { useEffect, useState } from 'react'
import { Image, Input, Row, Col, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { getAllDoctorsAction } from '../../redux/actions/patientActions'
import { FindDoctor } from '../../assets/images/index'

import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import InfoCard from '../../components/Cards/InfoCard'
import CardGrid from '../../components/Cards/CardGrid'

const PatientFindDoctor = () => {
  const [ok, setOk] = useState(false)
  const [doctorsList, setDoctorsList] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
  }, [dispatch, setOk, setDoctorsList])

  const onViewMore = (doctorGmcNumber) => {
    console.log('doctorGmcNumber==>', doctorGmcNumber)
  }

  const categories = [
    'Family Doctors',
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
      <CardGrid children={categories} />
      <section className='doctorCard'>
        <h2>Popular Doctors</h2>
        <Row gutter={[16, 16]}>
          {doctorsList?.map((doctor) => {
            if (doctor.ratings?.overallEffectiveness >= 4.5)
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
                    buttonText='View More'
                    onButtonClick={() => onViewMore(doctor?.gmcNumber)}
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
