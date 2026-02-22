import { React, useState, useEffect } from "react";
import Home from "../style/home.css";
import { Link } from 'react-router-dom';
import Axios from "axios";
const AddArtist = () => {

    const [artistName, setArtistName] = useState("");
    const [artistList, setArtistList] = useState([])
    const [deleteArtist, setDeleteArtist] = useState("");
  const handleArtistNameChange = (e) => {
    setArtistName(e.target.value);
  };


  useEffect(() => {
    getArtist();
  }, []);
  const getArtist = () => {
    Axios.get("http://localhost:3001/api/get/artist").then((response) => {
      setArtistList(response.data);
    });
  };
  const addNewArtist = () => {
    Axios.post('http://localhost:3001/api/insert/artist/', { name: artistName })
    window.location.reload(true);
  };

  const removeArtist = () => {
    Axios.post('http://localhost:3001/api/delete/artist', {deleteArtist: deleteArtist})
    window.location.reload(true);
  };
    return (
        <div>
        <div style={{color:'white', fontSize:'30px', marginLeft:'40%', marginTop:'75px'}}>Input New Artist
        </div>
        <div style={{paddingLeft:'50px',backgroundColor: "black",color: "white",fontSize: "15px",marginTop: "20px",marginLeft: "25%", borderRadius: "15px",width: "600px", height: "159px",}}>
        Artist: 
        <input style={{marginTop:'20px', marginLeft:'10px', width:'400px'}} onChange={(e) => handleArtistNameChange(e)}></input>
        <button className="btn btn-success" style={{ marginTop: '0px', marginLeft: '10px' }} onClick={() => { window.alert(artistName + " added to the database."); addNewArtist()}}>Add</button>
    
    <div style={{ marginTop:'20px'}}>
    <label style={{color:'white'}} htmlFor="ddlArtist">List of Artists: </label>
          <select
            name="ddlArtist"
            size="1"
            style={{ marginLeft: "10px", fontSize:'15px' }}
            onChange={(e) => {
                setDeleteArtist(e.target.value);
              }}
          >
            {artistList.map((val, key) => {
              return (
                <option key={key} value={val.ArtistID}>
                  {val.Name}
                </option>
              );
            })}
          </select>
          <button className="btn btn-danger" style={{ marginTop: '0px', marginLeft: '10px' }} onClick={() => {if(window.confirm("Remove artist?")) removeArtist()}}>Delete</button>
        </div>
    </div>
    </div>

   
   
    );
};

export default AddArtist;