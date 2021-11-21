import React from "react"
import { BsChevronLeft } from "react-icons/bs"
import { useHistory } from "react-router"

const NavMobile = ({ title }) => {
  const history = useHistory()
  return (
    <header className="fixed px-5 top-0 right-0 left-0 bg-white h-11 z-1000 border-b border-borderColor flex md:hidden items-center justify-between">
      <button onClick={() => history.goBack()}>
        <BsChevronLeft className="text-2xl" />
      </button>
      <p className="text-base font-medium">{title}</p>
      <span></span>
    </header>
  )
}

export default NavMobile
