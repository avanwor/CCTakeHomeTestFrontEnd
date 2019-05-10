import React, { Component } from "react";
import Slider from "react-slick";
import Item from "./itemCarousel"
class SimpleSlider extends Component {
    //could keep state here instead, and then don't need to pass down a click function from App

    render() {
        var settings = {
            className: "center",
            centerMode: true,
            //infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500
        };

        if (this.props.films[0]) {
            console.log(this.props.films[0])
            return (
                <div style={{padding:200}}>
                <Slider {...settings}>
                    {this.props.films.map(film => <Item key={film.title} film={film} onClick={this.props.onClick} />)}
                </Slider>
                </div>
            );
        } else {
            return <div></div>
        } 
    }
}

export default SimpleSlider;
