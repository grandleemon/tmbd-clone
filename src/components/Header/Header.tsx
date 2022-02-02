import { FC, useState } from 'react'
import logo from './../../assets/logo.svg'
import user from './../../assets/user.svg'
import menu from './../../assets/menu.png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, userInfoSelector } from '../../store/features/userInfo'
import { userTokenSelector } from '../../store/features/userToken'
import { userSessionSelector } from '../../store/features/userSession'
import { authApi } from '../../api'
import './Header.css'

type SectionProps = {
    title: string
}

const ListSection: FC<SectionProps> = ({ children, title }) => (
    <li className="trigger_movies">
    <span className="p-[7px] hover:font-bold relative cursor-pointer">{title}</span>
        <div className="movies-menu text-[black] z-[1] bg-white w-[180px] border border-grey rounded-md">
            <ul className="flex flex-col py-[8px]">
                {children}
            </ul>
        </div>
    </li>
)

const SectionLink: FC = ({ children }) => (
    <li><a href="#" className="bg-gray-400 block px-[20px] py-[3px] cursor-not-allowed">{children}</a></li>
)

const Header: FC = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false);
    const userInfo = useSelector(userInfoSelector)
    const requestToken = useSelector(userTokenSelector)
    const session = useSelector(userSessionSelector)
    const dispatch = useDispatch()

   
    const handleMenu = () => {
        setToggleMenu(!toggleMenu)
    }

    const handleDelete = async () => {
        if(userInfo.id) 
            await authApi.logOut(session.userSession)
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
                        <div className="ml-[25px] hidden lg:block">
                            <ul className="text-white text-[15px] flex gap-[20px] lg:text-[16px]">
                                <ListSection title="Movies">
                                    <li><Link to='/movie' className="hover:bg-gray-300 block px-[20px] py-[3px]">Popular</Link></li>
                                    <SectionLink>Now Playing</SectionLink>
                                    <SectionLink>Upcoming</SectionLink>
                                    <SectionLink>Top Rated</SectionLink>
                                </ListSection>
                                <ListSection title="TV Shows">
                                    <SectionLink>Popular</SectionLink>
                                    <SectionLink>Airing Today</SectionLink>
                                    <SectionLink>On TV</SectionLink>
                                    <SectionLink>Top Rated</SectionLink>
                                </ListSection>
                                <ListSection title="People">
                                    <SectionLink>Popular People</SectionLink>
                                </ListSection>
                                <ListSection title="More">
                                    <SectionLink>Discussions</SectionLink>
                                    <SectionLink>Leaderboard</SectionLink>
                                    <SectionLink>Support</SectionLink>
                                    <SectionLink>API</SectionLink>
                                </ListSection>
                            </ul>
                        </div>
                    </div>
                    <div className="hidden lg:block">
                        <ul className="flex items-center gap-[20px]">
                            {!userInfo.id ? 
                            <li>
                                <a href={`https://www.themoviedb.org/authenticate/${requestToken.userToken}?redirect_to=https://grandleemon.github.io/tmdb-clone/#/account/approved`}> 
                                    <img src={user} alt="" className="w-[32px] h-[32px]" /> 
                                </a>
                            </li> : 
                            <span className="text-white relative account-menu-trigger p-[15px] cursor-pointer hover:underline"> 
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
                                </span>
                            } 
                        </ul>
                    </div>
                    <div className="lg:hidden">
                        <div className="flex">
                            {userInfo.id && <span className="text-white flex items-center">Hi, {userInfo.name}</span>}
                            <img src={menu} alt="menu" className="w-[44px] h-[44px]" onClick={handleMenu}/>
                        </div>
                        {toggleMenu && <div className="absolute right-0 md:right-[10%] bg-[#032541] text-white w-[160px] z-[1] rounded-md">
                                <ul>
                                    <li><Link to='/movie' className="px-[20px] py-[3px]">Popular Movies</Link></li>
                                    {userInfo.id &&
                                    <li><Link to={`/account/${userInfo.id}/favorites`} className="px-[20px] py-[3px] rounded-t-md">Favorites</Link></li>
                                    }
                                    {userInfo.id ?
                                    <li>
                                        <span className="hover:bg-gray-300 block px-[20px] pb-[3px]" onClick={handleDelete}>Log Out</span>
                                    </li> : 
                                    <li> <a 
                                    href={`https://www.themoviedb.org/authenticate/${requestToken.userToken}?redirect_to=https:/grandleemon.github.io/account/approved`}
                                    className="px-[20px] block py-[3px]">Log In</a>
                                    </li> 
                                    }
                                </ul>
                            </div>}
                    </div>
                </div>
            </div>
            
        </header>
    )
}

export default Header;

