import React from 'react'

const SearchBar = () => {
    return (
        <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[65%] py-[20px] relative flex items-center">
            <input type="search" className="w-full h-[46px] rounded-full px-[10px] text-[14px] border border-[#FFCA9A] focus:outline-none" placeholder="Search for a movie, tv show, person..." />
            <button className="hidden absolute right-[30px] p-[2px] hover:text-[#009930] sm:block">Search</button>
        </div>
    )
}

export default SearchBar
