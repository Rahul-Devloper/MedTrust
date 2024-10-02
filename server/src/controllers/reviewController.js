const Review = require('../models/review')
const AppointmentService = require('../services/appointmentService')
const DoctorRecordService = require('../services/doctorRecordService')
const ReviewService = require('../services/reviewService')
const UserService = require('../services/userService')
const sendEmail = require('../utils/sendEmail') // Utility to send OTP email

/**********************************
  Check if user is a member
***********************************/

// A reusable function to calculate the average rating and update the doctor's profile
async function updateDoctorAverageRating(doctorGMCNumber) {
  try {
    // Fetch all reviews for the doctor
    const allReviews = await ReviewService.getAllReviewsById({
      doctorGMCNumber,
    })

    // Check if there are any reviews
    if (!allReviews || allReviews.length === 0) {
      console.log('No reviews found')
      return null // or handle this case as needed
    }

    // Calculate the average rating
    const totalReviews = allReviews.length
    const averageRating =
      allReviews.reduce((acc, review) => acc + review.rating, 0) / totalReviews

    console.log('Average Rating==>', averageRating)

    // Update the doctor's overall effectiveness rating
    const updatedDoctor = await DoctorRecordService.findOneUserAndUpdate(
      { gmcNumber: doctorGMCNumber },
      { 'ratings.overallEffectiveness': averageRating }
    )

    if (!updatedDoctor) {
      console.error('Doctor not found or update failed')
      return null
    }

    return updatedDoctor
  } catch (error) {
    console.error('Error updating doctor rating:', error)
    throw error
  }
}

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

    // Update doctor's rating using the reusable function
    const updatedDoctor = await updateDoctorAverageRating(doctorGMCNumber)

    if (!updatedDoctor) {
      console.error('Doctor not found or update failed')
    }
    const user = await UserService.findOneUser({ gmcNumber: doctorGMCNumber })

    if (!user) {
      console.error('User not found - Email not sent')
    } else {
      await sendEmail(
        user,
        `A review has been posted for you by NHS number: ${patientNHSNumber}. </br> Please check your review page and respond to the constructive review.`
      )
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
  const updatedDoctor = await updateDoctorAverageRating(review?.doctorGMCNumber)

  if (!updatedDoctor) {
    console.error('Doctor not found or update failed')
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
  const user = await UserService.findOneUser({
    nhsNumber: response?.patientNHSNumber,
  })

  if (!user) {
    console.error('User not found - Email not sent')
  } else {
    await sendEmail(
      user,
      `A response has been posted for your review. </br> Please check your review page `
    )
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
  // Update doctor's rating using the reusable function
  const updatedDoctor = await updateDoctorAverageRating(review?.doctorGMCNumber)

  if (!updatedDoctor) {
    console.error('Doctor not found or update failed')
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

