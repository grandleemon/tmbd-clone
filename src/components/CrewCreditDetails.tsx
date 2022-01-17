import React, { useEffect, useState } from 'react'
import { getCrewCreditDetails } from '../api/api'

const CrewCreditDetails = ({id, movieDetails}: any) => {
    const [crewDetails, setCrewDetails] = useState([])

    useEffect( ()=>{
        getCrewCreditDetails(id, setCrewDetails)
    }, [movieDetails])

    return (
        <>
            {crewDetails?.slice(0, 7).map( (credit: {name: string, job: string, id: number}) => (
                <div className="w-[150px]">
                    <span className="font-bold">{credit.name}</span>
                    <p className="text-[14px]">{credit.job}</p>
                </div>
            ))}
        </>
    )
}

export default CrewCreditDetails
