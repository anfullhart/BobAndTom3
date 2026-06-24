import { React } from "react";

const AdvancedSearch = () => {

    return(
        <div style={{paddingLeft:'10%', paddingTop:'5%'}}>
            
            <div style={{backgroundColor: 'black', color:'white', fontSize:'20px', paddingLeft:'20px', paddingTop:'20px',paddingBottom:'50px', marginLeft:'200px', marginRight:'350px',  borderRadius:'15px'}}>
                Artist Search
                <select name="ddlArtist" size="1" style={{marginLeft:'20px'}}>
                    <option value="0" selected=""> No Artist </option>
                   
                </select>
                <button className="btn btn-primary" style={{marginLeft:'10px'}}> Artist Search</button>
                
                <div style={{paddingTop:'10px'}}>
                    <select name="ddlCat" size="1">
                        <option value="0" selected=""> No Category </option>
                   
                    </select>
                </div>
                <div style={{paddingTop:'15px'}}>
                    <font face="Arial, Helvetica, sans-serif" size="4"> 
                        <select name="ddlSub1" size="1" onchange="document.form1.ddlSub2.disabled = false" style={{marginRight:'5px'}}>
                            <option value="0" selected=""> No Subject </option>
                   
                        </select>
                            And  
                        <select name="ddlSub2" size="1" disabled="" style={{marginLeft:'5px'}}>
                            <option value="0" selected=""> No Subject </option>
                   
                        </select>
                    </font>
                </div>
                <div style={{paddingTop:'15px'}}>
                    <select name="ddlSport" size="1">
                        <option value="0" selected=""> No Sport </option>
                   
                    </select>
                    <select name="ddlSeason" style={{marginLeft:"25px"}}>
                        <option value="0" selected=""> No Season </option>
                   
                    </select>  
                </div>      
                <div style={{paddingTop:'15px'}}>
                    <font face="Arial, Helvetica, sans-serif" size="4"> 
                        <select name="ddlCeleb1" size="1" onchange="document.form1.ddlCeleb2.disabled = false" style={{marginRight:'5px'}}>
                            <option value="0" selected=""> No Celebrity </option>
                   
                        </select>          
                        And 
                        <select name="ddlCeleb2" size="1" disabled="" style={{marginLeft:'5px'}}>
                            <option value="0" selected=""> No Celebrity </option>
                   
                        </select>
                    </font>
                </div>
                <div style={{paddingTop:'40px'}}>
                    <button className="btn btn-primary" style={{marginLeft:'275px'}}>Search</button>
                    <button className="btn btn-primary" style={{marginLeft:'25px'}}>Clear</button>
                </div>
            </div>
        </div>
    );


}

export default AdvancedSearch;