import React, { Component } from 'react'
import { Field, Fields, reduxForm, formValueSelector, getFormMeta,getFormSyncErrors,focus,getFormValues } from 'redux-form'
import {connect} from 'react-redux'
import { Button, Checkbox, Input, Form,Label,Segment,Icon,Select,Message } from 'semantic-ui-react'
import {addField,removeField} from '../AC'
import Slider, { Range } from 'rc-slider'
import 'rc-slider/assets/index.css'

class SimpleForm extends Component {



   addNewItem = (e) => {
    const { addField,clearFields,focus,change,valid,touch,blur, syncErrors,untouch,form,newItem,newItemFieldType } = this.props
//    const newName  = this.props[field]

    console.log('is valid?',syncErrors)
    if( syncErrors.newItem ){
        touch(form,'newItem')
        focus(form,'newItem')
        return
    }
    if( syncErrors.newItemFieldType ){
        touch(form,'newItemFieldType')
        focus(form,'newItemFieldType')
        return
    }
    addField({type: newItemFieldType, label: newItem})

    clearFields(form,false,false,'newItem')
       untouch(form,'newItem')

   }

   removeItem = ({name,type}) => (e) => {
       const { newinvestment,removeField,clearFields,focus,change } = this.props
       removeField({type: type, name: name})
       removeField({type: type, name: name + 'input'})
       removeField({type: type, name: name + 'currency'})
   }



   componentDidUpdate(){
       console.log('DID UPDATE',this.props.active)
       if(this.props.active && document.querySelector(`[name="${this.props.active}"]`))document.querySelector(`[name="${this.props.active}"]`).focus()
   }

    componentDidMount(){
        console.log('Form DID MOUNT')
    }
   renderFields = (fields) => (
  <div>
    <div className="input-row">
      <input {...fields.firstName.input} type="text"/>
      {fields.firstName.meta.touched && fields.firstName.meta.error &&
       <span className="error">{fields.firstName.meta.error}</span>}
    </div>
    <div className="input-row">
      <input {...fields.lastName.input} type="text"/>
      {fields.lastName.meta.touched && fields.lastName.meta.error &&
       <span className="error">{fields.lastName.meta.error}</span>}
    </div>
  </div>
)
   render (){
        const { handleSubmit, pristine, reset, submitting, roi,currentDesign,newinvestment,addField,clearFields } = this.props
        console.log('!simple form is rendering')
      return(
      <div>



<Fields names={[ 'firstName', 'lastName' ]} component={this.renderFields}/>
     <Segment.Group>
      {this.createInvestmentsFields(currentDesign.investments)}
      </Segment.Group>



                    <br />
               <Segment.Group>
      {this.createServicesFields(currentDesign.services)}

              </Segment.Group>

          <br />
               <Segment.Group>
      {this.createCostsFields(currentDesign.costs)}

              </Segment.Group>


          <br />
               <Segment.Group>
      {this.createConsumablesFields(currentDesign.consumables)}
      </Segment.Group>


          <Field
            name="newItem"
            component={this.renderAddNewItemField}
            type="text"
            label="Добавить элемент"
            validate={[this.requiredVal]}
          />

      </div>
  )
  }


renderInputCurrencyField = ({
  input,
    placeholder,
  label,
  type,
  meta: { touched, error, warning }
}) =>
    <div>
      <Input {...input} error={touched && error && (() => true)()} placeholder={label} type={type} action >
           <input />
                    <Field
          name={input.name + 'currency'}

          component={this.renderSelectField}
          options={this.currencies}
          label="Выберите валюту"

        />
      </Input>
      {touched && error && <Message content={error} />}
    </div>

renderInputLabelField = ({
  input,
  labelContent,
  label,
  type,
  meta: { touched, error, warning }
}) =>
    <div>
      <Input {...input} error={touched && error && (() => true)()} placeholder={label} type={type} action label={{ basic: true, content: labelContent }} labelPosition='right' />
      {touched && error && <Message content={error} />}
    </div>

renderAddNewItemField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) =>
  <div>
    <label>
      {label}
    </label>
    <div>
      <Input {...input} error={touched && error && (() => true)()} placeholder={label} type={type} action >
           <input />
                               <Field
          name={input.name + 'FieldType'}

          component={this.renderSelectField}
          options={this.fieldTypes}
          label="Выберите элемент"
          validate={[this.requiredVal]}

        />
            <Button onClick={this.addNewItem}>Добавить</Button>
      </Input>
      {touched &&
        error &&
          <Message warning content={error}
              header="Не так быстро"     />}</div></div>




 requiredVal = value => (value ? undefined : 'Поле обязательно для заполнения')

 createInvestmentsFields(fields) {
    return(
        fields.map(investment =>
        <Segment key={investment.name}>
         <Label attached='top right' onRemove={this.removeItem({name: investment.name, type: 'investments'})} />
         <label>{investment.label}</label>
         <br />

          <Field
            name={investment.name + 'input'}
            component={this.renderInputCurrencyField}
            type="text"
            label={investment.label}
            validate={[this.requiredVal]}
          />

        </Segment>
        )
    )
}

