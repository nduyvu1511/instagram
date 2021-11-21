import React, { useState } from "react"
import EditProfile from "../components/editUser/EditProfile"
import NavMobile from "../components/header/NavMobile"
import ChangePassword from "./../components/editUser/ChangePassword"

const EditAccount = () => {
  
  const [tab, setTab] = useState(false)

  return (
    <section className="mt-54 layout py-8">
      <NavMobile title="Chỉnh sửa trang cá nhân" />
      <section className="grid grid-cols-6 md:border border-borderColor">
        <div className="col-span-6 md:col-span-2 md:border-r border-borderColor">
          <div
            onClick={() => setTab(false)}
            className={`px-5 py-4 cursor-pointer -ml-1px ${
              !tab ? "border-l-2 border-black font-semibold" : "font-normal"
            }`}
          >
            Chỉnh sửa trang cá nhân
          </div>
          <div
            onClick={() => setTab(true)}
            className={`px-5 py-4 cursor-pointer -ml-1px ${
              tab ? "border-l-2 border-black font-semibold" : "font-normal"
            }`}
          >
            Đổi mật khẩu
          </div>
        </div>
        <div className="col-span-6 md:col-span-4 py-5 md:px-10 min-h-400 mt-4 md:mt-0 border-t md:border-t-0">
          {!tab ? (
            <EditProfile />
          ) : (
            <>
              <ChangePassword />
            </>
          )}
        </div>
      </section>
    </section>
  )
}

export default EditAccount
