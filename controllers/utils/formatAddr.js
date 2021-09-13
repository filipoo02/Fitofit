const AppError = require("../../utils/AppError");

const replacePlChars = (word) => {
  // ą, ć, ę, ł, ń, ó, ś, ź, ż
  const arrayChars = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];
  const arrayPlChars = ["ą", "ć", "ę", "ł", " ń", "ó", "ś", "ź", "ż"];
  let newWord = word.trim().toLowerCase();
  arrayPlChars.forEach((letter, index) => {
    const reg = new RegExp(letter, "g");
    newWord = newWord.replace(reg, arrayChars[index]);
  });
  return newWord;
};

const formatAddr = (addr, next) => {
  if (!addr) next(new AppError(`Please provide two addresses`, 400));

  const splited = addr.split(",").map((e) => e.trim());
  if (splited.slice(3)[0]) {
    next(new AppError(`Invalid address format!`, 400));
  }
  const [street, city, country] = splited;
  // console.log(street);
  if (street && city && country) {
    let address = splited.map((word) => replacePlChars(word)).join(",");
    // let address = splited.join(",");

    return address;
  } else {
    next(new AppError(`Invalid address format!`, 400));
  }
};

module.exports = { formatAddr };
