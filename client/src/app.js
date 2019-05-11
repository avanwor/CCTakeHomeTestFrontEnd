import React, { Component } from 'react';
import SimpleSlider from './carousel';
import { fixPeopleErrors, fixSpeciesErrors } from './apiFixes'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            films: [],
            people: [],
            species: []
        }
    };
    //when using swapi, obtaining all characters prior to user click will provide faster results to user
    componentDidMount() {
        this.getSwapi('films');
        this.getSwapi('people');
        this.getSwapi('species');
    };
    
    getSwapi(resource){
        let recursePages = (allItems,list,page = '') => {
            let items = [];
            if (allItems.length > 0) {
                items = allItems
            }; 
            fetch(`https://swapi.co/api/${list}/${page}`)
            .then(res => res.json())
            .then((result) => {
                items = items.concat(result.results);
                if (result.next) {
                    let pageNumber = result.next.slice(-1);
                    let pageQuery = `?page=${pageNumber}`;
                    recursePages(items,list,pageQuery);
                } else {
                    return items;
                }
            })
            .then((result) => {
                if (list === 'people') {
                    return fixPeopleErrors(result);
                } else if (list === 'species') {
                    return fixSpeciesErrors(result);
                } else {
                    return result;
                }
            })
            .then((result) => {
                this.setState({
                    [list]: result
                });
                return;
            });
        };
        recursePages([],resource);
    };

    render() {
        return <div><SimpleSlider films={this.state.films} people={this.state.people} species={this.state.species} /></div>
    };
};

export default App;
