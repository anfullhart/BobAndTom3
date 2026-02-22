import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchMedia = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchBitID, setSearchBitID] = useState('');
  const [searchType, setSearchType] = useState('');

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    navigate('/results', { state: { bitID: searchBitID, keyword: searchKeyword, type: searchType } });
  };

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
                backgroundColor: 'black',
                color: 'white',
                fontSize: '20px',
                padding: '40px 60px 70px',
                margin: '10px 0px',
                borderRadius: '15px',
              }}
            >
              Search Media Entries by:
              <select
                style={{ marginLeft: '10px', width: 'auto', height: '25px' }}
                size="1"
                onChange={(e) => setSearchType(e.target.value)}
              >
                <option value="-"> - </option>
                <option value="Bit ID">ID</option>
                <option value="Keyword">Keyword</option>
                <option value="Artist">Artist</option>
              </select>

              <input
                type="text"
                size="50"
                value={searchBitID}
                onChange={(e) => {
                  setSearchBitID(e.target.value);
                  setSearchKeyword(e.target.value);
                }}
                style={{ marginLeft: '10px', padding: '5px' }}
              />

              <button
                type="submit"
                style={{
                  marginLeft: '5px',
                  marginBottom: '5px',
                  cursor: 'pointer',
                  padding: '5px 10px',
                  backgroundColor: '#0d6efd',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  
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
