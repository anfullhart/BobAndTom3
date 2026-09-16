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

  const newButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#f97316",
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
        {/* Main Entry Actions */}
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
            style={newButtonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ea580c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f97316")
            }
          >
            Add New Bit
          </Link>

          <Link
            to="/addToday"
            style={newButtonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "#ea580c")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#f97316")
            }
          >
            Add New Log
          </Link>
        </div>

        {/* Artists / Albums */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/editArtist"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "grey")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Edit Artists
          </Link>

          <Link
            to="/editAlbum"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "grey")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Edit Albums
          </Link>
        </div>

        {/* Celebrities / Seasons */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/editCelebrity"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "grey")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Edit Celebrities
          </Link>

          <Link
            to="/editSeason"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "grey")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Edit Seasons
          </Link>
        </div>

        {/* Sports / Subjects */}
        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            to="/editSport"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "grey")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Edit Sports
          </Link>

          <Link
            to="/editSubject"
            style={buttonStyle}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "grey")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "black")
            }
          >
            Edit Subjects
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Entry;
