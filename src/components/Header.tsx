import React, {useState} from 'react'
import logo from './../assets/logo.svg'
import notification from './../assets/bell.png'
import user from './../assets/user.svg'
import search from './../assets/search.svg'
import menu from './../assets/menu.png'
import './Header.css'
import { Link } from 'react-router-dom'

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);

    const handleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    return (
        <header className="bg-[#032541] w-full h-[54px] flex relative lg:h-[64px]">
            <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[65%]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-[104px] h-[20px] lg:w-[154px]">
                            <Link to='/'>
                                <img src={logo} alt="" />
                            </Link>
                        </div>
                        <div className="ml-[25px] hidden sm:block">
                            <ul className="text-white text-[15px] flex gap-[20px] lg:text-[16px]">
                                <li className="trigger_movies">
                                    <span className="p-[7px] hover:font-bold relative cursor-pointer">Movies</span>
                                    <div className="movies-menu text-[black] z-[1] bg-white w-[180px] border border-grey rounded-md">
                                        <ul className="flex flex-col py-[8px]">
                                            <li><Link to='/movie' className="hover:bg-gray-300 block px-[20px] py-[3px]">Popular</Link></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Now Playing</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Upcoming</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Top Rated</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="trigger_tv-shows">
                                    <a className="p-[7px] hover:font-bold relative" href="#">TV Shows</a>
                                    <div className="tv-shows-menu text-[black] z-[1] bg-white w-[180px] border border-grey rounded-md">
                                        <ul className="flex flex-col py-[8px]">
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Popular</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Airing Today</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">On TV</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Top Rated</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="trigger_people-menu">
                                    <a className="p-[7px] hover:font-bold" href="#">People</a>
                                    <div className="people-menu text-[black] z-[1] bg-white w-[180px] border border-grey rounded-md">
                                        <ul className="flex flex-col py-[8px]">
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Popular People</a></li>
                                        </ul>
                                    </div>
                                </li>
                                <li className="trigger_more-menu">
                                    <a className="p-[7px] hover:font-bold" href="#">More</a>
                                    <div className="more-menu text-[black] z-[1] bg-white w-[180px] border border-grey rounded-md">
                                        <ul className="flex flex-col py-[8px]">
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Discussions</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Leaderboard</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">Support</a></li>
                                            <li><a href="#" className="hover:bg-gray-300 block px-[20px] py-[3px]">API</a></li>
                                        </ul>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden sm:block">
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
                    <div className="sm:hidden">
                        <img src={menu} alt="menu" className="w-[44px] h-[44px]" onClick={handleMenu}/>
                        {toggleMenu && <div className="absolute right-0 bg-[#032541] text-white w-[160px] z-[1]">
                                <ul>
                                    <li><a href="#">Movies</a></li>
                                    <li><a href="#">TV Shows</a></li>
                                    <li><a href="#">People</a></li>
                                    <li><a href="#">More</a></li>
                                    <li><a href="#">Notifications</a></li>
                                    <li><a href="#">Account</a></li>
                                </ul>
                            </div>}
                    </div>
                </div>
            </div>
            
        </header>
    )
}

export default Header
