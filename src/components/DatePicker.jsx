import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

/**
 * Styling
 */
const useStyles = makeStyles(theme => {
  return {
    label: {
      marginTop: -4
    }
  };
});

/**
 * Date picker component that allows the user to change the date of submitting the
 * parameter values
 * based on https://material-ui-pickers.dev/demo/datetime-picker
 */

const DatePicker = props => {
  const [selectedDate, setSelectedDate] = React.useState(Date.now());
  const { dateChange } = props;
  function handleDateChange(date) {
    setSelectedDate(date);
    dateChange(null, date);
  }

  const classes = useStyles(props);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        value={selectedDate}
        onChange={handleDateChange}
        className={classes.label}
        margin="normal"
        id="mui-pickers-date"
        KeyboardButtonProps={{
          "aria-label": "change date"
        }}
      />
    </MuiPickersUtilsProvider>
  );
};

// value={selectedDate}
// onChange={handleDateChange}
export default DatePicker;
