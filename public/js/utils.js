import { showAlert } from "./alert";

export const checkAddressFormat = (address) => {
  const splited = address.trim().split(",");
  console.log(splited.slice(3));
  if (splited.slice(3)[0]) {
    console.log("checkaddresformat");
    return false;
  }
  const [street, city, country] = splited;
  console.log(splited);
  if (street && city && country) {
    return true;
  } else {
    return false;
  }
};
const replacePlChars = (word) => {
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

//

const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");

export const resetFieldAddrs = () => {
  address1.value = "";
  address2.value = "";
};

export const inputAdresses = () => {
  if (address1.value && address2.value) {
    return [replacePlChars(address1.value), replacePlChars(address2.value)];
  } else {
    showAlert("error", "You need to pass two addresses!");
    return [false, false];
  }
};
