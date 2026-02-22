
import * as React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useParams} from "react-router-dom";
import Axios from 'axios';


const Home = () => {
    
    return(
      <div style={{paddingLeft: '25%', paddingTop: '100px'}}>
            <Link to="/searchMedia"
                onMouseEnter={e => e.target.style.background = "grey"}
                onMouseLeave={e => e.target.style.background = "black"} 
                 style={{textDecoration: 'none', backgroundColor: 'black', size: '100px',color:'white', fontSize: '20px', padding: '10px 60px', cursor: 'pointer', borderRadius: '5px' }}>
                Search Media Entries
            </Link>
            
            <span style={{padding:'20px'}}></span>
            <Link to="/searchRunSheet"
                onMouseEnter={e => e.target.style.background = "grey"}
                onMouseLeave={e => e.target.style.background = "black"} 
                 style={{textDecoration: 'none', backgroundColor: 'black', size: '100px',color:'white', fontSize: '20px', padding: '10px 60px', cursor: 'pointer', borderRadius: '5px' }}>
                Search Run Sheets
            </Link>
      </div>
    );
}
export default Home;