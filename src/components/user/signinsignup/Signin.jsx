import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Logo from '../../Assets/spotify-logo.png'
import './form.css'

export const Signin = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        username: "",
        password: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value })
        console.log(name, value);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = formData;

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        fetch("http://localhost:8080/form/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error(`Server returned status: ${response.status}`);
                }
            })
            .then(data => {
                console.log("Login successful:", data);
                const token = data.token; // Retrieve token from response data
                localStorage.setItem('token', token); // Example of storing token in localStorage
                console.log("rolee", data.user.role);
                if (data.user.role === 'admin') {
                    navigate(`/admin/${data.user.username}`);
                } else {
                    navigate(`/user/${data.user.username}`);

                }
            })
            .catch(error => {
                console.error("Error during fetch:", error);
                alert("An error occurred. Please try again.");
            });
    }


    return (
        <div className="outer">
            <form id="form1" onSubmit={handleSubmit}>
                <div className="logo-container">
                    <img src={Logo} alt="" />
                    <h3>Spotify</h3>
                </div>
                <p className="fw-bolder">Enjoy Listening to Music</p>
                <br />

                <input type="text" placeholder="Username :" name="username" value={formData.username} onChange={handleChange} /><br />

                <input type="password" placeholder="Password :" name="password" value={formData.password} onChange={handleChange} /><br />

                <p>Don't have an account? <Link className="text-decoration-none " to="/signup">Signup </Link>for free!</p><br />

                <input type="submit" className="button" value="Sign in" />
            </form>
        </div>
    )
}






