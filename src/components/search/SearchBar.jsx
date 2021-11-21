import React, { useEffect, useState } from "react"
import { FiSearch } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { fetchSearchUsers, handleSearchUser } from "../../features/userSlice"
import SearchResults from "./SearchResults"

const SearchBar = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.user.searchUsers)
  const [searchValue, setSearchValue] = useState("")
  useEffect(() => {
    dispatch(handleSearchUser({ searchValue }))
  }, [searchValue, dispatch])

  useEffect(() => {
    dispatch(fetchSearchUsers())
  }, [dispatch])
  return (
    <section className="">
      <div className="flex items-center justify-center md:hidden fixed top-0 left-0 right-0 h-54 px-4 bg-white z-999">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          type="text"
          className="w-full outline-none border rounded-4 h-8 text-gray-600 text-sm font-normal text-center"
          placeholder="Tìm kiếm"
        />
        <FiSearch className="absolute text-xs text-gray-500 left-1/2 transform -translate-x-1/3 top-1/2 -translate-y-1/2" />
      </div>
      <div className="mt-54">
        {searchValue && <SearchResults users={users} />}
      </div>
    </section>
  )
}

export default SearchBar
