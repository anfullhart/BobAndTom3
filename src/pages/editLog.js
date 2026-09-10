import * as React from "react";
import { useState, useEffect } from "react";
import Axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./editLog.css";

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
  const [loading, setLoading] = useState(true);

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
    if (!RS_ID) {
      setLoading(false);
      return;
    }

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
        setLoading(false);
      })
      .catch((err) => {
        console.error("Log load error:", err);
        setLoading(false);
      });
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

  const handleInsertRow = (index) => {
    const newRow = {
      L_ID: null,
      bTime: "",
      bitDesc: "",
      ArtistID: ""
    };

    const updated = [...values];
    updated.splice(index + 1, 0, newRow);
    setValues(updated);
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

  if (loading) {
    return (
      <div className="edit-log-page">
        <p className="loading-state">Loading run sheet…</p>
      </div>
    );
  }

  return (
    <div className="edit-log-page">
      <form className="edit-log-form">
        <div className="page-header">
          <h1>Edit Run Sheet</h1>
          <p>{values.length} {values.length === 1 ? "row" : "rows"} on this sheet.</p>
        </div>

        {/* DATE */}
        <div className="field date-field">
          <label htmlFor="logDate">Run sheet date</label>
          <input
            id="logDate"
            type="text"
            value={logDate}
            onChange={(e) => setLogDate(e.target.value)}
            placeholder="MM-DD-YYYY"
          />
        </div>

        {/* TABLE */}
        <div className="log-table">
          <div className="log-row log-header">
            <span className="col-index" />
            <span>Time</span>
            <span>Description</span>
            <span>Artist</span>
            <span className="col-action" />
            <span className="col-action" />
          </div>

          {values.map((row, index) => (
            <div className="log-row" key={index}>
              <span className="col-index">{index + 1}</span>

              <input
                type="text"
                placeholder="00:00:00"
                value={row.bTime}
                aria-label={`Row ${index + 1} time`}
                onChange={(e) => handleChange(index, "bTime", e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={row.bitDesc}
                aria-label={`Row ${index + 1} description`}
                onChange={(e) => handleChange(index, "bitDesc", e.target.value)}
              />

              <select
                value={row.ArtistID}
                aria-label={`Row ${index + 1} artist`}
                onChange={(e) => handleChange(index, "ArtistID", e.target.value)}
              >
                <option value="">Choose artist</option>
                {artistList.map((a) => (
                  <option key={a.ArtistID} value={a.ArtistID}>
                    {a.Name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="row-btn row-btn-remove"
                onClick={() => handleDeleteRow(index)}
                title="Delete row"
                aria-label={`Delete row ${index + 1}`}
              >
                −
              </button>

              <button
                type="button"
                className="row-btn row-btn-add"
                onClick={() => handleInsertRow(index)}
                title="Add row below"
                aria-label={`Add row below row ${index + 1}`}
              >
                +
              </button>
            </div>
          ))}

          {values.length === 0 && (
            <p className="empty-state">No rows yet. Use "+ 3 rows" below to get started.</p>
          )}
        </div>

        {/* ACTION BUTTONS */}
        <div className="edit-log-actions">
          <div className="edit-log-actions-left">
            <button type="button" className="add-btn" onClick={handleAdd3Rows}>
              + 3 rows
            </button>

            <button
              type="button"
              className="add-btn"
              onClick={handleRemove1Row}
              disabled={values.length === 0}
            >
              − 1 row
            </button>
          </div>

          <div className="edit-log-actions-right">
            <button type="button" className="btn btn-ghost" onClick={handleCancelEdits}>
              Cancel
            </button>

            <button type="button" className="btn btn-primary" onClick={handleConfirmEdits}>
              Confirm edits
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditLog;
