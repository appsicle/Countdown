import moment from "moment";

export const FORMAT = 'YYYY-MM-DD hh:mm:ss';

export const computeCountdownDate = (date, time) => {
  const [hours, minutes] = time.split(":");
  const computedTime = {
    hours: parseInt(hours),
    minutes,
  };
  return moment(date)
    .hours(computedTime.hours)
    .minutes(computedTime.minutes)
};

export const params = new Proxy(new URLSearchParams(window.location.search), {
  get: (searchParams, prop) => searchParams.get(prop),
});

export const setQueryParams = (date, eventName) => {
  const URL_BASE =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname;

  var newurl = URL_BASE + "?date=" + date + '&eventName=' + eventName;
  window.history.pushState({ path: newurl }, "", newurl);
};
