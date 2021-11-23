import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <section className="mt-20 text-center">
      <h1 className="text-2xl font-semibold">
        Rất tiếc, trang này hiện không khả dụng.
      </h1>
      <p className="mt-6">
        Liên kết bạn theo dõi có thể bị hỏng hoặc trang này có thể đã bị gỡ.
        <Link to="/" className="text-textBlue2">
          {" "}
          Quay lại Instagram
        </Link>
        .
      </p>
    </section>
  )
}

export default NotFound
