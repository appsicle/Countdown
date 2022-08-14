import { Button, Modal, ModalBody, ModalHeader } from "shards-react";
import { useState, useEffect } from "react";
import { FormInput, DatePicker } from "shards-react";
import {
  params,
  setQueryParams,
  computeCountdownDate,
  formatDate,
} from "./countdownHelper";
import TimeField from "react-simple-timefield";
import Clock from "./Clock";
import "./App.css";

function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [countdownDate, setCountdownDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const value = params.date;
    if (value) {
      const finalDate = formatDate(value);
      setCountdownDate(finalDate);
    }
  }, [selectedTime, selectedDate]);

  const toggleModal = () => setModalOpen(!modalOpen);

  const submitCountdownDate = () => {
    const computedCountdownDate = computeCountdownDate(selectedDate, selectedTime);
    console.log(computeCountdownDate);
    setCountdownDate(computedCountdownDate);
    setQueryParams(computedCountdownDate);
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
                <Button onClick={submitCountdownDate}>Submit</Button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        <Clock countdownDate={countdownDate} />
      </body>
    </div>
  );
}

export default App;
