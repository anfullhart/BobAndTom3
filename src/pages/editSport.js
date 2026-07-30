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

      if (response.data.length > 0) {
        setDeleteSport(response.data[0].SportID);
      }
    });
  };

  const addSport = async () => {
    if (!sport.trim()) {
      window.alert("Please enter a sport.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/sport`, {
        sport,
      });

      window.alert(`${sport} added successfully!`);

      setSport("");
      getSports();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add sport.");
    }
  };

  const removeSport = async () => {
    if (!deleteSport) {
      window.alert("Please select a sport.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/sport`, {
        deleteSport,
      });

      window.alert("Sport deleted successfully!");

      getSports();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete sport.");
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
        Edit Sports
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
        {/* Add Sport */}
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
            Sport:
          </label>

          <input
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={sport}
            onChange={(e) => setSport(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={addSport}
          >
            Add
          </button>
        </div>

        {/* Delete Sport */}
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
            Sports:
          </label>

          <select
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={deleteSport}
            onChange={(e) => setDeleteSport(e.target.value)}
          >
            {sportList.map((item) => (
              <option
                key={item.SportID}
                value={item.SportID}
              >
                {item.Sport}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
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
