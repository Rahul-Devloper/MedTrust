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
  getAllReviewsAction,
  postReviewAction,
} from '../../redux/actions/reviewActions'
import TextArea from 'antd/lib/input/TextArea'
import MenuFooter from '../../layouts/components/footer'

const { Link } = Anchor
const { Panel } = Collapse

const PhysicianProfile = () => {
  const [ok, setOk] = useState(false)
  const [doctorData, setDoctorData] = useState([])
  const [reviewList, setReviewsList] = useState([])
  const [reviewerNames, setReviewerNames] = useState({})
  const [showReviewsCount, setShowReviewsCount] = useState(4) // Initialize with 4 reviews to show
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [form] = Form.useForm() // Form instance

  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const { physicianName, physicianId } = params
  const patientNHSNumber = useSelector((state) => state?.auth?.user?.nhsNumber)
  console.log('patientNHSNumber==>', patientNHSNumber)
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
  }, [dispatch, physicianName, physicianId])

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
      icon: <FaStethoscope style={{ fontSize: '24px' }} />,
      title: 'Speciality',
      description: doctorData?.professionalInfo?.specialty,
    },
    {
      icon: <FaBook style={{ fontSize: '24px' }} />,
      title: 'Education',
      description: doctorData?.professionalInfo?.education,
    },
    {
      icon: <GrUserExpert style={{ fontSize: '24px' }} />,
      title: 'Experience',
      description: doctorData?.professionalInfo?.yearsOfExperience,
    },
  ]

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

  const ratingData =
    reviewList?.length > 0
      ? reviewList?.map((review) => ({
          heading: review?.reviewTitle,
          rating: review.rating || 0, // Handle potential null/undefined values
          reviewText: review.comment || '',
          reviewer: reviewerNames[review?.patientNHSNumber] || '', // Provide a default reviewer if missing
          date: new Date(review.date).toLocaleDateString(), // Format the date
        }))
      : []

  const handlePostReview = (values) => {
    console.log('Review Submitted:', values)
    dispatch(
      postReviewAction({
        setReviewsList,
        values,
        doctorGMCNumber: doctorData?.gmcNumber,
        patientNHSNumber,
        setOk,
      })
    )
    setIsModalVisible(false)
    form.resetFields()
  }

  const handleCancel = () => {
    setIsModalVisible(false)
    form.resetFields()
  }

  return (
    <div className='physician-profile' style={{ marginBottom: '20px' }}>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} md={16} lg={16}>
          <ProfileCard2
            avatar={
              doctorData?.personalInfo?.gender === 'Male'
                ? MaleAvatar
                : FemaleAvatar
            }
            title={`${doctorData?.personalInfo?.name}, ${doctorData?.personalInfo?.degree}`}
            description={doctorData?.professionalInfo?.specialty}
            ratingData={{
              label: 'Overall Effectiveness',
              value: doctorData?.ratings?.overallEffectiveness || 0,
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
              <h4>Treatment Frequency by Condition</h4>
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
                  value: doctorData?.ratings?.patientScores?.communication || 0,
                  color: 'blue',
                },
                {
                  label: 'Bedside Manner',
                  value: doctorData?.ratings?.patientScores?.bedsideManner || 0,
                  color: 'green',
                },
                {
                  label: 'Office Environment',
                  value:
                    doctorData?.ratings?.patientScores?.officeEnvironment || 0,
                  color: 'orange',
                },
                {
                  label: 'Wait Time',
                  value: doctorData?.ratings?.patientScores?.waitTime || 0,
                  color: 'red',
                },
                {
                  label: 'Professionalism',
                  value:
                    doctorData?.ratings?.patientScores?.professionalism || 0,
                  color: 'purple',
                },
                {
                  label: 'Treatment Satisfaction',
                  value:
                    doctorData?.ratings?.patientScores?.treatmentSatisfaction ||
                    0,
                  color: 'teal',
                },
              ]}
              actions={[
                {
                  label: 'Post Review',
                  type: 'primary',
                  disabled: role !== 'patient' ? true : false,
                  onClick: () => setIsModalVisible(true),
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
                    date={rating?.date}
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
        title='Post Review'
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}>
        <Form form={form} onFinish={handlePostReview}>
          {/* Template Questions */}
          <Form.Item
            label='Communication'
            name='communication'
            rules={[{ required: true, message: 'Please rate communication!' }]}>
            <Rate />
          </Form.Item>
          <Form.Item
            label='Bedside Manner'
            name='bedsideManner'
            rules={[
              { required: true, message: 'Please rate bedside manner!' },
            ]}>
            <Rate />
          </Form.Item>
          <Form.Item
            label='Office Environment'
            name='officeEnvironment'
            rules={[
              { required: true, message: 'Please rate office environment!' },
            ]}>
            <Rate />
          </Form.Item>
          <Form.Item
            label='Wait Time'
            name='waitTime'
            rules={[{ required: true, message: 'Please rate wait time!' }]}>
            <Rate />
          </Form.Item>
          <Form.Item
            label='Professionalism'
            name='professionalism'
            rules={[
              { required: true, message: 'Please rate professionalism!' },
            ]}>
            <Rate />
          </Form.Item>
          <Form.Item
            label='Treatment Satisfaction'
            name='treatmentSatisfaction'
            rules={[
              {
                required: true,
                message: 'Please rate treatment satisfaction!',
              },
            ]}>
            <Rate />
          </Form.Item>
          {/* Feedback Title */}
          <Form.Item
            label='Title'
            name='title'
            rules={[{ required: true, message: 'Please enter a title!' }]}>
            <Input />
          </Form.Item>
          {/* Feedback Description */}
          <Form.Item
            label='Description'
            name='description'
            rules={[
              { required: true, message: 'Please enter your feedback!' },
            ]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit'>
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <br />
      <br />
      <MenuFooter />
    </div>
  )
}

export default PhysicianProfile
