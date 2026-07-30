import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditSeason = () => {
  const [season, setSeason] = useState("");
  const [seasonList, setSeasonList] = useState([]);
  const [deleteSeason, setDeleteSeason] = useState("");

  useEffect(() => {
    getSeasons();
  }, []);

  const getSeasons = () => {
    Axios.get(`${API_URL}/api/get/seasons`).then((response) => {
      setSeasonList(response.data);

      if (response.data.length > 0) {
        setDeleteSeason(response.data[0].SeasonID);
      }
    });
  };

  const addSeason = async () => {
    if (!season.trim()) {
      window.alert("Please enter a season.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/season`, {
        season,
      });

      window.alert(`${season} added successfully!`);

      setSeason("");
      getSeasons();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add season.");
    }
  };

  const removeSeason = async () => {
    if (!deleteSeason) {
      window.alert("Please select a season.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/season`, {
        deleteSeason,
      });

      window.alert("Season deleted successfully!");

      getSeasons();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete season.");
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
        Edit Seasons
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
        {/* Add Season */}
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
            Season:
          </label>

          <input
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={addSeason}
          >
            Add
          </button>
        </div>

        {/* Delete Season */}
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
            Seasons:
          </label>

          <select
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={deleteSeason}
            onChange={(e) => setDeleteSeason(e.target.value)}
          >
            {seasonList.map((item) => (
              <option
                key={item.SeasonID}
                value={item.SeasonID}
              >
                {item.Season}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
            onClick={() => {
              if (window.confirm("Remove season?")) {
                removeSeason();
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

export default EditSeason;
