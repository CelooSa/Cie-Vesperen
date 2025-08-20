import axios from 'axios';
import { div } from 'framer-motion/client';
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';


const VerifyEmail = () => {
    const [message, setMessage] = useState([])
    const { token } = useParams()
w
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
            <h3>Verify Email</h3>
            <p>Veuillez valider votre email</p>
            <Link to='/sign'>Se connecter</Link>
        </div>
    )
}

export default VerifyEmail;