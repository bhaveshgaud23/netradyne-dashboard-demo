const firstNames = [
  "Rahul",
  "Amit",
  "Sneha",
  "Karthik",
  "Arjun",
  "Rohit",
  "Priya",
  "Vikram",
  "Neha",
  "Aditya",
];

const lastNames = [
  "Sharma",
  "Verma",
  "Reddy",
  "Iyer",
  "Das",
  "Patel",
  "Singh",
  "Kulkarni",
];

const fleetVehicles = [
  { vehicleNumber: "MH12AB1234", vin: "VIN100001" },
  { vehicleNumber: "MH14CD5678", vin: "VIN100002" },
  { vehicleNumber: "MH20EF9012", vin: "VIN100003" },
  // { vehicleNumber: "MP09GH3456", vin: "VIN100004" },
  // { vehicleNumber: "MP04IJ7890", vin: "VIN100005" },
  // { vehicleNumber: "MH31KL2468", vin: "VIN100006" },
  // { vehicleNumber: "MP20MN1357", vin: "VIN100007" },
  // { vehicleNumber: "MH43OP8642", vin: "VIN100008" },
  // { vehicleNumber: "MP15QR9753", vin: "VIN100009" },
  // { vehicleNumber: "MH49ST1122", vin: "VIN100010" },
];

const locations = [
  // -------- Maharashtra --------
  {
    state: "Maharashtra",
    city: "Mumbai",
    address: "Bandra Kurla Complex",
    postalCode: "400051",
    latitudeBase: 19.076,
    longitudeBase: 72.8777,
  },
  {
    state: "Maharashtra",
    city: "Pune",
    address: "Hinjewadi IT Park",
    postalCode: "411057",
    latitudeBase: 18.5204,
    longitudeBase: 73.8567,
  },
  {
    state: "Maharashtra",
    city: "Nagpur",
    address: "Sitabuldi",
    postalCode: "440012",
    latitudeBase: 21.1458,
    longitudeBase: 79.0882,
  },

  // -------- Madhya Pradesh --------
  {
    state: "Madhya Pradesh",
    city: "Indore",
    address: "Vijay Nagar",
    postalCode: "452010",
    latitudeBase: 22.7196,
    longitudeBase: 75.8577,
  },
  {
    state: "Madhya Pradesh",
    city: "Bhopal",
    address: "MP Nagar",
    postalCode: "462011",
    latitudeBase: 23.2599,
    longitudeBase: 77.4126,
  },
  {
    state: "Madhya Pradesh",
    city: "Jabalpur",
    address: "Napier Town",
    postalCode: "482001",
    latitudeBase: 23.1815,
    longitudeBase: 79.9864,
  },
];

// const randomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
const randomItem = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)];
};
const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

// ----------------------------------------------------
// Intelligent Speed & G Force Logic
// ----------------------------------------------------

// ---------------------------------------------
// OFFICIAL NETRADYNE SEVERITY CLASSIFICATION
// ---------------------------------------------
const severityBuckets = {
  "ALERT (SEVERE)": [
    "Collision Warning",
    "Potential Collision",
    "Driver Drowsiness",
    "Driver Distraction",
    "Traffic Light Violation",
    "Railroad Crossing",
    "High-G",
    "Low Impact",
    "Hard Braking",
    "Hard Acceleration",
    "Relative Speeding",
    "Speeding Violations",
    "Camera Obstruction",
  ],

  "WARN (MODERATE)": [
    "Following Distance",
    "Hard Turn",
    "Weaving",
    "Swerve",
    "U-Turn",
    "Sign Violations",
    "No Trucks Sign Violations",
    "Seatbelt Compliance",
    "Face Mask Compliance",
    "Driver-initiated",
  ],

  "DRIVER-STAR": ["DriverStar"],

  NEUTRAL: ["Neutral Events", "Error Events", "Requested Video"],
};

// Map severity text → numeric value
const severityValueMap = {
  "ALERT (SEVERE)": 1,
  "WARN (MODERATE)": 2,
  "DRIVER-STAR": 3,
  NEUTRAL: 4,
};

