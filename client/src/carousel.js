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
            //console.log(e.species[0].split("/").slice(-2,-1)[0])
            let speciesNumber = e.species[0].split("/").slice(-2,-1)[0]
            //console.log(speciesNumber)
            e['speciesName'] = this.props.species[speciesNumber-1].name
            console.log(e)
        })
        //characterByFilm is an array of objects
        //for each of the elemets, could add a new property of the speciesName?
        //could assign the species name to the ch
        //this.props.species

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
