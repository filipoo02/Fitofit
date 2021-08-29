import "@babel/polyfill";
import { showAlert, hideAlert } from "./alert";
import {
  checkAddressFormat,
  resetFieldAddrs,
  inputAdresses,
  formatDate,
} from "./utils";
import { getDistance } from "./getDistance";
import { insertNewWalk } from "./insertWalk";
import { modalStats } from "./modalStats";
const address1 = document.querySelector("#address1");
const address2 = document.querySelector("#address2");
const submitBtn = document.querySelector(".submit-addrs-btn");
const characters = `[&\\\#+!@^()$~=-_%.';":*?<>{}]`;
const detailsBtn = document.querySelector(".modal-stats");
const distanceValue = document.querySelector(".distance-value");

if (detailsBtn) modalStats();

address1.addEventListener("keydown", (e) => {
  if (characters.includes(e.key)) e.preventDefault();
});

address2.addEventListener("keydown", (e) => {
  if (characters.includes(e.key)) e.preventDefault();
});

submitBtn.addEventListener("click", async (e) => {
  const [address1Value, address2Value] = inputAdresses();

  if (address1Value && address2Value) {
    if (
      !checkAddressFormat(address1Value) ||
      !checkAddressFormat(address2Value)
    ) {
      e.preventDefault();
      showAlert("error", "Please provide right address format!");
    } else if (
      checkAddressFormat(address1Value) &&
      checkAddressFormat(address2Value)
    ) {
      showAlert("loading", "Loading...");

      await getDistance(address1Value, address2Value)
        .then((result) => {
          hideAlert();
          // if (result.status === 200) {
          resetFieldAddrs();
          const distance = result.data.results.distance;
          const objToInsert = {
            distance: result.data.results.distance,
            dateOfActivity: new Date(),
          };
          insertNewWalk(objToInsert).then((res) => {
            // if (res.status === 200) {
            showAlert("success", `${distance} km walk was added!`);
            distanceValue.textContent =
              distanceValue.textContent * 1 + distance * 1;
            // }
          });
          // }
        })
        .catch((err) => {
          hideAlert();
          showAlert("error", err.response.data.message);
        });
    }
  }
});
