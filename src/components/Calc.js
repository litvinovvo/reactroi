import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {updateForm, initForm} from '../AC'
import formDecorator from '../decorators/formDecorator'



class Calc extends Component {
    static propTypes = {

    }

    initState = {
        value: '1300000',
        costs: '300000'
    }


    componentDidMount() {
        const {initForm,formId,presetId,form} = this.props
//        const id = 'main'
        console.log(this.props)
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

            <h1>Калькулятор окупаемости</h1>
            <form onSubmit = {this.handleSubmit}>
                value: <input value = {this.getValue('value')}
                             onChange = {this.handleChange('value')}
                            />
                costs: <input value = {this.getValue('costs')}
                                onChange = {this.handleChange('costs')}
                             />
                Срок окупаемости: <div>{ this.computeROI() }</div>
                <input type = "submit" value = "submit"/>
            </form>
        </div>
        )

    }

    computeROI(){
        if(this.props.form) return this.props.form.value/this.props.form.costs + ' лет'
//        return
    }

    getValue = field => {
        console.log('get value')
        if(this.props.form) return this.props.form[field]
        return this.initState[field]
    }

        handleSubmit = ev => {
        ev.preventDefault()
    //        this.props.addComment(this.state)
    //        this.setState({
    //            value: '',
    //            costs: ''
    //        })
    }



    handleChange = type => ev => {
        const {value} = ev.target
        this.props.updateForm({
            id: this.props.formId,
            [type]: value
        })
//        this.setState({
//            [type]: value
//        })
    }
}

function mapDispatchToProps(dispatch, ownProps) {
//  function goToSomeLink(){
//    initialProps.history.push('some/link');
//  }

//  dispatch(initForm({value: '', costs: '' ,id: ownProps.formId}))

  return {
      updateForm: (args) => dispatch(updateForm(args)),
      initForm: (args) => dispatch(initForm(args))
    }
  }



//export default Calc

export default connect(
//    null
    (state,ownProps) => {
//    const id = 'main'
    console.log('connect calc')

    return {
        form: state.forms.entities.get(ownProps.formId),
        presets: state.presets
    }
}
,mapDispatchToProps)(Calc)

