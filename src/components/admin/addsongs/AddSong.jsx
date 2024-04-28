import React, { useState } from 'react'
// import ReactPlayer from 'react-player';
import axios from 'axios';

export const AddSong = () => {

    //song upload
    const [selectedSong, setSelectedSong] = useState(null);

    //Artist image upload 
    const [selectedArtistImage, setSelectedArtistImage] = useState(null);

    //song image upload
    const [selectedSongImage, setSelectedSongImage] = useState(null);

    //add detils in database
    const [file, setFile] = useState({
        songname: "",
        language: "",
        artistname: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFile({ ...file, [name]: value })
        console.log(name, value);
    }

    const Addfiles = () => {
        console.log("Uploading files...");

        const formData = new FormData();
        formData.append("songName", file.songname);
        formData.append("language", file.language);
        formData.append("artistName", file.artistname);
        formData.append("artistImage", selectedArtistImage);
        formData.append("songImage", selectedSongImage);
        formData.append("song", selectedSong);

        axios.post("https://spotify-backend-nodejs.vercel.com/file/upload", formData, {
            headers: {
            "Content-Type": "multipart/form-data"
        }
        })
            .then(response => {
            console.log("Response:", response.data);
            alert("Song Added successfully")
            // Handle success response from the backend
        })
    .catch(error => {
        console.log("Error:", error);
        // Handle error
    });
    };


return (
    <div>

        {selectedArtistImage && (
            <div>
                <img
                    alt="not found"
                    width={"250px"} height={"250px"}
                    src={URL.createObjectURL(selectedArtistImage)}
                />
                <br />
                <button onClick={() => setSelectedArtistImage(null)}>RemoveArtistImage</button>
            </div>
        )}

        {selectedSongImage && (
            <div>
                <img
                    alt="not found"
                    width={"250px"}
                    src={URL.createObjectURL(selectedSongImage)}
                />
                <br />
                <button onClick={() => setSelectedSongImage(null)}>RemoveSongImage</button>
            </div>
        )}<br /><br />

        {selectedSong && (
            <div>
                <audio controls>
                    <source src={URL.createObjectURL(selectedSong)} type='audio/mpeg' />
                </audio>
                <button onClick={() => setSelectedSong(null)}>RemoveSong</button>
            </div>
        )}

        <center>
            <div id='form1' className='bg-info'>
                <input type="text" name='songname' value={file.songname} onChange={handleChange} placeholder='enter a song name' />
                <input type="text" name='language' value={file.languge} onChange={handleChange} placeholder='enter a language' />
                <input type="text" name='artistname' value={file.artistname} onChange={handleChange} placeholder='enter a artist name' />
                <br />
                <label htmlFor="artistimage" className="file-input-label">Choose an artist image</label>
                <input id="artistimage" type="file" name="artistimage" onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedArtistImage(event.target.files[0]);
                }} /><br /><br />

                <label htmlFor="audioimage" className="file-input-label">Choose an audio image</label>
                <input id='audioimage' type='file' name='songimage' onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedSongImage(event.target.files[0]);
                }} /><br /><br />
                <label htmlFor="audio" className="file-input-label">Choose an audio</label>
                <input id='audio' type="file" accept='audio/*' name="song" onChange={(event) => {
                    console.log(event.target.files[0]);
                    setSelectedSong(event.target.files[0]);
                }} /><br /><br />
                <button onClick={() => Addfiles()}>Add</button>
                {/* <ReactPlayer url={audiourl} playing controls /> */}
            </div>
        </center>
    </div>
)
}







