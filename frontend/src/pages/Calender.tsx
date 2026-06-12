import React from 'react'
import { useTitle } from '../hooks/useTitle'
import Nav from '../services/Nav';
import { ScheduleComponent, ViewsDirective, ViewDirective, Day, Week, WorkWeek, Month, Agenda, Inject, Resize, DragAndDrop } from '@syncfusion/ej2-react-schedule';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import {scheduleData} from "../../constants/dummy"

const Calender = () => {
  useTitle("Calender");
  return (
    <div className='main'>
      <Nav/>
      Calender
    </div>
  )
}

export default Calender
