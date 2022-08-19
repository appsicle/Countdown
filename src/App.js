import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  FormInput,
  DatePicker,
  FormGroup,
  Form,
} from "shards-react";
import { useState, useEffect } from "react";
import {
  params,
  setQueryParams,
  computeCountdownDate,
  FORMAT,
} from "./countdownHelper";
import { BsFillGearFill } from "react-icons/bs";
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
    const value = params;
    if (value.date && value.eventName) {
      const finalDate = moment(value.date, FORMAT).toDate();
      setSelectedDate(finalDate);
      setCountdownDate(finalDate);
      setEventName(value.eventName);
    }
  }, []);

  const toggleModal = () => setModalOpen(!modalOpen);

  const submitCountdownDate = () => {
    const computedCountdownDate = computeCountdownDate(
      selectedDate,
      selectedTime
    );
    setCountdownDate(computedCountdownDate);
    setQueryParams(computedCountdownDate.format(FORMAT), eventName);
    setModalOpen(false);
  };

  return (
    <div>
      <body>
        {/* <Button onClick={toggleModal}><BsGear/></Button> */}
        <BsFillGearFill className="gear-icon" onClick={toggleModal}/>
        <Modal open={modalOpen || !countdownDate} toggle={toggleModal}>
          <ModalHeader>Countdown Settings</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label htmlFor="date">Countdown Date</label>
                <DatePicker
                  className="date-picker"
                  selected={selectedDate}
                  onChange={(d) => setSelectedDate(d)}
                  typeable
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="date">Countdown Time (Military)</label>
                <TimeField
                  value={selectedTime}
                  input={<FormInput />}
                  style={{
                    width: "unset",
                  }}
                  onChange={(_, time) => setSelectedTime(time)}
                />
              </FormGroup>

              <FormGroup>
                <label htmlFor="date">Event Name</label>
                <FormInput
                  value={eventName}
                  placeholder="Event Name"
                  onChange={(e) => {
                    setEventName(e.target.value);
                  }}
                />
              </FormGroup>

              <Button onClick={submitCountdownDate}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Clock countdownDate={countdownDate} eventName={eventName} />
      </body>
    </div>
  );
}

export default App;
