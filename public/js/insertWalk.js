import axios from "axios";
import { showAlert } from "./alert";

export const insertNewWalk = async (data) => {
  try {
    const results = await axios({
      method: "POST",
      url: "/api/v1/distance/insert",
      data,
    });

    if (results.data.status === "success") {
      showAlert("success", results.data.message);
    }
  } catch (error) {
    showAlert("error", error.response.data.message);
  }

  return results;
};
