import React, { useEffect, useState } from 'react'
import { Image, Input, Row, Col, Button } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllDoctorsAction } from '../../redux/actions/patientActions'
import { FindDoctor } from '../../assets/images/index'
import { FaEye, FaSearch } from 'react-icons/fa'
import { useHistory } from 'react-router-dom'
import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import InfoCard from '../../components/Cards/InfoCard'
import CardGrid from '../../components/Cards/CardGrid'
import MenuFooter from '../../layouts/components/footer'
import { ErrorNotification } from '../../components/Notification/ToastNotification'

const PatientFindDoctor = () => {
  const [ok, setOk] = useState(false)
  const [doctorsList, setDoctorsList] = useState([])
  const [filteredDoctors, setFilteredDoctors] = useState([])
  const [searchName, setSearchName] = useState('')
  const [searchLocation, setSearchLocation] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const role = useSelector((state) => state?.auth?.user?.role)

  useEffect(() => {
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
  }, [dispatch])

  // Filtering logic
  const handleSearch = () => {
    const results = doctorsList.filter((doctor) => {
      const searchQuery = searchName.toLowerCase()

      // Check if the search query matches the doctor's name, specialty, or degree
      const matchesName = doctor.personalInfo.name
        .toLowerCase()
        .includes(searchQuery)
      const matchesSpeciality = doctor.professionalInfo.specialty
        .toLowerCase()
        .includes(searchQuery)
      const matchesDegree = doctor.personalInfo.degree
        ?.toLowerCase()
        .includes(searchQuery)

      // Check if the search query matches the location
      const matchesLocation = doctor.contactInfo?.address?.city
        ?.toLowerCase()
        .includes(searchLocation.toLowerCase())

      // Return true if any of the name, specialty, or degree matches, and if the location matches (if provided)
      return (
        (matchesName || matchesSpeciality || matchesDegree) &&
        (searchLocation ? matchesLocation : true)
      )
    })
    console.log('results==>', results)
    if (results?.length <= 0) {
      ErrorNotification(
        'No results found for this search Query, please try another one'
      )
    }
    setFilteredDoctors(results)
  }

  const onViewMore = (doctorGmcNumber, doctorName) => {
    const formattedDoctorName = doctorName
      .replace(/^(Dr\.\s*)?/g, '')
      .toLowerCase()
    history.push(
      `/${
        role?.toLowerCase() == 'patient' ? 'patient' : 'guest'
      }/physician/${formattedDoctorName}-${doctorGmcNumber}`
    )
  }

  const categories = [
    'Family Doctor',
    'Dermatology',
    'Dentistry',
    'Orthopedics',
  ]

  // Doctors to display (either search results or popular doctors)
  const doctorsToDisplay = filteredDoctors.length
    ? filteredDoctors
    : doctorsList
        .filter((doctor) => doctor.ratings?.overallEffectiveness >= 4.5)
        .slice(0, 6)

  return (
    <div style={{ padding: '20px', minHeight: '100vh' }}>
      <Input.Group
        style={{
          width: '100%',
          marginBottom: '20px',
          position: 'absolute',
          top: '20%',
          left: '15%',
          zIndex: '9999',
        }}
        compact>
        <Input
          style={{ width: '30%' }}
          placeholder='Search Doctor, Speciality, Degree'
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <Input
          style={{ width: '25%' }}
          placeholder='Search with City'
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
        <Button
          type='primary'
          icon={<FaSearch />}
          onClick={handleSearch}
          style={{ width: '10%' }}>
          Search
        </Button>
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
        viewPath={`/${
          role?.toLowerCase() == 'patient' ? 'patient' : 'guest'
        }/speciality/`}
        children={categories}
      />
      <br />
      <Row justify={'end'}>
        <div className='site-button-ghost-wrapper'>
          <Button
            ghost
            icon={<FaEye />}
            onClick={() =>
              history.push(
                `/${
                  role?.toLowerCase() == 'patient' ? 'patient' : 'guest'
                }/speciality-directory`
              )
            }>
            View All Specialities
          </Button>
        </div>
      </Row>

      <section className='doctorCard'>
        <h2>{filteredDoctors.length ? 'Search Results' : 'Popular Doctors'}</h2>
        <Row gutter={[16, 16]}>
          {doctorsToDisplay.map((doctor, index) => {
            return (
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
                        {doctor.ratings?.overallEffectiveness
                          ? parseFloat(
                              doctor.ratings.overallEffectiveness
                            ).toFixed(1)
                          : 'N/A'}
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
      <br />
      <br />
      <MenuFooter />
    </div>
  )
}

export default PatientFindDoctor
