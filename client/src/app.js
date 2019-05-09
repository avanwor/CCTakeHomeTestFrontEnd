import React, { Component } from 'react';
//import { objectExpression } from '@babel/types';

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
    }

    //would it be better to make 
    getSwapiFilms(){
        fetch('https://swapi.co/api/films/')
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    films: result.results
                })
            })
    }

    getSwapiPeople(){
        //consider using the id at end of url to store as object
        //check if api returns results sorted by that ID
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

    render() {
        return <div>hello from app.js</div>
    }
};


export default App;
