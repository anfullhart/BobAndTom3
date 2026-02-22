import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const EditBit = () => {
  const locationState = useLocation().state || {};
  const searchBitID = locationState.bitID;
  const navigate = useNavigate();

  
  // --- Form State ---
  const [formData, setFormData] = useState({
    type: "",
    title: "",
    category: "",
    artist: "",
    date: "",
    time: "",
    autoNum: "",
    sub1: "",
    sub2: "",
    sub3: "",
    sub4: "",
    celebrity1: "",
    celebrity2: "",
    sport: [],
    season: "",
    keywords: "",
    hyperlink: "",
    album1: "",
    track1: "",
    album2: "",
    track2: "",
    album3: "",
    track3: "",
    album4: "",
    track4: "",
  });

  const [lists, setLists] = useState({
    bitList: [],
    celebList: [],
    subjectList: [],
    artistList: [],
    categoryList: [],
    sportList: [],
    seasonList: [],
    albumList: [],
  });

  // --- Load initial data ---
  useEffect(() => {
    if (!searchBitID) return;

    const fetchData = async () => {
      try {
        const [
          bitRes,
          celebRes,
          subjectRes,
          artistRes,
          categoryRes,
          sportRes,
          seasonRes,
          albumRes,
          sportInfoRes,
        ] = await Promise.all([
          Axios.get(`http://localhost:3001/api/get/bit/info/${searchBitID}`),
          Axios.get("http://localhost:3001/api/get/celebrity"),
          Axios.get("http://localhost:3001/api/get/subject"),
          Axios.get("http://localhost:3001/api/get/artist"),
          Axios.get("http://localhost:3001/api/get/category"),
          Axios.get("http://localhost:3001/api/get/sport"),
          Axios.get("http://localhost:3001/api/get/season"),
          Axios.get("http://localhost:3001/api/get/album"),
          Axios.get(`http://localhost:3001/api/get/sport/info/${searchBitID}`),
        ]);

        // Set lists
        setLists({
          bitList: bitRes.data,
          celebList: celebRes.data,
          subjectList: subjectRes.data,
          artistList: artistRes.data,
          categoryList: categoryRes.data,
          sportList: sportRes.data,
          seasonList: seasonRes.data,
          albumList: albumRes.data,
        });

        // Prefill form with backend data if available
        if (bitRes.data && bitRes.data.length > 0) {
          const bit = bitRes.data[0];
          setFormData({
            ...formData,
            type: bit.Type || "",
            title: bit.Title || "",
            date: bit.AirDate || "",
            time: bit.Time || "",
            autoNum: bit.ProphetNum || "",
            category: bit.Category || "",
            artist: bit.Artist || "",
            sub1: bit.Sub1 || "",
            sub2: bit.Sub2 || "",
            sub3: bit.Sub3 || "",
            sub4: bit.Sub4 || "",
            celebrity1: bit.Celebrity1 || "",
            celebrity2: bit.Celebrity2 || "",
            sport: sportInfoRes.data || [],
            season: bit.Season || "",
            keywords: bit.Keywords || "",
            hyperlink: bit.Hyperlink || "",
            album1: bit.Album1 || "",
            track1: bit.Track1 || "",
            album2: bit.Album2 || "",
            track2: bit.Track2 || "",
            album3: bit.Album3 || "",
            track3: bit.Track3 || "",
            album4: bit.Album4 || "",
            track4: bit.Track4 || "",
          });
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [searchBitID]);

  // --- Handlers ---
  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };
  

  const handleConfirm = async (e) => {
    e.preventDefault();
    try {
      await Axios.post("http://localhost:3001/api/update/bit", {
        bitID: searchBitID,
        ...formData,
      });
      alert("Bit updated successfully!");
    } catch (err) {
      console.error("Error updating bit:", err);
      alert("Failed to update bit");
    }
  };

  const handleCancel = (e) => {
  e.preventDefault();
  // Reset form
  setFormData({
    type: "",
    title: "",
    category: "",
    artist: "",
    date: "",
    time: "",
    autoNum: "",
    sub1: "",
    sub2: "",
    sub3: "",
    sub4: "",
    celebrity1: "",
    celebrity2: "",
    sport: [],
    season: "",
    keywords: "",
    hyperlink: "",
    album1: "",
    track1: "",
    album2: "",
    track2: "",
    album3: "",
    track3: "",
    album4: "",
    track4: "",
  });
  
  // Navigate back to previous page
  navigate(-1);
};

  return (
    <form style={{ padding: "20px" }}>
      {/* General Info */}
      <section
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#979bdb" }}>General Information</h2>
        <div style={{ marginBottom: "10px" }}>
          <label>Media Title: </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => handleChange("title", e.target.value)}
            style={{ marginLeft: "5px", width: "300px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Media Type: </label>
          <select
            value={formData.type}
            onChange={(e) => handleChange("type", e.target.value)}
            style={{ marginLeft: "5px" }}
          >
            <option value="">Select Type</option>
            <option value="Bit">Bit</option>
            <option value="Segment">Segment</option>
            <option value="Video">Video</option>
          </select>
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Original Air Date: </label>
          <input
            type="text"
            placeholder="YYYY-MM-DD"
            value={formData.date}
            onChange={(e) => handleChange("date", e.target.value)}
            style={{ marginLeft: "5px", width: "150px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Time: </label>
          <input
            type="text"
            placeholder="00:00:00"
            value={formData.time}
            onChange={(e) => handleChange("time", e.target.value)}
            style={{ marginLeft: "5px", width: "100px" }}
          />
        </div>
        <div style={{ marginBottom: "10px" }}>
          <label>Automation Number: </label>
          <input
            type="text"
            value={formData.autoNum}
            onChange={(e) => handleChange("autoNum", e.target.value)}
            style={{ marginLeft: "5px", width: "150px" }}
          />
        </div>
      </section>

      {/* Hyperlink Info */}
      <section
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#979bdb" }}>Hyperlink Information</h2>
        <input
          type="text"
          placeholder="Enter a link to a valid media source"
          value={formData.hyperlink}
          onChange={(e) => handleChange("hyperlink", e.target.value)}
          style={{ width: "100%" }}
        />
      </section>

      {/* Album Info */}
      <section
        style={{
          backgroundColor: "#1a1a1a",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
        }}
      >
        <h2 style={{ color: "#979bdb" }}>Album Information</h2>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ marginBottom: "10px" }}>
            <label>Album {i}: </label>
            <select
              value={formData[`album${i}`]}
              onChange={(e) => handleChange(`album${i}`, e.target.value)}
              style={{ marginLeft: "5px", width: "200px" }}
            >
              <option value="">Select Album</option>
              {lists.albumList.map((val) => (
                <option key={val.AlbumID} value={val.AlbumID}>
                  {val.Album_Name}
                </option>
              ))}
            </select>
            <label style={{ marginLeft: "10px" }}>Track: </label>
            <input
              type="text"
              value={formData[`track${i}`]}
              onChange={(e) => handleChange(`track${i}`, e.target.value)}
              style={{ width: "100px", marginLeft: "5px" }}
            />
          </div>
        ))}
      </section>

      {/* Buttons */}
      <div style={{ marginTop: "20px" }}>
        <button
          onClick={handleConfirm}
          className="btn btn-success"
          style={{ marginRight: "10px" }}
        >
          Confirm Edits
        </button>
        <button onClick={handleCancel} className="btn btn-danger">
          Cancel Edits
        </button>
      </div>
    </form>
  );
};

export default EditBit;
