import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { getAllDoctorsAction } from '../../redux/actions/patientActions'
import { Col, Row, Input, Modal, Button } from 'antd'
import InfoCard from '../../components/Cards/InfoCard'

import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import {
  deactivateDoctorProfileAction,
  reactivateDoctorProfileAction,
} from '../../redux/actions/doctorActions'
import MenuFooter from '../../layouts/components/footer'

const DoctorManagement = () => {
  const [ok, setOk] = useState(false)
  const [doctorsList, setDoctorsList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedDoctor, setSelectedDoctor] = useState(null) // Track the selected doctor

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
  }, [dispatch])

  const onViewMore = (doctorGmcNumber, doctorName) => {
    const formattedDoctorName = doctorName
      .replace(/^(Dr\.\s*)?/g, '')
      ?.toLowerCase()
    history.push(`/admin/physician/${formattedDoctorName}-${doctorGmcNumber}`)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value?.toLowerCase())
  }

  const handleDeactivate = (doctor) => {
    setSelectedDoctor(doctor)
    setIsModalVisible(true)
  }

  const handleReactivate = (doctor) => {
    dispatch(
      reactivateDoctorProfileAction({
        doctorId: doctor._id,
        setOk,
        setDoctorsList,
      })
    )
  }

  const deactivateProfile = () => {
    // Logic to deactivate the doctor profile
    console.log('Deactivating doctor profile:', selectedDoctor)
    setIsModalVisible(false)
    dispatch(
      deactivateDoctorProfileAction({
        doctorId: selectedDoctor._id,
        setOk,
        setDoctorsList,
      })
    )
    // dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
  }

  const filteredDoctors = doctorsList.filter((doctor) => {
    const { name } = doctor.personalInfo
    const { specialty, degree } = doctor.professionalInfo

    return (
      name?.toLowerCase().includes(searchQuery) ||
      specialty?.toLowerCase().includes(searchQuery) ||
      degree?.toLowerCase().includes(searchQuery)
    )
  })

  return (
    <section className='doctorCard'>
      <div style={{ textAlign: 'center' }}>
        <Input
          placeholder='Search by Name, Specialty, Degree'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', width: '50%' }}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredDoctors?.map((doctor) => (
          <Col key={doctor._id} xs={24} sm={12} md={8} lg={8}>
            <InfoCard
              avatar={
                doctor?.ImgUrl ||
                (doctor?.personalInfo?.gender === 'Male'
                  ? doctorMaleAvatar
                  : doctorFemaleAvatar)
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
                    {doctor?.professionalInfo?.hospitalAffiliations?.[0] ||
                      'N/A'}
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
              extra={
                doctor?.isDeactivated ? (
                  <Button onClick={() => handleReactivate(doctor)}>
                    Reactivate Profile
                  </Button>
                ) : (
                  <Button
                    danger
                    onClick={() => handleDeactivate(doctor)}
                    style={{ marginLeft: '10px' }}>
                    Deactivate Profile
                  </Button>
                )
              }
            />
          </Col>
        ))}
      </Row>

      <Modal
        title='Confirm Deactivation'
        visible={isModalVisible}
        onOk={deactivateProfile}
        onCancel={() => setIsModalVisible(false)}
        okText='Yes'
        cancelText='No'>
        <p>
          Are you sure you want to deactivate the profile of{' '}
          <strong>{selectedDoctor?.personalInfo?.name}</strong>? This will
          delete all profile details.
        </p>
      </Modal>
      <br />
      <br />
      <MenuFooter />
    </section>
  )
}

export default DoctorManagement
