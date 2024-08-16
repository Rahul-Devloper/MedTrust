import React, { useEffect, useState } from 'react'
import { Button, Col, Row, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { getAllReviewsByPatientAction } from '../../redux/actions/reviewActions'
import RatingCard from '../../components/Cards/RatingCard'
import { getAllDoctorsAction } from '../../redux/actions/patientActions'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'

const MyReviews = () => {
  const [doctorsList, setDoctorsList] = useState([])
  const [reviewList, setReviewsList] = useState([])
  const [reviewerNames, setReviewerNames] = useState({})
  const [showReviewsCount, setShowReviewsCount] = useState(6) // Initialize with 6 reviews to show
  const [searchQuery, setSearchQuery] = useState('') // State to hold the search query
  const [ok, setOk] = useState(false)

  const dispatch = useDispatch()
  const history = useHistory()

  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAllDoctorsAction({ setOk, setDoctorsList }))
    dispatch(
      getAllReviewsByPatientAction({
        setOk,
        setReviewsList,
        patientNHSNumber: user?.nhsNumber,
      })
    )
  }, [dispatch, user?.nhsNumber])

  useEffect(() => {
    const fetchReviewerNames = () => {
      const names = {}
      for (const review of reviewList) {
        const doctor = doctorsList.find(
          (doc) => doc.gmcNumber === review?.doctorGMCNumber
        )
        if (doctor) {
          names[review?.doctorGMCNumber] = doctor?.personalInfo?.name
        }
      }
      setReviewerNames(names)
    }

    fetchReviewerNames()
  }, [doctorsList, reviewList])

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const filteredRatingData = reviewList
    ?.filter((review) =>
      reviewerNames[review?.doctorGMCNumber]
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
    .map((review) => ({
      heading: review?.reviewTitle,
      rating: review.rating || 0, // Handle potential null/undefined values
      reviewText: review.comment || '',
      reviewer: reviewerNames[review?.doctorGMCNumber] || '', // Provide a default reviewer if missing
      date: new Date(review.date).toLocaleDateString(), // Format the date
      actions: (
        <Button
          type='primary'
          onClick={() =>
            handleViewDetails(
              review?.doctorGMCNumber,
              reviewerNames[review?.doctorGMCNumber]
            )
          }>
          View Details
        </Button>
      ),
    }))

  const handleViewDetails = (gmcNumber, name) => {
    const formattedDoctorName = name.replace(/^(Dr\.\s*)?/g, '').toLowerCase()
    history.push(
      `/${
        user?.role?.toLowerCase() == 'patient' ? 'patient' : 'guest'
      }/physician/${formattedDoctorName}-${gmcNumber}`
    )
  }

  return (
    <>
      <section className='doctorCard'>
        <h2>My Reviews</h2>

        {/* Search Input */}
        <div style={{ textAlign: 'center' }}>
          <Input
            placeholder='Search by doctor name'
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: '20px', width: '50%' }}
          />
        </div>

        <Row gutter={[16, 16]}>
          {Array.isArray(filteredRatingData) &&
            filteredRatingData
              .slice(0, showReviewsCount)
              ?.map((rating, index) => {
                return (
                  <Col key={index} xs={24} sm={12} md={8} lg={8}>
                    <RatingCard
                      title={rating?.title}
                      rating={rating?.rating}
                      heading={rating?.heading}
                      description={rating?.reviewText}
                      reviewer={rating?.reviewer}
                      date={rating?.date}
                      extra={rating?.actions}
                    />
                  </Col>
                )
              })}
        </Row>

        {showReviewsCount < filteredRatingData.length && (
          <div style={{ textAlign: 'center' }}>
            <Button
              type='primary'
              onClick={() => setShowReviewsCount(showReviewsCount + 4)}>
              Show More
            </Button>
          </div>
        )}
      </section>
    </>
  )
}

export default MyReviews
