import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player';

export const Playlist = () => {
    const [posts, SetPosts] = useState();

    const fetchData = () => {
      axios.get("https://spotify-backend-nodejs.vercel.com/file/getaddfav")
        .then((res) => {
          Object.keys(res.data).forEach(key => {
            console.log(key, res.data[key]);
            console.log("===img==" + res.data[key].artistImage);
          });
          SetPosts(res.data);
        }).catch((err) => {
          console.log("error", err);
        })
    };
    useEffect(() => {
      fetchData();
    }, []);
  return (
    
    <div>
    <h1 className='text-center'>Play List</h1>
    <div className="container">
      <div className='row'>
        {Array.isArray(posts) && posts.map((post) => (
          <div className="card m-2 col-12 col-sm-6 col-md-4 col-lg-3" key={post.id}>
            {/* <img src={`http://localhost:8080/uploads/${post.artistImage}`} style={{ height: "180px", width: "100%" }} className="card-img-top" alt='artist image' /> */}
            <img src={`https://spotify-backend-nodejs.vercel.com/uploads/${post.artistImage}`} style={{ height: "180px", width: "100%" }} className="card-img-top" alt='songimage' />
            <div className='card-body'> 
              <ReactPlayer
                url={`https://spotify-backend-nodejs.vercel.com/uploads/audio/${post.song}`}
                controls={true}
                width='100%'
                height='50px'
              />
              {/* <audio controls style={{ width: '100%' }}>
                <source src={`http://localhost:8080/uploads/audio/${post.song}`} type="audio/mpeg" />
              </audio> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
)
  
}
