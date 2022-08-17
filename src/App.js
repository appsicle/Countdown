import { Button, Modal, ModalBody, ModalHeader, FormInput, DatePicker } from "shards-react";
import { useState, useEffect } from "react";
import {
  params,
  setQueryParams,
  computeCountdownDate,
  FORMAT,
} from "./countdownHelper";
import moment from "moment";
import TimeField from "react-simple-timefield";
import Clock from "./Clock";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [countdownDate, setCountdownDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const value = params.date;
    if (value) {
      const finalDate = moment(value, FORMAT).toDate();
      setCountdownDate(finalDate);
    }
  }, [selectedTime, selectedDate]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const submitCountdownDate = () => {
    const computedCountdownDate = computeCountdownDate(
      selectedDate,
      selectedTime
    );
    setCountdownDate(computedCountdownDate);
    setQueryParams(computedCountdownDate.format(FORMAT));
    setModalOpen(false);
  };

  return (
    <div>
      <body>
        <Button onClick={toggleModal}>click</Button>
        <Modal open={modalOpen || !countdownDate} toggle={toggleModal}>
          <ModalHeader>End Date & Time</ModalHeader>
          <ModalBody>
            <div>
              <div className="select-wrapper">
                <DatePicker
                  selected={selectedDate}
                  onChange={(d) => setSelectedDate(d)}
                  typeable
                />
                <TimeField
                  value={selectedTime}
                  input={<FormInput />}
                  style={{
                    width: "unset",
                  }}
                  onChange={(_, time) => setSelectedTime(time)}
                />
                <FormInput
                  value={eventName}
                  placeholder='Event Name'
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                />
                <Button onClick={submitCountdownDate}>Submit</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Clock countdownDate={countdownDate} eventName={eventName} />
      </body>
    </div>
  );
}

export default App;
