import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import {
  deleteChangePasswordMessage,
  editChangePasswordMessage,
  fetchChangePassword,
} from "../../features/authenticationSlice"
import Message from "../messages/Message"
import { deleteEditStatus } from "../../features/userSlice"

const ChangePassword = () => {
  
  const dispatch = useDispatch()
  const changePasswordMessage = useSelector(
    (state) => state.auth.changePasswordMessage
  )
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currentPassword, setCurrentPassword] = useState(
    loggedUser.password === "Uiklsjdflksjd@33" ? "Uiklsjdflksjd@33" : ""
  )

  const handleChangePassword = () => {
    dispatch(deleteChangePasswordMessage())
    const regex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
    if (!regex.test(currentPassword)) {
      dispatch(
        editChangePasswordMessage({
          message:
            "Mật khẩu phải có ít nhất 8 ký tự, chữ số, ký tự in hoa và ký tự đặc biệt",
        })
      )
      return
    }

    if (confirmPassword !== newPassword) {
      dispatch(
        editChangePasswordMessage({
          message: "Vui lòng đảm bảo cả 2 mật khẩu khớp nhau",
        })
      )
      return
    }

    if (!regex.test(newPassword)) {
      dispatch(
        editChangePasswordMessage({
          message:
            "Mật khẩu tạo mới phải có ít nhất 8 ký tự, chữ số, ký tự in hoa và ký tự đặc biệt",
        })
      )
      return
    }

    dispatch(
      fetchChangePassword({ id: loggedUser._id, newPassword, currentPassword })
    )
  }

  useEffect(() => {
    dispatch(deleteEditStatus())
  })

  return (
    <>
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <>
          <div className="flex items-center mb-6 md:mb-4">
            <div className="w-10 md:w-4/12 mr-4 md:mr-10">
              <img
                src={loggedUser.avatar}
                className="md:w-10 h-10 rounded-full object-cover ml-auto"
                alt=""
              />
            </div>
            <div className="w-8/12">nduyvu1511</div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="text-left md:text-right font-medium">Mật khẩu cũ</p>
            </div>
            <div className="w-full md:w-8/12">
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="border border-borderColor w-full p-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="text-left md:text-right font-medium">
                Mật khẩu mới
              </p>
            </div>
            <div className="w-full md:w-8/12">
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="border border-borderColor w-full p-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="text-left md:text-right font-medium">
                Xác nhận mật khẩu mới
              </p>
            </div>
            <div className="w-full md:w-8/12">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="border border-borderColor w-full p-2 rounded-md"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-4/12 mr-10"></div>
            <div className="w-8/12">
              <button
                onClick={handleChangePassword}
                className={`btn px-3 rounded-sm ${
                  !newPassword || !confirmPassword
                    ? "pointer-events-none opacity-50"
                    : "pointer-events-auto opacity-100"
                }`}
              >
                Đổi mật khẩu
              </button>
            </div>
          </div>
        </>
      )}

      {changePasswordMessage && <Message message={changePasswordMessage} />}
    </>
  )
}

export default ChangePassword
