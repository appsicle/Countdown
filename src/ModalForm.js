import TimezoneSelect from "react-timezone-select";
import TimeField from "react-simple-timefield";
import { FormInput, DatePicker } from 'shards-react';
import { useEffect, useState } from "react";
import moment from 'moment';

const FORMAT = 'YYYY-MM-DD hh:mm:ss';

const ModalForm = ({ setClockTime }) => {
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [selectedTime, setSelectedTime] = useState('12:00');
  const [date, setDate] = useState(new Date());


  useEffect(() => {
    const [hours, minutes] = selectedTime.split(':');
    const hoursOffset = parseInt(hours) + (selectedTimezone.offset || 0);
    const computedTime = {
      hours: hoursOffset,
      minutes
    };

    const finalDate = moment(date).hours(computedTime.hours).minutes(computedTime.minutes).format(FORMAT);
    console.log(finalDate);
    setClockTime(finalDate);
  }, [selectedTimezone, selectedTime, date])

  return (
    <div>
      <div className="select-wrapper">
        <TimezoneSelect
          value={selectedTimezone}
          onChange={setSelectedTimezone}
        />
        <DatePicker selected={date} onChange={(d) => setDate(d)} typeable />
        <TimeField
          value={selectedTime}
          input={<FormInput />}
          style={{
            width: "unset",
          }}
          onChange={(event, time) => setSelectedTime(time)}
        />
      </div>
    </div>
  );
};

export default ModalForm;
