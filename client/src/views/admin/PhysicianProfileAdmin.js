import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import {
  getDoctorProfileDataAction,
  getPatientByNHSNumberAction,
} from '../../redux/actions/patientActions'
import {
  Affix,
  Anchor,
  Button,
  Card,
  Col,
  Collapse,
  Form,
  Input,
  Modal,
  Progress,
  Rate,
  Row,
} from 'antd'
import ProfileCard2 from '../../components/Cards/ProfileCard2'
import MaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import FemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import CardGrid from '../../components/Cards/CardGrid'
import RenderAccordion from '../../components/RenderAccordion'
import { FaBook, FaHospital, FaStethoscope } from 'react-icons/fa6'
import { GrUserExpert, GrCertificate } from 'react-icons/gr'
import { MdHealthAndSafety, MdContactPhone } from 'react-icons/md'

import '../../assets/css/accordion.css'
import RenderCardDetails from '../../components/Cards/RenderCardDetails'
import ProfileCard from '../../components/Cards/ProfileCard'
import RatingCard from '../../components/Cards/RatingCard'
import {
  deleteReviewAction,
  getAllReviewsAction,
  postReviewAction,
  updateReviewAction,
} from '../../redux/actions/reviewActions'
import TextArea from 'antd/lib/input/TextArea'
import MenuFooter from '../../layouts/components/footer'
import { checkAppointmentStatusAction } from '../../redux/actions/appointmentActions'
import { LiaCheckDoubleSolid } from 'react-icons/lia'

const { Link } = Anchor
const { Panel } = Collapse

