import axios from "axios";

export const insertNewWalk = async (data) => {
  const results = await axios({
    method: "POST",
    url: "/api/v1/users/walk",
    data,
  });
  return results;
};
