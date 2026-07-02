import * as React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const buttonStyle = {
    textDecoration: "none",
    backgroundColor: "black",
    color: "white",
    fontSize: "20px",
    padding: "12px 60px",
    cursor: "pointer",
    borderRadius: "5px",
    textAlign: "center",
    transition: "background-color 0.2s ease",
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",   // Centers horizontally
        alignItems: "flex-start",   // Keeps content toward the top
        minHeight: "100vh",
        paddingTop: "15vh",         // Places buttons in the upper-middle
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",         // Stacks nicely on smaller screens
          justifyContent: "center",
        }}
      >
        <Link
          to="/searchMedia"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Search Media Entries
        </Link>

        <Link
          to="/searchRunSheet"
          style={buttonStyle}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "grey")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "black")}
        >
          Search Run Sheets
        </Link>
      </div>
    </div>
  );
};

export default Home;