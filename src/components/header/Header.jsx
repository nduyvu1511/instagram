import React, { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import icon from "../../public/icon/instagram-icon.png"
import { FiSearch } from "react-icons/fi"
import Navbar from "./Navbar"
import { photoIcon, userIcon } from "./../../public/icon/icons"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchUsers, handleSearchUser } from "../../features/userSlice"
import SearchResults from "../search/SearchResults"
import { openCreatePostModal } from "../../features/createPostSlice"

const Header = () => {
  
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.searchUsers)
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const [isOpenSearchBar, setOpenSearchBar] = useState(false)
  const searchBarRef = useRef()
  const [searchValue, setSearchValue] = useState("")
  const [breakpoints, setBreakpoints] = useState(window.innerWidth)

  useEffect(() => {
    dispatch(handleSearchUser({ searchValue }))
  }, [searchValue, dispatch])

  useEffect(() => {
    const getClientWidth = () => setBreakpoints(window.innerWidth)

    window.addEventListener("resize", getClientWidth)

    return () => {
      window.removeEventListener("resize", getClientWidth)
    }
  }, [])

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        isOpenSearchBar &&
        searchBarRef.current &&
        !searchBarRef.current.contains(e.target)
      ) {
        setOpenSearchBar(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isOpenSearchBar])

  useEffect(() => {
    dispatch(fetchSearchUsers())
  }, [dispatch])

  return (
    <>
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <header className="bg-white py-2 h-11 md:h-54 flex items-center border-b border-borderColor z-999 fixed top-0 left-0 right-0">
          <nav className="max-w-936 w-full px-6 md:px-5 lg:px-0 mx-auto flex justify-between items-center">
            <div className="flex items-center md:hidden">
              <button
                className="md:hidden"
                onClick={() => dispatch(openCreatePostModal())}
              >
                {photoIcon()}
              </button>
            </div>
            <div className="">
              <Link to="/">
                <img src={icon} alt="" />
              </Link>
            </div>
            <div className="hidden md:block relative">
              <form className="relative">
                <input
                  ref={searchBarRef}
                  onClick={() => setOpenSearchBar(true)}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={`border outline-none font-light w-56 text-sm border-gray-200 rounded-2 h-7
              ${
                isOpenSearchBar
                  ? "text-left pl-4 text-gray-700"
                  : "text-center text-gray-500"
              }`}
                  type="text"
                  placeholder="Tìm kiếm"
                />
                {!isOpenSearchBar && (
                  <FiSearch className="absolute top-1/2 text-gray-500 text-xs transform -translate-y-1/2 left-1/4" />
                )}
              </form>
              {searchValue && isOpenSearchBar && (
                <div
                  ref={searchBarRef}
                  className="absolute shadow-md h-350 overflow-y-scroll rounded-sm bg-white w-400 p-5 -left-1/2 transform "
                >
                  <SearchResults
                    setOpenSearch={() => setOpenSearchBar(false)}
                    users={users}
                  />
                </div>
              )}
            </div>

            <div className="block md:hidden">
              <Link to="/explore/people">{userIcon()}</Link>
            </div>

            <Navbar breakpoints={breakpoints} loggedUser={loggedUser} />
          </nav>
        </header>
      )}
    </>
  )
}

export default Header
