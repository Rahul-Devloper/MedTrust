import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import {
  changePatientStatusAction,
  getAllPatientsAction,
} from '../../redux/actions/patientActions' // You need to create this action
import { Col, Row, Input, Modal, Button } from 'antd'
import InfoCard from '../../components/Cards/InfoCard'
import { changePatientStatus } from '../../redux/actions/patientActions' // You need to create these actions
import MenuFooter from '../../layouts/components/footer'

import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'

const PatientManagement = () => {
  const [ok, setOk] = useState(false)
  const [patientsList, setPatientsList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedPatient, setSelectedPatient] = useState(null)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllPatientsAction({ setOk, setPatientsList }))
  }, [dispatch])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value?.toLowerCase())
  }

  const handleDeactivate = (patient) => {
    setSelectedPatient(patient)
    setIsModalVisible(true)
  }

  const handleReactivate = async (patient) => {
    await dispatch(
      changePatientStatusAction({
        patientId: patient._id,
        setOk,
        setPatientsList,
        status: 'Activate',
      })
    )
  }

  const deactivateProfile = () => {
    console.log('Deactivating patient profile:', selectedPatient)
    setIsModalVisible(false)
    dispatch(
      changePatientStatusAction({
        patientId: selectedPatient._id,
        setOk,
        setPatientsList,
        status: 'Deactivate',
      })
    )
  }

  const onViewMore = (patientNHSNumber, patientName) => {
    const formattedPatientName = patientName
      .replace(/^(Dr\.\s*)?/g, '')
      ?.toLowerCase()
    history.push(`/admin/patient/${formattedPatientName}-${patientNHSNumber}`)
  }

  const filteredPatients = patientsList?.filter((patient) => {
    const { name, nhsNumber, contactDetails } = patient.personalDetails
    const email = contactDetails?.email || ''

    return (
      name?.toLowerCase().includes(searchQuery) ||
      nhsNumber?.toLowerCase().includes(searchQuery) ||
      email?.toLowerCase().includes(searchQuery)
    )
  })

  return (
    <section className='doctorCard'>
      <div style={{ textAlign: 'center' }}>
        <Input
          placeholder='Search by Name, NHS Number, Email'
          value={searchQuery}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', width: '50%' }}
        />
      </div>
      <Row gutter={[16, 16]}>
        {filteredPatients?.map((patient) => (
          <Col key={patient._id} xs={24} sm={12} md={8} lg={8}>
            <InfoCard
              avatar={
                patient?.ImgUrl ||
                (patient?.personalDetails?.gender === 'Male'
                  ? doctorMaleAvatar // Use a generic male avatar path
                  : doctorFemaleAvatar) // Use a generic female avatar path
              }
              title={patient?.personalDetails?.name}
              description={
                <>
                  <p>
                    <strong>NHS Number:</strong>{' '}
                    {patient?.personalDetails?.nhsNumber}
                  </p>
                  <p>
                    <strong>Contact:</strong>{' '}
                    {patient?.personalDetails?.contactDetails?.email || 'N/A'}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong>{' '}
                    {patient?.personalDetails?.dateOfBirth || 'N/A'}
                  </p>
                </>
              }
              buttonText='View Details'
              onButtonClick={() =>
                onViewMore(
                  patient?.personalDetails?.nhsNumber,
                  patient?.personalDetails?.name
                )
              }
              extra={
                patient?.isDeactivated ? (
                  <Button onClick={() => handleReactivate(patient)}>
                    Reactivate Profile
                  </Button>
                ) : (
                  <Button
                    danger
                    onClick={() => handleDeactivate(patient)}
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
          <strong>{selectedPatient?.personalDetails?.name}</strong>? This will
          delete all profile details.
        </p>
      </Modal>
      <br />
      <br />
      <MenuFooter />
    </section>
  )
}

export default PatientManagement
