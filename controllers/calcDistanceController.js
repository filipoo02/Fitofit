const axios = require("axios");
const AppError = require("../utils/AppError");
const { catchAsync } = require("../utils/catchAsync");
const key = process.env.KEY;

const isAddrFormat = (addr) => {
  const splited = addr.trim().split(",");
  if (splited.slice(3)[0]) {
    return false;
  }
  const [street, city, country] = splited;
  if (street && city && country) {
    return true;
  } else {
    return false;
  }
};

const getCoordsFromAddr = async (addr) => {
  let coords;

  await axios({
    method: "GET",
    url: `http://dev.virtualearth.net/REST/v1/Locations/${addr}?o=json&key=${key}`,
  }).then((result) => {
    if (result.data.resourceSets[0].resources[0]) {
      coords = result.data.resourceSets[0].resources[0].point.coordinates;
    } else {
      throw new AppError(`Cannot find address: ${addr}`, 400);
    }
  });

  return coords;
};

const getCoords = catchAsync(async (req, res, next) => {
  const firstAddr = req.body.firstAddress;
  const secondAddr = req.body.secondAddress;

  if (!isAddrFormat(firstAddr) || !isAddrFormat(secondAddr)) {
    return next(new AppError("Invalid address format!", 404));
  }

  req.body.firstAddrCords = await getCoordsFromAddr(firstAddr);
  req.body.secondAddrCords = await getCoordsFromAddr(secondAddr);

  next();
});

const getDistance = catchAsync(async (req, res, next) => {
  const [lat0, long0] = req.body.firstAddrCords;
  const [lat1, long1] = req.body.secondAddrCords;

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

  let distance =
    result.data.resourceSets[0].resources[0].results[1].travelDistance * 1;

  distance = Math.round(distance * 100) / 100;

  // update travel distance for user
  //

  res.status(200).json({
    status: "success",
    results: {
      distance,
    },
  });
});

module.exports = { getDistance, getCoords };
