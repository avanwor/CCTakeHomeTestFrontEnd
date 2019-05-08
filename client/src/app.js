import React, { Component } from 'react';

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            suh: 'hey'
        }
    }

    componentDidMount() {
        //make api call
    }

    render() {
        return <div>hello from app.js</div>
    }
};


export default App;
