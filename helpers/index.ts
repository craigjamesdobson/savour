const removeProtocolFromUrl = (url: string) => {
  // Remove "http://" or "https://" from the beginning of the URL
  return url.replace(/^(https?:\/\/)?/, "");
};

const fetchCurrentDay = () => {
  var currentDate = new Date();

  var currentDay = currentDate.getDay();

  var daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[currentDay];
};

export { removeProtocolFromUrl, fetchCurrentDay };
