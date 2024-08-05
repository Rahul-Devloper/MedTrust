const Review = require('../models/review')
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
}
