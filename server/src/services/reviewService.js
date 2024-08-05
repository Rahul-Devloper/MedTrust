const Review = require('../models/review')

class ReviewService {
  // Find if signing up doctor exists in NHS doctorRecord Database before signing up.
  static getAllReviewsById = async (query) => {
    try {
      const reviewData = await Review.find(query).sort('-date').exec()

      return reviewData
    } catch (error) {
      throw error
    }
  }

  static createReview = async (reviewData) => {
    try {
      const review = new Review(reviewData)
      await review.save()

      return review
    } catch (error) {
      throw error
    }
  }
}

module.exports = ReviewService
