import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';

const SearchRunSheet = () => {
  const navigate = useNavigate();

  const [artistList, setArtistList] = useState([]);
  const [searchType, setSearchType] = useState(''); 
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [searchArtist, setSearchArtist] = useState('');

  // Fetch artist list on mount
  useEffect(() => {
    Axios.get("http://localhost:3001/api/get/artist")
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "200px",
        marginTop:'20px'
      }}    
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="search"
              style={{
                backgroundColor: 'black',
                color:'white',
                fontSize:'20px',
                padding:'40px 60px 70px',
                margin:'10px 0px',
                borderRadius:'15px'
              }}
            >
              Search Run Sheets by:
              <select
                style={{ marginLeft:'10px', width:'auto', height:'25px' }}
                size="1"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="-"> - </option>
                <option value="Date">Date (MM-DD-YYYY)</option>
                <option value="Artist">Artist</option>
                <option value="keyword">Keyword</option>
              </select>

              {searchType === "Artist" ? (
                <select
                  name="ddlArtist"
                  size="1"
                  style={{ marginLeft: "10px", width:'520px', height:'45px', fontSize:'15px' }}
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
                  type="text"
                  size="50"
                  onChange={(e) => {
                    setSearchKeyword(e.target.value);
                    setSearchArtist(e.target.value);
                    setSearchDate(e.target.value);
                  }}
                  style={{ marginLeft: "10px", padding: "5px" }}
                />
              )}

              <button
                type="submit"
                style={{
                  marginLeft:'5px',
                  marginBottom:'5px',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  backgroundColor: '#0d6efd',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  fontWeight: 'bold'
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

export default SearchRunSheet;
