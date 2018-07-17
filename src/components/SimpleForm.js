import React, { Component } from 'react'
import { Field, FieldArray, reduxForm, formValueSelector,getFormSyncErrors,focus,getFormValues } from 'redux-form' 
import {connect} from 'react-redux'
import {currencies} from '../fixtures'
import { Button, Checkbox, Input, Form,Label,Segment,Icon,Select,Message, Dropdown,Header } from 'semantic-ui-react'
import {addField,removeField} from '../AC'
import Slider, { Range } from 'rc-slider'
import 'less/rc-slider.less'
//import 'rc-slider/assets/index.css'

class SimpleForm extends Component {
    
//   state = {
//       inputError: false
//   }    
requiredVal = value => (value ? undefined : 'Поле обязательно для заполнения') 
requiredNum = value => (value && !/[^0-9\.]/i.test(value) ? undefined : 'Необходимо ввести число')
normalizeNum = value => (value && !/[^0-9\.]/i.test(value) ? value : value.replace(/[^0-9\.]/gim,'') )

   addNewItem = (e) => {
    const { addField,clearFields,focus,change,valid,touch,blur, syncErrors,untouch,form,newItem,newItemFieldType,currentDesign,values } = this.props
//    const newName  = this.props[field]

        this.props.handleSubmit(()=>{})
       
        console.log('is valid?',syncErrors)
        if(!values || !values.newItem ){
//        this.setState({ 
//                inputError: true
//        })
            touch('newItem')
            focus(form,'newItem')
            return
        }
        if(!values || !values.newItemFieldType ){
            touch(form,'newItemFieldType')
            focus(form,'newItemFieldType')
            return
        }
//        this.setState({ 
//                inputError: false
//        })
        addField({type: newItemFieldType, label: newItem, index: currentDesign[newItemFieldType].length })

        clearFields(form,false,false,'newItem')
           untouch(form,'newItem')

   }

   removeItem = ({type,index,id}) => (e) => {

       const { newinvestment,removeField,clearFields,focus,change,array } = this.props
       
//       arrayRemove(form:String, field:String, index:Number)       
       array.remove(type,index)
       removeField({type: type, id: id})
//       removeField({type: type, id: id + 'input'})
//       removeField({type: type, id: id + 'currency'})
   }

   touchAll(){
       console.log('touching all error fields')
       const fields = this.props.syncErrors
       var fieldsArr = []
       if(!fields)return
       for (var key in fields){
           if(Array.isArray(fields[key])){
           fields[key].forEach((item,i)=>{
               for(var name in item){
                   fieldsArr.push(`${key}[${i}].${name}`)
               }
           })               
           } else {
               for(var name in fields[key]){
                   fieldsArr.push(`${key}.${name}`)
               }
               
           }

       }
       this.props.touch(...fieldsArr)
       console.log(fieldsArr)
   }

   componentDidUpdate(){
       console.log('DID UPDATE',this.props.active)
       if(this.props.active && document.querySelector(`[name="${this.props.active}"]`))document.querySelector(`[name="${this.props.active}"]`).focus()
       if(this.props.dirty)this.touchAll()
   }

    componentDidMount(){
        console.log('Form DID MOUNT')
    }

