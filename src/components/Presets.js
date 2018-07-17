import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateForm, initForm, loadPreset} from '../AC'
import {Switch, Route, Redirect, NavLink, Link} from 'react-router-dom'
import history from '../history'
import { reset,initialize,destroy } from 'redux-form'
import { Header,List,Image, Item, Button, Icon } from 'semantic-ui-react'
import {arrToMapJs, mapToArrJs} from '../helpers'

class Presets extends Component {
    static propTypes = {

    }

//    componentWillUpdate(props){
//        console.log(props)
//    }


    componentDidMount(){
        const {presets,presetId} = this.props
//                console.log(presetId)
        console.log('presets did mount')
        if(presetId)this.setPreset(this.props)
    }

    componentWillReceiveProps(nextProps){
        const {presets,presetId} = nextProps
        const currentPresetId = this.props.presetId
//                console.log(presetId)
        console.log('presets will receive props',nextProps)
        if(presetId && (presetId != currentPresetId))this.setPreset(nextProps)
    }

    render() {




        const {presets,presetId} = this.props
//                console.log(presetId)

//        if(presetId)this.setPreset()


        const presetsElements = presets.map(preset =>
        <Item key={preset.id}  >
                
        <Item.Image size="tiny" avatar src={preset.imgSrc } />
        <Item.Content>
        <Item.Header >{preset.title} </Item.Header>
        <Item.Description>{preset.description} </Item.Description>
        <Item.Extra>
         <NavLink activeClassName=' ' to={`/calc/${preset.id}`}>
             
                       <Button size='tiny' >
            Загрузить шаблон
          </Button>
             
         </NavLink>

    <Button animated='vertical' size='tiny' basic color='teal'>
      <Button.Content hidden>Купить</Button.Content>
      <Button.Content visible>
        <Icon name='shop' />
      </Button.Content>
    </Button>          
        </Item.Extra>        
         </Item.Content>
        </Item>)
        return(
        <div>

            <Header as='h3'>Шаблоны</Header>

            <Item.Group divided relaxed className='selection'>{presetsElements}</Item.Group>
        </div>
        )
//        activeClassName='active'
//<NavLink  activeStyle={{color: 'red'}} to={`/calc/${preset.id}`} onClick={this.handleClick(preset.form)}>{preset.title}</NavLink>        
//<List relaxed>
//    <List.Item>
//      <Image avatar src='/assets/images/avatar/small/daniel.jpg' />
//      <List.Content>
//        <List.Header as='a'>Daniel Louise</List.Header>
//        <List.Description>Last seen watching <a><b>Arrested Development</b></a> just now.</List.Description>
//      </List.Content>
//    </List.Item>        

    }

    setPreset(props){
        const {formId,presets,initForm,initialize, current, loadPreset,reset,destroy} = props
        let {presetId} = props
        const presetsMap = arrToMapJs(presets)

//        const form = presets.reduce(function(form,preset){
//            if(preset.id == presetId) return {...form,...preset.form}
//            return {...form}
//        },{})
        if(!presetsMap[presetId])presetId = 'default'
        console.log("INITIALIZE",current.initialValues)
//        reset(formId)
//        destroy(formId)
//        initialize(formId ,current.initialValues)
//
        loadPreset(presetsMap[presetId].formDesign)
//

        initialize(formId ,presetsMap[presetId].formDesign.initialValues)




    }

    handleClick = form => ev => {
//        ev.preventDefault()
//        console.log(form)
//        this.props.initForm({...form,id: this.props.formId})
//        this.props.initialize('simple',form)
    }


}



//export default Calc

export default connect(
//    null
    (state,ownProps) => {
//    const id = 'main'
    return {
        presets: state.presets,
        current: state.formDesign
    }
}
,{updateForm, initForm, reset, initialize, loadPreset, destroy})(Presets)