onSliderChange = (id) => ( data ) => {
    console.log('slider change', id,data)

       const { change } = this.props
       if(data instanceof Array){
           change(id + 'Min',data[0])
           change(id + 'Max',data[1])
        }else change(id,data)

//    console.log(this.props.values)
}

getSliderValue = (name) => {
    return (this.props.values && this.props.values[name + 'input']) ? +this.props.values[name + 'input'] : 0
}

getRangeValue = (name) => {

    if(!this.props.values) return [0,0]
    const min = this.props.values[name + 'inputRangeMin']
    const max = this.props.values[name + 'inputRangeMax']
    if(!max && min) return [+min,+max]
    if(max && !min) return [0,+max]
    if(max && min) return [+min,+max]
}

 createCostsFields(fields) {
    return(
        fields.map(costs =>
        <Segment key={costs.name}>
         <Label attached='top right' onRemove={this.removeItem({name: costs.name, type: 'costs'})} />
         <label>{costs.label}</label>
         <br />
            <div>
                    <Slider value={this.getSliderValue(costs.name)}  onChange={this.onSliderChange(costs.name + 'input')}/>
            </div>
          <Field

            name={costs.name + 'input'}
            component={this.renderInputLabelField}
            type="text"
            label={costs.label}
            validate={[this.requiredVal]}
            labelContent="%"
          />

        </Segment>
        )
    )
}

 createServicesFields(fields) {
    return(
        fields.map(services =>
        <Segment key={services.name}>
         <Label attached='top right' onRemove={this.removeItem({name: services.name, type: 'services'})} />
         <label>{services.label}</label>

          <Field
            name={services.name + 'input'}
            component={this.renderInputCurrencyField}
            type="text"
            label={services.label}
            validate={[this.requiredVal]}
            placeholder="Стоимость процедуры"
          />

         <br />
           <label>Загрузка в день</label>
            <div>
                    <Slider.Range value={this.getRangeValue(services.name)} defaultValue={[3, 10]} max={50} onChange={this.onSliderChange(services.name + 'inputRange')}/>
            </div>
          <Field

            name={services.name + 'inputRangeMin'}
            component={this.renderInputLabelField}
            type="text"
            labelContent="процедур мин."
            label={services.label}
            validate={[this.requiredVal]}
          />
          <Field

            name={services.name + 'inputRangeMax'}
            component={this.renderInputLabelField}
            labelContent="процедур макс."
            type="text"
            label={services.label}
            validate={[this.requiredVal]}
          />

        </Segment>
        )
    )
}

 createConsumablesFields(fields) {
    return(
        fields.map(consumables =>
        <Segment key={consumables.name}>
         <Label attached='top right' onRemove={this.removeItem({name: consumables.name, type: 'consumables'})} />
         <label>{consumables.label}</label>
         <br />

          <Field
            name={consumables.name + 'inputValue'}
            component={this.renderInputCurrencyField}
            type="text"
            label='Стоимость'
            validate={[this.requiredVal]}
          />
          <Field
            name={consumables.name + 'inputResource'}
            component={this.renderInputLabelField}
            type="text"
            label='Ресурс'
            validate={[this.requiredVal]}
            labelContent="процедур"
          />
          <Field
            name={consumables.name + 'inputBundle'}
            component={this.renderInputLabelField}
            type="text"
            label='В комплекте'
            validate={[this.requiredVal]}
            labelContent="шт."
          />

        </Segment>
        )
    )
}

//<Select compact options={options} defaultValue='rub' />
currencies = [
  { key: 'ru', text: 'руб.', value: 'rub' },
  { key: 'us', text: '$', value: 'usd' },
  { key: 'kz', text: 'тенге', value: 'tenge' },
]

fieldTypes = [
  { key: 'investments', text: 'Инвестиция', value: 'investments' },
  { key: 'costs', text: 'Расходы', value: 'costs' },
  { key: 'services', text: 'Процедуры', value: 'services' },
  { key: 'consumables', text: 'Расходные материалы', value: 'consumables' },
]

renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
     <Select
    compact
    {...input}
    onChange={(param,data) => input.onChange(data.value)}
    value= {input.value }
    placeholder={label}
    {...custom}
    />
}

const selector = formValueSelector('simple')

SimpleForm = connect(
  state => {
      console.log('connect simple form')
      const { value, costs, newinvestments, newcosts, newconsumables, newservices, active, newItem,newItemFieldType } = selector(state,'newinvestments','newcosts','newconsumables', 'newservices','active','newItem','newItemFieldType')
      return({
          currentDesign: state.formDesign,
          newItem: newItem,
          newItemFieldType: newItemFieldType,
          newinvestments: newinvestments,
          newcosts: newcosts,
          newconsumables: newconsumables,
          newservices: newservices,
          active: state.form['simple'] ? state.form['simple'].active : null,
          values: getFormValues('simple')(state),
          syncErrors: getFormSyncErrors('simple')(state)

      })
  },{ addField, removeField,focus }
)(SimpleForm)


SimpleForm = reduxForm({
  form: 'simple',
    destroyOnUnmount: false,
    enableReinitialize: false,
    touchOnBlur: false,

})(SimpleForm)

export default SimpleForm

