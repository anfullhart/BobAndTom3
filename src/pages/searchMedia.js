import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import "./searchMedia.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const SEARCH_TYPES = [
  { value: "Bit ID", label: "Bit ID" },
  { value: "Title", label: "Title" },
  { value: "Keyword", label: "Keyword" },
  { value: "Celebrity", label: "Celebrity" },
  { value: "Artist", label: "Artist" },
  { value: "Date", label: "Date" },
  { value: "Automation #", label: "Automation #" },
  { value: "Sport", label: "Sport" },
  { value: "Season", label: "Season" },
  { value: "Subject", label: "Subject" },
];

const SearchMedia = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchBitID, setSearchBitID] = useState("");
  const [searchType, setSearchType] = useState("");

  const [celebrities, setCelebrities] = useState([]);
  const [artists, setArtists] = useState([]);
  const [sports, setSports] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const loadLookupData = async () => {
      try {
        const [
          celebrityResponse,
          artistResponse,
          sportResponse,
          seasonResponse,
          subjectResponse,
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/subject`),
        ]);

        setCelebrities(celebrityResponse.data);
        setArtists(artistResponse.data);
        setSports(sportResponse.data);
        setSeasons(seasonResponse.data);
        setSubjects(subjectResponse.data);
      } catch (error) {
        console.error("Error loading search options:", error);
      }
    };

    loadLookupData();
  }, []);

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchKeyword("");
    setSearchBitID("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let searchValue = searchKeyword;

    if (searchType === "Bit ID") {
      searchValue = searchBitID;
    }

    if (!searchType || !searchValue) {
      alert("Please select a search type and enter a search value.");
      return;
    }

    navigate("/results", {
      state: {
        bitID: searchValue,
        keyword: searchValue,
        type: searchType,
      },
    });
  };

  return (
    <div className="search-media-page">
      <div className="search-card">
        <div className="page-header">
          <h1>Search Media</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="searchType">Search by</label>

            <select
              id="searchType"
              value={searchType}
              onChange={handleSearchTypeChange}
            >
              <option value="">Select a search type</option>
              {SEARCH_TYPES.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {searchType === "Bit ID" && (
            <div className="field">
              <label htmlFor="bitID">Bit ID</label>
              <input
                id="bitID"
                type="number"
                placeholder="Enter bit ID"
                value={searchBitID}
                onChange={(e) => setSearchBitID(e.target.value)}
              />
            </div>
          )}

          {searchType === "Title" && (
            <div className="field">
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          )}

          {searchType === "Keyword" && (
            <div className="field">
              <label htmlFor="keyword">Keyword</label>
              <input
                id="keyword"
                type="text"
                placeholder="Enter keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          )}

          {searchType === "Celebrity" && (
            <div className="field">
              <label htmlFor="celebrity">Celebrity</label>
              <select
                id="celebrity"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              >
                <option value="">Select celebrity</option>
                {celebrities.map((celebrity) => (
                  <option key={celebrity.CelebID} value={celebrity.CelebID}>
                    {celebrity.Name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {searchType === "Artist" && (
            <div className="field">
              <label htmlFor="artist">Artist</label>
              <select
                id="artist"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              >
                <option value="">Select artist</option>
                {artists.map((artist) => (
                  <option key={artist.ArtistID} value={artist.ArtistID}>
                    {artist.Name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {searchType === "Date" && (
            <div className="field">
              <label htmlFor="date">Date</label>
              <input
                id="date"
                type="date"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          )}

          {searchType === "Automation #" && (
            <div className="field">
              <label htmlFor="automation">Automation #</label>
              <input
                id="automation"
                type="text"
                placeholder="Enter automation #"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          )}

          {searchType === "Sport" && (
            <div className="field">
              <label htmlFor="sport">Sport</label>
              <select
                id="sport"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              >
                <option value="">Select sport</option>
                {sports.map((sport) => (
                  <option key={sport.SportID} value={sport.SportID}>
                    {sport.Sport}
                  </option>
                ))}
              </select>
            </div>
          )}

          {searchType === "Season" && (
            <div className="field">
              <label htmlFor="season">Season</label>
              <select
                id="season"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              >
                <option value="">Select season</option>
                {seasons.map((season) => (
                  <option key={season.SeasonID} value={season.SeasonID}>
                    {season.Season}
                  </option>
                ))}
              </select>
            </div>
          )}

          {searchType === "Subject" && (
            <div className="field">
              <label htmlFor="subject">Subject</label>
              <select
                id="subject"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              >
                <option value="">Select subject</option>
                {subjects.map((subject) => (
                  <option key={subject.SubID} value={subject.SubID}>
                    {subject.Subject}
                  </option>
                ))}
              </select>
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

export default SearchMedia;
