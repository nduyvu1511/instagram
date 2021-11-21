import "../index.css"
import React, { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { fetchAllPosts } from "../features/postSlice"
import { useSelector } from "react-redux"
import { FiSearch } from "react-icons/fi"
import { fetchSearchUsers, handleSearchUser } from "../features/userSlice"
import SearchResults from "../components/search/SearchResults"

const Search = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.searchUsers)
  const [searchValue, setSearchValue] = useState("")
  const [isInputFocus, setInputFocus] = useState(false)
  useEffect(() => {
    dispatch(handleSearchUser({ searchValue }))
  }, [searchValue, dispatch])

  useEffect(() => {
    dispatch(fetchSearchUsers())
  }, [dispatch])
  // const [isOpen]
  useEffect(() => {
    dispatch(fetchAllPosts())
  }, [dispatch])
  return (
    <section className="layout py-2 mt-54 md:py-8 px-0 auto-rows-min">
      <div className="flex items-center md:hidden fixed top-0 left-0 right-0 h-54 px-4 bg-white z-999">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => setInputFocus(true)}
          onBlur={() => setInputFocus(false)}
          type="text"
          className={`w-full outline-none border rounded-4 h-8 text-gray-600 pl-6 text-sm font-normal `}
          placeholder=""
        />
        <div
          className={`absolute text-xs text-gray-500 flex items-center transition-all pointer-events-none ${
            isInputFocus ? "ml-2" : "ml-40"
          }`}
        >
          <FiSearch className="mr-2" />
          {searchValue === "" && <p>Tìm kiếm</p>}
        </div>
      </div>
      <div className="px-4">
        {searchValue && <SearchResults users={users} />}
      </div>
    </section>
  )
}

export default Search
