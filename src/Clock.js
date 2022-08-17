import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import "./Clock.css";

const Clock = ({ countdownDate, eventName }) => {
  return (
    <div>
      <>
        {countdownDate ? (
          <FlipClockCountdown
            className="flip-clock"
            duration={0.5}
            to={countdownDate}
          />
        ) : (
          "invalid"
        )}
        Until {eventName}
      </>
    </div>
  );
};

export default Clock;
