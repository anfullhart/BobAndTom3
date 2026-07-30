import React, { useState, useEffect } from "react";
import Axios from "axios";

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
    Axios.get(`${API_URL}/api/get/subjects`).then((response) => {
      setSubjectList(response.data);

      if (response.data.length > 0) {
        setDeleteSubject(response.data[0].SubID);
      }
    });
  };

  const addSubject = async () => {
    if (!subject.trim()) {
      window.alert("Please enter a subject.");
      return;
    }

    try {
      await Axios.post(`${API_URL}/api/insert/subject`, {
        subject,
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
        Edit Subjects
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
        {/* Add Subject */}
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
            Subject:
          </label>

          <input
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button
            className="btn btn-success"
            onClick={addSubject}
          >
            Add
          </button>
        </div>

        {/* Delete Subject */}
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
            Subjects:
          </label>

          <select
            style={{
              flex: 1,
              minWidth: "250px",
              padding: "6px",
            }}
            value={deleteSubject}
            onChange={(e) => setDeleteSubject(e.target.value)}
          >
            {subjectList.map((item) => (
              <option
                key={item.SubID}
                value={item.SubID}
              >
                {item.Subject}
              </option>
            ))}
          </select>

          <button
            className="btn btn-danger"
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
