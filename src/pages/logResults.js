import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Axios from "axios";
import "./logResults.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const LogResults = () => {
  const location = useLocation();

  const searchKeyword = location.state?.searchKeyword || "";
  const searchArtist = location.state?.searchArtist || "";
  const searchDate = location.state?.searchDate || "";
  const searchType = location.state?.searchType || "";
  const searchRSID = location.state?.searchRSID || "";

  const [logList, setLogList] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [role, setRole] = useState(null);

  // Build display text based on selected search type
  let searchSummary = "Showing all Run Sheets";

  switch (searchType) {
    case "keyword":
      searchSummary = `Keyword: ${searchKeyword}`;
      break;

    case "artist":
      searchSummary = `Artist: ${searchArtist}`;
      break;

    case "date":
      searchSummary = `Date: ${searchDate}`;
      break;

    case "id":
      searchSummary = `Run Sheet ID: ${searchKeyword}`;
      break;

    default:
      if (searchKeyword) searchSummary = `Keyword: ${searchKeyword}`;
      else if (searchArtist) searchSummary = `Artist: ${searchArtist}`;
      else if (searchDate) searchSummary = `Date: ${searchDate}`;
  }

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
      `${API_URL}/api/get/log/${searchKeyword}/${searchArtist}/${searchDate}/${searchType}`
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
    Axios.post(`${API_URL}/api/delete/log`, { RS_ID })
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
    <div className="log-results-page">

      {/* Page Header */}
      <div className="log-results-header">
        <div>
          <h2 className="log-results-title">Run Sheet Results</h2>

          <p className="search-summary">
            {searchSummary}
          </p>
        </div>

        {/* Compact Sort Control */}
        <div className="sort-control">
          <label htmlFor="sortOrder">Sort by date</label>

          <select
            id="sortOrder"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="asc">Oldest First</option>
            <option value="desc">Newest First</option>
          </select>
        </div>
      </div>

      {/* Result Count */}
      {sortedGroupKeys.length > 0 && (
        <div className="result-count">
          {sortedGroupKeys.length} Run Sheet
          {sortedGroupKeys.length !== 1 ? "s" : ""} found
        </div>
      )}

      {/* No Results */}
      {sortedGroupKeys.length === 0 && (
        <div className="no-results">
          <div className="no-results-icon">📋</div>
          <h3>No Run Sheets Found</h3>
          <p>
            Try changing your search criteria or searching for something else.
          </p>
        </div>
      )}

      {/* Log Groups */}
      <div className="log-groups">
        {sortedGroupKeys.map((RS_ID) => {
          const runSheet = groups[RS_ID][0];

          return (
            <div className="run-sheet-card" key={RS_ID}>

              {/* Run Sheet Header */}
              <div className="run-sheet-header">

                <div className="run-sheet-info">
                  <div className="run-sheet-date">
                    {runSheet.RSDate}
                  </div>

                  <div className="run-sheet-id">
                    Run Sheet #{RS_ID}
                  </div>
                </div>

                <div className="run-sheet-actions">

                  {/* Details - Available to Everyone */}
                  <Link
                    to="/detailedLogResults"
                    state={{ RS_ID: parseInt(RS_ID) }}
                    className="action-button details-button"
                  >
                    Details
                  </Link>

                  {/* Admin / Owner Only */}
                  {isAdmin && (
                    <>
                      <Link
                        to="/editLog"
                        state={{
                          RS_ID: parseInt(RS_ID),
                          searchDate,
                          searchArtist,
                          searchKeyword,
                          searchType,
                        }}
                        className="action-button edit-button"
                      >
                        Edit
                      </Link>

                      <button
                        className="action-button delete-button"
                        onClick={() => {
                          if (
                            window.confirm(
                              "Delete record for Run Sheet ID " + RS_ID + "?"
                            )
                          ) {
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

              {/* Column Headers */}
              <div className="record-header">
                <div className="time-column">Time</div>
                <div className="description-column">Description</div>
                <div className="artist-column">Artist</div>
              </div>

              {/* Records */}
              <div className="records">
                {groups[RS_ID].map((record, index) => (
                  <div className="record-row" key={index}>
                    <div className="time-column record-time">
                      {record.bTime}
                    </div>

                    <div className="description-column">
                      {record.bitDesc}
                    </div>

                    <div className="artist-column record-artist">
                      {record.Name}
                    </div>
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
