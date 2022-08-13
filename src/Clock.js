import FlipCountdown from "@rumess/react-flip-countdown";

const Clock = ( { clockTime } ) => (
  <FlipCountdown
    titlePosition="top" // Options (Default: top): top, bottom.
    endAt={clockTime} // Date/Time
  />
);

export default Clock;