import React from "react"
import { Link } from "react-router-dom"

const datas = [
  "Giới thiệu",
  "trợ giúp",
  "báo chí",
  "api",
  "việc làm",
  " quyền riêng tư",
  "điều khoản",
  "vị trí",
  "tài khoản liên quan nhất",
  "hashtag",
  "ngôn ngữ",
]

const Footer = () => {
  return (
    <footer className="bg-white mt-4 md:mt-0 mb-11 md:mb-0">
      <div className="layout py-2">
        <div className="max-w-350 mx-auto">
          <ul className="text-center">
            {datas.map((item, index) => (
              <Link
                key={index}
                to="/"
                className="mr-3 text-footerColor uppercase text-xs font-medium"
              >
                {item}
              </Link>
            ))}
          </ul>
          <p className="text-xs uppercase text-textColor text-center my-2">
            &copy; 2021 instagram from facebook
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
