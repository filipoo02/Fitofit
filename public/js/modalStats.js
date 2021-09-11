import axios from "axios";
import { showAlert } from "./alert";
const { formatDate } = require("./utils");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalStatsBtn = document.querySelector(".modal-stats");

export const modalStats = () => {
  const hideModal = () => {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  };
  const showModal = () => {
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
  };
  const createTable = async () => {
    let table = `<table><tr>
          <th>Distance (km)</th>
          <th>Date</th>
          </tr>`;
    try {
      const result = await axios({
        method: "GET",
        url: "/api/v1/statistics/weekly/sortDay",
      });

      result.data.weeklyDistance.forEach((v) => {
        table += `<tr><td>${v.distance}</td><td>${formatDate({
          dataInput: new Date(v.dateOfActivity),
          returnDate: true,
        })}</td></tr>`;
      });
      table += "</table>";
      modal.innerHTML = table;
    } catch (error) {
      showAlert("error", error.response.data.message);
    }
  };

  modalStatsBtn.addEventListener("click", (e) => {
    createTable().then((v) => {
      showModal();
    });
  });

  overlay.addEventListener("click", () => {
    if (!overlay.classList.contains("hidden")) {
      hideModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      hideModal();
    }
  });
};
