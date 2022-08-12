import {Calendar,dateFnsLocalizer} from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import React,{useState} from 'react'
import DatepICKER from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import './CalendarStyles.css'

const locales = {
  "pt-BR": require('date-fns/locale/pt-BR')
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})


function CalendarFaculty() {
  const [newEvent,setNewEvent] = useState({title:"", start: "", end: ""})
  const [allEvents,setAllEvents]= useState("")

  const handleAddEvent = ()=>{
    setAllEvents([...allEvents,newEvent])
  }

  return (
    <div className='calendar-faculty'>
      <div className="text-calendar">
        <h1>Calendário</h1>
        <p>aqui você pode organizar sua semana do jeito que preferir.</p>
      </div>
      <div className="calendar-container">
       <div className="calendar-inputs">
        <input type="text" placeholder='Adicione um título' value={newEvent.title} onChange={(e)=>setNewEvent({...newEvent, title: e.target.value})}/>
        <DatepICKER placeholderText='Data do início'selected={newEvent.start} onChange={(start)=>setNewEvent({...newEvent, start})}/>
        <DatepICKER placeholderText='Data do fim' selected={newEvent.end} onChange={(end=>setNewEvent({...newEvent, end}))}/>
       </div>
       <button onClick={handleAddEvent} className='event-btn'>
          Adicionar Evento
        </button>
        <Calendar
          localizer={localizer}
          events={allEvents}
          startAccessor="start"
          endAccessor="end"
          className='calendar-style'
        />
      </div>
    </div>
  )
}

export default CalendarFaculty