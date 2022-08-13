import Clock from "./Clock";
// import ModalForm from "./ModalForm";
import "./App.css";
import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import { useState, useEffect } from "react";
import TimeField from "react-simple-timefield";
import { FormInput, DatePicker } from "shards-react";
import moment from "moment";
import FlipClock from "x-react-flipclock";

const FORMAT = "YYYY-MM-DD hh:mm:ss";
const URL_BASE =
  window.location.protocol +
  "//" +
  window.location.host +
  window.location.pathname;

const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [clockTime, setClockTime] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    let value = params.date;
    if (value) {
      const finalDate = moment(value).format(FORMAT);
      console.log(finalDate);
      setClockTime(finalDate);
    } else {
      const [hours, minutes] = selectedTime.split(":");
      const computedTime = {
        hours: parseInt(hours),
        minutes,
      };

      const finalDate = moment(date)
        .hours(computedTime.hours)
        .minutes(computedTime.minutes)
        .format(FORMAT);
      setClockTime(finalDate);
      var newurl = URL_BASE + "?date=" + finalDate;
      console.log(newurl)
      window.history.pushState({ path: newurl }, "", newurl);
    }
  }, [selectedTime, date]);

  return (
    <div className="App">
      <body>
        <Button
          onClick={() => {
            setModalOpen(true);
          }}
        >
          click
        </Button>
        <Modal
          open={modalOpen}
          toggle={() => {
            setModalOpen(!modalOpen);
          }}
        >
          <ModalHeader>End Date & Time</ModalHeader>
          <ModalBody>
            <div>
              <div className="select-wrapper">
                <DatePicker
                  selected={date}
                  onChange={(d) => setDate(d)}
                  typeable
                />
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
          </ModalBody>
        </Modal>
        <FlipClock
          type="countdown"
          count_to={clockTime} // Date/Time
          units={[
            {
              sep: "",
              type: "days",
              title: "day",
            },
            {
              sep: "",
              type: "hours",
              title: "hour",
            },
            {
              sep: "",
              type: "minutes",
              title: "minutes",
            },
            {
              sep: "",
              type: "seconds",
              title: "seconds",
            },
          ]}
        />
      </body>
    </div>
  );
}

export default App;
