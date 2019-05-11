import React, { Component } from "react";
import Slider from "react-slick";
import Item from "./itemCarousel"
class SimpleSlider extends Component {
    //could keep state here instead, and then don't need to pass down a click function from App
    constructor(props) {
        super(props)
        this.state = {
            showCharacters: false,
            charactersByFilm: []
        }
    }

    onFilmClick(film) {
        let characterNumbers = [];
        let charactersByFilm = [];

        film.characters.forEach(e => characterNumbers.push(e.split("/").slice(-2,-1)[0]))
        characterNumbers.forEach(e => charactersByFilm.push(this.props.people[Number(e)-1]))

        this.setState({
            showCharacters: true,
            charactersByFilm: charactersByFilm
        })
    }

    onBackClick() {
        console.log('onBackClick');
        this.setState({
            showCharacters: false,
            charactersByFilm: []
        })
    }

    render() {
        //these are settings for the react-slick module
        let settings = {
            //className: "center",
            centerMode: true,
            //infinite: true,
            centerPadding: "60px",
            slidesToShow: 3,
            speed: 500
        };

        //this case will load if films have loaded into App state, and the user has not clicked on a film
        if (this.state.charactersByFilm.length === 0) {
            return (
                <div style={{padding:100}}>
                <Slider {...settings}>
                    {this.props.films.map(film => ( <div><Item key={film.title} film={film} onClick={this.onFilmClick.bind(this)}/> </div>))}
                </Slider>
                </div>
            );
            
        //this case will load if people have loaded into App state, and the user has clicked on a film
        } else if (this.state.charactersByFilm.length > 0) {
            return (
                <div style={{padding:200}}>
                {/* create onclick function for back button */}
                <h3 onClick={() => this.onBackClick()}>back button</h3>
                <Slider {...settings}>
                    {this.state.charactersByFilm.map(person => ( <div><Item key={person.name} person={person} /> </div>))}
                </Slider>
                </div>
            );
        //this case will load if films have not loaded into App state
        } else {
            return <div></div>
        } 
    }
}

export default SimpleSlider;
