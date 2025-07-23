import React, { useState } from "react"
import { Calendar } from "../components/ui/calendar"

const CalendarDemo = () => {
  const [date, setDate] = useState(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow-sm"
      captionLayout="dropdown"
    />
  )
}

export default CalendarDemo
