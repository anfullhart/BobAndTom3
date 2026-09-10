import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Axios from "axios";
import "./addBit.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const EditBit = () => {
  const locationState = useLocation().state || {};
  const searchBitID = locationState.bitID;
  const navigate = useNavigate();

  // ============================================================
  // BASIC BIT INFORMATION
  // ============================================================

  const [type, setType] = useState("Bit");
  const [title, setTitle] = useState("");
  const [artist, setArtist] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [autoNum, setAutoNum] = useState("");

  const [categories, setCategories] = useState([""]);
  const [subjects, setSubjects] = useState([""]);
  const [celebrities, setCelebrities] = useState([""]);
  const [sports, setSports] = useState([""]);
  const [seasons, setSeasons] = useState([""]);

  const [keywords, setKeywords] = useState("");

  const [hyperlinks, setHyperlinks] = useState([""]);

  const [albums, setAlbums] = useState([{ album: "", track: "" }]);

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

  const [loading, setLoading] = useState(true);

  // ============================================================
  // LOAD LOOKUP LISTS + BIT
  // ============================================================

  useEffect(() => {
    if (!searchBitID) {
      console.error("No BitID was provided to EditBit.");
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        setLoading(true);

        const [
          bitRes,
          celebRes,
          subjectRes,
          artistRes,
          categoryRes,
          sportRes,
          seasonRes,
          albumRes
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/bit/edit/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/subject`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/category`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/album`)
        ]);

        const bit = bitRes.data;

        setCelebList(celebRes.data || []);
        setSubjectList(subjectRes.data || []);
        setArtistList(artistRes.data || []);
        setCategoryList(categoryRes.data || []);
        setSportList(sportRes.data || []);
        setSeasonList(seasonRes.data || []);
        setAlbumList(albumRes.data || []);

        setType(bit.type || "Bit");
        setTitle(bit.title || "");
        setArtist(
          bit.artist !== undefined && bit.artist !== null
            ? String(bit.artist)
            : ""
        );
        setDate(bit.date || "");
        setTime(bit.time || "");
        setAutoNum(bit.autoNum || "");

        const loadedCategories = Array.isArray(bit.categories)
          ? bit.categories
          : bit.category
          ? [bit.category]
          : [];

        setCategories(
          loadedCategories.length > 0
            ? loadedCategories.map((id) => String(id))
            : [""]
        );

        const loadedSubjects = Array.isArray(bit.subjects) ? bit.subjects : [];

        setSubjects(
          loadedSubjects.length > 0
            ? loadedSubjects.map((id) => String(id))
            : [""]
        );

        const loadedCelebrities = Array.isArray(bit.celebrities)
          ? bit.celebrities
          : [];

        setCelebrities(
          loadedCelebrities.length > 0
            ? loadedCelebrities.map((id) => String(id))
            : [""]
        );

        const loadedSports = Array.isArray(bit.sports)
          ? bit.sports
          : bit.sport
          ? [bit.sport]
          : [];

        setSports(
          loadedSports.length > 0 ? loadedSports.map((id) => String(id)) : [""]
        );

        const loadedSeasons = Array.isArray(bit.seasons)
          ? bit.seasons
          : bit.season
          ? [bit.season]
          : [];

        setSeasons(
          loadedSeasons.length > 0
            ? loadedSeasons.map((id) => String(id))
            : [""]
        );

        if (Array.isArray(bit.keywords)) {
          setKeywords(bit.keywords.join(", "));
        } else {
          setKeywords(bit.keywords || "");
        }

        if (Array.isArray(bit.hyperlinks) && bit.hyperlinks.length > 0) {
          setHyperlinks(bit.hyperlinks.map((link) => String(link)));
        } else {
          setHyperlinks([""]);
        }

        if (Array.isArray(bit.albums) && bit.albums.length > 0) {
          setAlbums(
            bit.albums.map((item) => ({
              album:
                item.album !== undefined && item.album !== null
                  ? String(item.album)
                  : "",
              track:
                item.track !== undefined && item.track !== null
                  ? String(item.track)
                  : ""
            }))
          );
        } else {
          setAlbums([{ album: "", track: "" }]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading bit:", error);

        if (error.response) {
          console.error("Backend response:", error.response.data);
        }

        window.alert(
          "Unable to load the bit information. Check the browser console and backend."
        );

        setLoading(false);
      }
    };

    loadData();
  }, [searchBitID]);

  // ============================================================
  // GENERIC LIST HELPERS (categories, subjects, celebrities, sports, seasons)
  // ============================================================

  const makeListHelpers = (state, setState) => ({
    update: (index, value) => {
      const updated = [...state];
      updated[index] = value;
      setState(updated);
    },
    add: () => setState([...state, ""]),
    remove: (index) => {
      const updated = state.filter((_, i) => i !== index);
      setState(updated.length > 0 ? updated : [""]);
    }
  });

  const categoryHelpers = makeListHelpers(categories, setCategories);
  const subjectHelpers = makeListHelpers(subjects, setSubjects);
  const celebrityHelpers = makeListHelpers(celebrities, setCelebrities);
  const sportHelpers = makeListHelpers(sports, setSports);
  const seasonHelpers = makeListHelpers(seasons, setSeasons);

  const updateHyperlink = (index, value) => {
    const updated = [...hyperlinks];
    updated[index] = value;
    setHyperlinks(updated);
  };

  const addHyperlink = () => setHyperlinks([...hyperlinks, ""]);

  const removeHyperlink = (index) => {
    const updated = hyperlinks.filter((_, i) => i !== index);
    setHyperlinks(updated.length > 0 ? updated : [""]);
  };

  const updateAlbum = (index, field, value) => {
    const updated = [...albums];
    updated[index] = { ...updated[index], [field]: value };
    setAlbums(updated);
  };

  const addAlbum = () => setAlbums([...albums, { album: "", track: "" }]);

  const removeAlbum = (index) => {
    const updated = albums.filter((_, i) => i !== index);
    setAlbums(updated.length > 0 ? updated : [{ album: "", track: "" }]);
  };

  // ============================================================
  // SUBMIT EDITS
  // ============================================================

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const clean = (arr) => [
        ...new Set(
          arr.filter(
            (value) =>
              value !== null && value !== undefined && String(value).trim() !== ""
          )
        )
      ];

      const cleanedCategories = clean(categories);
      const cleanedSubjects = clean(subjects);
      const cleanedCelebrities = clean(celebrities);
      const cleanedSports = clean(sports);
      const cleanedSeasons = clean(seasons);

      const cleanedHyperlinks = hyperlinks
        .filter((link) => link && String(link).trim() !== "")
        .map((link) => String(link).trim());

      const cleanedAlbums = albums
        .filter(
          (item) =>
            item &&
            item.album !== null &&
            item.album !== undefined &&
            String(item.album).trim() !== ""
        )
        .map((item) => ({
          album: item.album,
          track: item.track || ""
        }));

      const payload = {
        bitID: searchBitID,
        type,
        title,
        artist: artist || null,
        date: date || null,
        time: time || null,
        autoNum: autoNum || null,
        categories: cleanedCategories,
        subjects: cleanedSubjects,
        celebrities: cleanedCelebrities,
        sports: cleanedSports,
        seasons: cleanedSeasons,
        keywords: keywords || "",
        hyperlinks: cleanedHyperlinks,
        albums: cleanedAlbums
      };

      await Axios.post(`${API_URL}/api/update/bit`, payload);

      window.alert("Bit updated successfully.");
    } catch (error) {
      console.error("Error updating bit:", error);

      let errorMessage = "Unknown error occurred.";

      if (error.response) {
        errorMessage =
          error.response.data?.error ||
          error.response.data?.message ||
          JSON.stringify(error.response.data);
      } else if (error.request) {
        errorMessage = "No response received from the server.";
      } else {
        errorMessage = error.message;
      }

      window.alert(`Failed to update bit: ${errorMessage}`);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="add-bit-form loading-state">
        <p>Loading bit information…</p>
      </div>
    );
  }

  // ============================================================
  // REUSABLE DYNAMIC LIST RENDERER (id-based lookup lists)
  // ============================================================

  const renderIdList = ({ label, items, helpers, options, optionValue, optionLabel, placeholder }) => (
    <div className="field">
      <label>{label}</label>
      <div className="dynamic-list">
        {items.map((value, index) => (
          <div className="dynamic-row" key={index}>
            <select value={value} onChange={(e) => helpers.update(index, e.target.value)}>
              <option value="">{placeholder}</option>
              {options.map((opt) => (
                <option key={opt[optionValue]} value={opt[optionValue]}>
                  {opt[optionLabel]}
                </option>
              ))}
            </select>

            {items.length > 1 && (
              <button
                type="button"
                className="icon-btn"
                aria-label={`Remove ${label.toLowerCase()}`}
                onClick={() => helpers.remove(index)}
              >
                ×
              </button>
            )}
          </div>
        ))}

        <button type="button" className="add-btn" onClick={helpers.add}>
          + Add {label.replace(/s$/, "").toLowerCase()}
        </button>
      </div>
    </div>
  );

  // ============================================================
  // PAGE
  // ============================================================

  return (
    <form className="add-bit-form">
      <div className="page-header">
        <h1>Edit Bit</h1>
        <p>Bit ID {searchBitID} — update the details below and confirm to save.</p>
      </div>

      <div className="form-columns">
        {/* =====================================================
            GENERAL INFORMATION
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
          </div>

          <div className="field-row">
            <div className="field">
              <label htmlFor="date">Air date</label>
              <input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

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

          {renderIdList({
            label: "Category",
            items: categories,
            helpers: categoryHelpers,
            options: categoryList,
            optionValue: "CatID",
            optionLabel: "Category",
            placeholder: "Select category"
          })}

          {renderIdList({
            label: "Subjects",
            items: subjects,
            helpers: subjectHelpers,
            options: subjectList,
            optionValue: "SubID",
            optionLabel: "Subject",
            placeholder: "Select subject"
          })}

          {renderIdList({
            label: "Celebrity",
            items: celebrities,
            helpers: celebrityHelpers,
            options: celebList,
            optionValue: "CelebID",
            optionLabel: "Name",
            placeholder: "Select celebrity"
          })}

          {renderIdList({
            label: "Sports",
            items: sports,
            helpers: sportHelpers,
            options: sportList,
            optionValue: "SportID",
            optionLabel: "Sport",
            placeholder: "Select sport"
          })}

          {renderIdList({
            label: "Seasons",
            items: seasons,
            helpers: seasonHelpers,
            options: seasonList,
            optionValue: "SeasonID",
            optionLabel: "Season",
            placeholder: "Select season"
          })}

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
          BUTTONS
      ======================================================== */}

      <div className="form-actions">
        <button type="button" className="btn btn-ghost" onClick={handleCancel}>
          Cancel
        </button>

        <button type="button" className="btn btn-primary" onClick={handleConfirm}>
          Confirm edits
        </button>
      </div>
    </form>
  );
};

export default EditBit;
