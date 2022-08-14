// import { clockConfig } from "./consts";
import FlipClockCountdown from "@leenguyen/react-flip-clock-countdown";
import "@leenguyen/react-flip-clock-countdown/dist/index.css";
import "./Clock.css";

const Clock = ({ countdownDate }) => {
  return countdownDate ? (
    <FlipClockCountdown
      className="flip-clock"
      duration={0.5}
      to={new Date().getTime() + 24 * 3600 * 1000 + 5000}
    />
  ) : null;
};

export default Clock;
