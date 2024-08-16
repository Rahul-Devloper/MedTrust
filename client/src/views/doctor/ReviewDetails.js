import React, { useEffect, useState } from 'react'
import ProfileCard from '../../components/Cards/ProfileCard'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'
import {
  getReviewByIdAction,
  postResponseAction,
} from '../../redux/actions/reviewActions'
import { Button, Col, Form, Modal, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import RatingCard from '../../components/Cards/RatingCard'
import { MdHealthAndSafety, MdContactPhone } from 'react-icons/md'
import { LiaCheckDoubleSolid } from 'react-icons/lia'

import { FaCheckDouble } from 'react-icons/fa6'

const ReviewDetails = () => {
  const dispatch = useDispatch()
  const { reviewId } = useParams()
  const [form] = Form.useForm() // Form instance

  //state
  const [ok, setOk] = useState(false)
  const [reviewData, setReviewData] = useState([])
  const [responseModal, setIsResponseModal] = useState(false)

  useEffect(() => {
    dispatch(getReviewByIdAction({ setOk, reviewId, setReviewData }))
  }, [dispatch, reviewId, ok])

  const handleCancel = () => {
    setIsResponseModal(false)
    form.resetFields()
  }

  const handlePostResponse = (values) => {
    console.log('Response Submitted==>', values)
    dispatch(
      postResponseAction({
        setReviewData,
        values,
        reviewId,
        setOk,
      })
    )
    setIsResponseModal(false)
    form.resetFields()
  }

  const handleDeleteResponse = () => {
    dispatch(
      postResponseAction({
        setReviewData,
        values: {
          isResponse: false,
          response: '',
        },
        reviewId,
        setOk,
      })
    )
    setIsResponseModal(false)
    form.resetFields()
  }

  return (
    <div className='check'>
      <Row gutter={[16, 16]} justify='center' align={'middle'}>
        <Col xs={24} sm={18} md={16} lg={16}>
          <section style={{ marginTop: '20px' }}>
            <ProfileCard
              profileCardStyle={{ width: '100%' }}
              title={reviewData?.reviewTitle}
              //   description={reviewData?.comment}
              ratingData={{
                label: 'Overall Effectiveness',
                value: reviewData?.rating || 0,
                color: 'magenta',
              }}
              details={[
                {
                  label: 'Comment',
                  value: reviewData?.comment || '',
                },
              ]}
              actions={[
                {
                  label:
                    reviewData?.isResponse === true
                      ? 'Update Response'
                      : 'Post Response',
                  type: 'primary',
                  disabled: false,
                  onClick: () => setIsResponseModal(true),
                },
              ]}
              progressBars={[
                {
                  label: 'Communication',
                  value: reviewData?.reviewScores?.communication || 0,
                  color: 'blue',
                },
                {
                  label: 'Bedside Manner',
                  value: reviewData?.reviewScores?.bedsideManner || 0,
                  color: 'green',
                },
                {
                  label: 'Office Environment',
                  value: reviewData?.reviewScores?.officeEnvironment || 0,
                  color: 'orange',
                },
                {
                  label: 'Wait Time',
                  value: reviewData?.reviewScores?.waitTime || 0,
                  color: 'red',
                },
                {
                  label: 'Professionalism',
                  value: reviewData?.reviewScores?.professionalism || 0,
                  color: 'purple',
                },
                {
                  label: 'Treatment Satisfaction',
                  value: reviewData?.reviewScores?.treatmentSatisfaction || 0,
                  color: 'teal',
                },
              ]}
            />
          </section>
        </Col>
        <Col xs={24} sm={6} md={8} lg={8}>
          {reviewData?.isResponse && (
            <RatingCard
              //   title={'Response'}
              //   rating={rating?.rating}
              extra={
                <Button type='danger' onClick={() => handleDeleteResponse()}>
                  Delete Response
                </Button>
              }
              heading={'Response'}
              description={reviewData?.response}
              reviewer={
                <LiaCheckDoubleSolid
                  style={{ fontSize: '24px', color: 'blue' }}
                />
              }
              isTag={false}
              date={`Responded On: ${new Date(
                reviewData?.responseDate
              ).toLocaleDateString()}`}
              //   extra={rating?.actions}
            />
          )}
        </Col>
      </Row>
      <Modal
        title='Post Response'
        visible={responseModal}
        onCancel={handleCancel}
        footer={null}>
        <Form form={form} onFinish={handlePostResponse}>
          <Form.Item
            label='Enter your Response'
            name='response'
            rules={[{ required: true, message: 'Enter Response' }]}>
            <TextArea rows={4} />
          </Form.Item>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button type='primary' htmlType='submit'>
              Submit Review
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ReviewDetails
