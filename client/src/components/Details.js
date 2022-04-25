import React from "react";

export default function Details(props){
    return (
        <div className="pop_main">
             <div className="box">
                <button onClick={props.setPlaced}>X</button>
                <h1>Order Placed 🥳</h1>
                
            </div>
        </div>
       
    )
}