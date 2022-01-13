import React from 'react'
import footerLogo from './../assets/footer-logo.svg'

const Footer = () => {
    return (
        <div className="bg-[#031d33] p-[80px] mt-[50px]">
            <div className="w-[95%] m-auto md:w-[80%] lg:w-[50%] flex justify-center gap-x-[50px]">
                <div>
                    <a href="#">
                        <img src={footerLogo} alt="footer-logo" className="w-[130px] h-[94px]" />
                    </a>
                </div>
                <div className="text-white">
                    <nav className="flex gap-[30px]">
                        <div>
                            <a href="#" className='font-bold text-[1.3em] uppercase'>the basics</a>
                            <ul className="text-[1.1em]">
                                <li><a href="#">About TMDB</a></li>
                                <li><a href="#">Contact Us</a></li>
                                <li><a href="#">Support Forums</a></li>
                                <li><a href="#">API</a></li>
                                <li><a href="#">System Status</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="#" className='font-bold text-[1.3em] uppercase'>GET INVOLVED</a>
                            <ul className="text-[1.1em]">
                                <li><a href="#">Contribution Bible</a></li>
                                <li><a href="#">Add New Movie</a></li>
                                <li><a href="#">Add New TV Show</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="#" className='font-bold text-[1.3em] uppercase'>COMMUNITY</a>
                            <ul className="text-[1.1em]">
                                <li><a href="#">Guidelines</a></li>
                                <li><a href="#">Discussions</a></li>
                                <li><a href="#">Leaderboard</a></li>
                                <li><a href="#">Twitter</a></li>
                            </ul>
                        </div>
                        <div>
                            <a href="#" className='font-bold text-[1.3em] uppercase'>LEGAL</a>
                            <ul className="text-[1.1em]">
                                <li><a href="#">Terms of Use</a></li>
                                <li><a href="#">API Terms of Use</a></li>
                                <li><a href="#">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    )
}

export default Footer
