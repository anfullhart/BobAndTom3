import { React, useState, useEffect } from "react";
import Home from "../style/home.css";
import { Link } from 'react-router-dom';
import Axios from "axios";
import e from "cors";
const Entry = () => {
    const [test, setTest] = useState("");

    const getTest = () => {
        Axios.get("http://localhost:3001/").then((response) =>{
            setTest(response.data);
            

        });
    }
    /*
    useEffect(() => {
        getTest(); 
        
       }, []);
*/
    return (
   
    <div  style={{paddingLeft: '28%', paddingTop: '100px'}}>
        <div>
            <Link to="/addBit"
                onMouseEnter={e => e.target.style.background = "grey"}
                onMouseLeave={e => e.target.style.background = "black"} 
                 style={{textDecoration: 'none', backgroundColor: 'black', size: '100px',color:'white', fontSize: '20px', padding: '10px 60px', cursor: 'pointer', borderRadius: '5px' }}>
                Add New Entry
            </Link>
            
            <span style={{padding:'20px'}}></span>
            <Link to="/addToday"
                onMouseEnter={e => e.target.style.background = "grey"}
                onMouseLeave={e => e.target.style.background = "black"} 
                style={{textDecoration: 'none', backgroundColor: 'black', size: '100px',color:'white', fontSize: '20px', padding: '10px 60px', cursor: 'pointer', borderRadius: '5px' }}>
                 Today's Log
            </Link>
           </div>
           <div style={{paddingTop:'50px'}}>
           <Link to="/addArtist"
                onMouseEnter={e => e.target.style.background = "grey"}
                onMouseLeave={e => e.target.style.background = "black"} 
                 style={{textDecoration: 'none', backgroundColor: 'black', size: '100px',color:'white', fontSize: '20px', padding: '10px 60px', marginLeft:'150px', cursor: 'pointer', borderRadius: '5px' }}>
                 New Artist
            </Link>
           </div>
    </div>
   
   
    );
};

export default Entry;