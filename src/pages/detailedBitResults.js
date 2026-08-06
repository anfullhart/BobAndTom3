import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";

const DetailedBitResults = () => {
  const { type } = useParams();
  const searchBitID = useLocation().state?.searchBitID;

  const [bitList, setBitList] = useState([]);
  const [artist, setArtist] = useState([]);
  const [category, setCategory] = useState([]);
  const [subject, setSubject] = useState([]);
  const [celebrity1, setCelebrity1] = useState([]);
  const [celebrity2, setCelebrity2] = useState([]);
  const [sport, setSport] = useState([]);
  const [season, setSeason] = useState([]);
  const [album, setAlbum] = useState([]);
  const [hyperlink, setHyperlink] = useState([]);
  const [keyword, setKeyword] = useState([]);

  useEffect(() => {
    if (!searchBitID) return;

    const fetchData = async () => {
      try {
        const [
          bitRes,
          artistRes,
          sportRes,
          subjectRes,
          celeb1Res,
          celeb2Res,
          seasonRes,
          categoryRes,
          albumRes,
          hyperlinkRes,
          keywordRes
        ] = await Promise.all([
          Axios.get(`${API_URL}/api/get/bit/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/artist/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/sport/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/subject/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celeb1/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/celeb2/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/season/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/category/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/album/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/hyperlink/info/${searchBitID}`),
          Axios.get(`${API_URL}/api/get/keyword/info/${searchBitID}`)
        ]);

        setBitList(Array.isArray(bitRes.data) ? bitRes.data : []);
        setArtist(Array.isArray(artistRes.data) ? artistRes.data : []);
        setSport(Array.isArray(sportRes.data) ? sportRes.data : []);
        setSubject(Array.isArray(subjectRes.data) ? subjectRes.data : []);
        setCelebrity1(
          Array.isArray(celeb1Res.data) ? celeb1Res.data : []
        );
        setCelebrity2(
          Array.isArray(celeb2Res.data) ? celeb2Res.data : []
        );
        setSeason(Array.isArray(seasonRes.data) ? seasonRes.data : []);
        setCategory(
          Array.isArray(categoryRes.data) ? categoryRes.data : []
        );
        setAlbum(Array.isArray(albumRes.data) ? albumRes.data : []);

        setHyperlink(
          Array.isArray(hyperlinkRes.data)
            ? hyperlinkRes.data
            : []
        );

        setKeyword(
          Array.isArray(keywordRes.data)
            ? keywordRes.data
            : []
        );

      } catch (err) {
        console.error("Failed to fetch detailed results", err);
      }
    };

    fetchData();
  }, [searchBitID]);

  const cardStyle = {
    backgroundColor: "#1c1c1c",
    padding: "20px",
    borderRadius: "10px",
    marginBottom: "20px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.3)"
  };

  const labelStyle = {
    fontWeight: "bold",
    marginRight: "10px"
  };

  const valueStyle = {
    color: "lime"
  };

  const itemStyle = {
    marginBottom: "8px"
  };

  return (
    <div
      style={{
        padding: "20px",
        color: "white",
        fontFamily: "Arial, sans-serif",
        maxWidth: "900px",
        margin: "0 auto"
      }}
    >

      {/* ========================= */}
      {/* BIT INFORMATION */}
      {/* ========================= */}

      {bitList.map((val) => (
        <div key={val.BitID} style={cardStyle}>

          <h2 style={{ marginTop: 0 }}>
            Bit Information
          </h2>

          <div style={itemStyle}>
            <span style={labelStyle}>ID:</span>
            <span style={valueStyle}>
              {val.BitID}
            </span>
          </div>

          <div style={itemStyle}>
            <span style={labelStyle}>Title:</span>
            <span style={valueStyle}>
              {val.Title}
            </span>
          </div>

          <div style={itemStyle}>
            <span style={labelStyle}>
              Automation Number:
            </span>

            <span style={valueStyle}>
              {val.ProphetNum}
            </span>
          </div>

          <div style={itemStyle}>
            <span style={labelStyle}>
              Air Date:
            </span>

            <span style={valueStyle}>
              {val.AirDate}
            </span>
          </div>

          <div style={itemStyle}>
            <span style={labelStyle}>
              Elapsed Time:
            </span>

            <span style={valueStyle}>
              {val.Time}
            </span>
          </div>

          <div style={itemStyle}>
            <span style={labelStyle}>
              Media Type:
            </span>

            <span style={valueStyle}>
              {val.Type}
            </span>
          </div>

        </div>
      ))}


      {/* ========================= */}
      {/* ARTIST */}
      {/* ========================= */}

      {artist.length > 0 && (
        <div style={cardStyle}>

          <h3>Artist</h3>

          {artist.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Artist:
              </span>

              <span style={valueStyle}>
                {val.Artist || val.Name}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* CATEGORY */}
      {/* ========================= */}

      {category.length > 0 && (
        <div style={cardStyle}>

          <h3>Categories</h3>

          {category.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Category {idx + 1}:
              </span>

              <span style={valueStyle}>
                {val.Category}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* SUBJECTS */}
      {/* ========================= */}

      {subject.length > 0 && (
        <div style={cardStyle}>

          <h3>Subjects</h3>

          {subject.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Subject {idx + 1}:
              </span>

              <span style={valueStyle}>
                {val.Subject}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* CELEBRITY 1 */}
      {/* ========================= */}

      {celebrity1.length > 0 && (
        <div style={cardStyle}>

          <h3>Celebrity 1</h3>

          {celebrity1.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Celebrity:
              </span>

              <span style={valueStyle}>
                {val.Name}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* CELEBRITY 2 */}
      {/* ========================= */}

      {celebrity2.length > 0 && (
        <div style={cardStyle}>

          <h3>Celebrity 2</h3>

          {celebrity2.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Celebrity:
              </span>

              <span style={valueStyle}>
                {val.Name}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* SPORTS */}
      {/* ========================= */}

      {sport.length > 0 && (
        <div style={cardStyle}>

          <h3>Sports</h3>

          {sport.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Sport {idx + 1}:
              </span>

              <span style={valueStyle}>
                {val.Sport}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* SEASONS */}
      {/* ========================= */}

      {season.length > 0 && (
        <div style={cardStyle}>

          <h3>Seasons</h3>

          {season.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Season {idx + 1}:
              </span>

              <span style={valueStyle}>
                {val.Season}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* KEYWORDS */}
      {/* ========================= */}

      {keyword.length > 0 && (
        <div style={cardStyle}>

          <h3>Keywords</h3>

          {keyword.map((val, idx) => (
            <div key={idx} style={itemStyle}>

              <span style={labelStyle}>
                Keyword {idx + 1}:
              </span>

              <span style={valueStyle}>
                {val.Keyword || val.keyword || val.Keywords}
              </span>

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* ALBUMS */}
      {/* ========================= */}

      {album.length > 0 && (
        <div style={cardStyle}>

          <h3>Albums</h3>

          {album.map((val, idx) => (
            <div
              key={idx}
              style={{
                marginBottom: "20px",
                paddingBottom: "15px",
                borderBottom:
                  idx !== album.length - 1
                    ? "1px solid #444"
                    : "none"
              }}
            >

              <div style={itemStyle}>

                <span style={labelStyle}>
                  Album {idx + 1}:
                </span>

                <span style={valueStyle}>
                  {val.Album_Name}
                </span>

              </div>

              <div style={itemStyle}>

                <span style={labelStyle}>
                  Track:
                </span>

                <span style={valueStyle}>
                  {val.Album_Track}
                </span>

              </div>

              {/* Display Album ID if returned by API */}

              {val.AlbumID !== undefined && (
                <div style={itemStyle}>

                  <span style={labelStyle}>
                    Album ID:
                  </span>

                  <span style={valueStyle}>
                    {val.AlbumID}
                  </span>

                </div>
              )}

            </div>
          ))}

        </div>
      )}


      {/* ========================= */}
      {/* HYPERLINKS */}
      {/* ========================= */}

      {hyperlink.length > 0 && (
        <div style={cardStyle}>

          <h3>Hyperlinks</h3>

          {hyperlink.map((link, idx) => {

            const url =
              typeof link === "string"
                ? link
                : link.URL ||
                  link.Link ||
                  link.Hyperlink ||
                  link.url;

            return (
              <div
                key={idx}
                style={{
                  marginBottom: "10px"
                }}
              >

                <span style={labelStyle}>
                  Link {idx + 1}:
                </span>

                {url && (
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: "lime",
                      textDecoration: "underline",
                      wordBreak: "break-all"
                    }}
                  >
                    {url}
                  </a>
                )}

              </div>
            );

          })}

        </div>
      )}

    </div>
  );
};

export default DetailedBitResults;

