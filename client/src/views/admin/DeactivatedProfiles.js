import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Tabs, Row, Col, Input, Button, Modal, Pagination } from 'antd'
import {
  changePatientStatusAction,
  getAllPatientsAction,
  getAllDoctorsAction,
} from '../../redux/actions/patientActions'
import {
  deactivateDoctorProfileAction,
  reactivateDoctorProfileAction,
} from '../../redux/actions/doctorActions'
import InfoCard from '../../components/Cards/InfoCard'
import MenuFooter from '../../layouts/components/footer'
import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const { TabPane } = Tabs

const DeactivatedProfiles = () => {
  const [ok, setOk] = useState(false)
  const [patientsList, setPatientsList] = useState([])
  const [doctorsList, setDoctorsList] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [selectedProfile, setSelectedProfile] = useState(null)
  const [activeTab, setActiveTab] = useState('patients')
  const [currentPage, setCurrentPage] = useState(1)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(getAllPatientsAction({ setOk, setPatientsList }))
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
  }, [dispatch])

  const handleDeactivate = (profile, type) => {
    setSelectedProfile({ ...profile, type })
    setIsModalVisible(true)
  }

  const handleReactivate = async (profile, type) => {
    if (type === 'patient') {
      await dispatch(
        changePatientStatusAction({
          patientId: profile._id,
          setOk,
          setPatientsList,
          status: 'Activate',
        })
      )
    } else {
      await dispatch(
        reactivateDoctorProfileAction({
          doctorId: profile._id,
          setOk,
          setDoctorsList,
        })
      )
    }
  }

  const deactivateProfile = () => {
    if (selectedProfile.type === 'patient') {
      dispatch(
        changePatientStatusAction({
          patientId: selectedProfile._id,
          setOk,
          setPatientsList,
          status: 'Deactivate',
        })
      )
    } else {
      dispatch(
        deactivateDoctorProfileAction({
          doctorId: selectedProfile._id,
          setOk,
          setDoctorsList,
        })
      )
    }
    setIsModalVisible(false)
  }

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value?.toLowerCase())
  }

  const filteredProfiles = (list) =>
    list
      ?.filter((profile) => profile?.isDeactivated === true)
      ?.filter((profile) => {
        const name = profile.personalDetails?.name || profile.personalInfo?.name
        const email =
          profile.personalDetails?.contactDetails?.email || profile.gmcNumber
        return (
          name?.toLowerCase().includes(searchQuery) ||
          email?.toLowerCase().includes(searchQuery)
        )
      })

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const pageSize = 6 // Adjust page size based on your preference
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const renderProfiles = (profiles, type) =>
    filteredProfiles(profiles)
      .slice(startIndex, endIndex)
      .map((profile) => (
        <Col key={profile._id} xs={24} sm={12} md={8} lg={8}>
          <InfoCard
            avatar={
              profile?.ImgUrl ||
              (profile?.personalDetails?.gender === 'Male' ||
              profile?.personalInfo?.gender === 'Male'
                ? doctorMaleAvatar
                : doctorFemaleAvatar)
            }
            title={profile.personalDetails?.name || profile.personalInfo?.name}
            description={
              <>
                <p>
                  <strong>
                    {type === 'patient' ? 'NHS Number' : 'GMC Number'}:
                  </strong>{' '}
                  {type === 'patient'
                    ? profile.personalDetails?.nhsNumber
                    : profile.gmcNumber}
                </p>
                <p>
                  <strong>Contact:</strong>{' '}
                  {profile.personalDetails?.contactDetails?.email || 'N/A'}
                </p>
                {type === 'doctor' && (
                  <p>
                    <strong>Specialty:</strong>{' '}
                    {profile?.professionalInfo?.specialty || 'N/A'}
                  </p>
                )}
              </>
            }
            buttonText='View Profile'
            onButtonClick={() => {
              const profileId =
                profile.personalDetails?.nhsNumber || profile.gmcNumber
              const profileName =
                profile.personalDetails?.name || profile.personalInfo?.name
              const formattedName = profileName
                .replace(/^(Dr\.\s*)?/g, '')
                ?.toLowerCase()
              const path = type === 'patient' ? 'patient' : 'physician'
              history.push(`/admin/${path}/${formattedName}-${profileId}`)
            }}
            extra={
              <Button
                onClick={() =>
                  profile.isDeactivated
                    ? handleReactivate(profile, type)
                    : handleDeactivate(profile, type)
                }
                type={profile.isDeactivated ? 'default' : 'danger'}
                style={{ marginLeft: '10px' }}>
                {profile.isDeactivated
                  ? 'Reactivate Profile'
                  : 'Deactivate Profile'}
              </Button>
            }
          />
        </Col>
      ))

  return (
    <section className='doctorCard'>
      <Row justify='center'>
        <Col span={24}>
          <Tabs
            activeKey={activeTab}
            onChange={setActiveTab}
            centered // This centers the tabs
          >
            <TabPane style={{ padding: '20px' }} tab='Patients' key='patients'>
              <Input
                placeholder='Search by Name, NHS Number, Email'
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ marginBottom: '20px', width: '50%' }}
              />
              <Row gutter={[16, 16]}>
                {renderProfiles(patientsList, 'patient')}
              </Row>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredProfiles(patientsList)?.length || 0}
                onChange={handlePageChange}
                style={{
                  marginTop: '20px',
                  textAlign: 'center',
                  marginTop: '20px',
                }}
              />
            </TabPane>

            <TabPane tab='Doctors' key='doctors'>
              <Input
                placeholder='Search by Name, Specialty, Degree'
                value={searchQuery}
                onChange={handleSearchChange}
                style={{
                  marginBottom: '20px',
                  width: '50%',
                  marginTop: '20px',
                }}
              />
              <Row gutter={[16, 16]}>
                {renderProfiles(doctorsList, 'doctor')}
              </Row>
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredProfiles(doctorsList)?.length || 0}
                onChange={handlePageChange}
                style={{ marginTop: '20px', textAlign: 'center' }}
              />
            </TabPane>
          </Tabs>
        </Col>
      </Row>{' '}
      <Modal
        title='Confirm Deactivation'
        visible={isModalVisible}
        onOk={deactivateProfile}
        onCancel={() => setIsModalVisible(false)}
        okText='Yes'
        cancelText='No'>
        <p>
          Are you sure you want to deactivate the profile of{' '}
          <strong>
            {selectedProfile?.personalDetails?.name ||
              selectedProfile?.personalInfo?.name}
          </strong>
          ? This will delete all profile details.
        </p>
      </Modal>
      <br />
      <br />
      <MenuFooter />
    </section>
  )
}

export default DeactivatedProfiles
