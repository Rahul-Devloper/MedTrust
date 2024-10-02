const Review = require('../models/review')

class ReviewService {
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

  static getReviewById = async (reviewId) => {
    try {
      const review = await Review.findById(reviewId)
      return review
    } catch (error) {
      throw error
    }
  }

  static findIdAndUpdateResponse = async ({ reviewId, values }) => {
    try {
      const { isResponse = true } = values
      console.log('isResponse==>', isResponse)
      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        {
          response: values?.response,
          responseDate: new Date(),
          isResponse: isResponse,
        },
        { new: true } // Return the updated document
      )
      return updatedReview
    } catch (error) {
      throw error
    }
  }

  static async findIdAndUpdateReview({ reviewId, ...updateFields }) {
    try {
      const updatedReview = await Review.findByIdAndUpdate(
        reviewId,
        { $set: updateFields },
        { new: true, runValidators: true } // Options to return the updated document and run validation
      )
      return updatedReview
    } catch (error) {
      throw error
    }
  }

  static async findIdAndDeleteReview(reviewId) {
    try {
      const deletedReview = await Review.findByIdAndDelete(reviewId)
      return deletedReview
    } catch (error) {
      throw error
    }
  }
}



module.exports = ReviewService
