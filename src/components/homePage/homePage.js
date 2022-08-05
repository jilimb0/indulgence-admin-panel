import React, {Component} from 'react'
import './homePage.scss'
import Navigation from "../navigation/navigationContainer";

export default class HomePage extends Component {
    componentDidMount() {
        this.props.getProfile();
    }
    render() {
         return <Navigation/>
    }
}

