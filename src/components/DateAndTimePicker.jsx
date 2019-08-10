import React, { useState } from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

/**
 * This component controls the date and time picker
 */
function DateAndTimePicker(props) {
  const { dateChange } = props;
  const [selectedDate, handleDateChange] = useState(Date.now());

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDateTimePicker
          autoOk
          ampm={false}
          label="Time of input"
          value={selectedDate}
          onChange={date => {
            handleDateChange(date);
            dateChange(null, date);
          }}
          onError={console.log}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

export default DateAndTimePicker;
