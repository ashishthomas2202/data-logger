export default function TimeAgo({ timestamp, shortHand = false }) {
  const now = new Date();
  const pastDate = new Date(timestamp); // Make sure 'timestamp' is in the right format to be parsed
  const secondsPast = (now - pastDate) / 1000; // Convert milliseconds to seconds

  if (secondsPast < 60) {
    return <span>Just now</span>;
  } else if (secondsPast < 3600) {
    return (
      <span>
        {Math.floor(secondsPast / 60)} {shortHand ? "mins" : "minutes"} ago
      </span>
    );
  } else if (secondsPast < 86400) {
    return (
      <span>
        {Math.floor(secondsPast / 3600)} {shortHand ? "hrs" : "hours"} ago
      </span>
    );
  } else if (secondsPast < 604800) {
    return <span>{Math.floor(secondsPast / 86400)} days ago</span>;
  } else if (secondsPast < 2592000) {
    return (
      <span>
        {Math.floor(secondsPast / 604800)} {shortHand ? "wks" : "weeks"} ago
      </span>
    );
  } else if (secondsPast < 31536000) {
    return (
      <span>
        {Math.floor(secondsPast / 2592000)} {shortHand ? "mos" : "months"} ago
      </span>
    );
  } else {
    return (
      <span>
        {Math.floor(secondsPast / 31536000)} {shortHand ? "yrs" : "years"} ago
      </span>
    );
  }
}
