import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Entry = () => {
  const [test, setTest] = useState("");

  const API_URL =
    process.env.REACT_APP_API_URL ||
    "https://bobandtombackend-production-fb6d.up.railway.app";

  const getTest = () => {
    Axios.get(`${API_URL}`).then((response) => {
      setTest(response.data);
    });
  };

  const buttonStyle = {
    textDecoration: "none",
    backgroundColor: "black",
    color: "white",
    fontSize: "20px",
    padding: "12px 50px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    transition: "background-color 0.2s ease",
    minWidth: "240px",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        width: "100%",
        paddingTop: "15vh",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/addBit"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
          >
            Add New Entry
          </Link>

          <Link
            to="/addToday"
            style={buttonStyle}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
          >
            Today's Log
          </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
        <Link
          to="/addArtist"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          New Artist
        </Link>

        <Link
          to="/editCelebrity"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Edit Celebrities
        </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
        <Link
          to="/editSeason"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Edit Seasons
        </Link>
        <Link
          to="/editSport"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Edit Sports
        </Link>
        </div>
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
            <Link
          to="/editSubject"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Edit Subjects
        </Link>
        <Link
          to="/editAlbum"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Edit Albums
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Entry;