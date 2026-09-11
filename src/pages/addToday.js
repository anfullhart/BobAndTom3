import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./addToday.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const createEmptyRow = () => ({
  time: "",
  description: "",
  artist: "",
});

const isRowFilled = (row) =>
  row.time.trim() !== "" || row.description.trim() !== "" || row.artist.trim() !== "";

const toISODate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate()
  ).padStart(2, "0")}`;

const isoToMMDDYYYY = (iso) => {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${month}-${day}-${year}`;
};

const AddToday = () => {
  const [artistList, setArtistList] = useState([]);
  const [rows, setRows] = useState(Array(5).fill(null).map(createEmptyRow));
  const [dateISO, setDateISO] = useState(toISODate(new Date()));
  const [submitting, setSubmitting] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${API_URL}/api/get/artist`)
      .then((response) => setArtistList(response.data))
      .catch((err) => console.error("Error loading artists:", err));
  }, []);

  // Keep at least one blank row at the bottom at all times
  const ensureTrailingBlankRow = (list) => {
    const last = list[list.length - 1];
    if (last && isRowFilled(last)) {
      return [...list, createEmptyRow()];
    }
    return list;
  };

  const updateRow = (index, field, value) => {
    setRows((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return ensureTrailingBlankRow(updated);
    });
  };

  const removeRow = (index) => {
    setRows((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      return updated.length > 0 ? updated : [createEmptyRow()];
    });
  };

  const addFiveRows = () => {
    setRows((prev) => [...prev, ...Array(5).fill(null).map(createEmptyRow)]);
  };

  const clearRunSheet = () => {
    const hasContent = rows.some(isRowFilled);

    if (hasContent && !window.confirm("Clear all entries on this run sheet?")) {
      return;
    }

    setRows(Array(5).fill(null).map(createEmptyRow));
    setDateISO(toISODate(new Date()));
  };

  const submitRunSheet = async () => {
    const filledRows = rows.filter(isRowFilled);

    if (filledRows.length === 0) {
      window.alert("Add at least one row before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      await Axios.post(`${API_URL}/api/insert/runSheet`, {
        logDate: isoToMMDDYYYY(dateISO),
        rows: filledRows.map((r) => ({
          time: r.time,
          desc: r.description,
          artist: r.artist,
        })),
      });

      window.alert("Run sheet saved successfully.");
      navigate(-1);
    } catch (err) {
      console.error(err);
      window.alert("Failed to save the run sheet. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filledCount = rows.filter(isRowFilled).length;

  return (
    <div className="add-today-page">
      <div className="run-sheet-card">
        <div className="page-header">
          <h1>Today's Run Sheet</h1>
          <p>
            {filledCount === 0
              ? "No entries yet."
              : `${filledCount} ${filledCount === 1 ? "entry" : "entries"} logged.`}
          </p>
        </div>

        <div className="field date-field">
          <label htmlFor="logDate">Run sheet date</label>
          <input
            id="logDate"
            type="date"
            value={dateISO}
            onChange={(e) => setDateISO(e.target.value)}
          />
        </div>

        <div className="run-sheet-table">
          <div className="run-sheet-row run-sheet-header">
            <div className="col-index" />
            <div>Time</div>
            <div>Description</div>
            <div>Artist</div>
            <div className="col-remove" />
          </div>

          {rows.map((row, index) => (
            <div className="run-sheet-row" key={index}>
              <div className="col-index">{index + 1}</div>

              <input
                type="text"
                placeholder="00:00:00"
                value={row.time}
                aria-label={`Row ${index + 1} time`}
                onChange={(e) => updateRow(index, "time", e.target.value)}
              />

              <input
                type="text"
                placeholder="Description"
                value={row.description}
                aria-label={`Row ${index + 1} description`}
                onChange={(e) => updateRow(index, "description", e.target.value)}
              />

              <select
                value={row.artist}
                aria-label={`Row ${index + 1} artist`}
                onChange={(e) => updateRow(index, "artist", e.target.value)}
              >
                <option value="">Select artist</option>
                {artistList.map((val) => (
                  <option key={val.ArtistID} value={val.ArtistID}>
                    {val.Name}
                  </option>
                ))}
              </select>

              <div className="col-remove">
                {rows.length > 1 && isRowFilled(row) && (
                  <button
                    type="button"
                    className="icon-btn"
                    aria-label={`Remove row ${index + 1}`}
                    onClick={() => removeRow(index)}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="run-sheet-actions">
          <button type="button" className="add-btn" onClick={addFiveRows}>
            + Add 5 rows
          </button>

          <div className="run-sheet-actions-right">
            <button type="button" className="btn btn-ghost" onClick={clearRunSheet}>
              Clear all
            </button>

            <button
              type="button"
              className="btn btn-primary"
              onClick={submitRunSheet}
              disabled={submitting}
            >
              {submitting ? "Saving…" : "Submit"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToday;
