import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./searchRunSheet.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const isoToMMDDYYYY = (iso) => {
  if (!iso) return "";
  const [year, month, day] = iso.split("-");
  return `${month}-${day}-${year}`;
};

const SearchRunSheet = () => {
  const navigate = useNavigate();

  const [artistList, setArtistList] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    Axios.get(`${API_URL}/api/get/artist`)
      .then((response) => setArtistList(response.data))
      .catch((err) => console.error("Error loading artists:", err));
  }, []);

  const handleTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchType || !searchValue) {
      window.alert("Please select a search type and enter a value.");
      return;
    }

    const finalValue =
      searchType === "Date" ? isoToMMDDYYYY(searchValue) : searchValue;

    navigate("/logResults", {
      state: {
        searchDate: searchType === "Date" ? finalValue : "",
        searchKeyword: searchType === "Keyword" ? finalValue : "",
        searchArtist: searchType === "Artist" ? finalValue : "",
        searchType,
      },
    });
  };

  return (
    <div className="search-run-sheet-page">
      <div className="search-card">
        <div className="page-header">
          <h1>Search Run Sheets</h1>
          <p>Find a past run sheet by date, artist, or keyword.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="searchType">Search by</label>
            <select id="searchType" value={searchType} onChange={handleTypeChange}>
              <option value="">Select a search type</option>
              <option value="Date">Date</option>
              <option value="Artist">Artist</option>
              <option value="Keyword">Keyword</option>
            </select>
          </div>

          {searchType === "Date" && (
            <div className="field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          )}

          {searchType === "Artist" && (
            <div className="field">
              <label htmlFor="artist">Artist</label>
              <select
                id="artist"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              >
                <option value="">Select artist</option>
                {artistList.map((val) => (
                  <option key={val.ArtistID} value={val.ArtistID}>
                    {val.Name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {searchType === "Keyword" && (
            <div className="field">
              <label htmlFor="keyword">Keyword</label>
              <input
                id="keyword"
                type="text"
                placeholder="Enter keyword"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          )}

          {!searchType && (
            <p className="hint">Pick a search type above to continue.</p>
          )}

          <button type="submit" className="btn btn-primary" disabled={!searchType}>
            Search
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchRunSheet;