const generateMetrics = (type) => {
  switch (type) {
    case "High-G":
      return {
        maxGForce: parseFloat((Math.random() * 3 + 3).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 80 + 40).toFixed(1)),
      };

    case "Hard Braking":
      return {
        maxGForce: parseFloat((Math.random() * 2 + 2).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 60 + 30).toFixed(1)),
      };

    case "Collision Warning":
    case "Potential Collision":
      return {
        maxGForce: parseFloat((Math.random() * 4 + 2).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 90 + 50).toFixed(1)),
      };

    case "Driver Drowsiness":
    case "Driver Distraction":
      return {
        maxGForce: parseFloat((Math.random() * 1).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 70 + 20).toFixed(1)),
      };

    default:
      return {
        maxGForce: parseFloat((Math.random() * 2).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 100).toFixed(1)),
      };
  }
};

// ----------------------------------------------------
// MAIN GENERATOR
// ----------------------------------------------------
const generateRandomTimestamp = (monthsBack = 0) => {
  const now = new Date();

  const startDate = new Date();
  startDate.setMonth(startDate.getMonth() - monthsBack);

  const startTime = startDate.getTime();
  const endTime = now.getTime();

  return Math.floor(Math.random() * (endTime - startTime) + startTime);
};

const generateRandomAlert = (monthsBack = 0, severityFilter = null) => {
  const randomTimestamp = generateRandomTimestamp(monthsBack);

  // ---------------------------------
  // Determine allowed severities
  // ---------------------------------
  let allowedSeverities = Object.keys(severityBuckets);

  if (severityFilter) {
    allowedSeverities = allowedSeverities.filter(
      (s) => s.toUpperCase() === severityFilter.toUpperCase(),
    );
  }

  if (allowedSeverities.length === 0) {
    allowedSeverities = Object.keys(severityBuckets);
  }

  const selectedSeverity = randomItem(allowedSeverities);
  const type = randomItem(severityBuckets[selectedSeverity]);

  const metrics = generateMetrics(type);
  const selectedVehicle = randomItem(fleetVehicles);
  const selectedLocation = randomItem(locations);

  const latitude = selectedLocation.latitudeBase + (Math.random() - 0.5) * 0.02;
  const longitude =
    selectedLocation.longitudeBase + (Math.random() - 0.5) * 0.02;

  return {
    gpsData: [
      {
        latitude,
        longitude,
        timestamp: randomTimestamp,
      },
    ],

    videos: [
      {
        id: randomNumber(1000000000, 9999999999),
        position: 1,
        status: 1,
        timestamp: randomTimestamp,
      },
    ],

    updatedOn: randomTimestamp,

    vehicle: {
      vehicleNumber: selectedVehicle.vehicleNumber,
      vin: selectedVehicle.vin,
    },

    webhookType: "alert",
    duration: randomNumber(1, 20),
    tenantName: "NETRADYNE",

    driver: {
      firstName: randomItem(firstNames),
      lastName: randomItem(lastNames),
      driverId: `DR${randomNumber(1000, 9999)}`,
    },

    details: {
      severity: severityValueMap[selectedSeverity],
      severityDescription: selectedSeverity,
      confidence: parseFloat(Math.random().toFixed(2)),
      typeDescription: type,
      alertVideoStatus: 2,
      subTypeDescription: "Auto Generated Event",
      categoryDescription: "Auto Classified",
      weatherPrediction: randomItem(["Clear", "Rainy", "Foggy", "Sunny"]),

      location: {
        address: selectedLocation.address,
        city: selectedLocation.city,
        country: "India",
        postalCode: selectedLocation.postalCode,
        state: selectedLocation.state,
      },

      maxGForce: metrics.maxGForce,
      maxVehicleSpeed: metrics.maxVehicleSpeed,
      pointOfImpact: randomItem(["Front", "Rear", "Left", "Right"]),
    },

    camera: {
      id: `CAM${randomNumber(1000, 9999)}`,
    },

    timestamp: randomTimestamp,
    status: randomItem(["CONFIRMED", "PENDING_REVIEW"]),
  };
};

module.exports = generateRandomAlert;
