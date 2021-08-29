const modal = document.querySelector(".modal");
import axios from "axios";
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
    // formatDate({ dataInput: new Date(v.dateOfActivity), returnDate: true })
    await axios({
      method: "GET",
      url: "/api/v1/statistics/week/sum/byday",
    }).then((val) => {
      val.data.results.forEach((v) => {
        table += `<tr><td>${v.distance}</td><td>${v.dateOfActivity}</td></tr>`;
      });
    });
    table += "</table>";
    modal.innerHTML = table;
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
