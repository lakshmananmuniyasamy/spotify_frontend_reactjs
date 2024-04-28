import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button, Modal, Table} from 'react-bootstrap';
import { RiPlayListFill } from "react-icons/ri";

export const Artist = () => {
    const { artistName } = useParams();
    const [artistData, setArtistData] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [audioRef, setAudioRef] = useState(null);
    const [showPlayer, setShowPlayer] = useState(false); // State to control visibility of player
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    useEffect(() => {
        const fetchData = () => {
            axios.get(`https://spotify-backend-nodejs.vercel.com/file/findbyartistname/${artistName}`)
                .then((res) => {
                    // Filter unique song names
                    const uniqueSongs = res.data.filter((item, index, self) =>
                        index === self.findIndex((t) => (
                            t.songName === item.songName
                        ))
                    );
                    setArtistData(uniqueSongs);
                })
                .catch((err) => {
                    console.log("error", err);
                });
        };

        fetchData();
        // Cleanup function to pause audio when component unmounts
        return () => {
            if (audioRef) {
                audioRef.pause();
            }
        };
    }, [artistName, audioRef]);



    const playSong = (index, post) => {
        const token = localStorage.getItem('token')
        console.log("token", token);

        if (!token) {
            setShowLoginModal(true, post);
            setShow(true);
            return;
        }
      

        if (audioRef) {
            audioRef.pause();
        }
        setCurrentSongIndex(index);
        setShowPlayer(true); // Show player controller
    };

    const addfav = (fav) => {
        axios.post(`https://spotify-backend-nodejs.vercel.com/file/addfav`, fav)
            .then(res => {
                console.log("fav res..1..", res.data, "...", fav);
                alert("added successfully");
            })
            .catch(err => {
                console.log("error", err);
            });
    };

    return (
        <div className=''>
                {/* <table className="table"> */}
                <Table border hover>
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
                            <tr key={post.id}>
                                <td>
                                    <img src={`https://spotify-backend-nodejs.vercel.com/uploads/${post.artistImage}`} style={{ height: "80px", width: "auto" }} alt='artist' />
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
                {/* </table> */}
                </Table>
                {/* Player controller */}
                {showPlayer && currentSongIndex !== null && (
                    <div className="player-controller" style={{ position: "fixed", bottom: "0", left: "50%", transform: "translateX(-50%)", zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 1)", padding: "10px", width: "100%",display: "flex", alignItems: "center" }}>

                        {/* Artist image */}
                        {artistData.length > 0 && (
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <img src={`https://spotify-backend-nodejs.vercel.com/uploads/${artistData[0].artistImage}`} style={{ height: "60px", width: "auto" }} alt='artist' />
                                {currentSongIndex !== null && (
                                    <h3 style={{ marginLeft: "10px", marginBottom: "0" }}>{artistData[currentSongIndex].songName}</h3>
                                )}
                            </div>
                        )}


                        {/* Audio player */}
                        <div className='d-flex justify-content-center ms-5' >
                            <audio
                                controls
                                autoPlay
                                src={`https://spotify-backend-nodejs.vercel.com/uploads/${artistData[currentSongIndex].song}`}
                                ref={(element) => setAudioRef(element)}
                            >
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    </div>
                )}

                {/* model class  */}


                {showLoginModal && (
                    <>
                        {artistData.map((post, index) => (
                            <Modal key={index} show={show} onHide={handleClose}>
                                <Modal.Body>
                                    <div className="row">
                                        <div className="col">
                                            <img src={`https://spotify-backend-nodejs.vercel.com/uploads/${post.artistImage}`} style={{ height: "300px", width: "auto" }} alt='artist' />
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
                        ))}
                    </>
                )}
        </div>
    );
};

export default Artist;
