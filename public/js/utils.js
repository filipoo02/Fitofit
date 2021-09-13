// --------------------------- FORMAT DATE ---------------------------
function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

export const formatDate = ({
  dataInput,
  returnTime = false,
  returnDate = false,
  returnBoth = true,
  inputIsDateFormat = false,
  minusTwoHours = false,
}) => {
  let milisec = 0;
  if (!inputIsDateFormat) {
    milisec = new Date(dataInput).getTime();
    if (minusTwoHours) milisec = milisec - 7200000;
  } else {
    milisec = dataInput.getTime();
  }
  returnBoth = returnTime || returnDate ? false : true;
  let data = new Date(milisec);
  let month = addZero(data.getMonth() + 1);
  let year = data.getFullYear();
  let day = addZero(data.getDate());
  let date = `${year}/${month}/${day}`;
  let hours = addZero(data.getHours());
  let minutes = addZero(data.getMinutes());
  let seconds = addZero(data.getSeconds());
  let miliSeconds = data.getMilliseconds();
  let time = `${hours}:${minutes}:${seconds}:${miliSeconds}`;
  if (returnBoth) return `${date}, ${time}`;
  if (returnTime) return `${time}`;
  if (returnDate) return `${date}`;
};

// --------------------------- ROUND NUMBER ---------------------------
export const round = (num) => {
  return Math.round(num * 100) / 100;
};
