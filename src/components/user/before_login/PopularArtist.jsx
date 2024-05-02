import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BsInstagram } from "react-icons/bs";
import { RiFacebookCircleFill } from "react-icons/ri";
import { AiFillTwitterCircle } from "react-icons/ai";
import '../home/Home.css';

export const PopularArtist = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
      
        axios.get("http://localhost:8080/file/getfile")
            .then((res) => {
                setPosts(res.data);
                console.log("res.data", res.data);
            }).catch((err) => {
                console.log("error", err);
                alert("error", err);
            });
    };

    return (
        <div>
            <h1>PopularArtist</h1>
            <div className='container'>
                <div className='row'>
                    {Array.from(new Set(posts.map(post => post.artistName))).map(artistName => {
                        const post = posts.find(post => post.artistName === artistName);
                        return (
                            <div key={post._id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                                <Link to={`/${post.artistName}`} style={{ textDecoration: 'none' }}>
                                    <div className="card ar-card m-2 text-light" style={{ backgroundColor: "rgba(50, 49, 49,0)" }}>
                                        <img src={`http://localhost:8080/uploads/${post.artistImage}`} style={{ height: "170px", borderRadius: "100%", width: "auto" }} className="card-img-top" alt='songimage' />
                                        <div className='card-body'>
                                            <b style={{ fontSize: "larger" }}>{post.artistName}</b><br />
                                            Artist
                                            <div className="play-button position-absolute top-50 end-80 " style={{ display: "none" }}>
                                                <button className="btn btn-success btn-sm">
                                                    <i className="bi bi-play-circle-fill me-1"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        );
                    })}
                </div>

                <div className="row mt-5">
                    <div className="col">
                        <ul>
                            <li><b>company</b></li>
                            <li>About</li>
                            <li>Jobs</li>
                            <li>For the Record</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul>
                            <li><b>Communities</b></li>
                            <li>For Artists</li>
                            <li>Developers</li>
                            <li>Advertising</li>
                            <li>Investors</li>
                            <li>Vendors</li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul>
                            <li><b>Useful links</b></li>
                            <li>Support</li>
                            <li>Free Mobile App</li>
                        </ul>
                    </div>
                    <div className="col p-3">
                        <ul className='d-flex'>
                            <li><BsInstagram /></li>
                            <li><AiFillTwitterCircle /></li>
                            <li><RiFacebookCircleFill /></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PopularArtist;
