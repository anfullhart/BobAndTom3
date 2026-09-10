import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import "./searchRunSheet.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const SearchRunSheet = () => {
  const navigate = useNavigate();

  const [artistList, setArtistList] = useState([]);
  const [searchType, setSearchType] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchArtist, setSearchArtist] = useState('');

  // Fetch artist list on mount
  useEffect(() => {
    Axios.get(`${API_URL}/api/get/artist`)
      .then((response) => setArtistList(response.data))
      .catch((err) => console.error(err));
  }, []);

  // Handle form submission (Enter key or button)
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    navigate('/logResults', {
      state: {
        searchDate,
        searchKeyword,
        searchArtist,
        searchType
      }
    });
  };

  return (
    <div className="search-run-sheet-page">
      <form className="search-run-sheet-card" onSubmit={handleSubmit}>
        <h1>Search Run Sheets</h1>

        <div className="search-run-sheet-controls">
          <div className="field">
            <label htmlFor="searchType">Search by</label>
            <select
              id="searchType"
              size="1"
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="-"> - </option>
              <option value="Date">Date (MM-DD-YYYY)</option>
              <option value="Artist">Artist</option>
              <option value="keyword">Keyword</option>
            </select>
          </div>

          <div className="field field-value">
            <label htmlFor="searchValue">Value</label>

            {searchType === "Artist" ? (
              <select
                id="searchValue"
                name="ddlArtist"
                size="1"
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setSearchArtist(e.target.value);
                  setSearchDate(e.target.value);
                }}
              >
                {artistList.map((val, key) => (
                  <option key={key} value={val.ArtistID}>
                    {val.Name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                id="searchValue"
                type="text"
                size="50"
                onChange={(e) => {
                  setSearchKeyword(e.target.value);
                  setSearchArtist(e.target.value);
                  setSearchDate(e.target.value);
                }}
              />
            )}
          </div>

          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchRunSheet;
