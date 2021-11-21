import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useHistory } from "react-router"
import AuthenForm from "../components/authentication/AuthenForm"
import { logInSchema } from "../components/authentication/schema"
import { deleteErrorMessage, fetchLogin } from "../features/authenticationSlice"
import mobilePhone from "../public/img/mobile.png"

const LoginPage = () => {
  
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.auth.isAuth)
  const history = useHistory()

  useEffect(() => {
    dispatch(deleteErrorMessage())
  }, [dispatch])

  useEffect(() => {
    if (isAuth) {
      history.push("/")
    }
  }, [history, isAuth])

  const handleSubmitForm = async (formData) => {
    dispatch(fetchLogin(formData))
  }

  return (
    <div className="py-6 mt-54">
      <div className="grid grid-cols-1 gap-6 ins:grid-cols-2 mx-auto w-full ins:w-750">
        <div className="hidden ins:flex justify-end">
          <img className="transform" src={mobilePhone} alt="" />
        </div>
        <div className="mt-6 w-350 mx-auto">
          <AuthenForm
            handleSubmitForm={handleSubmitForm}
            schema={logInSchema}
            type="login"
          />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
