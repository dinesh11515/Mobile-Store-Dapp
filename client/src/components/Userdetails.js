import React from "react";

export default function Userdetails(props){

    function setDetailsInside(event){
        props.setDetails(prevState => ({
            ...prevState,
            [event.target.name] : event.target.value,
        }))
        
    }
    return(
        <div className="form">
            <div className="form_table">
                <h1 className="heading">You are not Registered yet Pls Register</h1>
                <div className="form_input">
                    <h1>Name</h1>
                    <input 
                    type="text"
                    className="input"
                    onChange={setDetailsInside}
                    name="name"
                    required/>
                    <h1>Email</h1>
                    <input 
                    type="email"
                    className="input"
                    onChange={setDetailsInside}
                    name="email"
                    required/>
                    <h1>Address</h1>
                    <input 
                    type="text"
                    className="input"
                    onChange={setDetailsInside}
                    name="address"
                    required/>
                </div>
                <button className="form_btn" onClick={props.registerUser}>Register</button>
            </div>
        </div>
    )
}