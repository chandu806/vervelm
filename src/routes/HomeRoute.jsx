import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'

const HomeRoute = () => {
    const [username, setUsername] = useState("")
    const navigate = useNavigate();
    const { id } = useParams();


    const verifyTokenFe = async (token) => { // to verify Token
        let result = await fetch(`https://loginfr.herokuapp.com/verifyToken`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ token })
        })
        result = await result.json();
        if (!result.status) {
            alert("User is not authorised please login first")
            navigate('/login')
            return;
        }
    }

    const getUserName = async () => { // fetch userName to show on Header
        let result = await fetch(`https://loginfr.herokuapp.com/getUserById/${id}`)
        result = await result.json();
        if (!result.status) {
            alert("User is not authorised please login first")
            navigate('/login')
            return;
        }
        console.log(result.data)
        setUsername(result.data[0].username)
    }


    useEffect(() => {
        let token = JSON.parse(localStorage.getItem("token"))
        if (!token) {
            alert("Unauthorised user please login first")
            navigate("/login")
            return;
        }

        verifyTokenFe(token)
        getUserName()

        // navigate('/login')
    }, [])

    return (
        <div>
            <h1>welcome to home page Mr. {username}</h1>
        </div>
    )
}

export default HomeRoute