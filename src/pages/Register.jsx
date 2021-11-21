import React, { useEffect } from "react"
import AuthenForm from "../components/authentication/AuthenForm"
import { signUpSchema } from "../components/authentication/schema"
import mobilePhone from "../public/img/mobile.png"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteErrorMessage,
  fetchRegister,
} from "../features/authenticationSlice"
import { useHistory } from "react-router"
const RegisterPage = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  
  useEffect(() => {
    dispatch(deleteErrorMessage())
  }, [dispatch])

  useEffect(() => {
    if (isAuth) {
      history.push("/explore/people")
    }
  }, [history, isAuth])

  const handleSubmitForm = (data) => {
    if (data) {
      dispatch(fetchRegister(data))
    }
  }

  return (
    <div className="py-6 mt-54">
      <div className="grid grid-cols-1 gap-6 ins:grid-cols-2 mx-auto w-full ins:w-750">
        <div className="hidden ins:block">
          <img src={mobilePhone} alt="" />
        </div>
        <div className="w-350 mx-auto">
          <AuthenForm
            schema={signUpSchema}
            handleSubmitForm={handleSubmitForm}
            type="register"
          />
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
