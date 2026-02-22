import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import Axios from "axios";

const DetailedBitResults = () => {
  const { type } = useParams();
  const searchBitID = useLocation().state?.searchBitID;

  const [bitList, setBitList] = useState([]);
  const [category, setCategory] = useState([]);
  const [subject, setSubject] = useState([]);
  const [celebrity1, setCelebrity1] = useState([]);
  const [celebrity2, setCelebrity2] = useState([]);
  const [sport, setSport] = useState([]);
  const [season, setSeason] = useState([]);
  const [album, setAlbum] = useState([]);
  const [hyperlink, setHyperlink] = useState([]);

  useEffect(() => {
    if (!searchBitID) return;

    const fetchData = async () => {
      try {
        const [
          bitRes,
          sportRes,
          subjectRes,
          celeb1Res,
          celeb2Res,
          seasonRes,
          categoryRes,
          albumRes,
          hyperlinkRes
        ] = await Promise.all([
          Axios.get(`http://localhost:3001/api/get/bit/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/sport/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/subject/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/celeb1/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/celeb2/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/season/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/category/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/album/info/${searchBitID}`),
          Axios.get(`http://localhost:3001/api/get/hyperlink/info/${searchBitID}`)
        ]);

        setBitList(Array.isArray(bitRes.data) ? bitRes.data : []);
        setSport(Array.isArray(sportRes.data) ? sportRes.data : []);
        setSubject(Array.isArray(subjectRes.data) ? subjectRes.data : []);
        setCelebrity1(Array.isArray(celeb1Res.data) ? celeb1Res.data : []);
        setCelebrity2(Array.isArray(celeb2Res.data) ? celeb2Res.data : []);
        setSeason(Array.isArray(seasonRes.data) ? seasonRes.data : []);
        setCategory(Array.isArray(categoryRes.data) ? categoryRes.data : []);
        setAlbum(Array.isArray(albumRes.data) ? albumRes.data : []);
        setHyperlink(Array.isArray(hyperlinkRes.data) ? hyperlinkRes.data : []);
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

  const labelStyle = { fontWeight: "bold", marginRight: "10px" };
  const valueStyle = { color: "lime" };

  return (
    <div style={{ padding: "20px", color: "white", fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "0 auto" }}>
      {bitList.map((val) => (
        <div key={val.BitID} style={cardStyle}>
          <div><span style={labelStyle}>ID:</span> <span style={valueStyle}>{val.BitID}</span></div>
          <div><span style={labelStyle}>Title:</span> <span style={valueStyle}>{val.Title}</span></div>
          <div><span style={labelStyle}>Automation Number:</span> <span style={valueStyle}>{val.ProphetNum}</span></div>
          <div><span style={labelStyle}>Air Date:</span> <span style={valueStyle}>{val.AirDate}</span></div>
          <div><span style={labelStyle}>Elapsed Time:</span> <span style={valueStyle}>{val.Time}</span></div>
          <div><span style={labelStyle}>Media Type:</span> <span style={valueStyle}>{val.Type}</span></div>
        </div>
      ))}

      {category.length > 0 && (
        <div style={cardStyle}>
          <h3>Categories</h3>
          {category.map((val, idx) => (
            <div key={idx}><span style={labelStyle}>Category:</span> <span style={valueStyle}>{val.Category}</span></div>
          ))}
        </div>
      )}

      {sport.length > 0 && (
        <div style={cardStyle}>
          <h3>Sports</h3>
          {sport.map((val, idx) => (
            <div key={idx}><span style={labelStyle}>Sport:</span> <span style={valueStyle}>{val.Sport}</span></div>
          ))}
        </div>
      )}

      {subject.length > 0 && (
        <div style={cardStyle}>
          <h3>Subjects</h3>
          {subject.map((val, idx) => (
            <div key={idx}><span style={labelStyle}>Subject {idx + 1}:</span> <span style={valueStyle}>{val.Subject}</span></div>
          ))}
        </div>
      )}

      {celebrity1.length > 0 && (
        <div style={cardStyle}>
          <h3>Celebrity 1</h3>
          {celebrity1.map((val, idx) => (
            <div key={idx}><span style={valueStyle}>{val.Name}</span></div>
          ))}
        </div>
      )}

      {celebrity2.length > 0 && (
        <div style={cardStyle}>
          <h3>Celebrity 2</h3>
          {celebrity2.map((val, idx) => (
            <div key={idx}><span style={valueStyle}>{val.Name}</span></div>
          ))}
        </div>
      )}

      {season.length > 0 && (
        <div style={cardStyle}>
          <h3>Seasons</h3>
          {season.map((val, idx) => (
            <div key={idx}><span style={labelStyle}>Season:</span> <span style={valueStyle}>{val.Season}</span></div>
          ))}
        </div>
      )}

      {album.length > 0 && (
        <div style={cardStyle}>
          <h3>Albums</h3>
          {album.map((val, idx) => (
            <div key={idx}>
              <div><span style={labelStyle}>Album {idx + 1} Name:</span> <span style={valueStyle}>{val.Album_Name}</span></div>
              <div><span style={labelStyle}>Track:</span> <span style={valueStyle}>{val.Album_Track}</span></div>
            </div>
          ))}
        </div>
      )}

      
    </div>
  );
};

export default DetailedBitResults;
