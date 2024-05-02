



// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { Button, Container, Navbar } from 'react-bootstrap';
// import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
// import { GoBell } from "react-icons/go";
// import { Link, useParams } from 'react-router-dom';

// export const UserPage = () => {
//     const { userName } = useParams();
//     const [artistData, setArtistData] = useState([]);
//     const [currentSongIndex, setCurrentSongIndex] = useState(null);
//     const [audioRef, setAudioRef] = useState(null);

//     useEffect(() => {
//         const token = localStorage.getItem('token');
//         const headers = {
           
//             'Authorization': `${token}`,
//             'Content-Type': 'application/json',
           
//         };

//         const fetchData = async () => {
//             // try {
//             //     const response = await axios.get(`http://localhost:8080/form/findbyuserName/${userName}`,{headers});
//             //     console.log("response user data============",response);
//             //     setArtistData(response.data);
//             // } catch (error) {
//             //     console.log("Error fetching artist data:", error);
//             // }
//             try {
//                 const response = await axios.get(`http://localhost:8080/file/getfile`,{headers});
//                 console.log("response user data============",response);
//                 setArtistData(response.data);
//             } catch (error) {
//                 console.log("Error fetching artist data:", error);
//             }
//         };
//         fetchData();
//     }, []);

//     return (
//         <>
//             <div className='container' style={{ backgroundColor: "rgb(16,16,16)" }}>
//                 <Navbar expand="lg" className="p-0 navbar-dark w-100%">
//                     <Container fluid>
//                         <Navbar.Brand href=""><MdArrowBackIos /></Navbar.Brand>
//                         <Navbar.Brand href=""><MdArrowForwardIos /></Navbar.Brand>
//                         <Navbar.Toggle aria-controls="navbarScroll" />
//                         <Navbar.Collapse id="navbarScroll" className='justify-content-end mt-2'>
//                             <Button style={{ borderRadius: "20px" }} variant="outline-light">Explore Premium</Button>
//                             &nbsp;
//                             <Button style={{ borderRadius: "20px" }} variant="outline-light">Install App</Button>
//                             &nbsp;&nbsp;&nbsp;
//                             <Navbar.Brand href=""><GoBell /></Navbar.Brand>
//                             <Link to="/"><Button style={{ borderRadius: "20px" }} variant="outline-light" 
//                             onClick={()=>{
//                                 const confirm = window.confirm("Are you sure you want to Log out?")
//                                 if(confirm){
//                                     localStorage.removeItem('token');
//                                     window.location.href="/"
//                                 }
                                
//                             }}>Log Out</Button></Link>
//                         </Navbar.Collapse>
//                     </Container>
//                 </Navbar>
//                 <div>UserPage</div>

//                 <div className="player-controller" style={{ position: "fixed", bottom: "0", left: "50%", transform: "translateX(-50%)", zIndex: "9999", backgroundColor: "rgba(0, 0, 0, 1)", padding: "10px", width: "100%", display: "flex", alignItems: "center" }}>
//                     {/* Artist image */}
//                     {artistData.length > 0 && currentSongIndex !== null && (
//                         <div style={{ display: "flex", alignItems: "center" }}>
//                             <img src={`http://localhost:8080/uploads/${artistData[currentSongIndex].artistImage}`} style={{ height: "60px", width: "auto" }} alt='artist' />
//                             <h3 style={{ marginLeft: "10px", marginBottom: "0" }}>{artistData[currentSongIndex].songName}</h3>
//                         </div>
//                     )}

//                     {/* Audio player */}
//                     {artistData.length > 0 && currentSongIndex !== null && (
//                         <div className='d-flex justify-content-center ms-5'>
//                             <audio
//                                 controls
//                                 autoPlay
//                                 src={`http://localhost:8080/uploads/${artistData[currentSongIndex].song}`}
//                                 ref={(element) => setAudioRef(element)}
//                             >
//                                 Your browser does not support the audio element.
//                             </audio>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };


import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Container, Navbar } from 'react-bootstrap';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';
import { GoBell } from "react-icons/go";
import { Link } from 'react-router-dom';

export const UserPage = () => {
    const [artistData, setArtistData] = useState([]);

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

        fetchData();

        // Cleanup function
        return () => {
            // Cleanup tasks, if any
        };
    }, []);

    // Function to group artists by category
    const groupArtistsByCategory = () => {
        const groupedArtists = {};
        artistData.forEach(artist => {
            if (!groupedArtists[artist.category]) {
                groupedArtists[artist.category] = [];
            }
            groupedArtists[artist.category].push(artist);
        });
        return groupedArtists;
    };

    // Render artist cards for each category
    const renderArtistCards = () => {
        const groupedArtists = groupArtistsByCategory();
        return Object.entries(groupedArtists).map(([category, artists], index) => (
            <div key={index} className="category-row">
                <h2>{category}</h2>
                <div className="artist-cards">
                    {artists.map((artist, index) => (
                        <div key={index} className="artist-card">
                            <img src={`http://localhost:8080/uploads/${artist.artistImage}`} alt="artist" />
                            <h3>{artist.songName}</h3>
                            <audio controls autoPlay src={`http://localhost:8080/uploads/${artist.song}`}>
                                Your browser does not support the audio element.
                            </audio>
                        </div>
                    ))}
                </div>
            </div>
        ));
    };

    return (
        <div className='container' style={{ backgroundColor: "rgb(16,16,16)" }}>
            <Navbar expand="lg" className="p-0 navbar-dark w-100%">
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
                {renderArtistCards()}
            </div>
        </div>
    );
};
