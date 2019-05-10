import React, { Component } from 'react';
//import { objectExpression } from '@babel/types';
import SimpleSlider from './carousel';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            people: []
        }
    }

    componentDidMount() {
        this.getSwapiFilms();
        this.getSwapiPeople();
        //create get species
        
    }

    getSwapiFilms(){
        fetch('https://swapi.co/api/films/')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    films: result.results
                })
            })
    }

    //when using swapi, obtaining all characters prior to user click will provide faster results to user
    getSwapiPeople(){
        //consider using the id at end of url to store as object
        let allPeople = []

        let recursePages = (page = '') => {
            fetch(`https://swapi.co/api/people/${page}`)
            .then(res => res.json())
            .then((result) => {
                allPeople = allPeople.concat(result.results)
                if (result.next) {
                    let pageNumber = result.next.slice(-1);
                    let pageQuery = `?page=${pageNumber}`
                    recursePages(pageQuery)
                } else {
                    return allPeople;
                }
            })
            .then((result) => this.fixApiErrors(result) )
            .then((result) => {
                this.setState({
                    people: result
                })
                return;
            })
            .then(()=>console.log(this.state))
        }

        recursePages();
    }

    fixApiErrors(apiResponse) {
        if (apiResponse){
            //known API issue with people #17 - https://github.com/phalt/swapi/issues/99
            apiResponse.splice(16,0,null) 
            //Padmé Amidala, people #35, appears out of order in position 87
            apiResponse.splice(34,0,apiResponse.splice(87,1)[0]);
            //Ratts Tyerell, people #47, appears out of order in position 72
            apiResponse.splice(46,0,apiResponse.splice(73,1)[0]);
        } 
        return apiResponse;
    }

    onFilmClick(film) {
        console.log('onFilmClick', film.target);
        
    }

    render() {
        return <div><SimpleSlider films={this.state.films} people={this.state.people} onClick={this.onFilmClick.bind(this)}/></div>
    }
};

export default App;
