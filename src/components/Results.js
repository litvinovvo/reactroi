import React, { Component } from 'react'
import {currencies} from '../fixtures'
import {arrToMapJs,formatDate} from '../helpers'
import { Field, FieldArray, reduxForm, formValueSelector,getFormSyncErrors,focus,getFormValues,getFormMeta,getFormNames,isValid,isDirty } from 'redux-form'
import {connect} from 'react-redux'
import { Button, Checkbox, Input, Form,Label,Segment,Icon,Select,Message,Dimmer, Loader, Image, Header,Table } from 'semantic-ui-react'
import {addField,removeField,loadCurrency} from '../AC'
import Slider, { Range } from 'rc-slider'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer} from 'recharts'
import shortParagraph from '../resources/assets/images/wireframe/short-paragraph.png'


import 'rc-slider/assets/index.css'

class Results extends Component {
    
    
    componentDidMount(){
        if(!this.props.currency.loading && !this.props.currency.loaded)this.props.loadCurrency()
    }
    
//    shouldComponentUpdate(nextProps){
//        if(!nextProps.valid && nextProps.dirty){
//            console.log('new props invalid, dont update',nextProps.valid,this.props.valid)
//            return false
//        } else {
//            console.log('update results')
//            return true
//        }
//        
//    }
    

    
   render (){
        const { handleSubmit, pristine, reset, submitting, roi,currentDesign,newinvestment,addField,clearFields,currency: {loading,loaded},valid, values } = this.props
        console.log('!results is rendering')
       if(loading) return (
           <div><Header as='h3'>Расчёт окупаемости</Header>
        <Segment>
        
      <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
          <Image src={shortParagraph} />
      </Segment>
      </div>
       ) 
      if(loaded && valid && values.costs.length && values.investments.length && values.services.length) {
          console.log('in elses')
         return (
          <div>
             <Header as='h3'>Расчёт окупаемости</Header>
          {this.computeROI()}

     
     
      </div>    
      
      )       
      }
       
       return (
           <div>
           <Header as='h3'>Расчёт окупаемости</Header>
         <Message info>
    <Message.Header>Недостаточно данных</Message.Header>
    <p>Пожалуйста, введите все необходимые значения для расчёта.</p>
  </Message>
     
     
      </div>
       )

         

//       return(
//      <div>
//    {this.computeROI()}
//      
//
//      </div>
//  )
  }
//    computeROI = () => () => <div>hello</div>
    
    convertToRub(val,cur){
        const values = this.props.currency.cbrf.Valute
        if(values[cur]){
            return +val*values[cur].Value
        }
        return val
    }

    convertRubTo(val,cur){
        const values = this.props.currency.cbrf.Valute
        if(values[cur]){
            return +val/values[cur].Value
        }
        return val        
    }

    computeROI(){
        console.log('compute ROI')
//        if(!this.props.valid || !this.props.values){
//            console.log('form valid')   
//            return <div>Заполните все поля в форме</div>
//        } 
        const {values} = this.props
        const currency = arrToMapJs(currencies)[values.global.currency].text
        let investments = 0
        let costs = 0
        let servicesMin = 0
        let servicesMax = 0

        
        if(values.investments){
            values.investments.forEach((inv,i) => {
                if (inv.currency != 'RUB') investments  += +this.convertToRub(inv.input,inv.currency)
                else investments  += +inv.input
            })
        }
        
        if(values.services){
            values.services.forEach((service,i) => {
                if (service.currency != 'RUB'){
                    console.log(+this.convertToRub(service.input,service.currency)*+service.min*4 ,'минимальная выручка')
                   servicesMin  += +this.convertToRub(service.input,service.currency)*+service.min*4 
                   servicesMax  += +this.convertToRub(service.input,service.currency)*+service.max*4
                } 
                else {
                    console.log(+service.input*+service.min*4 ,'минимальная выручка не рубль')
                   servicesMin  += +service.input*+service.min*4
                   servicesMax  += +service.input*+service.max*4 
                }
            })
        }
        
        if(values.costs){
            values.costs.forEach((cost,i) => {
               costs  += +cost.input
            })
        }
        
        const roiMin = +(investments/(servicesMin*(1-costs/100))).toFixed(1)
        const roiMax = +(investments/(servicesMax*(1-costs/100))).toFixed(1)
        const roiMid = +(investments/(((servicesMax+servicesMin)/2)*(1-costs/100))).toFixed(1)        
        
        const chartData = [
            {name: 'Минимальная', value: roiMin },
            {name: 'Средняя', value: roiMid },
            {name: 'Максимальная', value: roiMax}
        ]
        
        return (<div>
           
  <Table celled>

    <Table.Body>
      <Table.Row >
        <Table.Cell>Сумма инвестиций</Table.Cell>
        <Table.Cell>{this.convertRubTo(investments,values.global.currency)}{' '+currency}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell>Выручка в месяц при минимальной загрузке</Table.Cell>
        <Table.Cell>{this.convertRubTo(servicesMin,values.global.currency)}{' '+currency}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell>Выручка в месяц при максимальной загрузке</Table.Cell>
        <Table.Cell>{this.convertRubTo(servicesMax,values.global.currency)}{' '+currency}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell >Общий процент расходов</Table.Cell>
        <Table.Cell>{costs+' %'}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell >Чистая прибыль при минимальной загрузке</Table.Cell>
        <Table.Cell>{this.convertRubTo(servicesMin,values.global.currency)*((100-costs)/100)}{' '+currency}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell >Чистая прибыль при максимальной загрузке</Table.Cell>
        <Table.Cell>{this.convertRubTo(servicesMax,values.global.currency)*((100-costs)/100)}{' '+currency}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell >Срок окупаемости при минимальной загрузке</Table.Cell>
        <Table.Cell>{roiMin + ' мес.'}</Table.Cell>

      </Table.Row>   
      <Table.Row>
        <Table.Cell >Срок окупаемости при максимальной загрузке</Table.Cell>
        <Table.Cell>{roiMax + ' мес.'}</Table.Cell>

      </Table.Row>
      <Table.Row>
        <Table.Cell >Срок окупаемости при средней загрузке</Table.Cell>
        <Table.Cell>{roiMid + ' мес.'}</Table.Cell>

      </Table.Row>  
      <Table.Row>
        <Table.Cell >Конвертация по курсу ЦБРФ</Table.Cell>
        <Table.Cell><a href='http://www.cbr.ru/' target="_blank">{formatDate(new Date(this.props.currency.cbrf.Date))}</a></Table.Cell>

      </Table.Row>                               
    </Table.Body>
  </Table>           
           
 
            
                                                                        
                       <ResponsiveContainer height={300}>
    	<BarChart data={chartData}
            margin={{top: 30, right: 30, left: 0, bottom: 0}}>
       <CartesianGrid strokeDasharray="3 3"/>
       <XAxis dataKey="name"/>
       <YAxis/>
       <Tooltip/>
       <Legend />
       <Bar dataKey="value" name="Срок окупаемости, мес." fill="#00B5AD" label={{ position: 'top' }} />
      </BarChart>              
              
                 </ResponsiveContainer>                                                                                                                           
                                                                                                                                                                                                                                                            
            </div>
               )}

}

const selector = formValueSelector('simple')

Results = connect(
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
          values: getFormValues('simple')(state),
          syncErrors: getFormSyncErrors('simple')(state),
          fields: getFormMeta('simple')(state),
          valid: isValid('simple')(state),
          dirty: isDirty('simple')(state),
          currency: state.currency,

      })
  },{ addField, removeField,focus,loadCurrency }
)(Results)



export default Results

