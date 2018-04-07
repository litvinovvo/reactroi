import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Calc from '../Calc'
import Presets from '../Presets'
import {Route} from 'react-router-dom'
import InitCalc from '../InitCalc'
import SimpleForm from "../SimpleForm"

class CalcRoutes extends Component {
    static propTypes = {

    };

    render() {
        console.log('---', 1)
        return (
            <div>



            <Route path="/calc" exact render = {this.setPreset} />
            <Route path="/calc/:id"  render = {this.setPreset} />

             <SimpleForm />



            </div>
        )
    }
//    <Presets location={this.props.location} />
//            <Route path="/calc/:id" render = {this.setPreset} />
    setPreset = ({ match,location }) => {
        let { id } = match.params
//        if(!id)id = 'default'
        console.log(id,location)
        return <Presets presetId={id} location={location} formId="simple" />
    }
//    <Calc presetId={id} formId="main" />
//
//    getArticle = ({ match }) => {
//        const { id } = match.params
//        return <Article id = {id} isOpen key = {id} />
//    }
//
//    getIndex = () => {
//        return <h2>Please select article</h2>
//    }
//}
//
}
export default CalcRoutes
