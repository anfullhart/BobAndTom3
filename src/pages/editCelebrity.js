import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./EditPage.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditCelebrity = () => {
  const [celebName, setCelebName] = useState("");
  const [celebrityList, setCelebrityList] = useState([]);
  const [deleteCelebrity, setDeleteCelebrity] = useState("");

  useEffect(() => {
    getCelebrities();
  }, []);

  const getCelebrities = () => {
    Axios.get(`${API_URL}/api/get/celebrities`)
      .then((response) => {
        setCelebrityList(response.data);

        if (response.data.length > 0) {
          setDeleteCelebrity(response.data[0].CelebID);
        } else {
          setDeleteCelebrity("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addNewCelebrity = async () => {
    if (!celebName.trim()) {
      window.alert("Please enter a celebrity name.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/celebrity`, {
        name: celebName.trim(),
      });

      window.alert(`${celebName} added successfully!`);

      setCelebName("");
      getCelebrities();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add celebrity.");
    }
  };

  const removeCelebrity = async () => {
    if (!deleteCelebrity) {
      window.alert("Please select a celebrity.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/celebrity`, {
        deleteCelebrity,
      });

      window.alert("Celebrity deleted successfully!");

      getCelebrities();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete celebrity.");
    }
  };

  return (
    <div className="edit-page">
      <h2 className="edit-page-title">
        Edit Celebrities
      </h2>

      <div className="edit-card">
        {/* Add Celebrity */}
        <div className="edit-row">
          <label className="edit-label">
            Celebrity:
          </label>

          <input
            className="edit-input"
            type="text"
            placeholder="Enter celebrity name"
            value={celebName}
            onChange={(e) => setCelebName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addNewCelebrity();
              }
            }}
          />

          <button
            type="button"
            className="edit-button edit-button-add"
            onClick={addNewCelebrity}
          >
            Add
          </button>
        </div>

        {/* Delete Celebrity */}
        <div className="edit-row">
          <label className="edit-label">
            Celebrities:
          </label>

          <select
            className="edit-select"
            value={deleteCelebrity}
            onChange={(e) => setDeleteCelebrity(e.target.value)}
            disabled={celebrityList.length === 0}
          >
            {celebrityList.length === 0 ? (
              <option value="">
                No celebrities available
              </option>
            ) : (
              celebrityList.map((celebrity) => (
                <option
                  key={celebrity.CelebID}
                  value={celebrity.CelebID}
                >
                  {celebrity.Name}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="edit-button edit-button-delete"
            onClick={() => {
              if (window.confirm("Remove celebrity?")) {
                removeCelebrity();
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

export default EditCelebrity;
