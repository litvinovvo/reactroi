import React from 'react'
import {connect} from 'react-redux'
import {updateForm, initForm} from '../AC'

export default Component => class formDecorator extends React.Component {
//    constructor(props) {
//        super(props)
//        this.state = {
//            openItemId: props.defaultOpenId
//        }
//    }

    render() {
        return <Component {...this.props} />
    }

    toggleOpenItem = openItemId => ev => {
        this.setState({
            openItemId: openItemId === this.state.openItemId ? null : openItemId
        })
    }

    componentDidMount() {
//        const {initForm,formId,presetId,form} = this.props
//        const id = 'main'
        console.log('decorator did mount')
//        if(form && !presetId) return
//        if(presetId )this.setPreset(this.props)
//        else initForm({...this.initState,id: formId})

    }

}

//export default connect(
//    (state,ownProps) => {
//    console.log('connect calc from decorator')
//    return {
//        form: state.form.entities.get(ownProps.formId),
//        presets: state.presets
//    }
//}
//,{updateForm, initForm})(formDecorator)
