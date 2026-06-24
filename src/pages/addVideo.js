import { React, useState, useRef } from "react";
import Home from "../style/home.css";
import { Link } from 'react-router-dom';




const AddVideo = () => {

    return (
        
        <form>
            <div style={{display: 'flex'}}>
                <div style={{backgroundColor: 'black', color:'white', fontSize:'15px', marginTop:'20px', marginLeft:'10px', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', borderRadius:'15px', width:'900px'}}>
                    <div style={{fontSize:'30px', marginLeft:'20%', paddingBottom:'10px', color: '#979bdb'}}>General Information</div>
                    <label for="videoTitle">Video Title: </label>
                    <input type="text" id="videoTitle" name="videoTitle" placeholder="Title" style={{marginLeft:'5px'}}></input>
                    <div style={{marginTop:'10px'}}></div>
                    <label for="videoTitle">Video Category: </label>
                    <select name="ddlCat" size="1" style={{marginLeft:'5px'}}>
                    <option value="0" selected=""> - - Select Category - - </option><option value="1">Album (Fake)</option>
                    </select>
                
                    <div style={{marginTop:'10px'}}>   </div>
                    <label for="ddlArtist">Artist: </label>
                    <select name="ddlArtist" size="1" style={{marginLeft: '5px'}}>
                    
                    </select>
                    <div></div>
                    <label for="airDate" style={{marginTop:'10px', marginRight:'5px'}}>Original Air Date: </label>
                    <input type="text" id="month" placeholder="MM" style={{width:'35px', marginRight:'2px'}}></input>
                    <input type="text" id="day" placeholder="DD" style={{width:'35px', marginRight:'2px'}}></input>
                    <input type="text" id="year" placeholder="YYYY" style={{width:'45px'}}></input>
                    <div style={{marginTop:'10px'}}></div>
                    <label for="bitLength"> Length of Video: </label>
                    <input type="text" id="minute" placeholder="Minutes" style={{width:'65px', marginRight:'2px', marginLeft:'5px'}}></input>
                    <input type="text" id="seconds" placeholder="Seconds" style={{width:'65px'}}></input>   
                    <label for="automationNumber" style={{marginLeft:'20px'}}> Automation Number: </label>
                    <input type="text" id="automationNumber" placeholder="(0123456789)" size="10" style={{width:'100px', marginLeft:'5px'}}></input>   
                    <div style={{marginTop:'10px'}}></div>
                    <label for="Subject1">Subject 1: </label>
                    <select name="ddlSub1" style={{marginLeft: '5px'}} size="1">

                <option value="0" selected="">- - No Subject - -</option>

                    <option value="450">50's</option>

                    </select>
                    <div style={{marginTop:'5px'}}></div>
                    <label for="Subject2" style={{marginTop:'0px'}}>Subject 2: </label>
                    <select name="ddlSub2" size="1" style={{marginLeft: '5px'}} >

            <option value="0" selected="">- - No Subject - -</option>

                <option value="450">50's</option>

                    </select>
                    <div style={{marginTop:'5px'}}></div>
                    <label for="Subject3" style={{marginTop:'0px'}}>Subject 3: </label>
                    <select name="ddlSub3" size="1" style={{marginLeft: '5px'}} >

            <option value="0" selected="">- - No Subject - -</option>

                <option value="450">50's</option>

                    </select>
                    <div style={{marginTop:'5px'}}></div>
                    <label for="Subject4" style={{marginTop:'0px'}}>Subject 4: </label>
                    <select name="ddlSub4" size="1" style={{marginLeft: '5px'}} >

            <option value="0" selected="">- - No Subject - -</option>

                <option value="450">50's</option>

                    </select>
                    <div style={{marginTop:'20px'}}></div>
                    <label for="Celebrity1">Celebrity 1: </label>
                    <select name="ddlCeleb1" size="1" style={{marginLeft: '5px'}} >

                <option value="0" selected="">- - No Celebrity - - </option>

    <option value="327"></option><option value="244">Aiken, Clay</option>

                    </select>
                    <div style={{marginTop:'5px'}}></div>
                    <label for="Celebrity2">Celebrity 2: </label>
                    <select name="ddlCeleb2" size="1" style={{marginLeft: '5px'}} >

                <option value="0" selected="">- - No Celebrity - - </option>

    <option value="327"></option><option value="244">Aiken, Clay</option>

                    </select>
                    <div style={{marginTop:'20px'}}></div>
                    <label for="sport">Sport: </label>
                    <select name="ddlSport" size="1" style={{marginLeft: '5px'}} >

                <option value="0" selected="">- - No Sport - - </option>

                <option value="1">Baseball</option>

                        

                    </select>
                    <div style={{marginTop:'20px'}}></div>
                    <label for="season">Season: </label>
                    <select name="ddlSeason" size="1" style={{marginLeft: '5px'}} >

                <option value="0" selected="">- - No Season - - </option>

                <option value="1">New Year's Day</option>

                            

                    </select>
                    <div style={{marginTop:'20px', paddingRight:'10px'}}></div>
                    <label for="keywords">Keywords: </label>
                    <input type="text" id="keywords" name="keywords"  style={{marginLeft: '5px', width:'300px'}} placeholder="Enter words separated by a comma (,)"></input>
                    
                </div>
                
                <div style={{backgroundColor: 'black', color:'white', fontSize:'15px', marginLeft:'20px', paddingLeft:'20px', paddingRight: '0px', paddingTop: '10px', paddingBottom:'10px', borderRadius:'15px', width:'50%', height:'375px', marginTop:'20px' }}>
                    <div style={{fontSize:'30px', marginLeft:'20%', color:'#979bdb', paddingBottom:'50px'}}>Hyperlink Information
                    </div>
                    <label for="keywords">Media Link: </label>
                    <input type="text" id="keywords" name="keywords"  style={{marginLeft: '5px', width:'400px'}} placeholder="Enter a link to a valid media source"></input>
                   

                </div>
                <div style={{backgroundColor: 'black', color:'white', fontSize:'15px', marginLeft:'20px', paddingLeft:'20px', paddingRight: '20px', paddingTop: '10px', paddingBottom:'10px', borderRadius:'15px', width:'40%', height:'375px', marginTop:'20px', marginRight:'10px' }}>
                    <div style={{fontSize:'30px', marginLeft:'15%', color:'#979bdb'}}>Album Information
                        
                    </div>
                    <label for="txtSource1Track">Album 1: </label>
                    <select name="ddlAlbum1" style={{width:'275px', marginLeft:'5px'}} size="1">

          <option value="0" selected="">- 

          - Select Album - -</option>

  <option value="15">Air Bags (SP 94)</option><option value="20">Air Heads (FA 91)</option>

       

                    </select>
                    <label for="txtTrack1" style={{marginTop:'5px'}}>Track: </label>
                    <input type="text" name="txtTrack1" size="10" maxlength="4" style={{marginLeft:'27px'}}></input>

                    <div style={{marginTop:'20px'}}></div>
                    <label for="txtSource1Track">Album 2: </label>
                    <select name="ddlAlbum1" style={{width:'275px', marginLeft:'5px'}} size="1">

          <option value="0" selected="">- 

          - Select Album - -</option>

  <option value="15">Air Bags (SP 94)</option><option value="20">Air Heads (FA 91)</option><option value="53">As Big As a Hat (FA 08)</option><option value="26">At the Race (SP 88)</option><option value="8">Back in 98 (FA 98)</option><option value="49">Boat for Sale (FA 05)</option><option value="41">Camel Toe (FA 03)</option><option value="13">Canned Laughter (FA 94)</option><option value="3">Checkered Past (SP 95)</option><option value="55">Crushed Nuts (FA 10)</option><option value="54">Dead Air (FA 09)</option><option value="48">Donkey Show (SU 06)</option><option value="5">Election Collection 2000 (FA 00)</option><option value="12">Factory Air (SP 96)</option><option value="23">Find My Keys (SP 90)</option><option value="10">Fun House (SP 97)</option><option value="9">Gimme An F (FA 97)</option><option value="40">Gone Wild  (FA 02)</option><option value="14">Good Ole Boys (SU 94)</option><option value="4">Greatest Hits Vol. 1 (FA 99)</option><option value="47">Happy Hour (FA 05)</option><option value="7">Indiana Rocks (SP 00)</option><option value="29">Its a New Track Record (SP 89)</option><option value="11">Its a Wonderful Laugh (FA 96)</option><option value="21">Just Skiddin (SP 91)</option><option value="25">Last Train to Whiskeyville (FA 88)</option><option value="17">Laugh in the Fast Lane (SP 93)</option><option value="16">Lollapaloozers (FA 93)</option><option value="50">Man Boobs (FA 06)</option><option value="42">Mistletoe (FA 03)</option><option value="19">Motorheads (SP 92)</option><option value="46">Mr. Obvious Show (FA 05)</option><option value="57">My Job Sucks (SU 08)</option><option value="44">Oddballs (FA 04)</option><option value="2">Planet Bob &amp; Tom (FA 95)</option><option value="30">Radiogram (FA 01)</option><option value="27">Shabbey Road (FA 87)</option><option value="51">Shut Up Randy (FA 06)</option><option value="45">Sideshow (FA 04)</option><option value="56">Somewhere Over the Radio (FA 11)</option><option value="31">Take Off Your Clothes!</option><option value="22">Twin Geeks (FA 90)</option><option value="52">We Just Landed (FA 07)</option><option value="18">We Three Kings (FA 92)</option><option value="32">Were Still Standing Tall (Sep 01)</option><option value="28">White Album (SP 87)</option><option value="43">Wild About Harry (FA 03)</option><option value="24">With a Little Help From Our Friends (FA 89)</option><option value="6">You Guys Rock (FA 00)</option> 

       

                    </select>
                    <label for="txtTrack1" style={{marginTop:'5px'}}>Track: </label>
                    <input type="text" name="txtTrack1" size="10" maxlength="4" style={{marginLeft:'27px'}}></input>

                    <div style={{marginTop:'20px'}}></div>
                    <label for="txtSource1Track">Album 3: </label>
                    <select name="ddlAlbum1" style={{width:'275px', marginLeft:'5px'}} size="1">

          <option value="0" selected="">- 

          - Select Album - -</option>

  <option value="15">Air Bags (SP 94)</option>

       

                    </select>
                    <label for="txtTrack1" style={{marginTop:'5px'}}>Track: </label>
                    <input type="text" name="txtTrack1" size="10" maxlength="4" style={{marginLeft:'27px'}}></input>

                    <div style={{marginTop:'20px'}}></div>
                    <label for="txtSource1Track">Album 4: </label>
                    <select name="ddlAlbum1" style={{width:'275px', marginLeft:'5px'}} size="1">

          <option value="0" selected="">- 

          - Select Album - -</option>

  <option value="15">Air Bags (SP 94)</option>

       

                    </select>
                    <label for="txtTrack1" style={{marginTop:'5px'}}>Track: </label>
                    <input type="text" name="txtTrack1" size="10" maxlength="4" style={{marginLeft:'27px'}}></input>

                </div>
            </div>
            
            <button className="btn btn-success" style={{display:'inline-block', marginLeft:'80%'}}>Submit This Form</button>
            <button className="btn btn-danger" style={{display:'inline-block', marginLeft:'10px'}}>Clear This Form</button>
        </form>
 
        )

}
export default AddVideo;