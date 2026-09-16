import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EditPage.css";

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
    Axios.get(`${API_URL}/api/get/seasons`)
      .then((response) => {
        setSeasonList(response.data);

        if (response.data.length > 0) {
          setDeleteSeason(response.data[0].SeasonID);
        } else {
          setDeleteSeason("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSeason = async () => {
    if (!season.trim()) {
      window.alert("Please enter a season.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/season`, {
        season: season.trim(),
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
    <div className="edit-page">
      <h2 className="edit-page-title">
        Edit Seasons
      </h2>

      <div className="edit-card">
        {/* Add Season */}
        <div className="edit-row">
          <label className="edit-label">
            Season:
          </label>

          <input
            className="edit-input"
            type="text"
            placeholder="Enter season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSeason();
              }
            }}
          />

          <button
            type="button"
            className="edit-button edit-button-add"
            onClick={addSeason}
          >
            Add
          </button>
        </div>

        {/* Delete Season */}
        <div className="edit-row">
          <label className="edit-label">
            Seasons:
          </label>

          <select
            className="edit-select"
            value={deleteSeason}
            onChange={(e) => setDeleteSeason(e.target.value)}
            disabled={seasonList.length === 0}
          >
            {seasonList.length === 0 ? (
              <option value="">
                No seasons available
              </option>
            ) : (
              seasonList.map((item) => (
                <option
                  key={item.SeasonID}
                  value={item.SeasonID}
                >
                  {item.Season}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="edit-button edit-button-delete"
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
