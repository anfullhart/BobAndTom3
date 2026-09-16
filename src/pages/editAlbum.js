import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./editPage.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditAlbum = () => {
  const [albumName, setAlbumName] = useState("");
  const [albumList, setAlbumList] = useState([]);
  const [deleteAlbum, setDeleteAlbum] = useState("");

  useEffect(() => {
    getAlbums();
  }, []);

  const getAlbums = () => {
    Axios.get(`${API_URL}/api/get/albums`)
      .then((response) => {
        setAlbumList(response.data);

        if (response.data.length > 0) {
          setDeleteAlbum(response.data[0].AlbumID);
        } else {
          setDeleteAlbum("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addAlbum = async () => {
    if (!albumName.trim()) {
      window.alert("Please enter an album name.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/album`, {
        album: albumName.trim(),
      });

      window.alert(`${albumName} added successfully!`);

      setAlbumName("");
      getAlbums();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add album.");
    }
  };

  const removeAlbum = async () => {
    if (!deleteAlbum) {
      window.alert("Please select an album.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/album`, {
        deleteAlbum,
      });

      window.alert("Album deleted successfully!");

      getAlbums();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete album.");
    }
  };

  return (
    <div className="edit-page">
      <h2 className="edit-page-title">
        Edit Albums
      </h2>

      <div className="edit-card">
        {/* Add Album */}
        <div className="edit-row">
          <label className="edit-label">
            Album Name:
          </label>

          <input
            className="edit-input"
            type="text"
            placeholder="Enter album name"
            value={albumName}
            onChange={(e) => setAlbumName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addAlbum();
              }
            }}
          />

          <button
            type="button"
            className="edit-button edit-button-add"
            onClick={addAlbum}
          >
            Add
          </button>
        </div>

        {/* Delete Album */}
        <div className="edit-row">
          <label className="edit-label">
            Albums:
          </label>

          <select
            className="edit-select"
            value={deleteAlbum}
            onChange={(e) => setDeleteAlbum(e.target.value)}
            disabled={albumList.length === 0}
          >
            {albumList.length === 0 ? (
              <option value="">
                No albums available
              </option>
            ) : (
              albumList.map((album) => (
                <option
                  key={album.AlbumID}
                  value={album.AlbumID}
                >
                  {album.Album_Name}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="edit-button edit-button-delete"
            onClick={() => {
              if (window.confirm("Remove album?")) {
                removeAlbum();
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

export default EditAlbum;
