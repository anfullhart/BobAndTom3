import React, { useState, useEffect } from "react";
import Axios from "axios";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://bobandtombackend-production-fb6d.up.railway.app";


const EditAlbum = () => {

    const [albumName, setAlbumName] = useState("");
    const [albumList, setAlbumList] = useState([]);
    const [deleteAlbum, setDeleteAlbum] = useState("");

    useEffect(() => {
        getAlbums();
    }, []);


    const getAlbums = () => {
        Axios.get(`${API_URL}/api/get/albums`)
        .then((response) => {
            setAlbumList(response.data);
        });
    };


    const addAlbum = async () => {
        try {
            await Axios.post(`${API_URL}/api/insert/album`, {
                album: albumName
            });

            window.alert(albumName + " added successfully!");

            setAlbumName("");
            getAlbums();

        } catch (error) {
            console.log(error);
            window.alert("Failed to add album.");
        }
    };


    const removeAlbum = async () => {
        try {
            await Axios.post(`${API_URL}/api/delete/album`, {
                deleteAlbum: deleteAlbum
            });

            window.alert("Album deleted successfully!");

            getAlbums();

        } catch(error) {
            console.log(error);
            window.alert("Failed to delete album.");
        }
    };


    return (
        <div>

            <div 
            style={{
                color:"white",
                fontSize:"30px",
                marginLeft:"40%",
                marginTop:"75px"
            }}>
                Edit Albums
            </div>


            <div style={{
                paddingLeft:"50px",
                backgroundColor:"black",
                color:"white",
                fontSize:"15px",
                marginTop:"20px",
                marginLeft:"25%",
                borderRadius:"15px",
                width:"600px",
                height:"160px"
            }}>


                Album Name:

                <input
                    style={{
                        marginTop:"20px",
                        marginLeft:"10px",
                        width:"400px"
                    }}
                    value={albumName}
                    onChange={(e)=>setAlbumName(e.target.value)}
                />


                <button
                    className="btn btn-success"
                    style={{
                        marginLeft:"10px"
                    }}
                    onClick={addAlbum}
                >
                    Add
                </button>


                <div style={{marginTop:"20px"}}>

                    <label>
                        List of Albums:
                    </label>


                    <select
                        style={{
                            marginLeft:"10px"
                        }}
                        onChange={(e)=>setDeleteAlbum(e.target.value)}
                    >

                        {albumList.map((val)=>(
                            <option
                                key={val.AlbumID}
                                value={val.AlbumID}
                            >
                                {val.Album_Name}
                            </option>
                        ))}

                    </select>


                    <button
                        className="btn btn-danger"
                        style={{
                            marginLeft:"10px"
                        }}
                        onClick={()=>{
                            if(window.confirm("Remove album?"))
                            {
                                removeAlbum();
                            }
                        }}
                    >
                        Delete
                    </button>


                </div>

            </div>

        </div>
    );
};


export default EditAlbum;