import React, { Component } from "react";
import Slider from "react-slick";
 
class SimpleSlider extends Component {
    render() {
        var settings = {
            className: "center",
            centerMode: true,
            //infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500
        };
        
        return (
            <div style={{padding:200}}>
            <Slider {...settings}>
                <div><h3>The</h3></div>
                <div><h3>Lazy</h3></div>
                <div><h3>Brown</h3></div>
                <div><h3>Fox</h3></div>
                <div><h3>Jumped</h3></div>
                <div><h3>Over</h3></div>
            </Slider>
            </div>
    );
  }
}

export default SimpleSlider;