   render (){
        const { handleSubmit, pristine, reset, submitting, roi,currentDesign,newinvestment,addField,clearFields } = this.props
        console.log('!simple form is rendering')
      return(
      <div>
    
<Header as='h3'>Параметры</Header>
<Header as='h4'>Инвестиции</Header>
    {
            currentDesign.investments.length ? (<Segment.Group>{this.createInvestmentsFields(currentDesign.investments)}</Segment.Group>) : 
            (<Message info>
                <Message.Header>Нет элементов</Message.Header>
                <p>Пожалуйста, добавьте хотя бы один элемент для расчёта.</p>
             </Message>) 
    }
                    <Header as='h4'>Процедуры</Header>
    {
            currentDesign.services.length ? (<Segment.Group>{this.createServicesFields(currentDesign.services)}</Segment.Group>) : 
            (<Message info>
                <Message.Header>Нет элементов</Message.Header>
                <p>Пожалуйста, добавьте хотя бы один элемент для расчёта.</p>
             </Message>) 
    }
              <Header as='h4'>Расходы</Header>
               
      { 
            currentDesign.costs.length ? (<Segment.Group>{this.createCostsFields(currentDesign.costs)}</Segment.Group>) : 
            (<Message info>
                <Message.Header>Нет элементов</Message.Header>
                <p>Пожалуйста, добавьте хотя бы один элемент для расчёта.</p>
             </Message>) 
      }
             
              


           <Header as='h4'>Общие параметры</Header>

{this.createGlobalCurrencyField()}

          <Field
            name="newItem"
            component={this.renderAddNewItemField}
            type="text"
            label="Добавить элемент"

          />

      </div>
  )
  }

//        <Segment.Group>
//      {this.createConsumablesFields(currentDesign.consumables)}
//      </Segment.Group>

renderInvestments = ({ fields, meta: { error, submitFailed } }) => 
    this.createInvestmentsFields(this.props.currentDesign.investments) 
//        <div><Field
//          name='fields.firstname'
//          type="text"
//          component='input'
//          label="First Name"
//        />
//        </div>


  
  
renderInputCurrencyField = ({
  input,
    baseName,
    placeholder,
  label,
  type,
  meta: { touched, error, warning }
}) =>
    <div>
      <Input {...input} error={touched && error && (() => true)()} placeholder={label} type={type} action >
           <input />
            <Field
              name={baseName + '.currency'}
              component={this.renderSelectField}
              options={currencies}
              label="Выберите валюту"
              validate = {[this.requiredVal]}
        />
      </Input>
      {
//        touched && error && <Message content={error} />
    }
    </div>

renderInputLabelFieldInverted = ({
  input,
  labelContent,
  label,
  type,
  meta: { touched, error, warning }
}) =>
    <Label basic  {...((touched && error) ? {color: 'red'} : {}) } >
    {

        
       labelContent 
    }
     <Label.Detail>
     {input.value}
     </Label.Detail>

    
    </Label>

renderInputLabelField = ({
  input,
  labelContent,
  label,
  type,
  meta: { touched, error, warning }
}) =>
    <Label basic  {...((touched && error) ? {color: 'red'} : {}) } >
    {
      //<Input {...input} size='small' error={touched && error && (() => true)()} placeholder={label} type={type} action label={{ basic: true, content: labelContent }} labelPosition='right'   
        // />
        input.value
        
    }
     <Label.Detail>
     {labelContent}
     </Label.Detail>
      
      
      
      {
        //touched && error && <Message content={error} />
    }
    
    </Label>

renderAddNewItemField = ({
  input,
  label,
  type,
  meta: { touched, error, warning },
}) =>
  <div>


    <div>
     <p>{label}</p>
      <Input {...input} error={touched && !input.value && (() => true)()} placeholder={label} type={type} action >
           <input />
                               <Field
          name={input.name + 'FieldType'}

          component={this.renderSelectField}
          options={this.fieldTypes}
          label="Выберите элемент"


        />
            <Button onClick={this.addNewItem}>Добавить</Button>
      </Input>
      {
//            touched &&
//        !input.value &&
//          <Message warning content={error}
//              header="Не так быстро"     />
        }</div></div>






 createInvestmentsFields(fields) {

    return(
        fields.map((investment,index) =>
        <Segment key={investment.id}>
                       {
//                           <Label size='mini' corner='true'  onRemove={this.removeItem({type: 'investments', index: index, id: investment.id})} />
//                           <Button floated='right' onClick={this.removeItem({type: 'investments', index: index, id: investment.id})}><Icon name='close' /></Button>
        }
        
        <Icon link fitted size="small" color="grey" className="float-right" onClick={this.removeItem({type: 'investments', index: index, id: investment.id})} name='close' />
        
         
         <p className="input-title">{investment.label}</p>

          <Field
            name={`investments[${index}].input`}
            component={this.renderInputCurrencyField}
            type="text"
            label={investment.label}
            validate={[this.requiredVal,this.requiredNum]}
            baseName={`investments[${index}]`}
            normalize={this.normalizeNum}
          />

        </Segment>
        )
    )
}

createGlobalCurrencyField () {
       
    return(
        <Segment >
            Валюта для расчётов:&nbsp;&nbsp;
          <Field
            name="global.currency"
            type="text"
            
              component={this.renderSelectField}
              options={currencies}
              label="Выберите валюту"    
              validate={[this.requiredVal]}        
          />           
        </Segment>


        )
}        
        
onSliderChange = (id) => ( data ) => {
    console.log('slider change', id,data)

       const { change } = this.props
       if(data instanceof Array){
           change(id + '.min',data[0])
           change(id + '.max',data[1])
        }else change(id + '.input',data)

//    console.log(this.props.values)
}

getSliderValue = (name,index) => {
    return (this.props.values && this.props.values[name] && this.props.values[name][index] &&  this.props.values[name][index].input) ? +this.props.values[name][index].input : 0
}

getRangeValue = (name,index) => {

    if(!this.props.values || !this.props.values[name] || !this.props.values[name][index]) return [0,0]
    const min = this.props.values[name][index].min
    const max = this.props.values[name][index].max
    if(!max && min) return [+min,+min]
    if(max && !min) return [0,+max]
    if(max && min) return [+min,+max]
}

