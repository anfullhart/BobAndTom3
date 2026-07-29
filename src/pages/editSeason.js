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
    });
  };

  const addSeason = () => {
    if (season.trim() === "") {
      window.alert("Please enter a season.");
      return;
    }

    Axios.post(`${API_URL}/api/insert/season`, {
      season: season,
    }).then(() => {
      window.alert(`${season} added.`);
      window.location.reload(true);
    });
  };

  const removeSeason = () => {
    Axios.post(`${API_URL}/api/delete/season`, {
      deleteSeason: deleteSeason,
    }).then(() => {
      window.location.reload(true);
    });
  };

  return (
    <div>
      <div
        style={{
          color: "white",
          fontSize: "30px",
          marginLeft: "40%",
          marginTop: "75px",
        }}
      >
        Edit Seasons
      </div>

      <div
        style={{
          paddingLeft: "50px",
          backgroundColor: "black",
          color: "white",
          fontSize: "15px",
          marginTop: "20px",
          marginLeft: "25%",
          borderRadius: "15px",
          width: "600px",
          height: "160px",
        }}
      >
        Season:
        <input
          style={{
            marginTop: "20px",
            marginLeft: "10px",
            width: "400px",
          }}
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        />

        <button
          className="btn btn-success"
          style={{ marginLeft: "10px" }}
          onClick={addSeason}
        >
          Add
        </button>

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="ddlSeason">List of Seasons:</label>

          <select
            id="ddlSeason"
            style={{
              marginLeft: "10px",
              fontSize: "15px",
            }}
            onChange={(e) => setDeleteSeason(e.target.value)}
          >
            <option value="">Select Season</option>

            {seasonList.map((val) => (
              <option
                key={val.SeasonID}
                value={val.SeasonID}
              >
                {val.Season}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
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