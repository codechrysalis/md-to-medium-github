const englishDict = require("./english-to-morse.json");
const morseDict = require("./morse-to-english.json");

document
  .getElementById("english-to-morse-button")
  .addEventListener("click", function(event) {
    const input = document.getElementById("input-english").value;
    console.log("input:" + input);
    document.getElementById("result").innerHTML = convertEnglish(
      input.toLowerCase()
    );
  });

const convertEnglish = english => {
  let str = "";
  for (char in english) {
    str += englishDict[english[char]] + " ";
    console.log(englishDict[english[char]]);
  }
  return str;
};

document
  .getElementById("morse-to-english-button")
  .addEventListener("click", function(event) {
    let input = document.getElementById("input-morse").value;
    console.log("input:" + input);
    document.getElementById("result").innerHTML = convertMorse(input);
  });

const convertMorse = morse => {
  let str = "";
  morse = morse.split(" ");
  for (char in morse) {
    str += morseDict[morse[char]];
    console.log(morseDict[morse[char]]);
  }
  return str;
};
