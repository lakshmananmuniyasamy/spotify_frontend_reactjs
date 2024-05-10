import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { GoBell } from "react-icons/go";
import { Link } from 'react-router-dom';

export const UserPage = () => {
    const [artistData, setArtistData] = useState([]);
    const [currentSong, setCurrentSong] = useState({});
    // const [currentAudio, setCurrentAudio] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
        };

        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/file/getfile`, { headers });
                console.log("response user data============", response);
                setArtistData(response.data);
            } catch (error) {
                console.log("Error fetching artist data:", error);
                // Handle error - maybe show a message to the user
            }
        };

        const getLastSong = () => {
            let songDetail = localStorage.getItem('lastSong');
            if (songDetail) {
                setCurrentSong(JSON.parse(songDetail));
            }
        };

        fetchData();
        getLastSong();

       
        return () => {
            
        };
    }, []);

    const playAudio = (audioSrc) => {
        // If there's already an audio element playing, pause it first
        console.log("befor currensong",currentSong);
        if (currentSong ) {
            console.log("after currensong",currentSong);

            currentSong.current.pause();
        }
          const audio = new Audio(audioSrc);
          setCurrentSong(audio);  
          audio.play();       
    };

    const renderAudioControls = (audioSrc) => {
        return (
            <audio controls autoPlay src={audioSrc} ref={setCurrentSong}>
                Your browser does not support the audio element.
            </audio>
        );
    };

    return (
        <div className='container' style={{ backgroundColor: "rgb(16,16,16)", width: "100%" }}>
            <Navbar expand="lg" className="p-0 navbar-dark w-100%" style={{ position: "sticky", top: 0 }} >
                <Container fluid>
                    {/* Navbar content */}
                    <Navbar.Brand href=""><MdArrowBackIos /></Navbar.Brand>
                    <Navbar.Brand href=""><MdArrowForwardIos /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" className='justify-content-end mt-2'>
                        <Button style={{ borderRadius: "20px" }} variant="outline-light">Explore Premium</Button>
                        &nbsp;
                        <Button style={{ borderRadius: "20px" }} variant="outline-light">Install App</Button>
                        &nbsp;&nbsp;&nbsp;
                        <Navbar.Brand href=""><GoBell /></Navbar.Brand>
                        <Link to="/">
                            <Button style={{ borderRadius: "20px" }} variant="outline-light"
                                onClick={() => {
                                    const confirm = window.confirm("Are you sure you want to Log out?")
                                    if (confirm) {
                                        localStorage.removeItem('token');
                                        window.location.href = "/"
                                    }
                                }}>Log Out</Button>
                        </Link>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <div>UserPage</div>

            {/* Render artist cards for each category */}
            <div className="category-container">
                {artistData.map((artist, index) => (
                    <div key={index} className="category-row">
                        <h2>{artist.category}</h2>
                        <div className="artist-cards">
                            <div key={index} className="artist-card">
                                <img src={`http://localhost:8080/uploads/${artist.artistImage}`} alt="artist" />
                                <h5>{artist.songName}</h5>
                                <button className="btn btn-success btn-sm" onClick={() => playAudio(artist.song)}>
                                    Play
                                </button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bottom">
                <div className="playing-song">
                    <div className="song-details">
                        <img src={`http://localhost:8080/uploads/${currentSong.songImage}`} className="song-image" id="coverImage" />
                        <div className="song-info">
                            <span id="songTitle">{currentSong.songName}</span>
                            <p id="writerName">{currentSong.artistName}</p>
                        </div>
                    </div>
                    {currentSong && renderAudioControls(`http://localhost:8080/uploads/${currentSong.song}`)}

                </div>
            </div>
        </div>
    );
};



