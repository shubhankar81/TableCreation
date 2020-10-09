  import React, { Component } from 'react';
  import { Calendar, momentLocalizer, Views } from 'react-big-calendar'
  import moment from 'moment'
  import Toolbar from 'react-big-calendar/lib/Toolbar';

  moment.locale('en', {
    week:{
      dow:1
    }
  })
  const localizer = momentLocalizer(moment)
  let allViews = Object.keys(Views).map(k=> Views[k])
  const myEventsList = [
    {
      id: 0,
      title: 'All Day Event very long title',
      start: new Date(2020, 4, 31, 6, 9, 0),
      end: new Date(2020, 4, 31, 8, 8, 8),
    },
    {
      id: 1,
      title: 'Long Event',
      start: new Date(2020, 4, 7,  8, 0, 0),
      end: new Date(2020, 4, 7, 11, 0, 0),
    },

    {
      id: 2,
      title: 'DTS STARTS',
      start: new Date(2020, 5, 1, 10, 0, 0),
      end: new Date(2020, 5, 1, 12, 0, 0),
    },

    {
      id: 3,
      title: 'DTS ENDS',
      start: new Date(2020, 4, 6, 10, 0, 0),
      end: new Date(2020, 4, 6,12, 0, 0),
    }]
    class EventComponent extends React.Component {
      render() {
        return <div data-toggle="tooltip" data-html="true" title="<em>Tooltip</em> <u>with</u> <b>HTML</b>">here we go!<br /> <button>JOIN </button></div>
      }
    }
  class App extends React.Component{
    constructor(props){
      super(props)
    }
    render(){
      console.log("asdfas ", allViews)
      return(
        <div style={{"height":"50rem"}}>
          <Calendar
          components={{
            event: EventComponent,
            toolbar : CustomToolBar 
          }}
          views={allViews}
            views={["day","week","work_week","month"]}
            defaultView="week"
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            
          />
        </div>
      )
    }
  } 


  class CustomToolBar extends Toolbar {

    componentDidMount() {
      const view = this.props.view;
      console.log(view)
    }
  
    render() {
      return (
        <div>
          <div className="rbc-btn-group">
            <button type="button" onClick={() => this.navigate('TODAY')}>today</button>
            <button type="button" onClick={() => this.navigate('PREV')}>back</button>
            <button type="button" onClick={() => this.navigate('NEXT')}>next</button>
          </div>
          <div className="rbc-toolbar-label">{this.props.label}</div>
          <div className="rbc-btn-group">
           
            <button type="button" onClick={this.view.bind(null, 'week')}>Week</button>
            <button type="button" onClick={this.view.bind(null, 'month')}>Month</button>
            <button type="button" onClick={this.view.bind(null, 'work_week')}> Work Week</button>
            <button type="button" onClick={this.view.bind(null, 'day')}>Day</button>
            <button type="button" onClick={this.view.bind(null, 'agenda')}>Agenda</button>
          </div>
        </div>
      );
    }
  }
  
  // const CustomToolBar = (toolbar) => {
  //   console.log("toolabasr  ", toolbar)
  //   const goToBack = () => {
  //     toolbar.data.setMonth(toolbar.date.getMonth() - 1);
  //     toolbar.onNavigate("prev")
  //   }

  //   const goToNext = () => {
  //     toolbar.date.setMonth(toolbar.date.getMonth()+1)
  //     toolbar.onNavigate('next')
  //   }

  //   const goToCurrent = () => {
  //     const now = new Date();
  //     toolbar.date.setMonth(now.getMonth());
  //     toolbar.date.setYear(now.getFullYear());
  //     toolbar.onNavigate('current')
  //   }
  //   const label = () => {
  //     const date = moment(toolbar.date)
  //     return(
  //     <span><b>{date.format('MMMM')}</b><span>{date.format('YYYY')}</span></span>
  //     )
  //   }
  //   return(
  //     <div className={sCal}></div>
  //   )


  // }
  export default App;