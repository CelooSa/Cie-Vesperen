import axios from 'axios';
import { useParams, Link } from 'react-router';
import React, { useState, useEffect } from 'react';



const passwordRequest = () => {
    const [message, setMessage] = useState([])
    const { token } = useParams()

    useEffect(() => {
        const updateIsVerify = async () => {
        try {
            const { data } = await axios.put(`http://localhost:8000/api/user/verify/${token}`)
            setMessage(data.message);
        } catch ({ response }) {
            const { message } = response.data
            setMessage(message);
        }
    }
        updateIsVerify()
    }, [])

    return (
        <div>
            <p>Check your email</p>
            <Link to='/sign'>Login</Link>
        </div>
    )

};

export default passwordRequest;
