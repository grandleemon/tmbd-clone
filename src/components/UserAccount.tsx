import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const UserAccount = () => {
    const {id} = useParams()
    const navigate = useNavigate()

    const handleNavigate = (id: any) => {
        navigate(`/account/${id}/favorites`)
    }

    return (
        <div>
            <button onClick={() => handleNavigate(id)}>favorites</button>
        </div>
    )
}

export default UserAccount