const PhysicianProfile = () => {
  const [ok, setOk] = useState(false)
  const [doctorData, setDoctorData] = useState([])
  const [reviewList, setReviewsList] = useState([])
  const [reviewerNames, setReviewerNames] = useState({})
  const [showReviewsCount, setShowReviewsCount] = useState(4) // Initialize with 4 reviews to show
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [isUpdate, setIsUpdate] = useState(false) // Track if updating a review
  const [currentReviewId, setCurrentReviewId] = useState(null) // Track the current review being updated
  const [appointmentData, setAppointmentData] = useState({})
  const [showResponse, setShowResponse] = useState(false)
  const [modalResponseData, setModalResponseData] = useState({})
  const [form] = Form.useForm() // Form instance

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { physicianName, physicianId } = params
  //   const patientNHSNumber = useSelector((state) => state?.auth?.user?.nhsNumber)
  //   console.log('patientNHSNumber==>', patientNHSNumber)
  const role = useSelector((state) => state?.auth?.user?.role)

  const buttonHeight = 40 // Approximate height of the button
  const additionalOffset = 10 // Extra space below the button
  const targetOffset = buttonHeight + additionalOffset

  useEffect(() => {
    dispatch(
      getDoctorProfileDataAction({
        setOk,
        setDoctorData,
        physicianName,
        physicianId,
      })
    )

    dispatch(getAllReviewsAction({ setOk, setReviewsList, physicianId }))
    console.log('gmcNumber==>', physicianId)
    // console.log('patientNHSNumber==>', patientNHSNumber)
  }, [dispatch, physicianName, physicianId, setOk])

  useEffect(() => {
    const fetchReviewerNames = async () => {
      console.log('reviewList==>', reviewList.length && reviewList)
      const names = {}
      for (const review of reviewList) {
        if (review?.patientNHSNumber) {
          const patient = await dispatch(
            getPatientByNHSNumberAction(review.patientNHSNumber)
          )
          if (patient) {
            names[review.patientNHSNumber] = patient?.personalDetails?.name
          }
        }
      }
      setReviewerNames(names)
      console.log('names==>', reviewerNames)
    }

    fetchReviewerNames()
  }, [dispatch, reviewList])

  const dataWithIcons = [
    {
      icon: <FaStethoscope style={{ fontSize: '20px' }} />,
      title: 'Speciality',
      description: doctorData?.professionalInfo?.specialty,
    },
    {
      icon: <FaBook style={{ fontSize: '20px' }} />,
      title: 'Education',
      description: doctorData?.professionalInfo?.education,
    },
    {
      icon: <GrUserExpert style={{ fontSize: '20px' }} />,
      title: 'Experience',
      description: doctorData?.professionalInfo?.yearsOfExperience,
    },
  ]
  let averageScores = {}

  // Initialize total scores object
  const totalScores = {
    communication: 0,
    bedsideManner: 0,
    officeEnvironment: 0,
    waitTime: 0,
    professionalism: 0,
    treatmentSatisfaction: 0,
    rating: 0,
  }

  // Count the number of reviews
  const reviewCount = reviewList?.length

  // Iterate through the reviewList and sum up the scores
  if (reviewCount > 0) {
    reviewList.forEach((review) => {
      // Ensure reviewScores exists before trying to access its properties
      if (review.reviewScores) {
        for (const key in totalScores) {
          if (key in review.reviewScores) {
            totalScores[key] += review.reviewScores[key]
          } else if (key === 'rating' && review[key] !== undefined) {
            totalScores[key] += review[key]
          }
        }
      }
    })

    // Calculate the average scores
    for (const key in totalScores) {
      // Calculate the average and format it to one decimal place
      const average = totalScores[key] / reviewCount
      averageScores[key] =
        average % 1 !== 0 ? average.toFixed(1) : average.toString() // Converts to string and rounds to 1 decimal if necessary
    }

    console.log('Average Ratings:', averageScores)
  } else {
    console.log('No reviews available to calculate ratings.')
  }
  const treatmentData =
    doctorData?.treatmentFrequency?.conditionsTreated?.map((item) => ({
      condition: item?.condition,
      frequency: item?.percentage,
      frequencyLabel:
        item?.percentage > 70
          ? 'High'
          : item?.percentage > 40
          ? 'Medium'
          : 'Low',
      description: item?.description,
    })) || []

  const certificates = doctorData?.professionalInfo?.certifications?.map(
    (cert) => ({
      title: cert,
      description: `Certified by ${doctorData?.professionalInfo?.education}`,
      icon: <GrCertificate style={{ fontSize: '24px', color: 'gold' }} />,
    })
  )

  const insurances = doctorData?.professionalInfo?.insuranceAccepted?.map(
    (ins) => ({
      title: ins,
      description: '',
      icon: <MdHealthAndSafety style={{ fontSize: '24px', color: 'purple' }} />,
    })
  )

  const hospitalAffiliations =
    doctorData?.professionalInfo?.hospitalAffiliations?.map((hosp) => ({
      title: hosp,
      description: '',
      icon: <FaHospital style={{ fontSize: '24px', color: '#ec6464' }} />,
    }))

  const contactInfo = [
    {
      title: doctorData?.contactInfo?.phone,
      description: doctorData?.contactInfo?.email,
      icon: <MdContactPhone style={{ fontSize: '24px', color: 'blue' }} />,
    },
  ]
  console.log('reviewListCheck==>', reviewList)
  const ratingData =
    reviewList?.length > 0
      ? reviewList?.map((review) => ({
          _id: review?._id, // Include review ID for identifying the review
          heading: review?.reviewTitle,
          rating: review.rating || 0, // Handle potential null/undefined values
          reviewText: review.comment || '',
          reviewer: reviewerNames[review?.patientNHSNumber] || '', // Provide a default reviewer if missing
          date: new Date(review.date).toLocaleDateString(), // Format the date
          //   isReviewed: review.patientNHSNumber === patientNHSNumber, // Check if the logged-in user is the reviewer
          reviewScores: review?.reviewScores || {},
          isResponse: review?.isResponse || false,
          response: review?.response || '',
          responseDate: review?.responseDate || '',
        }))
      : []

  const deleteReview = (reviewId, physicianId) => {
    console.log('reviewId==>', reviewId)
    console.log('physicianId==>', physicianId)
    dispatch(
      deleteReviewAction({
        setOk,
        reviewId,
        setReviewsList,
        doctorGMCNumber: physicianId,
      })
    )
  }

  const viewResponse = (review) => {
    console.log('reviewId==>', review)
    setModalResponseData(review)
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  const openUpdateModal = (reviewId, reviewValues) => {
    setIsModalVisible(true)
    setIsUpdate(true)
    setCurrentReviewId(reviewId)
    form.setFieldsValue(reviewValues) // Populate the form with existing review values
  }

  //   const hasReviewed = reviewList.some(
  //     (review) => review.patientNHSNumber === patientNHSNumber
  //   )

  const reviewWithResponse = ratingData?.find((review) => review.isResponse)

  return (
    <div className='physician-profile' style={{ marginBottom: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={16} lg={16}>
          <ProfileCard2
            avatar={
              doctorData?.ImgUrl ||
              (doctorData?.personalInfo?.gender === 'Male'
                ? MaleAvatar
                : FemaleAvatar)
            }
            title={`${doctorData?.personalInfo?.name}, ${doctorData?.personalInfo?.degree}`}
            description={doctorData?.professionalInfo?.specialty}
            ratingData={{
              label: 'Overall Effectiveness',
              value:
                averageScores?.rating ||
                doctorData?.ratings?.overallEffectiveness ||
                0,
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
          <CardGrid
            children={[
              'Professional',
              'Certificates',
              'Hospital',
              'Insurance',
              'Ratings',
            ]}
            targetOffset={targetOffset}
            isSticky={true}
            isHorizontal={true}
            alignment='start'
          />
          <section style={{ marginTop: '20px' }} id='Professional'>
            <Card
              title='Professional Details'
              bordered={false}
              style={{
                width: '100%',
              }}>
              <h3>{`${doctorData?.personalInfo?.name} is a trained ${doctorData?.professionalInfo?.specialty} who has a degree in ${doctorData?.personalInfo?.degree}`}</h3>
              <CardGrid dataWithIcons={dataWithIcons} />
              {treatmentData && <h4>Treatment Frequency by Condition</h4>}
              <RenderAccordion data={treatmentData} />
            </Card>
          </section>
          <section style={{ marginTop: '20px' }} id='Certificates'>
            <Card
              title='Certifications'
              bordered={false}
              style={{
                width: '100%',
              }}>
              <Row gutter={16} justify={'space-evenly'}>
                {certificates?.map((certificate, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={8}>
                    <RenderCardDetails
                      title={certificate?.title}
                      description={certificate?.description}
                      icon={certificate?.icon}
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          </section>

          <section style={{ marginTop: targetOffset }} id='Hospital'>
            <Card
              title='Hospital Affiliations'
              bordered={false}
              style={{
                width: '100%',
              }}>
              <Row gutter={16} justify={'space-evenly'}>
                {hospitalAffiliations?.map((hospital, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={8}>
                    <RenderCardDetails
                      title={hospital?.title}
                      icon={hospital?.icon}
                      description={hospital?.description}
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          </section>
          <section style={{ marginTop: '20px' }} id='Insurance'>
            <Card
              title='Accepted Insurances'
              bordered={false}
              style={{
                width: '100%',
              }}>
              <Row gutter={16} justify={'space-evenly'}>
                {insurances?.map((insurance, index) => (
                  <Col key={index} xs={24} sm={12} md={8} lg={8}>
                    <RenderCardDetails
                      title={insurance?.title}
                      icon={insurance?.icon}
                      description={insurance?.description}
                    />
                  </Col>
                ))}
              </Row>
            </Card>
          </section>
          <section style={{ marginTop: '20px' }} id='Ratings'>
            <ProfileCard
              profileCardStyle={{ width: '100%' }}
              title='Ratings'
              ratingData={{
                label: 'Overall Effectiveness',
                value: doctorData?.ratings?.overallEffectiveness || 0,
                color: 'magenta',
              }}
              progressBars={[
                {
                  label: 'Communication',
                  value:
                    averageScores?.communication ||
                    doctorData?.ratings?.patientScores?.communication ||
                    0,
                  color: 'blue',
                },
                {
                  label: 'Bedside Manner',
                  value:
                    averageScores?.bedsideManner ||
                    doctorData?.ratings?.patientScores?.bedsideManner ||
                    0,
                  color: 'green',
                },
                {
                  label: 'Office Environment',
                  value:
                    averageScores?.officeEnvironment ||
                    doctorData?.ratings?.patientScores?.officeEnvironment ||
                    0,
                  color: 'orange',
                },
                {
                  label: 'Wait Time',
                  value:
                    averageScores?.waitTime ||
                    doctorData?.ratings?.patientScores?.waitTime ||
                    0,
                  color: 'red',
                },
                {
                  label: 'Professionalism',
                  value:
                    averageScores?.professionalism ||
                    doctorData?.ratings?.patientScores?.professionalism ||
                    0,
                  color: 'purple',
                },
                {
                  label: 'Treatment Satisfaction',
                  value:
                    averageScores?.treatmentSatisfaction ||
                    doctorData?.ratings?.patientScores?.treatmentSatisfaction ||
                    0,
                  color: 'teal',
                },
              ]}
            />
            {Array.isArray(ratingData) &&
              ratingData.slice(0, showReviewsCount)?.map((rating, index) => {
                console.log('rating==>', rating)
                return (
                  <RatingCard
                    key={index}
                    title={rating?.title}
                    rating={rating?.rating}
                    heading={rating?.heading}
                    description={rating?.reviewText}
                    reviewer={rating?.reviewer}
                    date={`Reviewed on: ${rating?.date}`}
                    extra={
                      <div>
                        <Button
                          danger
                          shape='round'
                          onClick={() =>
                            deleteReview(rating?._id, physicianId)
                          }>
                          Delete Review & Response
                        </Button>
                        <span style={{ marginLeft: '10px' }} />
                        <Button
                          shape='round'
                          primary
                          onClick={() => viewResponse(rating)}>
                          View Response
                        </Button>
                      </div>
                    }
                  />
                )
              })}
            {showReviewsCount < ratingData.length && (
              <div style={{ textAlign: 'center' }}>
                <Button
                  type='primary'
                  onClick={() => setShowReviewsCount(showReviewsCount + 4)}>
                  Show More
                </Button>
              </div>
            )}
          </section>
        </Col>
        <Col xs={24} sm={12} md={8} lg={8}>
          <section style={{ marginTop: '20px' }} id='Contact'>
            <Card
              title='Contact Information'
              bordered={false}
              style={{
                width: '100%',
              }}>
              {contactInfo?.map((contact, index) => (
                <RenderCardDetails
                  key={index}
                  title={contact?.title}
                  icon={contact?.icon}
                  description={contact?.description}
                />
              ))}
            </Card>
          </section>
          {console.log('ratingData?.isResponse==>', ratingData?.isResponse)}
          {/* <section style={{ marginTop: '20px' }} id='Response'>
            {showResponse && (
              <RatingCard
                //   title={'Response'}
                //   rating={rating?.rating}
                heading={'Response From Doctor'}
                description={
                  reviewWithResponse?.response || 'No response yet from doctor'
                }
                reviewer={
                  reviewWithResponse?.isResponse ? (
                    <LiaCheckDoubleSolid
                      style={{ fontSize: '24px', color: 'blue' }}
                    />
                  ) : null
                }
                isTag={false}
                date={
                  reviewWithResponse?.isResponse
                    ? `Responded On: ${new Date(
                        reviewWithResponse?.responseDate
                      ).toLocaleDateString()}`
                    : null
                }
              />
            )}
          </section> */}
        </Col>
      </Row>

      <Modal
        title="Doctor's Response"
        visible={isModalVisible}
        onOk={() => setIsModalVisible(false)}
        onCancel={handleCancel}
        footer={null} // Optional: Customize footer or leave as null
      >
        <RatingCard
          //   heading={'Response From Doctor'}
          description={
            modalResponseData?.response || 'No response yet from doctor'
          }
          reviewer={
            modalResponseData?.isResponse ? (
              <LiaCheckDoubleSolid
                style={{ fontSize: '24px', color: 'blue' }}
              />
            ) : null
          }
          isTag={false}
          date={
            modalResponseData?.isResponse
              ? `Responded On: ${new Date(
                  reviewWithResponse?.responseDate
                ).toLocaleDateString()}`
              : null
          }
        />
      </Modal>

      <br />
      <br />
      <MenuFooter />
    </div>
  )
}

export default PhysicianProfile
