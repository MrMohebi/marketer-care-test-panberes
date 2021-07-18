import React, { useState } from "react";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

const Calendar = () => {
    const [selectedDay, setSelectedDay] = useState(null);
    return (
        <DatePicker
            value={selectedDay}
            onChange={setSelectedDay}
            inputPlaceholder="Select a day"
            shouldHighlightWeekends
        />
    );
};

export default Calendar;