import React from "react";
import Mobile from "./Mobile";
import data from "../data";
export default function Container(props){
    return (
        <div className="mob_cont">
            <h1>{props.data.company}</h1>
            <Mobile details={props.data.models} buy = {props.buy} isPlaced={props.isPlaced} setPlaced={props.setPlaced}/>
        </div>
    )
}