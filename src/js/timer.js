function set_cookie(name, value, days) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
}
  
function get_cookie(name) {
  const value = '; ' + document.cookie;
  const parts = value.split('; ' + name +'=');
  if (parts.length === 2) return parts.pop().split(";").shift();
}
  
function write_timer(elements, time) {
  var seconds = (time % 60).toString().padStart(2, "0");
  var minutes = Math.floor(time / 60 % 60).toString().padStart(2, "0");
  var hours = Math.floor(time / 60 / 60).toString().padStart(2, "0");
  for (let element of elements) {
      if (element.getElementsByClassName('seconds').length && element.getElementsByClassName('minutes').length) {
        element.getElementsByClassName('seconds')[0].innerHTML = seconds;
        element.getElementsByClassName('minutes')[0].innerHTML = minutes;
        if (element.getElementsByClassName('hours').length)
          element.getElementsByClassName('hours')[0].innerHTML = hours;
      } else element.innerHTML = (hours == '00' ? '' : (hours + ':')) + minutes + ':' + seconds;
  }
}
  
export function start_timer(className) {
  let oldHour = parseInt(document.querySelector(".hours").getAttribute("data-hours"), 10);
  let oldMins = parseInt(document.querySelector(".minutes").getAttribute("data-minutes"), 10);
  let oldSecs = parseInt(document.querySelector(".seconds").getAttribute("data-seconds"), 10);

  let totalTime;
  let resetTime = (oldHour * 3600) + (oldMins * 60) + oldSecs;
  if (get_cookie("time")) {
    totalTime = parseInt(get_cookie("time"), 10);
  } else {
    totalTime = (oldHour * 3600) + (oldMins * 60) + oldSecs;
  };
  let elements = document.getElementsByClassName(className);
  write_timer(elements, totalTime);
  const timerInterval = setInterval(() => {
      write_timer(elements, totalTime);
      set_cookie("time", --totalTime, 1);
      if (totalTime < 0) {
      totalTime = resetTime;
      write_timer(elements, totalTime);
      set_cookie("time", --totalTime, 1);
      }
    }, 1000);
  };