 createCostsFields(fields) {
  
    return(
        fields.map((costs,index) =>
        <Segment key={costs.id}>
         <Icon link fitted size="small" color="grey" className="float-right" onClick={this.removeItem({type: 'costs', index: index, id: costs.id})} name='close' />
         
 
      
              {costs.label}&nbsp;
              <Field
            name={`costs[${index}].input`}
            component={this.renderInputLabelField}
            type="text"
            label={costs.label}
            validate={[this.requiredVal, this.requiredNum]}
            labelContent="%"
            normalize={this.normalizeNum}
            /> 
            <br /><br />  
            <div>
                    <Slider value={this.getSliderValue('costs',index)}  onChange={this.onSliderChange(`costs[${index}]`)}/>
            </div>
 

        </Segment>
        )
    )
}

 createServicesFields(fields) {
       
    return(
        fields.map((services,index) =>
        <Segment key={services.id}>
         <Icon link fitted size="small" color="grey" className="float-right" onClick={this.removeItem({type: 'services', index: index, id: services.id})} name='close' />
        <p className="input-title">{services.label}</p>
          <Field
            name={`services[${index}].input`}
            component={this.renderInputCurrencyField}
            type="text"
            label={services.label}
            validate={[this.requiredVal]}
            normalize={this.normalizeNum}
            placeholder="Стоимость процедуры"
            baseName={`services[${index}]`}
          />
            <br />Процедур в неделю&nbsp;
          <Field

            name={`services[${index}].min`}
            component={this.renderInputLabelFieldInverted}
            type="text"
            labelContent="от"
            label={services.label}
            validate={[this.requiredVal]}
            normalize={this.normalizeNum}
          />
          <Field
            name={`services[${index}].max`}
            component={this.renderInputLabelFieldInverted}
            labelContent="до"
            type="text"
            label={services.label}
            validate={[this.requiredVal]}
            normalize={this.normalizeNum}
          />            
           <br /><br />
            <div>
                    <Slider.Range value={this.getRangeValue('services',index)} defaultValue={[3, 10]} max={50} onChange={this.onSliderChange(`services[${index}]`)}/>
            </div>


        </Segment>
        )
    )
}

 createConsumablesFields(fields) {
    return(
        fields.map((consumables,index) =>
        <Segment key={consumables.id}>
         <Label attached='top right' onRemove={this.removeItem({index: index, type: 'consumables', id: consumables.id})} />

         
         <p className="input-title">{consumables.label}</p>
          <Field
            name={`consumables[${index}].input`}
            component={this.renderInputCurrencyField}
            type="text"
            label='Стоимость'
            validate={[this.requiredVal]}
            baseName={`consumables[${index}]`}
          />
          <Field
            name={`consumables[${index}].resource`}
            component={this.renderInputLabelField}
            type="text"
            label='Ресурс'
            validate={[this.requiredVal]}
            labelContent="процедур"
          />
          <Field
            name={`consumables[${index}].bundle`}
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
//currencies = [
//  { key: 'ru', text: 'руб.', value: 'RUB' },
//  { key: 'us', text: '$', value: 'USD' },
//  { key: 'kz', text: 'тенге', value: 'KZT' },
//]

fieldTypes = [
  { key: 'investments', text: 'Инвестиция', value: 'investments' },
  { key: 'costs', text: 'Расходы', value: 'costs' },
  { key: 'services', text: 'Процедуры', value: 'services' },
//  { key: 'consumables', text: 'Расходные материалы', value: 'consumables' },
]

renderSelectField = ({
  input,
  label,
  meta: { touched, error },
  children,
  ...custom
}) =>
     <Dropdown
    compact selection
    {...input}
    error={touched && error && (() => true)()}
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
          syncErrors: getFormSyncErrors('simple')(state),

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

