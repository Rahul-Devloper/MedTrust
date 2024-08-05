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
