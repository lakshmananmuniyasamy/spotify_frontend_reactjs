import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal, Table } from 'react-bootstrap';
import { RiPlayListFill } from "react-icons/ri";
import { TopNavbar } from '../navbars/TopNavbar';

export const Artist = () => {
    const { artistName } = useParams();
    const [artistData, setArtistData] = useState([]);
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchData = () => {
            console.log("artistName sending==", artistName);
            axios.get(`http://localhost:8080/file/findbyartistname/${artistName}`)
                .then((res) => {
                    // Filter unique song names
                    console.log("res", res);
                    const uniqueSongs = res.data.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.songName === item.songName
                        ))
                    );
                    setArtistData(uniqueSongs);
                    // setArtistData(res.data);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        };

        fetchData();
    }, [artistName]);



    const playSong = (index, post) => {
        console.log("but click post==", post);
        const token = localStorage.getItem('token')
        console.log("token", token);

        if (!token) {
            setShowLoginModal(true);
            setSelectedImage(post.artistImage); // Set the selected image
            setShow(true);
            return;
        }
    };

    const addfav = (post) => {
        const token = localStorage.getItem('token')
        console.log("token", token);

        if (!token) {
            setShowLoginModal(true, post);
            setShow(true);
            return;
        }
        axios.post(`http://localhost:8080/file/addfav`, post)
            .then(res => {
                console.log("fav res..1..", res.data, "...", post);
                alert("added successfully");
            })
            .catch(err => {
                console.log("error", err);
            });
    };

    return (
        <div className=''>
            <TopNavbar />
            <Table border="true" hover>
                <thead>
                    <tr>
                        <th scope="col">Artist Image</th>
                        <th scope="col">Song Name</th>
                        <th scope="col">Add to Playlist</th>
                        <th scope="col">Song</th>
                    </tr>
                </thead>
                <tbody>
                    {artistData.map((post, index) => (
                        <tr key={index}>
                            <td>
                                <img src={`http://localhost:8080/uploads/${post.artistImage}`} style={{ height: "80px", width: "auto" }} alt='artist' />
                            </td>
                            <td>{post.songName}</td>
                            <td>
                                <Button onClick={() => addfav(post)}><RiPlayListFill /></Button>
                            </td>
                            <td>
                                <Button onClick={() => playSong(index, post)}>Play</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>

            {/* model class  */}

            {showLoginModal && (
                <>

                    <Modal show={show} onHide={handleClose}>
                        <Modal.Body>
                            <div className="row">
                                <div className="col">
                                    <img src={`http://localhost:8080/uploads/${selectedImage}`} style={{ height: "300px", width: "auto" }} alt='artist' />
                                </div>


                                <div className="col d-flex justify-content-center align-items-center flex-column">
                                    <Button variant="secondary">
                                        <Link to="/signup" style={{ color: 'inherit', textDecoration: 'none' }}>
                                            Sign up for free
                                        </Link>
                                    </Button>
                                    <br />
                                    <Button variant="primary" onClick={handleClose}>
                                        Download app
                                    </Button>
                                </div>
                            </div>
                        </Modal.Body>
                    </Modal>
                </>
            )}
        </div>
    );
};

export default Artist;
