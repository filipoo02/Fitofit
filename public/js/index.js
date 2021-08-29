import "@babel/polyfill";

import { modalStats } from "./modalStats";
const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const submitBtn = document.querySelector(".submit-addrs-btn");
const characters = `[&\\\#+!@^()$~=-_%.';":*?<>{}]`;
const detailsBtn = document.querySelector(".modal-stats");
import { submitAddresses } from "./submitAddresses";
const addrCalcForm = document.querySelector(".form-calc-dist");
if (detailsBtn) modalStats();

if (addrCalcForm) {
  address1.addEventListener("keydown", (e) => {
    if (characters.includes(e.key)) e.preventDefault();
  });

  address2.addEventListener("keydown", (e) => {
    if (characters.includes(e.key)) e.preventDefault();
  });
  submitBtn.addEventListener("click", submitAddresses);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") submitAddresses();
  });
}
