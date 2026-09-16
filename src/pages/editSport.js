import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./editPage.css";

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
    Axios.get(`${API_URL}/api/get/sports`)
      .then((response) => {
        setSportList(response.data);

        if (response.data.length > 0) {
          setDeleteSport(response.data[0].SportID);
        } else {
          setDeleteSport("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSport = async () => {
    if (!sport.trim()) {
      window.alert("Please enter a sport.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/sport`, {
        sport: sport.trim(),
      });

      window.alert(`${sport.trim()} added successfully!`);

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
    <div className="edit-page">
      <h2 className="edit-page-title">
        Edit Sports
      </h2>

      <div className="edit-card">
        {/* Add Sport */}
        <div className="edit-row">
          <label className="edit-label">
            Sport:
          </label>

          <input
            className="edit-input"
            type="text"
            placeholder="Enter sport"
            value={sport}
            onChange={(e) => setSport(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSport();
              }
            }}
          />

          <button
            type="button"
            className="edit-button edit-button-add"
            onClick={addSport}
          >
            Add
          </button>
        </div>

        {/* Delete Sport */}
        <div className="edit-row">
          <label className="edit-label">
            Sports:
          </label>

          <select
            className="edit-select"
            value={deleteSport}
            onChange={(e) => setDeleteSport(e.target.value)}
            disabled={sportList.length === 0}
          >
            {sportList.length === 0 ? (
              <option value="">
                No sports available
              </option>
            ) : (
              sportList.map((item) => (
                <option
                  key={item.SportID}
                  value={item.SportID}
                >
                  {item.Sport}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="edit-button edit-button-delete"
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
