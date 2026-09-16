import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./editPage.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditSubject = () => {
  const [subject, setSubject] = useState("");
  const [subjectList, setSubjectList] = useState([]);
  const [deleteSubject, setDeleteSubject] = useState("");

  useEffect(() => {
    getSubjects();
  }, []);

  const getSubjects = () => {
    Axios.get(`${API_URL}/api/get/subjects`)
      .then((response) => {
        setSubjectList(response.data);

        if (response.data.length > 0) {
          setDeleteSubject(response.data[0].SubID);
        } else {
          setDeleteSubject("");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addSubject = async () => {
    if (!subject.trim()) {
      window.alert("Please enter a subject.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/subject`, {
        subject: subject.trim(),
      });

      window.alert(`${subject} added successfully!`);

      setSubject("");
      getSubjects();
    } catch (error) {
      console.log(error);
      window.alert("Failed to add subject.");
    }
  };

  const removeSubject = async () => {
    if (!deleteSubject) {
      window.alert("Please select a subject.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/delete/subject`, {
        deleteSubject,
      });

      window.alert("Subject deleted successfully!");

      getSubjects();
    } catch (error) {
      console.log(error);
      window.alert("Failed to delete subject.");
    }
  };

  return (
    <div className="edit-page">
      <h2 className="edit-page-title">
        Edit Subjects
      </h2>

      <div className="edit-card">
        {/* Add Subject */}
        <div className="edit-row">
          <label className="edit-label">
            Subject:
          </label>

          <input
            className="edit-input"
            type="text"
            placeholder="Enter subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addSubject();
              }
            }}
          />

          <button
            type="button"
            className="edit-button edit-button-add"
            onClick={addSubject}
          >
            Add
          </button>
        </div>

        {/* Delete Subject */}
        <div className="edit-row">
          <label className="edit-label">
            Subjects:
          </label>

          <select
            className="edit-select"
            value={deleteSubject}
            onChange={(e) => setDeleteSubject(e.target.value)}
            disabled={subjectList.length === 0}
          >
            {subjectList.length === 0 ? (
              <option value="">
                No subjects available
              </option>
            ) : (
              subjectList.map((item) => (
                <option
                  key={item.SubID}
                  value={item.SubID}
                >
                  {item.Subject}
                </option>
              ))
            )}
          </select>

          <button
            type="button"
            className="edit-button edit-button-delete"
            onClick={() => {
              if (window.confirm("Remove subject?")) {
                removeSubject();
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

export default EditSubject;
