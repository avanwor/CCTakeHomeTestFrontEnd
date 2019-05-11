import React, { Component } from "react";
import Slider from "react-slick";
import Item from "./itemCarousel"
class SimpleSlider extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showCharacters: false,
            charactersByFilm: [],
        }
    }

    onFilmClick(film) {
        let characterNumbers = [];
        let charactersByFilm = [];
        //grab the character number from url property
        film.characters.forEach(e => characterNumbers.push(e.split("/").slice(-2,-1)[0]))
        //grab the character name from sorted people list passed down in props
        characterNumbers.forEach(e => charactersByFilm.push(this.props.people[Number(e)-1]))
        //assign a speciesName prop to each character based on species number from url property
        charactersByFilm.forEach(e => {
            let speciesNumber = 0
            if (e.species.length > 0) {
                speciesNumber = e.species[0].split("/").slice(-2,-1)[0]
            }
            e['speciesName'] = this.props.species[speciesNumber].name
        })

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
        
        let settings = {
            //className: "center",
            centerMode: true,
            centerPadding: '120px',
            slidesToShow: 3,
            speed: 500
        };

        //this case will load if films have loaded into App state, and the user has not clicked on a film
        if (this.state.charactersByFilm.length === 0) {
            return (
                <div style={{margin:100}}>
                <Slider {...settings}>
                    {this.props.films.map(film => ( <div><Item key={film.title} film={film} onClick={this.onFilmClick.bind(this)}/> </div>))}
                </Slider>
                </div>
            );
            
        //this case will load if people have loaded into App state, and the user has clicked on a film
        } else if (this.state.charactersByFilm.length > 0) {
            return (
                <div style={{margin:100}}>
                <button onClick={() => this.onBackClick()}> back to films </button>
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
