import { React } from "react";


const CueSheet = () => {


    return(
        
        <div style={{backgroundColor: 'black', color:'white', fontSize:'15px', marginTop:'50px', marginLeft:'200px', paddingLeft:'20px', paddingRight:'20px', paddingTop:'10px', paddingBottom:'10px', borderRadius:'15px', width:'1100px', height:'500px'}}>
            <div style={{fontSize:'30px', marginLeft:'42%', paddingBottom:'10px', color: '#979bdb'}}>Cue Sheet</div>
            <label for='file'>Select Cue Sheet:
                <input type='file' name='file' style={{marginLeft:'5px'}} ></input>
            </label>
            <div style={{marginTop:'20px'}}></div>
            <label for="title">Cue Title: 
                <input type='text' name='title' style={{marginLeft:'5px'}}></input>
            </label>
            <label for="artist" style={{marginLeft:'10px'}}>Artist: 
                <input type='text' name='artist' style={{marginLeft:'5px'}}></input>
            </label>
            <button for='usuage' style={{marginLeft:'20px'}}>Enter Usuage</button>
            <label for='date' style={{marginLeft:'20px'}}>Date:
                <input type='date' for='date' style={{marginLeft:'5px'}}></input>
            </label>
            <label for="timeIn" style={{marginLeft:'20px'}}> Time In: 
                <input type='text' name='title' placeholder='H' style={{marginLeft:'5px', width:'25px'}}></input>
                <input type='text' name='title' placeholder='MM' style={{marginLeft:'5px', width:'35px'}}></input>
                <input type='text' name='title' placeholder='SS' style={{marginLeft:'5px', width:'35px'}}></input>
            </label>
            <label for="timeOut" style={{marginLeft:'20px'}}> Time Out: 
                <input type='text' name='title' placeholder='H' style={{marginLeft:'5px', width:'25px'}}></input>
                <input type='text' name='title' placeholder='MM' style={{marginLeft:'5px', width:'35px'}}></input>
                <input type='text' name='title' placeholder='SS' style={{marginLeft:'5px', width:'35px'}}></input>
            </label>
            <div style={{marginTop:'20px'}}></div>
            <label for='proAffiliation'> PRO Affiliation:
                <input type='text' name='proAffiliation' style={{marginLeft:'5px', width:'200px'}}></input>
            </label>
            <label for='composerName' style={{marginLeft:'20px'}}>Composer Name:
                <input type='text' name='first' placeholder="First" style={{marginLeft:'5px', width:'80px'}}></input>
                <input type='text' name='middle' placeholder="Middle" style={{marginLeft:'5px', width:'80px'}}></input>
                <input type='text' name='last' placeholder="Last" style={{marginLeft:'5px', width:'80px'}}></input>
            </label>
            <label for='publisherName' style={{marginLeft:'20px'}}>Publisher Name:
                <input type='text' name='publisherName' style={{marginLeft:'5px', width:'200px'}}></input>
            </label>
            <div style={{marginTop:'20px'}}></div>
            <label for='role'>Please Enter Role:
                <input type='text' name='role' style={{marginLeft:'5px', width:'100px'}}></input>
            </label>
            <label for='shares'  style={{marginLeft:'20px'}}>% Shares:
                <input type='text' name='shares' style={{marginLeft:'5px', width:'30px'}}></input>
            </label>
            <label for='master'  style={{marginLeft:'20px'}}> Master?
                <select style={{marginLeft:'10px', width:'auto', height:'25px', alignContent:'center'}} size="1">
                    <option value="-" > - </option>
                    <option value="yes">Yes</option>
                    <option value="no">No</option>
                </select>
            </label>
            <label for='label' style={{marginLeft:'5px'}}>Label: 
                <input type='text' name='label' style={{marginLeft:'5px', width:'175px'}}></input>
            </label>
            <label for='ISRC' style={{marginLeft:'5px'}}>ISRC: 
                <input type='text' name='ISRC' style={{marginLeft:'5px', width:'125px'}}></input>
            </label>
            <label for='IPI' style={{marginLeft:'5px',}}>IPI #: 
                <input type='text' name='IPI' style={{marginLeft:'5px', width:'125px'}}></input>
            </label>
            <div style={{marginTop:'20px'}}>
                <label for='links'>Links
                    <ul>
                        <li><a href="https://www.isrcfinder.com/">ISRC Link</a></li>
                        <li><a href="https://www.ascap.com/repertory#/">PRO Affiliation ascap</a></li>
                        <li><a href="https://repertoire.bmi.com/">PRO Affiliation BMI</a></li>
                        <li><a href="https://www.sesac.com/repertory/search">PRO Affiliation sesac</a></li>
                        <li><a href="https://globalmusicrights.com/catalog">PRO Affiliation Global Music Rights</a></li>
                    </ul>
                </label>
            </div>
        </div>
    );
};

export default CueSheet;