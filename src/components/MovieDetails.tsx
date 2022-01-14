import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import facebook from './../assets/facebook.png'
import twitter from './../assets/twitter.png'
import instagram from './../assets/instagram.png'
import homepage from './../assets/home.png'
import blank from './../assets/blank-icon.png'
import blankUser from './../assets/blank-user-profile.png'
import heart from './../assets/heart.png'

import './MovieDetails.css'


const url = "https://api.themoviedb.org/3/movie/{movie_id}?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US"

export interface MovieDetailsTypes {
    backdrop_path: string | null,
    title: string, 
    poster_path: string, 
    release_date: string, 
    adult: boolean,
    production_countries: [
        {iso_3166_1: string}
    ]
    genres: [],
    runtime: number, 
    vote_average?: number, 
    overview: string,
    homepage: string,
    status: string,
    original_language: string,
    budget: number,
    revenue: number
}

interface Socials{
    imdb_id: string 
    facebook_id:string
    instagram_id:string 
    twitter_id:string 

}

function numberWithCommas(x:number | undefined) {
    if(x)
    return x.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const MovieDetails = (props: any) => {
    const basicImageUrl = "https://image.tmdb.org/t/p/original/"
    const { id } = useParams()
    const navigate = useNavigate()
    const [movieDetails, setMovieDetails]= useState<MovieDetailsTypes>()
    const [creditDetailsCrew, setCreditDetailsCrew] = useState([])
    const [creditDetailsCast, setCreditDetailsCast] = useState([])
    const [socials, setSocials] = useState<Socials>()
    const [movieKeywords, setKeywords] = useState([])
    const [reviews, setReviews] = useState([])
    const [recomendations, setRecomendations] = useState([])

    document.title = `${movieDetails?.title}`

    useEffect( () => {
        async function getMovieDetails(){
            try { 
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US`)
                .then((response) => {
                    setMovieDetails(response.data)
                })
            } catch (error) {
                console.error(error)
            }
        }
        async function getCreditDetails(){
            try{
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US`)
                .then( (response) => {
                    setCreditDetailsCrew(response.data.crew)
                    setCreditDetailsCast(response.data.cast)
                })
            } catch (error) {
                console.error(error)
            }
        }
        async function getSocialsIds(){
            try{
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=1e5bf08e3e7de0739102ef8a9c371945`)
                .then((response) => {
                    setSocials(response.data)
                })
            } catch (error) {
                console.error(error)
            }
        }
        async function getMovieKeywords(){
            try{
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/keywords?api_key=1e5bf08e3e7de0739102ef8a9c371945`)
                .then((response) => {
                    setKeywords(response.data.keywords)
                })
            } catch (error) {
                console.error(error)
            }
        }
        async function getReviews(){
            try{
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/reviews?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&page=1`)
                .then( (response) => {
                    setReviews(response.data.results)
                })
            } catch (error) {
                console.error(error)
            }
        }
        async function getRecomendations(){
            try{
                const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=1e5bf08e3e7de0739102ef8a9c371945&language=en-US&page=1`)
                .then((response) => {
                    setRecomendations(response.data.results)
                }) 
            } catch (err) {
                console.error(err)
            }
        }
        getMovieDetails();
        getCreditDetails();
        getSocialsIds();
        getMovieKeywords();
        getReviews();
        getRecomendations();
    }, [movieDetails])

    const calcTime = (time: number | undefined) => {
        if(time){
            const hours = Math.floor(time / 60)
            const minutes = time % 60
            const newTime = `${hours}h ${minutes}m`
            return newTime
        }
    }

    const setVoteClass = (vote: number | undefined) => {
        if(vote){
            if (vote >= 7) return "tag-green"
            if (vote >= 4) return "tag-orange"
            if (vote < 4) return "tag-red"
        }
    }

    const handleNavigate = (id: number, title: string) => {
        navigate(`/movie/${id}-${title}`)
    }

    const handleKeywordNavigate = (id: number, name: string) => {
        navigate(`/keyword/${id}-${name}`)
    }

    const addToFavourite = async () => {
        if(props.session){
            await axios.post(`https://api.themoviedb.org/3/account/${props.userInfo.id}/favorite?api_key=1e5bf08e3e7de0739102ef8a9c371945&session_id=${props.session}`, {media_type: "movie", media_id: id, favourite: "true"}).then(response => {
                console.log(response)
            })
        } else {
            alert("you need to login first")
        }
    }

    return (
        <div>
            <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%]">
                <ul className="flex justify-center gap-x-[50px] items-center h-[46px]">
                    <li><span>Overview</span></li>
                    <li><span>Media</span></li>
                    <li><span>Fandom</span></li>
                    <li><span>Share</span></li>
                </ul>
            </div>
            <div className="w-full h-[800px] relative">
                <img src={basicImageUrl + movieDetails?.backdrop_path} alt="backdrop-image" className="w-full h-[800px] object-cover object-top" /> 
                <div className={`absolute ${movieDetails?.backdrop_path ? "bg-gradient-to-r from-black" : "bg-[#a7a2a2]"} w-full h-[800px] top-0`}>
                    <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] flex pt-[40px] gap-[50px]">
                        {movieDetails?.poster_path ? <div className="w-[400px] h-[500px]">
                            <img src={basicImageUrl + movieDetails?.poster_path} alt="poster" className="w-[400px] h-[500px] object-cover"/>
                        </div> : <div className="w-[400px] h-[500px] bg-[#c7c2c2d6] flex items-center justify-center rounded-lg">
                                    <img src={blank} alt="" className="w-[100px] h-[100px] "/>
                            </div>}
                        <div className="w-[70%]">
                            <div className="text-white">
                                <span className="font-bold text-[2.2rem]">{movieDetails?.title}</span>
                                <span className="opacity-80 text-[2.2rem]"> ({moment(movieDetails?.release_date).format('YYYY')})</span> <br />
                                <div className="px-[4px] border opacity-60 inline">{movieDetails?.adult ? "PG-18" : "PG-13"}</div>
                                <span className="ml-[10px]">{moment(movieDetails?.release_date).format('L')}</span>
                                <span className="ml-[10px]">({movieDetails?.production_countries[0]?.iso_3166_1})</span>
                                <span className="ml-[10px]">&bull;</span>
                                {movieDetails?.genres.map( (genre: {name: string}) => (
                                    <span className="ml-[10px]">{genre.name}</span>
                                ))}
                                <span className="mx-[10px]">&bull;</span>
                                <span>{calcTime(movieDetails?.runtime)}</span>
                                <div className="mt-[25px] flex items-center">
                                    <div className={`select-none font-bold bg-[#153e4a] w-[60px] h-[60px] rounded-full flex items-center justify-center text-[1.2em] px-[20px] py-[20px] ${setVoteClass(movieDetails?.vote_average)}`}>{movieDetails?.vote_average ? movieDetails?.vote_average * 10 : ""} 
                                        <span className="text-[11px]">%</span>
                                    </div>
                                    <span className="font-bold ml-[11px]">User <br /> Score</span>
                                    <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center bg-[#153e4a] cursor-pointer ml-[11px]" onClick={addToFavourite}>
                                        <img src={heart} alt="" className="w-[32px] h-[32px]" />
                                    </div>
                                </div>
                                <div className="mt-[25px]">
                                    <span className="font-bold text-[1.5em]">Overview</span>
                                    <p>{movieDetails?.overview}</p>
                                </div>
                                <div className="grid grid-cols-3 grid-rows-3 mt-[30px] gap-y-[20px]">
                                    {creditDetailsCrew?.slice(0, 7).map( (credit: {name: string, job: string}) => (
                                        <div className="w-[150px]">
                                            <span className="font-bold">{credit.name}</span>
                                            <p className="text-[14px]">{credit.job}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
            <div className="w-[95%] m-auto md:w-[80%] lg:w-[70%] pt-[30px] grid grid-cols-4">
                <div className="col-span-3">
                    <p className="text-[1.5em] font-bold">Top Billed Cast</p>
                    <div className="flex gap-x-[20px] mt-[20px] overflow-x-scroll pb-[30px]">
                        {creditDetailsCast?.slice(0, 9).map( (cast: {name: string, profile_path: string, character: string}) => (
                            <div className="min-w-[138px] min-h-[255px] cast-card-shadow border">
                                <div>
                                    {cast?.profile_path ? <img src={basicImageUrl + cast.profile_path} alt="profile-image" className="w-[138px] h-[175px] rounded-t-md object-cover"/> : <div className="h-[175px] bg-[#c7c2c2d6] flex items-center justify-center">
                                            <img src={blankUser} className="w-[50px] h-[50px]" alt="" />
                                        </div>}
                                </div>
                                <div className="p-[10px] min-h-[100px] w-[138px] rounded-b-md">
                                    <p className="font-bold w-full">{cast?.name}</p>
                                    <p className="text-[15px]">{cast?.character}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="font-bold text-[1.5em] mt-[20px]">Full Cast & Crew</p>
                    <hr className="border mt-[30px] mb-[30px]" />
                    <div>
                        <div>
                            <ul className="flex gap-x-[30px] font-bold items-center">
                                <li className="text-[1.3em] cursor-pointer">Social</li>
                                <li className="text-[1.1em] cursor-pointer">Reviews</li>
                                <li className="text-[1.1em] cursor-pointer">Discussions</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-y-[30px] mt-[20px]">
                            {reviews.map((review: {content: string, author: string, created_at: string, author_details: {avatar_path: string}}) => (
                                <div className="border p-[20px] grid grid-cols-12 rounded-md shadow-lg">
                                    <div className="w-[64px] h-[64px] col-span-1">
                                        {review?.author_details?.avatar_path ?
                                        <img src={!review?.author_details?.avatar_path?.indexOf('/https') ? review?.author_details?.avatar_path?.slice(1) : basicImageUrl + review?.author_details?.avatar_path} alt="" className="w-[64px] h-[64px] rounded-full"/> : <div className="w-[64px] h-[64px] rounded-full"> no image </div>}
                                    </div>
                                    <div className="ml-[20px] col-span-11">
                                        <span className="font-bold text-[1.2em]">A review by {review?.author}</span>
                                        <p className="text-[14px] opacity-80">Written by <span className="font-semibold">{review?.author}</span> on {moment(review?.created_at).format('MMM D, YYYY')}</p>
                                        <div className="mt-[30px]">
                                            {review?.content?.length >= 1000 ? review?.content.substring(0, 1000) + "..." + "read THE REST" : review?.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="border mt-[30px]" />
                        <div className="mt-[30px]">
                            <h2 className="font-semibold text-[1.5em]">Recomendations</h2>
                            <div className="flex overflow-x-scroll gap-x-[30px]">
                                        {recomendations?.map((recomendation: {backdrop_path: string, title: string, vote_average: number, id: number}) => (
                                            <div className="w-[250px] h-[184px] cursor-pointer" onClick={ () => handleNavigate(recomendation.id, recomendation.title)}>
                                                {recomendation?.backdrop_path ? <div className="w-[250px] h-[141px]">
                                                    <img src={basicImageUrl + recomendation?.backdrop_path} alt="backdrop-img" className="w-[250px] h-[141px] rounded-md"/>
                                                </div> : <div className="w-[250px] h-[141px] flex items-center justify-center bg-[#c7c2c2d6]">
                                                        <img src={blank} alt="" className="w-[50px] h-[50px]"/>
                                                    </div>}
                                                <div className="flex justify-between">
                                                    <span className="truncate">{recomendation?.title}</span>
                                                    <span>{Math.ceil(recomendation?.vote_average * 10)}%</span>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="pl-[25px]">
                    <div className="flex gap-x-[20px]">
                        {socials?.facebook_id && 
                        <a href={`https://www.facebook.com/${socials?.facebook_id}`} target="_blank" className="facebook-trigger">
                            <img src={facebook} alt="fb-icon" className="w-[32px] h-[32px] inline" />
                            <span className="facebook-label w-[200px]">Visit Facebook</span>
                        </a>
                        }
                        {socials?.twitter_id &&
                        <a href={`https://www.twitter.com/${socials?.twitter_id}`} target="_blank" className="twitter-trigger">
                            <img src={twitter} alt="fb-icon" className="w-[32px] h-[32px] inline" />
                            <span className="twitter-label w-[200px]">Visit Twitter</span>
                        </a>
                        }
                        {socials?.instagram_id &&
                        <a href={`https://www.instagram.com/${socials?.instagram_id}`} target="_blank" className="instagram-trigger">
                            <img src={instagram} alt="fb-icon" className="w-[32px] h-[32px] inline" />
                            <span className="instagram-label w-[200px]">Visit Instagram</span>
                        </a>
                        }
                        {movieDetails?.homepage &&
                        <a href={movieDetails?.homepage} target="_blank" className="homepage-trigger">
                            <img src={homepage} alt="fb-icon" className="w-[32px] h-[32px] inline" />
                            <span className="homepage-label w-[200px]">Visit Homepage</span>
                        </a>
                        }
                    </div>
                    <div className="mt-[20px]">
                        <p className="font-bold text-[1.2em]">Status</p>
                        <p>{movieDetails?.status}</p>
                        <p className="font-bold text-[1.2em] mt-[15px]">Original Language</p>
                        <p className="uppercase">{movieDetails?.original_language}</p>
                        <p className="font-bold text-[1.2em] mt-[15px]">Budget</p>
                        {movieDetails?.budget ? <p>${numberWithCommas(movieDetails?.budget)}</p> : "-"}
                        <p className="font-bold text-[1.2em] mt-[15px]">Revenue</p>
                        {movieDetails?.revenue ? <p>${numberWithCommas(movieDetails?.revenue)}</p> : "-"}
                    </div>
                    <div className="mt-[20px]">
                        <p className="font-bold text-[1.2em]">Keywords</p>
                         <div className="flex flex-wrap gap-[8px] mt-[10px]">
                            {movieKeywords.length ? movieKeywords?.map((keyword: {name: string, id:number}) => (
                                <p className="text-[14px] bg-[#0000001a] px-[10px] py-[4px] border border-[#d7d7d7] rounded-md cursor-pointer hover:underline" onClick={() => handleKeywordNavigate(keyword.id, keyword.name)}>{keyword.name}</p>
                            )) : "No keywords have been added."}
                        </div>
                    </div>
                    <hr className="border mt-[30px] mb-[30px]" />
                </div>
            </div>
            
        </div>
    )
}

export default MovieDetails
