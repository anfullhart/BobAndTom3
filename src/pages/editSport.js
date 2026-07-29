import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditSport = () => {
  const [sport, setSport] = useState("");
  const [sportList, setSportList] = useState([]);
  const [deleteSport, setDeleteSport] = useState("");

  useEffect(() => {
    getSports();
  }, []);

  const getSports = () => {
    Axios.get(`${API_URL}/api/get/sports`).then((response) => {
      setSportList(response.data);
    });
  };

  const addSport = () => {
    if (sport.trim() === "") {
      window.alert("Please enter a sport.");
      return;
    }

    Axios.post(`${API_URL}/api/insert/sport`, {
      sport: sport,
    }).then(() => {
      window.alert(`${sport} added.`);
      window.location.reload(true);
    });
  };

  const removeSport = () => {
    Axios.post(`${API_URL}/api/delete/sport`, {
      deleteSport: deleteSport,
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
        Edit Sports
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
        Sport:
        <input
          style={{
            marginTop: "20px",
            marginLeft: "10px",
            width: "400px",
          }}
          value={sport}
          onChange={(e) => setSport(e.target.value)}
        />

        <button
          className="btn btn-success"
          style={{ marginLeft: "10px" }}
          onClick={addSport}
        >
          Add
        </button>

        <div style={{ marginTop: "20px" }}>
          <label htmlFor="ddlSport">List of Sports:</label>

          <select
            id="ddlSport"
            style={{
              marginLeft: "10px",
              fontSize: "15px",
            }}
            onChange={(e) => setDeleteSport(e.target.value)}
          >
            <option value="">Select Sport</option>

            {sportList.map((val) => (
              <option key={val.SportID} value={val.SportID}>
                {val.Sport}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
            style={{ marginLeft: "10px" }}
            onClick={() => {
              if (window.confirm("Remove sport?")) {
                removeSport();
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

export default EditSport;

