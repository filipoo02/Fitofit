import axios from "axios";

export const getDistance = async (address1, address2) => {
  const results = await axios({
    method: "POST",
    url: "/api/v1/distance",
    data: {
      address1,
      address2,
    },
  });

  return results;
};
