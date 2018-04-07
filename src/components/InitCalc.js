import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateForm, initForm} from '../AC'




class InitCalc extends Component {
    static propTypes = {

    }

    initState = {
        value: '1300000',
        costs: '300000'
    }

    componentDidMount() {
        const {initForm,formId,presetId,form} = this.props
//        const id = 'main'
        console.log('did mount',form)
        if(form && !presetId) return
        if(presetId )this.setPreset(this.props)
        else initForm({...this.initState,id: formId})

    }

    componentWillReceiveProps(nextProps){
        const {presetId} = nextProps
        console.log(nextProps)
        if(presetId && (this.props.presetId != presetId))this.setPreset(nextProps)
    }




    setPreset(props){
        const {formId, presetId,presets,initForm} = props
        const form = presets.reduce(function(form,preset){
            if(preset.id == presetId) return {...form,...preset.form}
            return {...form}
        },{})

        console.log(form)

        initForm({ ...form ,id: formId})
    }

    render() {
        console.log('render')
        return(
        <div>

            <h1>Form creator</h1>
            <div>{this.props.children}</div>

        </div>
        )

    }




}




//export default Calc

export default connect(
//    null
    (state,ownProps) => {
//    const id = 'main'
    console.log('connect calc')

    return {
        form: state.form.entities.get(ownProps.formId),
        presets: state.presets
    }
}
,{updateForm, initForm})(InitCalc)

