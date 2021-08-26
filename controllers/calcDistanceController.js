const axios = require("axios");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
const key = process.env.KEY;

const getCoords = catchAsync(async (req, res, next) => {
  const address1 = req.body.address1;
  const address2 = req.body.address2;
  await axios({
    method: "GET",
    url: `http://dev.virtualearth.net/REST/v1/Locations/${address1}?o=json&key=${key}`,
  }).then((result) => {
    if (result.data.resourceSets[0].resources[0]) {
      req.body.firstAddress =
        result.data.resourceSets[0].resources[0].point.coordinates;
    } else {
      throw new AppError(`Cannot find address: ${address1}`, 400);
    }
    // result.data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates;
  });
  await axios({
    method: "GET",
    url: `http://dev.virtualearth.net/REST/v1/Locations/${address2}?o=json&key=${key}`,
  }).then((result) => {
    if (result.data.resourceSets[0].resources[0]) {
      req.body.secondAddress =
        result.data.resourceSets[0].resources[0].point.coordinates;
    } else {
      throw new AppError(`Cannot find address: ${address2}`, 400);
    }
    // result.data?.resourceSets[0]?.resources[0]?.geocodePoints[0]?.coordinates;
  });

  next();
});
const getDistance = catchAsync(async (req, res, next) => {
  const [lat0, long0] = req.body.firstAddress;
  console.log(req.body.firstAddress);
  console.log(req.body.secondAddress);
  const [lat1, long1] = req.body.secondAddress;

  const result = await axios({
    method: "POST",
    url: `https://dev.virtualearth.net/REST/v1/Routes/DistanceMatrix?key=${key}`,
    data: {
      origins: [
        {
          latitude: lat0,
          longitude: long0,
        },
        {
          latitude: lat1,
          longitude: long1,
        },
      ],
      travelMode: "walking",
    },
  });
  res.status(200).json({
    status: "success",
    results: {
      distance:
        result.data.resourceSets[0].resources[0].results[1].travelDistance * 1,
    },
  });
});

module.exports = { getDistance, getCoords };
