import { FC, useEffect, useState } from 'react'
import { movieApi } from '../../../api'
import { IProps } from '../../../models/movie/moviePropsTypes'

type CrewTypes = {
    name: string, 
    job: string, 
    id: number
}

const CrewCreditDetails: FC<IProps> = ({id, movieDetails}) => {
    const [crewDetails, setCrewDetails] = useState<CrewTypes[]>([])

    useEffect( ()=>{
        if(id) movieApi.getCrewCreditDetails(id)
        .then(({ data, error }: any) => data ? setCrewDetails(data) : console.error(error))
    }, [movieDetails])

    return (
        <>
            {crewDetails?.slice(0, 7).map( credit => (
                <div className="w-[150px]">
                    <span className="font-bold">{credit.name}</span>
                    <p className="text-[14px]">{credit.job}</p>
                </div>
            ))}
        </>
    )
}

export default CrewCreditDetails
