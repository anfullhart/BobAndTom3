import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const SearchMedia = () => {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchBitID, setSearchBitID] = useState("");
  const [searchType, setSearchType] = useState("");

  // Lookup lists
  const [celebList, setCelebList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);

  const navigate = useNavigate();

  // ============================================================
  // LOAD SEARCH DROPDOWNS
  // ============================================================

  useEffect(() => {
    const loadLookupLists = async () => {
      try {
        const [
          celebRes,
          artistRes,
          sportRes,
          seasonRes,
          subjectRes
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/subject`)
        ]);

        setCelebList(celebRes.data || []);
        setArtistList(artistRes.data || []);
        setSportList(sportRes.data || []);
        setSeasonList(seasonRes.data || []);
        setSubjectList(subjectRes.data || []);
      } catch (error) {
        console.error(
          "Error loading search dropdowns:",
          error
        );

        if (error.response) {
          console.error(
            "Backend response:",
            error.response.data
          );
        }
      }
    };

    loadLookupLists();
  }, []);

  // ============================================================
  // SEARCH TYPE CHANGED
  // ============================================================

  const handleSearchTypeChange = (e) => {
    const newType = e.target.value;

    setSearchType(newType);

    // Clear the old search value when changing
    // to a different type.
    setSearchKeyword("");
    setSearchBitID("");
  };

  // ============================================================
  // SEARCH VALUE CHANGED
  // ============================================================

  const handleSearchValueChange = (e) => {
    const value = e.target.value;

    setSearchKeyword(value);

    // Keep searchBitID populated for compatibility
    // with the existing results page.
    setSearchBitID(value);
  };

  // ============================================================
  // FORM SUBMIT
  // ============================================================

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchType || searchType === "-") {
      window.alert("Please select a search type.");
      return;
    }

    if (!searchKeyword) {
      window.alert("Please enter or select a search value.");
      return;
    }

    navigate("/results", {
      state: {
        bitID: searchBitID,
        keyword: searchKeyword,
        type: searchType
      }
    });
  };

  // ============================================================
  // DETERMINE WHICH INPUT TO DISPLAY
  // ============================================================

  const renderSearchInput = () => {
    // ----------------------------------------------------------
    // BIT ID
    // ----------------------------------------------------------

    if (searchType === "Bit ID") {
      return (
        <input
          type="number"
          value={searchKeyword}
          onChange={handleSearchValueChange}
          placeholder="Enter Bit ID"
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px"
          }}
        />
      );
    }

    // ----------------------------------------------------------
    // KEYWORD
    // ----------------------------------------------------------

    if (searchType === "Keyword") {
      return (
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchValueChange}
          placeholder="Enter keyword"
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px"
          }}
        />
      );
    }

    // ----------------------------------------------------------
    // CELEBRITY
    // ----------------------------------------------------------

    if (searchType === "Celebrity") {
      return (
        <select
          value={searchKeyword}
          onChange={handleSearchValueChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px",
            height: "30px"
          }}
        >
          <option value="">
            -- Select Celebrity --
          </option>

          {celebList.map((celebrity) => (
            <option
              key={celebrity.CelebID}
              value={celebrity.CelebID}
            >
              {celebrity.Name}
            </option>
          ))}
        </select>
      );
    }

    // ----------------------------------------------------------
    // DATE
    // ----------------------------------------------------------

    if (searchType === "Date") {
      return (
        <input
          type="date"
          value={searchKeyword}
          onChange={handleSearchValueChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "200px",
            height: "30px"
          }}
        />
      );
    }

    // ----------------------------------------------------------
    // AUTOMATION NUMBER
    // ----------------------------------------------------------

    if (searchType === "Automation #") {
      return (
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchValueChange}
          placeholder="Enter Automation #"
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px"
          }}
        />
      );
    }

    // ----------------------------------------------------------
    // ARTIST
    // ----------------------------------------------------------

    if (searchType === "Artist") {
      return (
        <select
          value={searchKeyword}
          onChange={handleSearchValueChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px",
            height: "30px"
          }}
        >
          <option value="">
            -- Select Artist --
          </option>

          {artistList.map((artist) => (
            <option
              key={artist.ArtistID}
              value={artist.ArtistID}
            >
              {artist.Name}
            </option>
          ))}
        </select>
      );
    }

    // ----------------------------------------------------------
    // SPORT
    // ----------------------------------------------------------

    if (searchType === "Sport") {
      return (
        <select
          value={searchKeyword}
          onChange={handleSearchValueChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px",
            height: "30px"
          }}
        >
          <option value="">
            -- Select Sport --
          </option>

          {sportList.map((sport) => (
            <option
              key={sport.SportID}
              value={sport.SportID}
            >
              {sport.Sport}
            </option>
          ))}
        </select>
      );
    }

    // ----------------------------------------------------------
    // SEASON
    // ----------------------------------------------------------

    if (searchType === "Season") {
      return (
        <select
          value={searchKeyword}
          onChange={handleSearchValueChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px",
            height: "30px"
          }}
        >
          <option value="">
            -- Select Season --
          </option>

          {seasonList.map((season) => (
            <option
              key={season.SeasonID}
              value={season.SeasonID}
            >
              {season.Season}
            </option>
          ))}
        </select>
      );
    }

    // ----------------------------------------------------------
    // SUBJECT
    // ----------------------------------------------------------

    if (searchType === "Subject") {
      return (
        <select
          value={searchKeyword}
          onChange={handleSearchValueChange}
          style={{
            marginLeft: "10px",
            padding: "5px",
            width: "300px",
            height: "30px"
          }}
        >
          <option value="">
            -- Select Subject --
          </option>

          {subjectList.map((subject) => (
            <option
              key={subject.SubID}
              value={subject.SubID}
            >
              {subject.Subject}
            </option>
          ))}
        </select>
      );
    }

    // ----------------------------------------------------------
    // DEFAULT
    // ----------------------------------------------------------

    return (
      <input
        type="text"
        disabled
        placeholder="Select a search type"
        style={{
          marginLeft: "10px",
          padding: "5px",
          width: "300px"
        }}
      />
    );
  };

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        marginTop: "50px"
      }}
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="search"
              style={{
                backgroundColor: "black",
                color: "white",
                fontSize: "20px",
                padding: "40px 60px 70px",
                margin: "10px 0px",
                borderRadius: "15px"
              }}
            >
              Search Media Entries by:

              {/* SEARCH TYPE */}

              <select
                value={searchType}
                onChange={handleSearchTypeChange}
                style={{
                  marginLeft: "10px",
                  width: "auto",
                  height: "25px"
                }}
                size="1"
              >
                <option value="-">
                  -
                </option>

                <option value="Bit ID">
                  Bit ID
                </option>

                <option value="Keyword">
                  Keyword
                </option>

                <option value="Celebrity">
                  Celebrity
                </option>

                <option value="Artist">
                  Artist
                </option>

                <option value="Date">
                  Date
                </option>

                <option value="Automation #">
                  Automation #
                </option>

                <option value="Sport">
                  Sport
                </option>

                <option value="Season">
                  Season
                </option>

                <option value="Subject">
                  Subject
                </option>
              </select>

              {/* SEARCH INPUT */}

              {renderSearchInput()}

              {/* SEARCH BUTTON */}

              <button
                type="submit"
                style={{
                  marginLeft: "5px",
                  marginBottom: "5px",
                  cursor: "pointer",
                  padding: "5px 10px",
                  backgroundColor: "#0d6efd",
                  color: "white",
                  border: "none",
                  borderRadius: "5px"
                }}
              >
                Search
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchMedia;

