import React, { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import { useHistory, useLocation } from "react-router"
import {
  addIcon,
  exploreActiveIcon,
  exploreIcon,
  heartIcon,
  homeActiveIcon,
  homeIcon,
  personalIcon,
  searchActiveIcon,
  searchIcon,
  settingIcon,
  switchIcon,
} from "../../public/icon/icons"
import "../../index.css"
import { logout } from "../../features/authenticationSlice"
import { useDispatch } from "react-redux"
import { openCreatePostModal } from "../../features/createPostSlice"

const Navbar = ({ loggedUser }) => {
  const location = useLocation()
  const [isOpenOption, setOpenOption] = useState(false)
  const optionRef = useRef()
  const buttonOptionRef = useRef()
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = () => {
    history.push("/login")
    dispatch(logout())
  }

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpenOption &&
        optionRef.current &&
        buttonOptionRef.current &&
        !buttonOptionRef.current.contains(e.target) &&
        !optionRef.current.contains(e.target)
      ) {
        setOpenOption(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpenOption])
  return (
    <div className="fixed bottom-0 right-0 left-0 md:static bg-white md:bg-transparent z-1000 ins:z-0 border-t border-borderColor ins:border-0">
      <ul className="flex items-center py-2 px-4 md:p-4 md:pr-0">
        <li className="flex-1 flex justify-center md:flex-auto ">
          <Link to="/">
            {location.pathname === "/" ? homeActiveIcon() : homeIcon()}
          </Link>
        </li>
        <li className="flex-1 flex md:hidden ml-3 justify-center md:flex-auto ">
          <Link to="/explore">
            {location.pathname.startsWith("/explore")
              ? searchActiveIcon()
              : searchIcon()}
          </Link>
        </li>
        <li className="flex-1 flex justify-center md:flex-auto ml-3 md:ml-5">
          <button onClick={() => dispatch(openCreatePostModal())}>
            {addIcon()}
          </button>
        </li>
        <li className="flex-1 hidden md:flex justify-center md:flex-auto ml-3 md:ml-5">
          <Link to="/explore">
            {location.pathname.startsWith("/explore")
              ? exploreActiveIcon()
              : exploreIcon()}
          </Link>
        </li>
        <li className="flex-1 flex justify-center md:flex-auto ml-3 md:ml-5 items-center relative">
          <div className={`relative top-1px`}>
            <button
              ref={buttonOptionRef}
              onClick={() => setOpenOption(!isOpenOption)}
            >
              <Link
                to={`/user/${loggedUser._id}`}
                className="pointer-events-auto md:pointer-events-none"
              >
                <div
                  className={`w-26 h-26 rounded-full flex items-center justify-center ${
                    location.pathname.startsWith(`/user/${loggedUser._id}`) ||
                    isOpenOption
                      ? "border border-black"
                      : ""
                  }`}
                >
                  {" "}
                  <img
                    src={loggedUser?.avatar && loggedUser.avatar}
                    className={`w-22 h-22 rounded-full object-cover`}
                    alt=""
                  />
                </div>
              </Link>
            </button>
            {isOpenOption && (
              <div
                ref={optionRef}
                className={`absolute top-42 shadow-md z-50 right-0 bg-white w-52 transition-all`}
              >
                <ul>
                  <li className="">
                    <div className="flex items-center text-sm font-normal p-3">
                      {personalIcon()}{" "}
                      {loggedUser?._id && (
                        <Link
                          onClick={() => setOpenOption(false)}
                          to={`/user/${loggedUser._id}`}
                          className="ml-4 w-full h-full"
                        >
                          Trang cá nhân
                        </Link>
                      )}
                    </div>
                  </li>
                  <li className="">
                    <Link
                      onClick={() => setOpenOption(false)}
                      className="w-full h-full flex items-center text-sm font-normal p-3"
                      to="/accounts/edit"
                    >
                      {settingIcon()} <span className="ml-4">Cài đặt</span>
                    </Link>
                  </li>
                  <li className="">
                    <Link
                      onClick={() => setOpenOption(false)}
                      className="w-full h-full flex items-center text-sm font-normal p-3"
                      to="/login"
                    >
                      {switchIcon()}{" "}
                      <span className="ml-4">Chuyển tài khoản</span>
                    </Link>
                  </li>
                  <li className="border-t p-3 text-left">
                    <button
                      onClick={() => {
                        handleLogout()
                        setOpenOption(false)
                      }}
                      className="text-sm font-normal text-left w-full h-full"
                    >
                      Đăng xuất
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </li>
      </ul>
    </div>
  )
}

export default Navbar
