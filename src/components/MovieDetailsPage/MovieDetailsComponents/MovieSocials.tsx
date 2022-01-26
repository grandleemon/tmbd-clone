import React, { useEffect, useState } from "react";
import { getSocialsIds } from "../../../api/api";
import facebook from './../../../assets/facebook.png'
import twitter from './../../../assets/twitter.png'
import instagram from './../../../assets/instagram.png'
import homepage from './../../../assets/home.png'

interface Socials{
    imdb_id: string 
    facebook_id:string
    instagram_id:string 
    twitter_id:string 
}

const MovieSocials = ({id, movieDetails}: any) => {
    const [socials, setSocials] = useState<Socials>()

    useEffect(() => {
        getSocialsIds(id, setSocials)
    }, [movieDetails])
  return (
    <>
      {socials?.facebook_id && (
        <a
          href={`https://www.facebook.com/${socials?.facebook_id}`}
          target="_blank"
          className="facebook-trigger"
        >
          <img
            src={facebook}
            alt="fb-icon"
            className="w-[32px] h-[32px] inline smallpc:w-[24px] smallpc:h-[24px]"
          />
          <span className="facebook-label w-[200px]">Visit Facebook</span>
        </a>
      )}
      {socials?.twitter_id && (
        <a
          href={`https://www.twitter.com/${socials?.twitter_id}`}
          target="_blank"
          className="twitter-trigger"
        >
          <img
            src={twitter}
            alt="fb-icon"
            className="w-[32px] h-[32px] inline smallpc:w-[24px] smallpc:h-[24px]"
          />
          <span className="twitter-label w-[200px]">Visit Twitter</span>
        </a>
      )}
      {socials?.instagram_id && (
        <a
          href={`https://www.instagram.com/${socials?.instagram_id}`}
          target="_blank"
          className="instagram-trigger"
        >
          <img
            src={instagram}
            alt="fb-icon"
            className="w-[32px] h-[32px] inline smallpc:w-[24px] smallpc:h-[24px]"
          />
          <span className="instagram-label w-[200px]">Visit Instagram</span>
        </a>
      )}
      {movieDetails?.homepage && (
        <a
          href={movieDetails?.homepage}
          target="_blank"
          className="homepage-trigger"
        >
          <img
            src={homepage}
            alt="fb-icon"
            className="w-[32px] h-[32px] inline smallpc:w-[24px] smallpc:h-[24px]"
          />
          <span className="homepage-label w-[200px]">Visit Homepage</span>
        </a>
      )}
    </>
  );
};

export default MovieSocials;
