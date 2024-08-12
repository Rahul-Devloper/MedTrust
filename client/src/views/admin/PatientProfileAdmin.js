import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import {
  getDoctorProfileDataAction,
  getPatientByNHSNumberAction,
} from '../../redux/actions/patientActions'
import { Button, Card, Col, Modal, Row } from 'antd'
import ProfileCard from '../../components/Cards/ProfileCard'
import ProfileCard2 from '../../components/Cards/ProfileCard2'

import MaleAvatar from '../../assets/images/illustrations/doctorMaleAvatar.png'
import FemaleAvatar from '../../assets/images/illustrations/doctorFemaleAvatar.png'
import RenderCardDetails from '../../components/Cards/RenderCardDetails'
import { MdContactPhone } from 'react-icons/md'
import MenuFooter from '../../layouts/components/footer'
import {
  deleteReviewAction,
  getAllReviewsByPatientAction,
} from '../../redux/actions/reviewActions'
import RatingCard from '../../components/Cards/RatingCard'
import { LiaCheckDoubleSolid } from 'react-icons/lia'

const PatientProfileAdmin = () => {
  const dispatch = useDispatch()
  const { patientName, patientId } = useParams()

  console.log('patientId==>', patientId)

  //state
  const [ok, setOk] = useState(false)
  const [patientData, setPatientData] = useState([])
  const [reviewData, setReviewData] = useState([])
  const [responseModal, setIsResponseModal] = useState(false)
  const [modalResponseData, setModalResponseData] = useState({})
  const [reviewList, setReviewsList] = useState([])
  const [doctorData, setDoctorData] = useState([])
  const [reviewerNames, setReviewerNames] = useState({})
  const [isModalVisible, setIsModalVisible] = useState(false)

  const [showReviewsCount, setShowReviewsCount] = useState(4) // Initialize with 4 reviews to show

  useEffect(() => {
    const fetchPatientData = async () => {
      const patient = await dispatch(getPatientByNHSNumberAction(patientId))
      if (patient) {
        setPatientData(patient)
      }
    }

    fetchPatientData()
    console.log('patientIdAgain==>', patientId)

    dispatch(
      getAllReviewsByPatientAction({
        setOk,
        setReviewsList,
        patientNHSNumber: patientId,
      })
    )
  }, [dispatch, patientId, ok])

  useEffect(() => {
    const fetchReviewerNames = async () => {
      const names = {}

      for (const review of reviewList) {
        if (review?.doctorGMCNumber) {
          try {
            // Fetch doctor data
            const doctor = await dispatch(
              getDoctorProfileDataAction({
                setOk,
                setDoctorData: () => {}, // Don't update state here
                physicianName: '',
                physicianId: review?.doctorGMCNumber,
              })
            )

            // Use the doctor data directly from the response
            if (doctor?.personalInfo?.name) {
              names[review.doctorGMCNumber] = doctor.personalInfo.name
            }
          } catch (error) {
            console.error('Error fetching doctor data:', error)
          }
        }
      }
      setReviewerNames(names)
      console.log('names==>', names)
    }

    fetchReviewerNames()
  }, [dispatch, reviewList])

  console.log('newDoctorData==>', doctorData)

  const contactInfo = [
    {
      title: patientData?.personalDetails?.contactDetails?.phoneNumber,
      description: patientData?.personalDetails?.contactDetails?.email,
      icon: <MdContactPhone style={{ fontSize: '24px', color: 'blue' }} />,
    },
  ]

  const ratingData =
    reviewList?.length > 0
      ? reviewList?.map((review) => ({
          _id: review?._id, // Include review ID for identifying the review
          heading: review?.reviewTitle,
          rating: review.rating || 0, // Handle potential null/undefined values
          reviewText: review.comment || '',
          reviewer: reviewerNames[review?.doctorGMCNumber] || '', // Provide a default reviewer if missing
          date: new Date(review.date).toLocaleDateString(), // Format the date
          //   isReviewed: review.patientNHSNumber === patientNHSNumber, // Check if the logged-in user is the reviewer
          reviewScores: review?.reviewScores || {},
          isResponse: review?.isResponse || false,
          response: review?.response || '',
          responseDate: review?.responseDate || '',
          doctorGMCNumber: review?.doctorGMCNumber || '',
        }))
      : []

  const viewResponse = (review) => {
    console.log('reviewId==>', review)
    setModalResponseData(review)
    setIsModalVisible(true)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const deleteReview = async (reviewId, patientId) => {
    console.log('reviewId==>', reviewId)

    // First, dispatch the delete action
    //await is used for awaiting the deletion and getting the response,
    // only after that the next dispatch in sequence will be proceeded
    await dispatch(
      deleteReviewAction({
        setOk,
        reviewId,
        setReviewsList,
      })
    )

    // Then, after the review is deleted, fetch the updated reviews list
    dispatch(
      getAllReviewsByPatientAction({
        setOk,
        setReviewsList,
        patientNHSNumber: patientId,
      })
    )
  }

  const reviewWithResponse = ratingData?.find((review) => review.isResponse)

  return (
    <div className='physician-profile' style={{ marginTop: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={18} md={16} lg={16}>
          <ProfileCard2
            avatar={
              patientData?.ImgUrl ||
              (patientData?.personalDetails?.gender === 'Male'
                ? MaleAvatar
                : FemaleAvatar)
            }
            title={patientData?.personalDetails?.name}
            description={'Patient'}
            details={[
              {
                label: 'Gender',
                value: patientData?.personalDetails?.gender,
              },
              {
                label: 'DOB',
                value: patientData?.personalDetails?.dateOfBirth,
              },
              {
                label: 'NHS Number',
                value: patientData?.personalDetails?.nhsNumber,
              },
            ]}
          />

          <section style={{ marginTop: '20px' }} id='Reviews'>
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
                          onClick={() => deleteReview(rating?._id, patientId)}>
                          Delete Review & Response
                        </Button>
                        <span style={{ marginLeft: '10px' }} />
                        <Button
                          shape='round'
                          primary
                          onClick={() => viewResponse(rating)}>
                          View Response from Doctor
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
      <MenuFooter />
    </div>
  )
}

export default PatientProfileAdmin
