import React, {useEffect, useState} from 'react'
import logo from './../assets/logo.svg'
import notification from './../assets/bell.png'
import user from './../assets/user.svg'
import search from './../assets/search.svg'
import menu from './../assets/menu.png'
import './Header.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { getRequestToken } from '../api/api'
import { addUser } from '../features/userInfoSlice'

const Header = (props:any) => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const dispatch = useDispatch()
    
    // unknown
    const userInfo: any = useSelector<any>(state => state.userInfo)
    // unknown

    const navigate = useNavigate()

    useEffect( () => {
        if(!props.session){
            getRequestToken(props.setToken)
        }
    }, [props.session])

    const handleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleDelete = async () => {
        if(props.session) 
            await axios.delete(`${process.env.REACT_APP_API_URL}/authentication/session?api_key=${process.env.REACT_APP_API_KEY}`, { data: {session_id: props.session}})
            dispatch(addUser({id: null, name: null}))
    }

    return (
        <header className="bg-[#032541] w-full h-[54px] flex relative lg:h-[64px]">
            <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[70%]">
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
                            {userInfo.id == null ? <li>
                                <a href={`https://www.themoviedb.org/authenticate/${props.token}?redirect_to=http://localhost:3000/approved`}> <img src={user} alt="" className="w-[32px] h-[32px]" /> </a>
                            </li> : <span className="text-white relative account-menu-trigger p-[15px] cursor-pointer hover:underline">
                                {userInfo.name}
                                <div className="account-menu bg-white text-black z-[222] font-bold border border-grey rounded-md">
                                    <ul className="flex flex-col gap-[10px]">
                                        <li>
                                            <Link to={`/account/${userInfo.id}/favorites`} className="hover:bg-gray-300 block px-[20px] py-[3px] rounded-t-md">Favorites</Link>
                                        </li>
                                        <li>
                                            <span className="hover:bg-gray-300 block px-[20px] py-[3px]" onClick={handleDelete}>Log Out</span>
                                        </li>
                                    </ul>
                                    </div>
                                </span>}
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
