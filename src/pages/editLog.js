import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditLog = () => {
  const navigate = useNavigate();
  const { RS_ID = null } = useLocation().state || {};

  const [artistList, setArtistList] = useState([]);
  const [logDate, setLogDate] = useState("");
  const [values, setValues] = useState([]);
  const [deletedRows, setDeletedRows] = useState([]); // TRACK DELETED ROWS

  
  useEffect(() => {
    loadArtists();
    loadLogData();
  }, []);

  const loadArtists = () => {
    Axios.get(`${API_URL}/api/get/artist`)
      .then((res) => setArtistList(res.data))
      .catch((err) => console.error("Artist load error:", err));
  };

  const loadLogData = () => {
    if (!RS_ID) return;

    Axios.get(`${API_URL}/api/get/runSheet/${RS_ID}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setValues(
            res.data.map((row) => ({
              L_ID: row.L_ID,
              bTime: row.bTime || "",
              bitDesc: row.bitDesc || "",
              ArtistID: row.ArtistID || ""
            }))
          );
          setLogDate(res.data[0].RSDate || "");
        } else {
          setValues([]);
        }
      })
      .catch((err) => console.error("Log load error:", err));
  };

  const handleChange = (index, field, value) => {
    const updated = [...values];
    updated[index][field] = value;
    setValues(updated);
  };

  const handleAdd3Rows = () => {
    const newRows = Array.from({ length: 3 }, () => ({
      L_ID: null,
      bTime: "",
      bitDesc: "",
      ArtistID: ""
    }));
    setValues((prev) => [...prev, ...newRows]);
  };

  const handleRemove1Row = () => {
    if (values.length > 0) setValues((prev) => prev.slice(0, prev.length - 1));
  };

  // TRACK DELETED ROWS
  const handleDeleteRow = (index) => {
    if (!window.confirm("Delete this row?")) return;
    const row = values[index];
    if (row.L_ID) setDeletedRows((prev) => [...prev, row.L_ID]);
    setValues((prev) => prev.filter((_, i) => i !== index));
  };

  const handleConfirmEdits = async (e) => {
    e.preventDefault();
    if (!window.confirm("Save changes to this run sheet?")) return;

    const payload = values
      .filter((row) => row.bTime || row.bitDesc || row.ArtistID)
      .map((row) => ({
        L_ID: row.L_ID,
        bTime: row.bTime,
        bitDesc: row.bitDesc,
        ArtistID: row.ArtistID || null
      }));

    try {
      await Axios.post(`${API_URL}/api/edit/runSheet`, {
        RS_ID,
        logDate,
        data: payload,
        deletedRows // SEND DELETED ROWS
      });
      navigate("/searchrunsheet", { replace: true });
    } catch (err) {
      console.error("Save failed:", err);
      alert("Save failed. Check console.");
    }
  };

  const handleCancelEdits = (e) => {
    e.preventDefault();
    if (!window.confirm("Discard all changes?")) return;
    navigate("/searchrunsheet", { replace: true });
  };

  return (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
      boxSizing: "border-box",
    }}
  >
    <form
      style={{
        width: "100%",
        maxWidth: "1100px",
      }}
    >
     {/* DATE */}
<div
  style={{
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginBottom: "20px",
  }}
>
  <div
    style={{
      backgroundColor: "#fff",
      color: "#000",
      width: "100%",
      maxWidth: "320px",
      borderRadius: "12px",
      border: "3px solid black",
      padding: "12px",
      textAlign: "center",
      fontWeight: "bold",
    }}
  >
    Run Sheet Date:

    <input
      value={logDate}
      onChange={(e) => setLogDate(e.target.value)}
      placeholder="MM-DD-YYYY"
      style={{
        marginTop: "10px",
        width: "100%",
        padding: "8px",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#d32f2f",
        backgroundColor: "#fff5f5",
        border: "2px solid #d32f2f",
        borderRadius: "8px",
        textAlign: "center",
        outline: "none",
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = "0 0 8px rgba(211,47,47,.6)";
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = "none";
      }}
    />
  </div>
</div>
      {/* TABLE */}
      <div
        style={{
          backgroundColor: "black",
          color: "white",
          fontSize: "15px",
          padding: "20px",
          borderRadius: "15px",
          width: "100%",
          maxWidth: "1100px",
          overflowX: "auto",
        }}
      >
        {/* Table headers */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "90px 1fr 220px 35px 35px",
            gap: "10px",
            alignItems: "center",
            fontWeight: "bold",
            marginBottom: "15px",
          }}
        >
          <span>Time</span>
          <span>Description</span>
          <span>Artist</span>
          <span></span>
          <span></span>
        </div>

        {values.map((row, index) => (
          <div
            key={index}
            style={{
              display: "grid",
              gridTemplateColumns: "90px 1fr 220px 35px 35px",
              gap: "10px",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <input
              type="text"
              placeholder="00:00:00"
              value={row.bTime}
              onChange={(e) => handleChange(index, "bTime", e.target.value)}
            />

            <input
              type="text"
              placeholder="Description"
              value={row.bitDesc}
              onChange={(e) => handleChange(index, "bitDesc", e.target.value)}
            />

            <select
              value={row.ArtistID}
              onChange={(e) => handleChange(index, "ArtistID", e.target.value)}
            >
              <option value="">Choose Artist</option>
              {artistList.map((a) => (
                <option key={a.ArtistID} value={a.ArtistID}>
                  {a.Name}
                </option>
              ))}
            </select>

            {/* Delete */}
            <button
              type="button"
              onClick={() => handleDeleteRow(index)}
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#fff",
                backgroundColor: "#dc3545",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                height: "28px",
                width: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "4px",
              }}
              title="Delete Row"
            >
              −
            </button>

            {/* Insert */}
            <button
              type="button"
              onClick={() => {
                const newRow = {
                  L_ID: null,
                  bTime: "",
                  bitDesc: "",
                  ArtistID: "",
                };

                const updated = [...values];
                updated.splice(index + 1, 0, newRow);
                setValues(updated);
              }}
              style={{
                fontWeight: "bold",
                fontSize: "18px",
                color: "#fff",
                backgroundColor: "#28a745",
                border: "none",
                borderRadius: "50%",
                cursor: "pointer",
                height: "28px",
                width: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                paddingBottom: "4px",
              }}
              title="Add Row Below"
            >
              +
            </button>
          </div>
        ))}
      </div>

      {/* ACTION BUTTONS */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "20px",
        }}
      >
        <button
          type="button"
          className="btn btn-warning"
          onClick={handleRemove1Row}
        >
          − 1 Row
        </button>

        <button
          type="button"
          className="btn btn-warning"
          onClick={handleAdd3Rows}
        >
          + 3 Rows
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancelEdits}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleConfirmEdits}
        >
          Confirm Edits
        </button>
      </div>
    </form>
  </div>
);
};

export default EditLog;
