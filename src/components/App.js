import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Articles from './routes/Articles'
//import NewArticle from './routes/NewArticle'
import NotFound from './routes/NotFound'
//import CommentsPage from './routes/CommentsPage'
//import UserForm from './UserForm'
//import Filters from './Filters'
import Counter from './Counter'
import 'react-select/dist/react-select.css'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
//import LangProvider from './LangProvider'
import history from '../history'
import CalcRoutes from './routes/CalcRoutes'
import 'styling/semantic.less'

class App extends Component {
    static propTypes = {

    };

    componentDidMount(){
        console.log('app did mount')
    }

    render() {
        console.log('---', 0)
        return (
            <ConnectedRouter history = {history}>
                    <div>

                        <div>
                            <h2>Main menu</h2>
                            <div><NavLink activeStyle={{color: 'red'}} to="/counter">Counter</NavLink></div>
                            <div><NavLink activeStyle={{color: 'red'}} to="/calc">Calc</NavLink></div>
                        </div>

                        <Switch>
                            <Route path="/counter" component={Counter}/>
                            <Route path="/calc" component={CalcRoutes} />
                            <Route path="*" component={NotFound}/>
                        </Switch>
                    </div>
            </ConnectedRouter>
        )
    }

}

export default App
