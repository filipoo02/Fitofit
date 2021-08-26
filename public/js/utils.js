export const checkAddressFormat = (address) => {
  const [street, city, country] = address.trim().split(",");
  if (street && city && country) {
    return true;
  } else {
    return false;
  }
};
export const replacePlChars = (word) => {
  // ą, ć, ę, ł, ń, ó, ś, ź, ż
  const arrayChars = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];
  const arrayPlChars = ["ą", "ć", "ę", "ł", " ń", "ó", "ś", "ź", "ż"];
  let newWord = word.trim().toLowerCase();
  arrayPlChars.forEach((letter, index) => {
    newWord = newWord.replaceAll(letter, arrayChars[index]);
  });
  return newWord;
};
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
