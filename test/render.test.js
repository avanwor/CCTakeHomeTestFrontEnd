
import "isomorphic-fetch"
import './matchMedia.mock';
import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../client/src/app';
import SimpleSlider from '../client/src/carousel'

configure({ adapter: new Adapter() });

describe('App', () => {
    it('should render the App component', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.exists()).toBe(true);
    });
});

describe('Carousel', () => {
    it('should render the SimpleSlider component', () => {
        let films = [
            {title: 'A New Hope'},
            {title: 'A Newer Hope'}
        ]
        const wrapper = shallow(<SimpleSlider films={films}/>);
        expect(wrapper.exists()).toBe(true);
    });
});