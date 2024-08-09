import { Avatar, Button, Card, Col, Progress, Rate, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import '../../assets/css/cards.css'
import doctorMaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import doctorFemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import { getDoctorSpecialityAction } from '../../redux/actions/patientActions'
import { useDispatch } from 'react-redux'
import ProfileCard from '../../components/Cards/ProfileCard'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import MenuFooter from '../../layouts/components/footer'

const CategoryView = () => {
  const [ok, setOk] = useState(false)
  const [doctorsBySpecialization, setDoctorsBySpecialization] = useState([])
  const { speciality } = useParams()
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    console.log('speciality==>', speciality)
    dispatch(
      getDoctorSpecialityAction({
        setOk,
        setDoctorsBySpecialization,
        speciality,
      })
    )
  }, [dispatchEvent, setOk, setDoctorsBySpecialization, speciality])
  console.log('doctorsBySpecialization==>', doctorsBySpecialization)

  const onViewProfile = (doctorGmcNumber, doctorName) => {
    console.log('doctorGmcNumber==>', doctorGmcNumber)
    const formattedDoctorName = doctorName
      .replace(/^(Dr\.\s*)?/g, '')
      .toLowerCase()
    history.push(`/patient/physician/${formattedDoctorName}-${doctorGmcNumber}`)
  }

  const onPostReview = (doctorGmcNumber) => {
    console.log('Post Review for doctor with GMC Number:', doctorGmcNumber)
  }

  return (
    <div>
      <h2>Doctors by Speciality</h2>
      {doctorsBySpecialization.map((doctor) => (
        <div key={doctor._id} style={{ marginBottom: '20px' }}>
          <ProfileCard
            avatar={
              doctor?.personalInfo?.gender === 'Male'
                ? doctorMaleAvatar
                : doctorFemaleAvatar
            }
            title={`${doctor?.personalInfo?.name}, ${doctor?.personalInfo?.degree}`}
            description={doctor?.professionalInfo?.specialty}
            ratingData={{
              label: 'Overall Effectiveness',
              value: doctor.ratings?.overallEffectiveness || 0,
              color: 'magenta',
            }}
            details={[
              {
                label: 'Education',
                value: doctor?.professionalInfo?.education,
              },
              {
                label: 'Years of Experience',
                value: doctor?.professionalInfo?.yearsOfExperience,
              },
              {
                label: 'Hospital Affiliations',
                value: doctor?.professionalInfo?.hospitalAffiliations['0'],
              },
            ]}
            progressBars={[
              {
                label: 'Wait Time',
                value: doctor.ratings?.patientScores?.waitTime || 0,
                color: 'blue',
              },
              {
                label: 'Professionalism',
                value: doctor.ratings?.patientScores?.professionalism || 0,
                color: 'purple',
              },
              {
                label: 'Treatment Satisfaction',
                value:
                  doctor.ratings?.patientScores?.treatmentSatisfaction || 0,
                color: 'gold',
              },
            ]}
            actions={[
              {
                label: 'View Profile',
                type: 'primary',
                onClick: () =>
                  onViewProfile(doctor.gmcNumber, doctor?.personalInfo?.name),
              },
              // {
              //   label: 'Post Review',
              //   type: 'secondary',
              //   onClick: () => onPostReview(doctor.gmcNumber),
              // },
            ]}
          />
        </div>
      ))}
      <MenuFooter />
    </div>
  )
}

export default CategoryView
