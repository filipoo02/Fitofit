import "@babel/polyfill";

import { modalStats } from "./modalStats";
import { insertNewWalk } from "./insertWalk";
import { showAlert } from "./alert";

const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const submitBtn = document.querySelector(".submit-addrs-btn");
const detailsBtn = document.querySelector(".modal-stats");
const addrCalcForm = document.querySelector(".form-calc-dist");

const characters = `[&\\\#+!@^()$~=-_%.';":*?<>{}]`;

if (detailsBtn) modalStats();

if (addrCalcForm) {
  address1.addEventListener("keydown", (e) => {
    if (characters.includes(e.key)) e.preventDefault();
  });

  address2.addEventListener("keydown", (e) => {
    if (characters.includes(e.key)) e.preventDefault();
  });

  submitBtn.addEventListener("click", (e) => {
    const firstAddress = address1.value;
    const secondAddress = address2.value;

    showAlert("loading", "Loading...");
    insertNewWalk({ firstAddress, secondAddress });
  });
}
