import React, { useEffect, useState } from 'react'
import { Table, Offcanvas } from 'react-bootstrap'
import axios from 'axios';
import './User.css'

export const User = () => {
    const c1 = { color: "red" }

    const [posts, SetPosts] = useState([]);
    const [filterData, SetFilterData] = useState([]);

    //get login details 
    const fetchData = () => {
        // axios.get('http://localhost:8080/form/getdetails')
        axios.get('https://spotify-backend-nodejs.vercel.com/form/getdetails')
            .then(res => {
                // if(res.data.roll==='user'){
                SetPosts(res.data);
                SetFilterData(res.data)
                // }
            })
            .catch(err => {
                console.log("error", err);
            })
    };
    useEffect(() => {
        fetchData();
    }, []);

    //filter by name
    const Filter = (event) => {
        //  SetFilterData(posts.filter(f => f.username.toLowerCase().includes(event.target.value)))
        SetFilterData(posts.filter(f => f.username?.toLowerCase().includes(event.target.value.toLowerCase())));
    }

    //offcanvas add 
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    //add user data table
    const [formData, SetFormData] = useState({
        username: "",
        password: "",
        email: "",
        roll: ""
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        SetFormData({ ...formData, [name]: value })
        console.log(name, value);
    }

    const handleSubmit = () => {
        const data = {
            username: formData.username,
            password: formData.password,
            email: formData.email,
            roll: formData.roll
        }
        console.log(data.username);

        if (!data.username || !data.password || !data.email || !data.roll) {
            alert("please fill the details")
        } else {
            axios.post("http://localhost:8080/form/signup", data)
                .then(res => {
                    console.log("data", res.data);
                    alert("data added")
                    // SetFormData(res.data)
                }).catch(err => {
                    console.log("error", err);
                })
        }
    }



    //update user

    //offcanvas update
    const [id, SetId] = useState();
    const [show1, setShow1] = useState(false);
    const handleClose1 = () => setShow1(false);
    const handleShow1 = (dataValue) => {
        setShow1(true);
        console.log(dataValue);
        SetId(id);
        SetUpadateData(dataValue);
    }

    const [updateData, SetUpadateData] = useState({
        id: '',
        username: "",
        email: "",
        password: "",
        role: ""
    })

    const handleChange1 = (event) => {
        const { name, value } = event.target;
        SetUpadateData({ ...updateData, [name]: value })
        console.log(name, value);
    }


    const handleSubmit1 = () => {
        const data = {
            username: updateData.username,
            password: updateData.password,
            email: updateData.email,
            roll: updateData.roll
        }
        console.log(data.username);

        if (!data.username || !data.password || !data.email || !data.roll) {
            alert("please fill the details")
        } else {
            axios.put(`http://localhost:8080/form/updateuser/${id}`, data)
                .then(res => {
                    console.log("data", res.data);
                    alert("data updated successfully")
                    // SetFormData(res.data)
                    fetchData();
                }).catch(err => {
                    console.log("error", err);
                    alert("An error occurred while updating data. Please try again later.");
                })
        }
    }


    //delte user
    const delete1 = (id1) => {
        const confirmed = window.confirm("Are you sure you want to delete this post?");
        if (!confirmed) {
            return; // Do nothing if user cancels
        }

        console.log("post id", id1);
        // SetId(id1);
        axios.delete(`http://localhost:8080/form/delete/${id1}`)
            .then(res => {
                console.log("delete", res);
                fetchData();
            }).catch(err => {
                console.log("error delete", err);
            })
    }


    return (
        <div className='container'>
            <div className='row justify-content-between mt-3'>
                <div className='col-4'>
                    <h3>User</h3>
                    <div>View The User List</div>
                    <input type="text" id="in" className='form-control' onChange={Filter} placeholder='enter a user name' />
                </div>
                <div className='col-2 mt-5'><br /><span><button onClick={handleShow} className='btn btn-primary '><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                </svg>Add</button></span>
                </div>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th style={c1}>s.no</th>
                        <th>User Name</th>
                        <th>Email Address</th>
                        <th>Password</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filterData.map((post, i) => (
                        <tr key={i}>
                            {/* <td><b>{post.id}</b></td> */}
                            <td><b>{i + 1}</b></td> {/* Incrementing index by 1 for s.no */}
                            <td><b>{post.username}</b></td>
                            <td><b>{post.email}</b></td>
                            <td><b>{post.password}</b></td>
                            <td>
                                <button variant="primary" onClick={() => { handleShow1(post) }} className="me-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z" />
                                    </svg>
                                </button>
                                <button onClick={() => delete1(post.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3-fill" viewBox="0 0 16 16">
                                        <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* add user */}

            <Offcanvas show={show} onHide={handleClose} placement="end" scroll={true} backdrop={false}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Create User</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <input type="text" name='username' placeholder='Enter UserName' value={formData.username} onChange={handleChange} />
                        <br />
                        <input type="text" name='email' placeholder='Enter EmilId' value={formData.email} onChange={handleChange} />
                        <br />
                        <input type="password" name='password' placeholder='Enter Password' value={formData.password} onChange={handleChange} />
                        <br />
                        <input type="text" name='roll' placeholder='Enter roll' value={formData.roll} onChange={handleChange} />
                        <br />
                        <button onClick={handleSubmit}>Create</button>
                        {/* <button type="button" value="Create" /> */}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>


            {/* update */}

            <Offcanvas show={show1} onHide={handleClose1} placement="end" scroll={true} backdrop={false}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Update User</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <div>
                        <input type="text" name='id' placeholder='Enter Id' value={updateData.id} />
                        <br />
                        <input type="text" name='username' placeholder='Enter UserName' value={updateData.username} onChange={handleChange1} />
                        <br />
                        <input type="text" name='email' placeholder='Enter EmilId' value={updateData.email} onChange={handleChange1} />
                        <br />
                        <input type="password" name='password' placeholder='Enter Password' value={updateData.password} onChange={handleChange1} />
                        <br />
                        <input type="text" name='roll' placeholder='Enter roll' value={updateData.roll} onChange={handleChange1} />
                        <br />
                        <button onClick={handleSubmit1}>Update</button>
                        {/* <button type="button" value="Create" /> */}
                    </div>
                </Offcanvas.Body>
            </Offcanvas>
        </div>
    )
}