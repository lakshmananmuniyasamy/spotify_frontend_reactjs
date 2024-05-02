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

    const [selectedOption, setSelectedOption] = useState('');

    //add detils in database
    const [file, setFile] = useState({
        songName: "",
        language: "",
        artistName: "",
    })

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFile({ ...file, [name]: value })
        console.log(name, value);
    }

    const handleChange1 = (event) => {
        setSelectedOption(event.target.value);
        console.log("category",event.target.value);
      };

    const Addfiles = () => {
        console.log("Uploading files...");

        const formData = new FormData();
        formData.append("songName", file.songName);
        formData.append("language", file.language);
        formData.append("artistName", file.artistName);
        formData.append("artistImage", selectedArtistImage);
        formData.append("songImage", selectedSongImage);
        formData.append("song", selectedSong);
        formData.append("category", selectedOption);

        axios.post("http://localhost:8080/file/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
            .then(response => {
                console.log("Response:", response.data);
                alert("Song Added successfully")
                clearInputFields();
            })
            .catch(error => {
                console.log("Error:", error);
                // Handle error
            });
        const clearInputFields = () => {
            // Clear input fields
            setFile({
                songName: "",
                language: "",
                artistName: ""
            });
            setSelectedArtistImage(null);
            setSelectedSongImage(null);
            setSelectedSong(null);
            setSelectedOption("");
        };
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
                    <input type="text" name='songName' value={file.songName} onChange={handleChange} placeholder='enter a song name' />
                    <input type="text" name='language' value={file.language} onChange={handleChange} placeholder='enter a language' />
                    <input type="text" name='artistName' value={file.artistName} onChange={handleChange} placeholder='enter a artist name' />
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
                    <select value={selectedOption} onChange={handleChange1}>
                        <option value="">Select a categeroy</option>
                        <option value="oldsongs">old songs</option>
                        <option value="lovesongs">love songs</option>
                        <option value="feelingsongs">feelig songs</option>
                        <option value="topsongs">top songs</option>
                    </select><br /><br />
                    <button onClick={() => Addfiles()}>Add</button>
                    {/* <ReactPlayer url={audiourl} playing controls /> */}
                </div>
            </center>
        </div>
    )
}







