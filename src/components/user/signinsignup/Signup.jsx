import React, { useState } from 'react'
import './form.css'
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../Assets/spotify-logo.png';

export const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    console.log(name, value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formData);
    const data = {
      username: formData.name,
      email: formData.email,
      password: formData.password
    }

    if (!data.username || !data.email || !data.password) {
      alert("Please fill in all fields.");
    } else {
      fetch("https://spotify-backend-nodejs.vercel.com/form/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/Json'
        },
        body: JSON.stringify(data) // Ensure `data` is properly defined
      })
        .then(response => {
          console.log(response);
          if (!response.ok) {
            throw new Error(`Server returned status: ${response.status}`);
          } else {
            alert("Signup successful, Please Login!");
            navigate("/login");
          }
        })
        .catch(error => {
          console.error("Error:", error);
          alert("An error occurred while signing up. Please try again later.");
        });

    }
  }

  return (
    <div className='outer'>


      <form onSubmit={handleSubmit} id='form1'>

        <div className='logo-container'>
          <img src={Logo} alt="" />
          <h3>Spotify</h3>
        </div>
        <p className="fw-bold">Enjoy Listening to Music</p>

        <input type="text" name='name' placeholder='UserName' value={formData.name} onChange={handleChange} />
        {/* <br /> */}

        <input type="text" name='email' placeholder='EmilId' value={formData.email} onChange={handleChange} />
        {/* <br /> */}


        <input type="password" name='password' placeholder='Password' value={formData.password} onChange={handleChange} />
        {/* <br /> */}

        <p>Already have an account?<Link className="text-decoration-none " to="/signin"> login now!</Link></p>

        <input type="submit" value="Sign Up" />

      </form>
    </div>
  )
}

