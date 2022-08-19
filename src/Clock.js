import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import "./Clock.css";

const Clock = ({ countdownDate, eventName }) => {
  return (
    <div>
      <div className="display-container">
        {countdownDate ? (
          <FlipClockCountdown
            className="flip-clock"
            duration={0.5}
            to={countdownDate}
          />
        ) : (
          "invalid"
        )}
        <p className="display-container-text"> Until {eventName}</p>
      </div>
    </div>
  );
};

export default Clock;
