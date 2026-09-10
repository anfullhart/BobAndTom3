import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

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
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginTop: "50px",
      }}
    >
      <div
        style={{
          width: "500px",
          maxWidth: "90%",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "30px" }}>
          Search Media
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Search Type */}
          <div style={{ marginBottom: "20px" }}>
            <label
              htmlFor="searchType"
              style={{
                display: "block",
                marginBottom: "8px",
                fontWeight: "bold",
              }}
            >
              Search By:
            </label>

            <select
              id="searchType"
              value={searchType}
              onChange={handleSearchTypeChange}
              className="form-control"
              style={{ width: "100%" }}
            >
              <option value="">Select Search Type</option>
              <option value="Bit ID">Bit ID</option>
              <option value="Title">Title</option>
              <option value="Keyword">Keyword</option>
              <option value="Celebrity">Celebrity</option>
              <option value="Artist">Artist</option>
              <option value="Date">Date</option>
              <option value="Automation #">Automation #</option>
              <option value="Sport">Sport</option>
              <option value="Season">Season</option>
              <option value="Subject">Subject</option>
            </select>
          </div>

          {/* Bit ID */}
          {searchType === "Bit ID" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="bitID"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Bit ID:
              </label>

              <input
                id="bitID"
                type="number"
                placeholder="Enter Bit ID"
                value={searchBitID}
                onChange={(e) => setSearchBitID(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
          )}

          {/* Title */}
          {searchType === "Title" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="title"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Title:
              </label>

              <input
                id="title"
                type="text"
                placeholder="Enter title"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
          )}

          {/* Keyword */}
          {searchType === "Keyword" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="keyword"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Keyword:
              </label>

              <input
                id="keyword"
                type="text"
                placeholder="Enter keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
          )}

          {/* Celebrity */}
          {searchType === "Celebrity" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="celebrity"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Celebrity:
              </label>

              <select
                id="celebrity"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select Celebrity</option>

                {celebrities.map((celebrity) => (
                  <option
                    key={celebrity.CelebID}
                    value={celebrity.CelebID}
                  >
                    {celebrity.Name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Artist */}
          {searchType === "Artist" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="artist"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Artist:
              </label>

              <select
                id="artist"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select Artist</option>

                {artists.map((artist) => (
                  <option
                    key={artist.ArtistID}
                    value={artist.ArtistID}
                  >
                    {artist.Name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Date */}
          {searchType === "Date" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="date"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Date:
              </label>

              <input
                id="date"
                type="date"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
          )}

          {/* Automation Number */}
          {searchType === "Automation #" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="automation"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Automation #:
              </label>

              <input
                id="automation"
                type="text"
                placeholder="Enter Automation #"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              />
            </div>
          )}

          {/* Sport */}
          {searchType === "Sport" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="sport"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Sport:
              </label>

              <select
                id="sport"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select Sport</option>

                {sports.map((sport) => (
                  <option
                    key={sport.SportID}
                    value={sport.SportID}
                  >
                    {sport.Sport}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Season */}
          {searchType === "Season" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="season"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Season:
              </label>

              <select
                id="season"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select Season</option>

                {seasons.map((season) => (
                  <option
                    key={season.SeasonID}
                    value={season.SeasonID}
                  >
                    {season.Season}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Subject */}
          {searchType === "Subject" && (
            <div style={{ marginBottom: "20px" }}>
              <label
                htmlFor="subject"
                style={{
                  display: "block",
                  marginBottom: "8px",
                  fontWeight: "bold",
                }}
              >
                Subject:
              </label>

              <select
                id="subject"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="form-control"
                style={{ width: "100%" }}
              >
                <option value="">Select Subject</option>

                {subjects.map((subject) => (
                  <option
                    key={subject.SubID}
                    value={subject.SubID}
                  >
                    {subject.Subject}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Search Button */}
          <div style={{ textAlign: "center", marginTop: "25px" }}>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchMedia;
