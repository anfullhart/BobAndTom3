import { React, useState, useEffect } from "react";
import Home from "../style/home.css";
import { Link } from 'react-router-dom';
import Axios from "axios";
//import e from "cors";
const Entry = () => {
    const [test, setTest] = useState("");
    const API_URL =
      process.env.REACT_APP_API_URL ||
      "https://bobandtombackend-production-fb6d.up.railway.app";
    
    const getTest = () => {
        Axios.get(`${API_URL}`).then((response) =>{
            setTest(response.data);
            

        });
    }
    /*
    useEffect(() => {
        getTest(); 
        
       }, []);
*/
    return (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      flexDirection: "column"
    }}
  >
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        justifyContent: "center"
      }}
    >
      <Link
        to="/addBit"
        onMouseEnter={e => e.target.style.background = "grey"}
        onMouseLeave={e => e.target.style.background = "black"}
        style={{
          textDecoration: "none",
          backgroundColor: "black",
          color: "white",
          fontSize: "20px",
          padding: "10px 60px",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Add New Entry
      </Link>

      <Link
        to="/addToday"
        onMouseEnter={e => e.target.style.background = "grey"}
        onMouseLeave={e => e.target.style.background = "black"}
        style={{
          textDecoration: "none",
          backgroundColor: "black",
          color: "white",
          fontSize: "20px",
          padding: "10px 60px",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        Today's Log
      </Link>
    </div>

    <div style={{ marginTop: "30px" }}>
      <Link
        to="/addArtist"
        onMouseEnter={e => e.target.style.background = "grey"}
        onMouseLeave={e => e.target.style.background = "black"}
        style={{
          textDecoration: "none",
          backgroundColor: "black",
          color: "white",
          fontSize: "20px",
          padding: "10px 60px",
          cursor: "pointer",
          borderRadius: "5px"
        }}
      >
        New Artist
      </Link>
    </div>
  </div>
);
   };

export default Entry;
