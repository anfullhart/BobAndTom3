import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AddArtist = () => {
  const [artistName, setArtistName] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [deleteArtist, setDeleteArtist] = useState("");

  useEffect(() => {
    getArtists();
  }, []);

  const getArtists = () => {
    Axios.get(`${API_URL}/api/get/artist`).then((response) => {
      setArtistList(response.data);

      if (response.data.length > 0) {
        setDeleteArtist(response.data[0].ArtistID);
      }
    });
  };

  const addNewArtist = async () => {
    if (!artistName.trim()) {
      window.alert("Please enter an artist name.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/artist`, {
        name: artistName,
      });

      window.alert(`${artistName} added successfully!`);

      setArtistName("");
      getArtists();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add artist.");
    }
  };

  const removeArtist = async () => {
    if (!deleteArtist) {
      window.alert("Please select an artist.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/artist`, {
        deleteArtist,
      });

      window.alert("Artist deleted successfully!");

      getArtists();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete artist.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100vh",
        padding: "40px 20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        style={{
          color: "white",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Edit Artists
      </h2>

      <div
        style={{
          backgroundColor: "black",
          color: "white",
          borderRadius: "15px",
          padding: "30px",
          width: "100%",
          maxWidth: "650px",
          boxSizing: "border-box",
        }}
      >
        {/* Add Artist */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "30px",
          }}
        >
          <label
            style={{
              minWidth: "100px",
            }}
          >
            Artist:
          </label>

          <input
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={addNewArtist}
          >
            Add
          </button>
        </div>

        {/* Delete Artist */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          <label
            style={{
              minWidth: "100px",
            }}
          >
            Artists:
          </label>

          <select
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={deleteArtist}
            onChange={(e) => setDeleteArtist(e.target.value)}
          >
            {artistList.map((artist) => (
              <option
                key={artist.ArtistID}
                value={artist.ArtistID}
              >
                {artist.Name}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Remove artist?")) {
                removeArtist();
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddArtist;
