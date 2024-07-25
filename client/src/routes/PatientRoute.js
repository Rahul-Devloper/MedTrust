import React, { useState, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LoadingToRedirect } from '../components'
import VerticalLayout from '../layouts/VerticalLayout'
import { useDispatch } from 'react-redux'
import { isPatientAction } from '../redux/actions/authActions'

const PatientRoute = ({ children, ...restProps }) => {
  const dispatch = useDispatch()
  const [ok, setOk] = useState(false)

  // Check if current user is a patient
  useEffect(() => {
    dispatch(isPatientAction({ setOk }))
  }, [])

  return (
    <>
      {ok ? (
        <VerticalLayout>
          <Route {...restProps} render={children} />
        </VerticalLayout>
      ) : (
        <LoadingToRedirect />
      )}
    </>
  )
}

export default PatientRoute
