import React, {useState} from 'react'
import logo from './../assets/logo.svg'
import notification from './../assets/bell.png'
import user from './../assets/user.svg'
import search from './../assets/search.svg'
import menu from './../assets/menu.png'

const Header = () => {
    const [toggleMenu, setToggleMenu] = useState<boolean>(false)

    const handleMenu = () => {
        setToggleMenu(!toggleMenu)
    }
    return (
        <header className="bg-[#032541] w-full h-[54px] flex relative lg:h-[64px]">
            <div className="w-[95%] m-auto px-[10px] md:w-[80%] lg:w-[65%]">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="w-[104px] h-[20px] lg:w-[154px]">
                            <a href="#">
                                <img src={logo} alt="" />
                            </a>
                        </div>
                        <div className="ml-[25px] hidden sm:block">
                            <ul className="text-white text-[15px] flex gap-[20px] lg:text-[16px]">
                                <li><a className="p-[7px]" href="#">Movies</a></li>
                                <li><a className="p-[7px]" href="#">TV Shows</a></li>
                                <li><a className="p-[7px]" href="#">People</a></li>
                                <li><a className="p-[7px]" href="#">More</a></li>
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
                        {toggleMenu && <div className="absolute right-0 bg-[#032541] text-white w-[160px]">
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
