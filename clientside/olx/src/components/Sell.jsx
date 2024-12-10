import React from "react"
import "./Sell.css"


function Sell() {
    return(
     <div className="main1">
        <div className="smain">
            <div className="formin1">
        <input type="text" name="userID" placeholder="userid"/><br />
        <input type="text" name="product" placeholder="product name"/><br />
        <div className="sele">
            <section className="category">
                <option value="">bird</option>
            </section>
        </div>
            </div>
        </div>
     </div>
    )
  }
  
  export default Sell