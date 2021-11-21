import React from "react"
import { AiOutlineGoogle } from "react-icons/ai"
import { Link } from "react-router-dom"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import { checkIcon, invalidIcon } from "../../public/icon/icons"
import { GoogleLogin } from "react-google-login"
import { useDispatch, useSelector } from "react-redux"
import { fetchLogin } from "../../features/authenticationSlice"
import logo from "../../public/icon/instagram-icon.png"

const AuthenForm = ({ type, schema, handleSubmitForm }) => {
  const dispatch = useDispatch()

  const errorMessage = useSelector((state) => state.auth.errorMessage)

  const formSession =
    JSON.parse(window.sessionStorage.getItem("authForm")) || []

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  })

  const submitForm = (data) => {
    window.sessionStorage.setItem("authForm", JSON.stringify(data))
    handleSubmitForm && handleSubmitForm(data)
  }

  const googleSuccess = async (res) => {
    await dispatch(
      fetchLogin({ tokenId: res?.tokenId, email: res?.profileObj?.email })
    )
  }
  const googleFailure = () => {
    console.log("failure")
  }

  return (
    <div className="w-full">
      <div className="rounded-2 border py-7 px-9">
        <div className="text-center">
          <img
            src={logo}
            className={`mx-auto w-40 ${type === "login" && "mb-8"}`}
            alt=""
          />
        </div>
        {type === "register" && (
          <>
            {" "}
            <h1 className="text-center text-17 my-3 font-semibold text-gray-400">
              Đăng ký để xem ảnh và video từ bạn bè.
            </h1>
            <GoogleLogin
              clientId="218340770121-6jjg4paqbo1koqptr09lmu4dbkr3fi1v.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              render={(renderProps) => (
                <button
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  cookiepolicy="userId"
                  className="w-full btn"
                >
                  <AiOutlineGoogle className="text-lg mr-3" />
                  <span>Đăng nhập bằng Google</span>
                </button>
              )}
            />
            <div className="flex items-center my-4">
              <div className="flex-1 border-t border-borderColor"></div>
              <span className="mx-4 font-medium uppercase text-gray-500 text-sm">
                Hoặc
              </span>
              <div className="border-t flex-1 border-borderColor"></div>
            </div>
          </>
        )}
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="relative mb-2">
            <input
              className="w-full outline-none rounded-2 border px-3 py-2 text-xs pr-11"
              type="text"
              {...register("email")}
              placeholder="Email"
              defaultValue={formSession?.email && formSession.email}
            />
            {errors.email ? invalidIcon : checkIcon}
          </div>
          {type === "register" && (
            <>
              <div className="relative mb-2">
                <input
                  className="w-full outline-none rounded-2 border px-3 py-2 text-xs pr-11"
                  type="text"
                  defaultValue={formSession?.name && formSession.name}
                  {...register("name")}
                  placeholder="Tên đầy đủ"
                />
                {errors.name ? invalidIcon : checkIcon}
              </div>
              <div className="relative mb-2">
                <input
                  className="w-full outline-none rounded-2 border px-3 py-2 text-xs pr-11"
                  type="text"
                  {...register("user_name")}
                  placeholder="Tên người dùng"
                  defaultValue={formSession?.user_name && formSession.user_name}
                />
                {errors.user_name ? invalidIcon : checkIcon}
              </div>
            </>
          )}
          <div className="relative mb-2">
            <input
              className="w-full outline-none rounded-2 border px-3 py-2 text-xs pr-11"
              type="password"
              {...register("password")}
              placeholder="Mật khẩu"
              defaultValue={formSession?.password && formSession.password}
            />
            {errors.password ? invalidIcon : checkIcon}
          </div>
          {type === "login" && (
            <>
              <div className="my-3">
                <button
                  className={`btn w-full justify-center my-2 ${
                    Object.keys(errors)?.length > 0
                      ? "bg-btnDisableColor cursor-auto"
                      : "bg-btnColor cursor-pointer"
                  }`}
                >
                  Đăng Nhập
                </button>
              </div>
              <div className="flex items-center my-4">
                <div className="flex-1 border-t border-borderColor"></div>
                <span className="mx-4 font-medium uppercase text-gray-500 text-sm">
                  Hoặc
                </span>
                <div className="border-t flex-1 border-borderColor"></div>
              </div>
              <GoogleLogin
                clientId="218340770121-6jjg4paqbo1koqptr09lmu4dbkr3fi1v.apps.googleusercontent.com"
                onSuccess={googleSuccess}
                onFailure={googleFailure}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    cookiepolicy="userId"
                    className="w-full flex items-center text-textBlue2 justify-center mt-5 mb-2 text-13 font-medium"
                  >
                    <AiOutlineGoogle className="text-lg mr-3" />
                    <span>Đăng nhập bằng Google</span>
                  </button>
                )}
              />
              {errorMessage && type === "login" && (
                <p className="text-center text-13 font-normal text-red-500">
                  {errorMessage}
                </p>
              )}
            </>
          )}
          {type === "register" && (
            <div>
              <button
                className={`btn w-full justify-center mt-2 ${
                  Object.keys(errors)?.length > 0
                    ? "bg-btnDisableColor cursor-auto"
                    : "bg-btnColor cursor-pointer"
                }`}
              >
                Đăng ký
              </button>
            </div>
          )}
          {errorMessage && type === "register" && (
            <p className="text-center text-13 font-normal mt-2 text-red-500">
              {errorMessage}
            </p>
          )}
          {type === "register" && (
            <p className="text-gray-500 text-xs font-normal text-center mt-4">
              Bằng cách đăng ký, bạn đồng ý với Điều khoản,{" "}
              <span className="text-gray-600 font-medium">
                Chính sách dữ liệu
              </span>{" "}
              và{" "}
              <span className="text-gray-600 font-medium">
                Chính sách cookie{" "}
              </span>
              của chúng tôi.
            </p>
          )}
        </form>
      </div>

      <div className="py-5 px-9 border rounded-2 mt-3">
        <p className="text-sm text-center">
          {type === "register"
            ? "Bạn đã có tài khoản?"
            : "Bạn chưa có tài khoản ư?"}
          <Link
            to={`/${type === "login" ? "register" : "login"}`}
            className="text-textBlue font-semibold"
          >
            {type === "login" ? " Đăng ký" : " Đăng nhập"}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default AuthenForm
