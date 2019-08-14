import React, { useState } from "react";
import PropTypes from 'prop-types';
import {
  MuiPickersUtilsProvider,
  DateTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import CalendarTodayOutlined from "@material-ui/icons/CalendarTodayOutlined";
import { IconButton, InputAdornment } from "@material-ui/core";
/**
 * This component controls the date and time picker
 */
function DateAndTimePicker(props) {
  const { dateChange } = props;
  const [selectedDate, handleDateChange] = useState(Date.now());

  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DateTimePicker
        allowKeyboardControl={false}
        maxDateMessage={"Date should not be after today's date"}
        disableFuture
          autoOk
          ampm={false}
          label="Time of input"
          value={selectedDate}
          onChange={date => {
            handleDateChange(date);
            dateChange(null, date);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <CalendarTodayOutlined />
                </IconButton>
              </InputAdornment>
            ),
          }}
          // eslint-disable-next-line no-console
          onError={console.log}
        />
      </MuiPickersUtilsProvider>
    </>
  );
}

DateAndTimePicker.propTypes={
  dateChange:PropTypes.func.isRequired
}
export default DateAndTimePicker;
