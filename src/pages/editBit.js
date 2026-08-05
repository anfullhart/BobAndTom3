
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

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    type: "Bit",
    title: "",
    category: "",
    artist: "",
    date: "",
    time: "",
    autoNum: "",

    sub1: "",
    sub2: "",
    sub3: "",
    sub4: "",

    celebrity1: "",
    celebrity2: "",

    sport: "",
    season: "",

    keywords: "",
  });

  // ==========================================
  // DYNAMIC HYPERLINKS
  // ==========================================

  const [hyperlinks, setHyperlinks] = useState([""]);

  // ==========================================
  // DYNAMIC ALBUMS
  // ==========================================

  const [albums, setAlbums] = useState([
    {
      albumID: "",
      track: "",
    },
  ]);

  // ==========================================
  // DROPDOWN LISTS
  // ==========================================

  const [lists, setLists] = useState({
    celebList: [],
    subjectList: [],
    artistList: [],
    categoryList: [],
    sportList: [],
    seasonList: [],
    albumList: [],
  });

  // ==========================================
  // LOAD DATA
  // ==========================================

  useEffect(() => {
    if (!searchBitID) {
      return;
    }

    const fetchData = async () => {
      try {
        const [
          bitRes,
          celebRes,
          subjectRes,
          artistRes,
          categoryRes,
          sportRes,
          seasonRes,
          albumRes,
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/bit/full/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celebrity`),
          Axios.get(`${API_URL}/api/get/subject`),
          Axios.get(`${API_URL}/api/get/artist`),
          Axios.get(`${API_URL}/api/get/category`),
          Axios.get(`${API_URL}/api/get/sport`),
          Axios.get(`${API_URL}/api/get/season`),
          Axios.get(`${API_URL}/api/get/album`),
        ]);

        // ==========================================
        // SET DROPDOWN LISTS
        // ==========================================

        setLists({
          celebList: celebRes.data,
          subjectList: subjectRes.data,
          artistList: artistRes.data,
          categoryList: categoryRes.data,
          sportList: sportRes.data,
          seasonList: seasonRes.data,
          albumList: albumRes.data,
        });

        const bit = bitRes.data;

        // ==========================================
        // SET FORM DATA
        // ==========================================

        setFormData({
          type: bit.type || "Bit",
          title: bit.title || "",
          category: bit.category || "",
          artist: bit.artist || "",
          date: formatDateForInput(bit.date),
          time: bit.time || "",
          autoNum: bit.autoNum || "",

          sub1: bit.sub1 || "",
          sub2: bit.sub2 || "",
          sub3: bit.sub3 || "",
          sub4: bit.sub4 || "",

          celebrity1: bit.celebrity1 || "",
          celebrity2: bit.celebrity2 || "",

          sport: bit.sport || "",
          season: bit.season || "",

          keywords: bit.keywords || "",
        });

        // ==========================================
        // SET HYPERLINKS
        // ==========================================

        if (
          Array.isArray(bit.hyperlinks) &&
          bit.hyperlinks.length > 0
        ) {
          setHyperlinks(bit.hyperlinks);
        } else {
          setHyperlinks([""]);
        }

        // ==========================================
        // SET ALBUMS
        // ==========================================

        if (
          Array.isArray(bit.albums) &&
          bit.albums.length > 0
        ) {
          setAlbums(
            bit.albums.map((album) => ({
              albumID: album.albumID || "",
              track: album.track || "",
            }))
          );
        } else {
          setAlbums([
            {
              albumID: "",
              track: "",
            },
          ]);
        }
      } catch (err) {
        console.error("Error loading bit:", err);

        alert(
          "Unable to load the bit information. Check the browser console and backend."
        );
      }
    };

    fetchData();
  }, [searchBitID]);

  // ==========================================
  // DATE FORMATTER
  // ==========================================

  const formatDateForInput = (dateValue) => {
    if (!dateValue) {
      return "";
    }

    // If already YYYY-MM-DD
    if (
      typeof dateValue === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(dateValue)
    ) {
      return dateValue;
    }

    // Handle MM/DD/YYYY
    if (
      typeof dateValue === "string" &&
      /^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)
    ) {
      const [month, day, year] = dateValue.split("/");

      return `${year}-${month}-${day}`;
    }

    // Handle JS Date / MySQL date
    try {
      const date = new Date(dateValue);

      if (!isNaN(date.getTime())) {
        return date.toISOString().split("T")[0];
      }
    } catch (err) {
      console.error("Date conversion error:", err);
    }

    return "";
  };

  // ==========================================
  // FORM CHANGE
  // ==========================================

  const handleChange = (field, value) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  // ==========================================
  // HYPERLINK FUNCTIONS
  // ==========================================

  const updateHyperlink = (index, value) => {
    setHyperlinks((previous) =>
      previous.map((link, i) =>
        i === index ? value : link
      )
    );
  };

  const addHyperlink = () => {
    setHyperlinks((previous) => [
      ...previous,
      "",
    ]);
  };

  const removeHyperlink = (index) => {
    setHyperlinks((previous) => {
      const updated = previous.filter(
        (_, i) => i !== index
      );

      return updated.length > 0 ? updated : [""];
    });
  };

  // ==========================================
  // ALBUM FUNCTIONS
  // ==========================================

  const updateAlbum = (index, field, value) => {
    setAlbums((previous) =>
      previous.map((album, i) =>
        i === index
          ? {
              ...album,
              [field]: value,
            }
          : album
      )
    );
  };

  const addAlbum = () => {
    setAlbums((previous) => [
      ...previous,
      {
        albumID: "",
        track: "",
      },
    ]);
  };

  const removeAlbum = (index) => {
    setAlbums((previous) => {
      const updated = previous.filter(
        (_, i) => i !== index
      );

      return updated.length > 0
        ? updated
        : [
            {
              albumID: "",
              track: "",
            },
          ];
    });
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleConfirm = async (e) => {
    e.preventDefault();

    try {
      const cleanedHyperlinks = hyperlinks
        .map((link) => link.trim())
        .filter((link) => link !== "");

      const cleanedAlbums = albums
        .filter(
          (album) =>
            album.albumID !== "" &&
            album.albumID !== null &&
            album.albumID !== undefined
        )
        .map((album) => ({
          albumID: album.albumID,
          track: album.track || "",
        }));

      await Axios.post(
        `${API_URL}/api/update/bit`,
        {
          bitID: searchBitID,

          type: formData.type,
          title: formData.title,
          category: formData.category,
          artist: formData.artist,
          date: formData.date,
          time: formData.time,
          autoNum: formData.autoNum,

          sub1: formData.sub1,
          sub2: formData.sub2,
          sub3: formData.sub3,
          sub4: formData.sub4,

          celebrity1: formData.celebrity1,
          celebrity2: formData.celebrity2,

          sport: formData.sport,
          season: formData.season,

          keywords: formData.keywords,

          hyperlinks: cleanedHyperlinks,

          albums: cleanedAlbums,
        }
      );

      alert("Bit updated successfully!");
    } catch (err) {
      console.error(
        "Error updating bit:",
        err.response?.data || err
      );

      alert(
        err.response?.data?.error ||
          "Failed to update bit."
      );
    }
  };

  // ==========================================
  // CANCEL
  // ==========================================

  const handleCancel = (e) => {
    e.preventDefault();

    navigate(-1);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (
    <form
      className="add-bit-form"
      onSubmit={handleConfirm}
    >
      <div className="form-columns">

        {/* ==========================================
            GENERAL INFO
        ========================================== */}

        <div className="card">
          <h2>General Info</h2>

          {/* TITLE */}

          <div className="form-row">
            <label>Title:</label>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                handleChange(
                  "title",
                  e.target.value
                )
              }
              placeholder="Media Title"
            />
          </div>

          {/* TYPE */}

          <div className="form-row">
            <label>Type:</label>

            <select
              value={formData.type}
              onChange={(e) =>
                handleChange(
                  "type",
                  e.target.value
                )
              }
            >
              <option value="Bit">Bit</option>
              <option value="Segment">
                Segment
              </option>
              <option value="Video">
                Video
              </option>
            </select>
          </div>

          {/* CATEGORY */}

          <div className="form-row">
            <label>Category:</label>

            <select
              value={formData.category}
              onChange={(e) =>
                handleChange(
                  "category",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Category
              </option>

              {lists.categoryList.map((val) => (
                <option
                  key={val.CatID}
                  value={val.CatID}
                >
                  {val.Category}
                </option>
              ))}
            </select>
          </div>

          {/* ARTIST */}

          <div className="form-row">
            <label>Artist:</label>

            <select
              value={formData.artist}
              onChange={(e) =>
                handleChange(
                  "artist",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Artist
              </option>

              {lists.artistList.map((val) => (
                <option
                  key={val.ArtistID}
                  value={val.ArtistID}
                >
                  {val.Name}
                </option>
              ))}
            </select>
          </div>

          {/* DATE */}

          <div className="form-row">
            <label>Air Date:</label>

            <input
              type="date"
              value={formData.date}
              onChange={(e) =>
                handleChange(
                  "date",
                  e.target.value
                )
              }
            />
          </div>

          {/* TIME / AUTOMATION */}

          <div className="form-row">
            <label>Length:</label>

            <input
              type="text"
              value={formData.time}
              onChange={(e) =>
                handleChange(
                  "time",
                  e.target.value
                )
              }
              placeholder="HH:MM:SS"
            />

            <label>Automation #:</label>

            <input
              type="text"
              value={formData.autoNum}
              onChange={(e) =>
                handleChange(
                  "autoNum",
                  e.target.value
                )
              }
              placeholder="0123456789"
            />
          </div>

          {/* SUBJECTS */}

          <div className="form-row">
            <label>Subjects:</label>

            <select
              value={formData.sub1}
              onChange={(e) =>
                handleChange(
                  "sub1",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Subject
              </option>

              {lists.subjectList.map((val) => (
                <option
                  key={val.SubID}
                  value={val.SubID}
                >
                  {val.Subject}
                </option>
              ))}
            </select>

            <select
              value={formData.sub2}
              onChange={(e) =>
                handleChange(
                  "sub2",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Subject
              </option>

              {lists.subjectList.map((val) => (
                <option
                  key={val.SubID}
                  value={val.SubID}
                >
                  {val.Subject}
                </option>
              ))}
            </select>

            <select
              value={formData.sub3}
              onChange={(e) =>
                handleChange(
                  "sub3",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Subject
              </option>

              {lists.subjectList.map((val) => (
                <option
                  key={val.SubID}
                  value={val.SubID}
                >
                  {val.Subject}
                </option>
              ))}
            </select>

            <select
              value={formData.sub4}
              onChange={(e) =>
                handleChange(
                  "sub4",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Subject
              </option>

              {lists.subjectList.map((val) => (
                <option
                  key={val.SubID}
                  value={val.SubID}
                >
                  {val.Subject}
                </option>
              ))}
            </select>
          </div>

          {/* CELEBRITIES */}

          <div className="form-row">
            <label>Celebrities:</label>

            <select
              value={formData.celebrity1}
              onChange={(e) =>
                handleChange(
                  "celebrity1",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Celebrity
              </option>

              {lists.celebList.map((val) => (
                <option
                  key={val.CelebID}
                  value={val.CelebID}
                >
                  {val.Name}
                </option>
              ))}
            </select>

            <select
              value={formData.celebrity2}
              onChange={(e) =>
                handleChange(
                  "celebrity2",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Celebrity
              </option>

              {lists.celebList.map((val) => (
                <option
                  key={val.CelebID}
                  value={val.CelebID}
                >
                  {val.Name}
                </option>
              ))}
            </select>
          </div>

          {/* SPORT / SEASON */}

          <div className="form-row">
            <label>Sport:</label>

            <select
              value={formData.sport}
              onChange={(e) =>
                handleChange(
                  "sport",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Sport
              </option>

              {lists.sportList.map((val) => (
                <option
                  key={val.SportID}
                  value={val.SportID}
                >
                  {val.Sport}
                </option>
              ))}
            </select>

            <label>Season:</label>

            <select
              value={formData.season}
              onChange={(e) =>
                handleChange(
                  "season",
                  e.target.value
                )
              }
            >
              <option value="">
                Select Season
              </option>

              {lists.seasonList.map((val) => (
                <option
                  key={val.SeasonID}
                  value={val.SeasonID}
                >
                  {val.Season}
                </option>
              ))}
            </select>
          </div>

          {/* KEYWORDS */}

          <div className="form-row">
            <label>Keywords:</label>

            <input
              type="text"
              value={formData.keywords}
              onChange={(e) =>
                handleChange(
                  "keywords",
                  e.target.value
                )
              }
              placeholder="Enter keywords"
            />
          </div>
        </div>

        {/* ==========================================
            HYPERLINKS
        ========================================== */}

        <div className="card">
          <h2>Hyperlinks</h2>

          {hyperlinks.map((link, index) => (
            <div
              className="form-row"
              key={index}
            >
              <label>
                Link {index + 1}:
              </label>

              <input
                type="text"
                value={link}
                onChange={(e) =>
                  updateHyperlink(
                    index,
                    e.target.value
                  )
                }
                placeholder="Enter link"
              />

              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  removeHyperlink(index)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary"
            onClick={addHyperlink}
          >
            + Add Hyperlink
          </button>
        </div>

        {/* ==========================================
            ALBUMS
        ========================================== */}

        <div className="card">
          <h2>Albums</h2>

          {albums.map((album, index) => (
            <div
              className="form-row"
              key={index}
            >
              <label>
                Album {index + 1}:
              </label>

              <select
                value={album.albumID}
                onChange={(e) =>
                  updateAlbum(
                    index,
                    "albumID",
                    e.target.value
                  )
                }
              >
                <option value="">
                  Select Album
                </option>

                {lists.albumList.map((val) => (
                  <option
                    key={val.AlbumID}
                    value={val.AlbumID}
                  >
                    {val.Album_Name}
                  </option>
                ))}
              </select>

              <label>Track:</label>

              <input
                type="text"
                value={album.track}
                onChange={(e) =>
                  updateAlbum(
                    index,
                    "track",
                    e.target.value
                  )
                }
                placeholder="Track #"
              />

              <button
                type="button"
                className="btn btn-danger"
                onClick={() =>
                  removeAlbum(index)
                }
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            className="btn btn-primary"
            onClick={addAlbum}
          >
            + Add Album
          </button>
        </div>
      </div>

      {/* ==========================================
          BUTTONS
      ========================================== */}

      <div className="form-actions">
        <button
          type="submit"
          className="btn btn-success"
        >
          Confirm Edits
        </button>

        <button
          type="button"
          className="btn btn-danger"
          onClick={handleCancel}
        >
          Cancel Edits
        </button>
      </div>
    </form>
  );
};

export default EditBit;

