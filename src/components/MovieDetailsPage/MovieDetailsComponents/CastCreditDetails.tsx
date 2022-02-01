import { FC, useEffect, useState } from 'react'
import { movieApi } from '../../../api'
import { IProps } from '../../../models/movie/moviePropsTypes'
import blankUser from './../../../assets/blank-user-profile.png'

type CastTypes = {
    name: string, 
    profile_path: string, 
    character: string,
    id: number
}

const CastCreditDetails: FC<IProps> = ({id, movieDetails}) => {
    const [castDetails, setCastDetails] = useState<CastTypes[]>([])

    useEffect( () => {
        if(id) 
            movieApi.getCastCreditDetails(id)
            .then(({ data, error }: any) => data ? setCastDetails(data) : console.error(error))
    }, [movieDetails])

    return (
        <div className="mobile:mt-[500px] tablet:mt-[500px]">
            <p className="text-[1.5em] font-bold">Top Billed Cast</p>
                <div className="flex gap-x-[20px] mt-[20px] overflow-x-scroll pb-[30px]">
                    {castDetails?.slice(0, 9).map( cast => (
                        <div key={cast.id} className="min-w-[138px] min-h-[255px] cast-card-shadow border">
                            <div>
                                {cast?.profile_path 
                                ? <img src={process.env.REACT_APP_BASIC_IMAGE_URL + cast.profile_path} alt="profile-image" className="w-[138px] h-[175px] rounded-t-md object-cover"/> 
                                : <div className="h-[175px] bg-[#c7c2c2d6] flex items-center justify-center">
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
        </div>
    )
}

export default CastCreditDetails
