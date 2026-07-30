import React, { useState, useEffect } from "react";
import Axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "https://bobandtombackend-production-fb6d.up.railway.app";
const EditAlbum = () => {
  const [albumName, setAlbumName] = useState("");
  const [albumList, setAlbumList] = useState([]); 
  const [deleteAlbum, setDeleteAlbum] = useState("");
  useEffect(() => { 
    getAlbums(); 
  }, []); 
  const getAlbums = () => {
    Axios.get(${API_URL}/api/get/albums)
      .then((response) => {
        setAlbumList(response.data);
  }); };
const addAlbum = async () => {
  try { 
    await Axios.post(${API_URL}/api/insert/album, { album: albumName });
    window.alert(albumName + " added successfully!");
    setAlbumName(""); 
    getAlbums();
  } catch (error)
  { console.log(error); 
   window.alert("Failed to add album.");
  } }; const removeAlbum = async () => { 
  try { await Axios.post(${API_URL}/api/delete/album, { deleteAlbum: deleteAlbum }); 
    window.alert("Album deleted successfully!");
       getAlbums(); } 
  catch(error) { 
    console.log(error); 
    window.alert("Failed to delete album."); } 
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
      Edit Albums
    </h2>

    <div
      style={{
        backgroundColor: "black",
        color: "white",
        borderRadius: "15px",
        padding: "30px",
        width: "100%",
        maxWidth: "650px",
      }}
    >
      {/* Add Album */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <label style={{ minWidth: "100px" }}>Album Name:</label>

        <input
          style={{
            flex: 1,
            minWidth: "250px",
          }}
          value={albumName}
          onChange={(e) => setAlbumName(e.target.value)}
        />

        <button
          className="btn btn-success"
          onClick={addAlbum}
        >
          Add
        </button>
      </div>

      {/* Delete Album */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap",
          marginTop: "30px",
        }}
      >
        <label style={{ minWidth: "100px" }}>List of Albums:</label>

        <select
          style={{
            flex: 1,
            minWidth: "250px",
          }}
          value={deleteAlbum}
          onChange={(e) => setDeleteAlbum(e.target.value)}
        >
          <option value="">Select Album</option>

          {albumList.map((val) => (
            <option
              key={val.AlbumID}
              value={val.AlbumID}
            >
              {val.Album_Name}
            </option>
          ))}
        </select>

        <button
          className="btn btn-danger"
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
export default EditAlbum;
