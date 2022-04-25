
import React from "react";
import {MdChevronLeft, MdChevronRight} from "react-icons/md";
import Details from "./Details";
export default function Mobile(props){
    const mobiles = props.details.map(ele=>{
        return(
            <div className="mobile">
                <p className="mob_name">{ele.name}</p>
                <img src={ele.img} className="mob_img"></img>
                <div className="mob_price">
                    <p>{ele.price}</p>
                    <button className="buy_btn" onClick={props.buy}>Buy</button>
                </div>
                {/* <button className="add_cart">Add to Cart</button> */}
            </div>
        )
    })

    const slideLeft = ()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft-500;
        console.log(slider)
    }
    const slideRight = ()=>{
        var slider = document.getElementById("slider");
        slider.scrollLeft = slider.scrollLeft+500;
        console.log(slider)
    }
    return(
        <div className="main_mob">
            <MdChevronLeft className="left_arrow" onClick={slideLeft}></MdChevronLeft>
            {props.isPlaced && <Details setPlaced={props.setPlaced}/>}
            <div id="slider">
            <div className="main_mob_slider">{mobiles}</div>
            </div>
            <MdChevronRight className="right_arrow" onClick={slideRight}></MdChevronRight>
        </div>
    )
}