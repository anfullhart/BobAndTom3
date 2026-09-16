import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./editPage.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditArtist = () => {
  const [artistName, setArtistName] = useState("");
  const [artistList, setArtistList] = useState([]);
  const [deleteArtist, setDeleteArtist] = useState("");

  useEffect(() => {
    getArtists();
  }, []);

  const getArtists = () => {
    Axios.get(`${API_URL}/api/get/artist`)
      .then((response) => {
        setArtistList(response.data);

        if (response.data.length > 0) {
          setDeleteArtist(response.data[0].ArtistID);
        } else {
          setDeleteArtist("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewArtist = async () => {
    if (!artistName.trim()) {
      window.alert("Please enter an artist name.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/artist`, {
        name: artistName.trim(),
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
    <div className="edit-page">
      <h2 className="edit-page-title">
        Edit Artists
      </h2>

      <div className="edit-card">
        {/* Add Artist */}
        <div className="edit-row">
          <label className="edit-label">
            Artist:
          </label>

          <input
            className="edit-input"
            type="text"
            placeholder="Enter artist name"
            value={artistName}
            onChange={(e) => setArtistName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewArtist();
              }
            }}
          />

          <button
            type="button"
            className="edit-button edit-button-add"
            onClick={addNewArtist}
          >
            Add
          </button>
        </div>

        {/* Delete Artist */}
        <div className="edit-row">
          <label className="edit-label">
            Artists:
          </label>

          <select
            className="edit-select"
            value={deleteArtist}
            onChange={(e) => setDeleteArtist(e.target.value)}
            disabled={artistList.length === 0}
          >
            {artistList.length === 0 ? (
              <option value="">
                No artists available
              </option>
            ) : (
              artistList.map((artist) => (
                <option
                  key={artist.ArtistID}
                  value={artist.ArtistID}
                >
                  {artist.Name}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="edit-button edit-button-delete"
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

export default EditArtist;
