import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import Articles from './routes/Articles'
//import NewArticle from './routes/NewArticle'
import NotFound from './routes/NotFound'
//import CommentsPage from './routes/CommentsPage'
//import UserForm from './UserForm'
//import Filters from './Filters'
import Counter from './Counter'
//import 'react-select/dist/react-select.css'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import {ConnectedRouter} from 'react-router-redux'
//import LangProvider from './LangProvider'
import history from '../history'
import CalcRoutes from './routes/CalcRoutes'
import 'styling/semantic.less'
import { Container, Grid, Menu, Image, Header  } from 'semantic-ui-react'
import mainLogo from '../resources/assets/images/logobig.jpg'

class App extends Component {
    static propTypes = {

    }

    componentDidMount(){
        console.log('app did mount')
    }

    render() {
        console.log('---', 0)
        return (
            <ConnectedRouter history = {history}>
                       <div>
                                 <Menu stackable>
        <Menu.Item header name="main" as="a" href="http://newbeautytech.ru/">
          <Image width="50" src={mainLogo}/> <Header as='h1' style={{margin: 0, fontSize: '1.2em',}} >Новые технологии красоты</Header>
        </Menu.Item>
        <Menu.Item
          name='calc'
          as={NavLink}
          to={`/calc/`}
          activeClassName='active'
        >   
          Расчёт окупаемости
        </Menu.Item>
        <Menu.Item
          name='catalog'
          as='a'
          href='http://newbeautytech.ru/catalog/'
        >   
          Каталог
        </Menu.Item>


      </Menu> 
                       
                        <Grid stackable padded='horizontally'>
                        <Grid.Row> 
                        <Grid.Column >
            
          
       {
//                                                      <h2>Main menu</h2>
//                            <div><NavLink activeStyle={{color: 'red'}} to="/counter">Counter</NavLink></div>
//                            <div><NavLink activeStyle={{color: 'red'}} to="/calc">Calc</NavLink></div>      
                            }

                        </Grid.Column>
                        </Grid.Row>
                        
                        

                        
                        <Switch>
                            <Route path="/counter" component={Counter}/>
                            <Route path="/calc" component={CalcRoutes} />
                            <Route path="*" component={NotFound}/>
                        </Switch>

                        
                        </Grid>
                        </div>
            </ConnectedRouter>
        )
    }

}

export default App
