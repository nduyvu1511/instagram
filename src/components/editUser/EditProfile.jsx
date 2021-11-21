import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchEditUser } from "../../features/userSlice"
import Message from "../messages/Message"

const EditProfile = () => {
  
  const dispatch = useDispatch()
  const editStatus = useSelector((state) => state.user.editStatus)
  const { data: loggedUser } = useSelector((state) => state.user.loggedUser)
  const [name, setName] = useState(loggedUser.name)
  const [description, setDescription] = useState(loggedUser.description)
  const [userName, setUserName] = useState(loggedUser.user_name)
  const [gender, setGender] = useState(loggedUser.gender)
  const [isEdit, setEdit] = useState(false)
  const [openGenderOption, setOpenGenderOption] = useState(false)

  useEffect(() => {
    loggedUser && Object.keys(loggedUser).length > 0 && setName(loggedUser.name)
    setDescription(loggedUser.description)
    setUserName(loggedUser.user_name)
    setGender(loggedUser.gender)
  }, [loggedUser])

  useEffect(() => {
    if (
      name !== loggedUser.name ||
      description !== loggedUser.description ||
      userName !== loggedUser.user_name ||
      gender !== loggedUser.gender
    ) {
      setEdit(true)
    } else {
      setEdit(false)
    }
  }, [name, description, gender, userName, loggedUser])

  const handleEditUser = () => {
    if (description.length > 150) return

    if (loggedUser?._id) {
      const formData = { name, user_name: userName, description, gender }
      dispatch(fetchEditUser({ id: loggedUser._id, formData }))
    }
  }

  return (
    <section className="min-h-400">
      {loggedUser && Object.keys(loggedUser).length > 0 && (
        <>
          <div className="flex mb-6 md:mb-4 items-center">
            <div className="md:w-4/12 md:mr-10">
              <img
                className="w-10 h-10 ml-auto rounded-full object-cover"
                src={loggedUser.avatar}
                alt=""
              />
            </div>
            <div className="ml-4 md:ml-0 md:w-8/12">
              <p className="text-lg font-medium">{loggedUser.user_name}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="font-semibold text-left md:text-right mb-2 md:mb-0">
                Tên
              </p>
            </div>
            <div className="w-full md:w-8/12">
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Tên"
                className="border-borderColor border w-full px-2 py-1 rounded-sm"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="font-semibold text-left md:text-right mb-2 md:mb-0">
                Tên người dùng
              </p>
            </div>
            <div className="w-full md:w-8/12">
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                type="text"
                placeholder="Tên người dùng"
                className="border-borderColor border w-full px-2 py-1 rounded-sm"
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="font-semibold text-left md:text-right mb-2 md:mb-0">
                Tiểu sử
              </p>
            </div>
            <div className="w-full md:w-8/12">
              <textarea
                name=""
                id=""
                cols="30"
                rows="3"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border border-borderColor w-full p-2 rounded-sm"
              ></textarea>
            </div>
          </div>
          <div className="flex flex-col md:flex-row mb-6 md:mb-4">
            <div className="w-full md:w-4/12 md:mr-10">
              <p className="font-semibold text-left md:text-right mb-2 md:mb-0">
                Giới tính
              </p>
            </div>
            <div className="w-full md:w-8/12">
              <input
                onFocus={() => setOpenGenderOption(true)}
                value={gender ? "Nam" : "Nữ"}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder={""}
                className="border-borderColor border w-full px-2 py-1 rounded-sm"
              />
            </div>
          </div>
          <div className="flex">
            <div className="w-4/12"></div>
            <div className="w-8/12" />
            <button
              onClick={handleEditUser}
              className={`btn px-2 ${
                isEdit
                  ? "pointer-events-auto opacity-100"
                  : "pointer-events-none opacity-50"
              }`}
            >
              Gửi
            </button>
          </div>
        </>
      )}
      {openGenderOption && (
        <div className="modal">
          <div
            onClick={() => setOpenGenderOption(false)}
            className="overlay"
          ></div>
          <div className="pb-5 rounded-lg bg-white z-1 w-400">
            <h3 className="py-5 border-b px-5">Giới tính</h3>
            <div className="px-5">
              <div className="mt-4 flex items-center">
                <input
                  onChange={() => setGender(true)}
                  checked={gender}
                  type="radio"
                  name="gender"
                  id="male"
                  className="transform scale-125 mr-3"
                />
                <label
                  htmlFor="male"
                  className="w-full inline-block cursor-pointer font-medium"
                >
                  Nam
                </label>
              </div>
              <div className="mt-3 flex items-center">
                <input
                  onChange={() => setGender(false)}
                  checked={!gender}
                  type="radio"
                  name="gender"
                  id="female"
                  className="transform scale-125 mr-3"
                />
                <label
                  htmlFor="female"
                  className="w-full inline-block cursor-pointer font-medium"
                >
                  Nữ
                </label>
              </div>
            </div>
          </div>
        </div>
      )}

      {editStatus && <Message message={editStatus} />}
    </section>
  )
}

export default EditProfile
