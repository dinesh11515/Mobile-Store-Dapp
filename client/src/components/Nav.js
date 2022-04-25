import React from "react";

export default function Nav(props){
    return (
        <div className="nav">
            <h1 className="nav_h1">Mobiles</h1>
            {props.isOwner && <button className="nav_btn">Withdraw</button>}
            <p className="nav_name">Welcome {props.name}</p>
            <button className="nav_btn" onClick={props.handleClick}>{props.account ==null ? "Connect Wallet" : "Connected  "+props.account.slice(0,9)}</button>
        </div>
    )
}