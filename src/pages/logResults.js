import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";

const LogResults = () => {
  const location = useLocation();

  const searchKeyword = location.state?.searchKeyword || "";
  const searchArtist = location.state?.searchArtist || "";
  const searchDate = location.state?.searchDate || "";
  const searchType = location.state?.searchType || "";

  const [logList, setLogList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [role, setRole] = useState(null);

  // Get user role from localStorage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setRole(user?.role || null);
  }, []);

  const isAdmin = role === "admin" || role === "owner";

  // Fetch logs on mount
  useEffect(() => {
    fetchLogs(sortOrder);
  }, []);

  const fetchLogs = (order) => {
    Axios.get(
      `http://localhost:3001/api/get/log/${searchKeyword}/${searchArtist}/${searchDate}/${searchType}`
    )
      .then((response) => {
        let sortedData = [...response.data];
        sortedData.sort((a, b) => {
          const dateA = new Date(a.RSDate);
          const dateB = new Date(b.RSDate);
          return order === "asc" ? dateA - dateB : dateB - dateA;
        });
        setLogList(sortedData);
      })
      .catch((err) => console.error(err));
  };

  const handleSortChange = (e) => {
    const newOrder = e.target.value;
    setSortOrder(newOrder);
    fetchLogs(newOrder);
  };

  const deleteLog = (RS_ID) => {
    Axios.post("http://localhost:3001/api/delete/log", { RS_ID })
      .then(() => fetchLogs(sortOrder))
      .catch((err) => console.error(err));
  };

  // Group logs by RS_ID
  const groups = logList.reduce((acc, val) => {
    if (!acc[val.RS_ID]) acc[val.RS_ID] = [];
    acc[val.RS_ID].push(val);
    return acc;
  }, {});

  // Sort group keys by date of first record
  const sortedGroupKeys = Object.keys(groups).sort((a, b) => {
    const dateA = new Date(groups[a][0].RSDate);
    const dateB = new Date(groups[b][0].RSDate);
    return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
  });

  return (
    <div style={{ padding: "20px", color: "#fff", fontFamily: "Arial, sans-serif" }}>
      {/* Sort Dropdown */}
      <div style={{ marginBottom: "20px" }}>
        <label style={{ marginRight: "10px", fontWeight: "bold" }}>Sort by Date:</label>
        <select
          value={sortOrder}
          onChange={handleSortChange}
          style={{ padding: "5px", borderRadius: "5px" }}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Log Groups */}
      <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
        {sortedGroupKeys.map((RS_ID) => {
          const runSheet = groups[RS_ID][0]; // first record for date
          return (
            <div
              key={RS_ID}
              style={{
                backgroundColor: "#1c1c1c",
                borderRadius: "10px",
                padding: "20px",
                boxShadow: "0px 4px 8px rgba(0,0,0,0.3)"
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3>
                  Run Sheet Date: {runSheet.RSDate} | ID: {RS_ID}
                </h3>

                <div style={{ display: "flex", gap: "10px" }}>
                  {/* View Details - available to all users */}
                  <Link
                    to="/detailedLogResults"
                    state={{ RS_ID: parseInt(RS_ID) }}
                    style={{
                      padding: "6px 10px",
                      backgroundColor: "#00ff88",
                      color: "#111",
                      borderRadius: "5px",
                      textDecoration: "none",
                    }}
                  >
                    Details
                  </Link>

                  {/* Admin / Owner Only */}
                  {isAdmin && (
                    <>
                      <Link
                        to="/editLog"
                        state={{ RS_ID: parseInt(RS_ID), searchDate, searchArtist, searchKeyword, searchType }}
                        className="btn btn-warning"
                      >
                        Edit
                      </Link>

                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          if (window.confirm("Delete record for Run Sheet ID " + RS_ID + "?")) {
                            deleteLog(parseInt(RS_ID));
                          }
                        }}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Column headers for clarity */}
              <div style={{ display: "flex", fontWeight: "bold", marginBottom: "10px", padding: "0 10px" }}>
                <div style={{ width: "20%" }}>Time</div>
                <div style={{ width: "55%" }}>Description</div>
                <div style={{ width: "25%" }}>Artist</div>
              </div>

              {/* Records */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {groups[RS_ID].map((record, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "#2a2a2a",
                      padding: "10px",
                      borderRadius: "5px",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ width: "20%" }}>{record.bTime}</div>
                    <div style={{ width: "55%" }}>{record.bitDesc}</div>
                    <div style={{ width: "25%" }}>{record.Name}</div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogResults;
