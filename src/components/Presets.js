import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateForm, initForm, loadPreset} from '../AC'
import {Switch, Route, Redirect, NavLink} from 'react-router-dom'
import history from '../history'
import { reset,initialize,destroy } from 'redux-form'
import { Button } from 'semantic-ui-react'
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
        console.log('presets will receive props')
        if(presetId && (presetId != currentPresetId))this.setPreset(nextProps)
    }

    render() {




        const {presets,presetId} = this.props
//                console.log(presetId)

//        if(presetId)this.setPreset()


        const presetsElements = presets.map(preset =><li key={preset.id} ><NavLink  activeStyle={{color: 'red'}} to={`/calc/${preset.id}`} onClick={this.handleClick(preset.form)}>{preset.title}</NavLink></li>)
        return(
        <div>

            <h3>Шаблоны</h3>
            <Button primary>Click Here</Button>
            <ul>{presetsElements}</ul>
        </div>
        )

    }

    setPreset(props){
        const {formId, presetId,presets,initForm,initialize, current, loadPreset,reset,destroy} = props
        const presetsMap = arrToMapJs(presets)

//        const form = presets.reduce(function(form,preset){
//            if(preset.id == presetId) return {...form,...preset.form}
//            return {...form}
//        },{})

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

