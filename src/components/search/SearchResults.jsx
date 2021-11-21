import React from "react"
import UserItem from "../user/UserItem"

const SearchResults = ({ setOpenSearch, users }) => {
  return (
    <>
      {users?.length > 0 ? (
        users.map((user) => (
          <UserItem
            setOpenSearch={setOpenSearch}
            key={user._id}
            type="search"
            user={user}
          />
        ))
      ) : (
        <div className="flex items-center justify-center h-full w-full">
          <p className="text-13 text-gray-500 font-normal">
            Không tìm thấy kết quả nào.
          </p>
        </div>
      )}
    </>
  )
}

export default SearchResults
