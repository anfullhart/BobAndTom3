import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./addBit.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const AddBit = () => {
  // ============================================================
  // MAIN BIT INFORMATION
  // ============================================================

  const [type, setType] = useState("Bit");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [autoNum, setAutoNum] = useState("");

  const [sport, setSport] = useState("");
  const [season, setSeason] = useState("");

  const [keywords, setKeywords] = useState("");

  // ============================================================
  // SUBJECTS
  // ============================================================

  const [subjects, setSubjects] = useState([""]);

  const updateSubject = (index, value) => {
    const updated = [...subjects];
    updated[index] = value;
    setSubjects(updated);
  };

  const addSubject = () => setSubjects([...subjects, ""]);

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated.length === 0 ? [""] : updated);
  };

  // ============================================================
  // CELEBRITIES
  // ============================================================

  const [celebrities, setCelebrities] = useState([""]);

  const updateCelebrity = (index, value) => {
    const updated = [...celebrities];
    updated[index] = value;
    setCelebrities(updated);
  };

  const addCelebrity = () => setCelebrities([...celebrities, ""]);

  const removeCelebrity = (index) => {
    const updated = celebrities.filter((_, i) => i !== index);
    setCelebrities(updated.length === 0 ? [""] : updated);
  };

  // ============================================================
  // HYPERLINKS
  // ============================================================

  const [hyperlinks, setHyperlinks] = useState([""]);

  const updateHyperlink = (index, value) => {
    const updated = [...hyperlinks];
    updated[index] = value;
    setHyperlinks(updated);
  };

  const addHyperlink = () => setHyperlinks([...hyperlinks, ""]);

  const removeHyperlink = (index) => {
    const updated = hyperlinks.filter((_, i) => i !== index);
    setHyperlinks(updated.length === 0 ? [""] : updated);
  };

  // ============================================================
  // ALBUMS
  // ============================================================

  const [albums, setAlbums] = useState([{ album: "", track: "" }]);

  const updateAlbum = (index, field, value) => {
    const updated = [...albums];
    updated[index] = { ...updated[index], [field]: value };
    setAlbums(updated);
  };

  const addAlbum = () =>
    setAlbums([...albums, { album: "", track: "" }]);

  const removeAlbum = (index) => {
    const updated = albums.filter((_, i) => i !== index);
    setAlbums(updated.length === 0 ? [{ album: "", track: "" }] : updated);
  };

  // ============================================================
  // LOOKUP LISTS
  // ============================================================

  const [celebList, setCelebList] = useState([]);
  const [subjectList, setSubjectList] = useState([]);
  const [artistList, setArtistList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [sportList, setSportList] = useState([]);
  const [seasonList, setSeasonList] = useState([]);
  const [albumList, setAlbumList] = useState([]);

  useEffect(() => {
    const loadLookups = async () => {
      try {
        const [
          celebResponse,
          subjectResponse,
          artistResponse,
          categoryResponse,
          sportResponse,
          seasonResponse,
          albumResponse
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/subject`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/category`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/album`)
        ]);

        setCelebList(celebResponse.data);
        setSubjectList(subjectResponse.data);
        setArtistList(artistResponse.data);
        setCategoryList(categoryResponse.data);
        setSportList(sportResponse.data);
        setSeasonList(seasonResponse.data);
        setAlbumList(albumResponse.data);
      } catch (error) {
        console.error("Error loading lookup data:", error);
        window.alert("There was a problem loading the dropdown lists.");
      }
    };

    loadLookups();
  }, []);

  // ============================================================
  // CLEAR FORM
  // ============================================================

  const clearForm = () => {
    setType("Bit");
    setTitle("");
    setCategory("");
    setArtist("");
    setDate("");
    setTime("");
    setAutoNum("");
    setSubjects([""]);
    setCelebrities([""]);
    setSport("");
    setSeason("");
    setKeywords("");
    setHyperlinks([""]);
    setAlbums([{ album: "", track: "" }]);
  };

  // ============================================================
  // SUBMIT BIT
  // ============================================================

  const submitMedia = async () => {
    try {
      const cleanSubjects = subjects
        .filter((s) => s !== null && s !== undefined && s !== "")
        .map((s) => Number(s));

      const cleanCelebrities = celebrities
        .filter((c) => c !== null && c !== undefined && c !== "")
        .map((c) => Number(c));

      const cleanHyperlinks = hyperlinks
        .filter((link) => link && link.trim() !== "")
        .map((link) => link.trim());

      const cleanAlbums = albums
        .filter(
          (a) => a && a.album !== null && a.album !== undefined && a.album !== ""
        )
        .map((a) => ({
          album: Number(a.album),
          track:
            a.track !== null && a.track !== undefined && a.track !== ""
              ? Number(a.track)
              : 0
        }));

      const response = await Axios.post(`${API_URL}/api/insert/bit`, {
        type,
        title,
        category: category ? Number(category) : null,
        artist: artist ? Number(artist) : null,
        date: date || null,
        time: time || null,
        autoNum: autoNum || null,
        subjects: cleanSubjects,
        celebrities: cleanCelebrities,
        sport: sport ? Number(sport) : null,
        season: season ? Number(season) : null,
        keywords: keywords && keywords.trim() !== "" ? keywords.trim() : null,
        hyperlinks: cleanHyperlinks,
        albums: cleanAlbums
      });

      if (response.status === 200) {
        window.alert(`Bit added successfully. Bit ID: ${response.data.bitID}`);
        clearForm();
      }
    } catch (error) {
      console.error(error);

      let errorMessage = "Unknown error occurred.";

      if (error.response) {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          error.response.data?.details ||
          JSON.stringify(error.response.data);
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = error.message;
      }

      window.alert(`Failed to add bit: ${errorMessage}`);
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <form
      className="add-bit-form"
      onSubmit={(e) => {
        e.preventDefault();
        submitMedia();
      }}
    >
      <div className="page-header">
        <h1>Add New Bit</h1>
        <p>Log a new bit, segment, or video and tag it for search.</p>
      </div>

      <div className="form-columns">
        {/* =====================================================
            GENERAL INFO
        ====================================================== */}

        <section className="card card-primary">
          <h2>General Info</h2>

          <div className="field">
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Media title"
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="type">Type</label>
              <select id="type" value={type} onChange={(e) => setType(e.target.value)}>
                <option value="Bit">Bit</option>
                <option value="Segment">Segment</option>
                <option value="Video">Video</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select category</option>
                {categoryList.map((val) => (
                  <option key={val.CatID} value={val.CatID}>
                    {val.Category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="artist">Artist</label>
              <select
                id="artist"
                value={artist}
                onChange={(e) => setArtist(e.target.value)}
              >
                <option value="">Select artist</option>
                {artistList.map((val) => (
                  <option key={val.ArtistID} value={val.ArtistID}>
                    {val.Name}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="date">Air date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="time">Length</label>
              <input
                id="time"
                type="text"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                placeholder="HH:MM:SS"
              />
            </div>

            <div className="field">
              <label htmlFor="autoNum">Automation #</label>
              <input
                id="autoNum"
                type="text"
                value={autoNum}
                onChange={(e) => setAutoNum(e.target.value)}
                placeholder="0123456789"
              />
            </div>
          </div>

          <div className="field">
            <label htmlFor="keywords">Keywords</label>
            <input
              id="keywords"
              type="text"
              value={keywords}
              onChange={(e) => setKeywords(e.target.value)}
              placeholder="Comma-separated keywords"
            />
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="sport">Sport</label>
              <select id="sport" value={sport} onChange={(e) => setSport(e.target.value)}>
                <option value="">Select sport</option>
                {sportList.map((val) => (
                  <option key={val.SportID} value={val.SportID}>
                    {val.Sport}
                  </option>
                ))}
              </select>
            </div>

            <div className="field">
              <label htmlFor="season">Season</label>
              <select
                id="season"
                value={season}
                onChange={(e) => setSeason(e.target.value)}
              >
                <option value="">Select season</option>
                {seasonList.map((val) => (
                  <option key={val.SeasonID} value={val.SeasonID}>
                    {val.Season}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* SUBJECTS */}
          <div className="field">
            <label>Subjects</label>
            <div className="dynamic-list">
              {subjects.map((subject, index) => (
                <div className="dynamic-row" key={index}>
                  <select
                    value={subject}
                    onChange={(e) => updateSubject(index, e.target.value)}
                  >
                    <option value="">Select subject</option>
                    {subjectList.map((val) => (
                      <option key={val.SubID} value={val.SubID}>
                        {val.Subject}
                      </option>
                    ))}
                  </select>

                  {subjects.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label="Remove subject"
                      onClick={() => removeSubject(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button type="button" className="add-btn" onClick={addSubject}>
                + Add subject
              </button>
            </div>
          </div>

          {/* CELEBRITIES */}
          <div className="field">
            <label>Celebrities</label>
            <div className="dynamic-list">
              {celebrities.map((celebrity, index) => (
                <div className="dynamic-row" key={index}>
                  <select
                    value={celebrity}
                    onChange={(e) => updateCelebrity(index, e.target.value)}
                  >
                    <option value="">Select celebrity</option>
                    {celebList.map((val) => (
                      <option key={val.CelebID} value={val.CelebID}>
                        {val.Name}
                      </option>
                    ))}
                  </select>

                  {celebrities.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label="Remove celebrity"
                      onClick={() => removeCelebrity(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button type="button" className="add-btn" onClick={addCelebrity}>
                + Add celebrity
              </button>
            </div>
          </div>
        </section>

        {/* =====================================================
            HYPERLINKS + ALBUMS
        ====================================================== */}

        <div className="side-column">
          <section className="card">
            <h2>Hyperlinks</h2>

            <div className="dynamic-list">
              {hyperlinks.map((link, index) => (
                <div className="dynamic-row" key={index}>
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => updateHyperlink(index, e.target.value)}
                    placeholder="https://example.com"
                  />

                  {hyperlinks.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label="Remove hyperlink"
                      onClick={() => removeHyperlink(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button type="button" className="add-btn" onClick={addHyperlink}>
                + Add hyperlink
              </button>
            </div>
          </section>

          <section className="card">
            <h2>Albums</h2>

            <div className="dynamic-list">
              {albums.map((item, index) => (
                <div className="dynamic-row dynamic-row-album" key={index}>
                  <select
                    value={item.album}
                    onChange={(e) => updateAlbum(index, "album", e.target.value)}
                  >
                    <option value="">Select album</option>
                    {albumList.map((val) => (
                      <option key={val.AlbumID} value={val.AlbumID}>
                        {val.Album_Name}
                      </option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={item.track}
                    onChange={(e) => updateAlbum(index, "track", e.target.value)}
                    placeholder="Track #"
                    className="track-input"
                  />

                  {albums.length > 1 && (
                    <button
                      type="button"
                      className="icon-btn"
                      aria-label="Remove album"
                      onClick={() => removeAlbum(index)}
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}

              <button type="button" className="add-btn" onClick={addAlbum}>
                + Add album
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* =======================================================
          FORM ACTIONS
      ======================================================== */}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={clearForm}>
          Clear form
        </button>

        <button type="submit" className="btn btn-primary">
          Save bit
        </button>
      </div>
    </form>
  );
};

export default AddBit;
