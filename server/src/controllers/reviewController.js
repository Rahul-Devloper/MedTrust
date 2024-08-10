const Review = require('../models/review')
const AppointmentService = require('../services/appointmentService')
const ReviewService = require('../services/reviewService')

/**********************************
  Check if user is a member
***********************************/

exports.getAllReviews = async (req, res) => {
  const { physicianId } = req?.params

  const review = await ReviewService.getAllReviewsById({
    doctorGMCNumber: physicianId,
  })

  if (!review) {
    return res.status(400).json({
      success: false,
      message: 'No reviews found',
    })
  }

  return res.status(200).json({
    success: true,
    reviews: review,
    message: 'All reviews found',
  })
}

exports.postReview = async (req, res) => {
  const { doctorGMCNumber, patientNHSNumber, values } = req.body
  const {
    communication,
    bedsideManner,
    officeEnvironment,
    waitTime,
    professionalism,
    treatmentSatisfaction,
    title,
    description,
  } = values

  try {
    const overallRating =
      (communication +
        bedsideManner +
        officeEnvironment +
        waitTime +
        professionalism +
        treatmentSatisfaction) /
      6

    const review = await ReviewService.createReview({
      doctorGMCNumber,
      patientNHSNumber,
      comment: description,
      reviewTitle: title,
      date: Date.now(),
      rating: overallRating,
      reviewScores: {
        communication,
        bedsideManner,
        officeEnvironment,
        waitTime,
        professionalism,
        treatmentSatisfaction,
      },
    })

    if (!review) {
      return res.status(400).json({
        success: false,
        message: 'Could not post review',
      })
    }

    return res.status(200).json({
      success: true,
      review: review,
      message: 'Review posted',
    })
  } catch (error) {
    console.error('Error posting review:', error)
    return res.status(500).json({
      success: false,
      message:
        'An error occurred while posting the review. Please try again later.',
    })
  }
}

exports.getReviewById = async (req, res) => {
  const { reviewId } = req.params

  const review = await ReviewService.getReviewById(reviewId)

  if (!review) {
    return res.status(400).json({
      success: false,
      message: 'Could not get review',
    })
  }

  return res.status(200).json({
    success: true,
    review: review,
    message: 'Review found',
  })
}

exports.updateReviewById = async (req, res) => {
  const { reviewId } = req.params
  const { values } = req.body

  const {
    communication,
    bedsideManner,
    officeEnvironment,
    waitTime,
    professionalism,
    treatmentSatisfaction,
    title,
    description,
  } = values

  const overallRating =
    (communication +
      bedsideManner +
      officeEnvironment +
      waitTime +
      professionalism +
      treatmentSatisfaction) /
    6

  const review = await ReviewService.findIdAndUpdateReview({
    reviewId,
    comment: description,
    reviewTitle: title,
    date: Date.now(),
    rating: overallRating,
    reviewScores: {
      communication,
      bedsideManner,
      officeEnvironment,
      waitTime,
      professionalism,
      treatmentSatisfaction,
    },
  })

  if (!review) {
    return res.status(400).json({
      success: false,
      message: 'Could not update review',
    })
  }

  return res.status(200).json({
    success: true,
    review: review,
    message: 'Review updated',
  })
}

exports.postResponse = async (req, res) => {
  const { reviewId } = req.params
  const { values } = req.body

  const response = await ReviewService.findIdAndUpdateResponse({
    reviewId,
    values,
  })

  if (!response) {
    return res.status(400).json({
      success: false,
      message: 'Could not post response',
    })
  }

  return res.status(200).json({
    success: true,
    response: response,
    message: 'Response posted',
  })
}

exports.deleteReviewbyId = async (req, res) => {
  const { reviewId } = req.params
  console.log('reviewId==>', reviewId)

  const review = await ReviewService.findIdAndDeleteReview(reviewId)
  console.log('review==>', review)

  if (!review) {
    return res.status(400).json({
      success: false,
      message: 'Could not delete review',
    })
  }

  return res.status(200).json({
    success: true,
    review: review,
    message: 'Review deleted',
  })
}

exports.getAllReviewsByPatient = async (req, res) => {
  const { patientNHSNumber } = req.params

  try {
    const reviews = await ReviewService.getAllReviewsById({
      patientNHSNumber: patientNHSNumber,
    })

    if (!reviews || reviews.length === 0) {
      return res.status(200).json({
        success: true,
        reviews: [],
        message: 'No reviews found for this patient',
      })
    }

    return res.status(200).json({
      success: true,
      reviews: reviews,
      message: 'All reviews found',
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return res.status(500).json({
      success: false,
      message: 'An error occurred while fetching reviews',
    })
  }
}

