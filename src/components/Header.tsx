import React from 'react'
import logo from './../assets/logo.svg'
import notification from './../assets/bell.png'
import user from './../assets/user.svg'
import search from './../assets/search.svg'

const Header = () => {
    return (
        <header className="bg-[#032541] w-full h-[64px] flex">
            <div className="w-[65%] m-auto px-[20px]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-[154px] h-[20px]">
                            <a href="#">
                                <img src={logo} alt="" />
                            </a>
                        </div>
                        <div className="ml-[25px]">
                            <ul className="text-white text-[16px] flex gap-[20px]">
                                <li><a className="p-[7px]" href="#">Movies</a></li>
                                <li><a className="p-[7px]" href="#">TV Shows</a></li>
                                <li><a className="p-[7px]" href="#">People</a></li>
                                <li><a className="p-[7px]" href="#">More</a></li>
                            </ul>
                        </div>
                    </div>
                    <div>
                        <ul className="flex items-center gap-[20px]">
                            <li>
                                <a href="#"> <img src={notification} alt="" className="w-[24px] h-[24px] cur"/> </a>
                            </li>
                            <li>
                                <a href="#"> <img src={user} alt="" className="w-[32px] h-[32px]" /> </a>
                            </li>
                            <li>
                                <a href="#sdaa"> <img src={search} alt="" className="w-[32px] h-[32px]" /> </a>
                            </li>
                        </ul>
                        
                    </div>
                </div>
            </div>
            
        </header>
    )
}

export default Header
