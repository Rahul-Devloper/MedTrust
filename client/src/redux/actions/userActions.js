import { saveImageUrl } from '../../api/user'
import { ErrorNotification, SuccessNotification } from '../../components'
import { ACTION_TYPES } from '../constants/actionTypes'

export const saveImageToUserProfile =
  (
    { downloadURL, userId, setOk, role, number } //physicianId is gmcNumber
  ) =>
  async (dispatch) => {
    // Dispatch a loading alert
    dispatch({
      type: ACTION_TYPES.ALERT,
      payload: { loading: true },
    })

    try {
      // Fetch response from server
      const res = await saveImageUrl(downloadURL, userId, role, number)
      console.log('getReviewsAction==>', res)

      // Dispatch a success/error login notify
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: res?.data?.message,
          user: res?.data,
        },
      })
      if (res?.data?.ImgUrl) {
        dispatch({
          type: ACTION_TYPES.ALERT,
          payload: {
            message: 'Image Upload success',
            user: res?.data,
          },
        })
        SuccessNotification('Image updated successfully')

        setOk(true)
        return res?.data
      } else {
        throw new Error('Image not updated')
      }
    } catch (error) {
      ErrorNotification(error?.response?.data?.message)
      // data.setLoading(false)
      // Dispatch a error alert
      dispatch({
        type: ACTION_TYPES.ALERT,
        payload: {
          message: error.response.data?.message,
        },
      })
    }
  }
