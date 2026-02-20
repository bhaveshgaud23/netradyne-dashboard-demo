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
// REALISTIC ALERT DEFINITIONS (Fixed Severity + Category)
// ----------------------------------------------------
const alertDefinitions = {
  "SIGN-VIOLATIONS": {
    category: "Safety Alert",
    severity: "WARN",
    severityValue: 1,
  },
  "DRIVER-DROWSINESS": {
    category: "Driver Monitoring",
    severity: "CRITICAL",
    severityValue: 3,
  },
  "NO-TRUCKS-SIGN-VIOLATIONS": {
    category: "Safety Alert",
    severity: "WARN",
    severityValue: 1,
  },
  "ERROR-EVENTS": {
    category: "System Alert",
    severity: "INFO",
    severityValue: 0,
  },
  "RELATIVE-SPEEDING": {
    category: "Driving Behavior",
    severity: "WARN",
    severityValue: 1,
  },
  WEAVING: {
    category: "Driving Behavior",
    severity: "MODERATE",
    severityValue: 2,
  },
  "RAILROAD-CROSSING": {
    category: "Safety Alert",
    severity: "CRITICAL",
    severityValue: 3,
  },
  "DRIVER-DISTRACTION": {
    category: "Driver Monitoring",
    severity: "CRITICAL",
    severityValue: 3,
  },
  "HARD-TURN": {
    category: "Driving Behavior",
    severity: "MODERATE",
    severityValue: 2,
  },
  "COLLISION-WARNING": {
    category: "Collision Alert",
    severity: "CRITICAL",
    severityValue: 3,
  },
  "CAMERA-OBSTRUCTION": {
    category: "System Alert",
    severity: "WARN",
    severityValue: 1,
  },
  "SPEEDING-VIOLATIONS": {
    category: "Driving Behavior",
    severity: "WARN",
    severityValue: 1,
  },
  SWERVE: {
    category: "Driving Behavior",
    severity: "MODERATE",
    severityValue: 2,
  },
  "DRIVER-INITIATED": {
    category: "Driver Monitoring",
    severity: "INFO",
    severityValue: 0,
  },
  "FACE-MASK-COMPLIANCE": {
    category: "Driver Monitoring",
    severity: "WARN",
    severityValue: 1,
  },
  "TRAFFIC-LIGHT-VIOLATION": {
    category: "Safety Alert",
    severity: "CRITICAL",
    severityValue: 3,
  },
  "HARD-BRAKING": {
    category: "Driving Behavior",
    severity: "MODERATE",
    severityValue: 2,
  },
  "U-TURN": {
    category: "Driving Behavior",
    severity: "WARN",
    severityValue: 1,
  },
  "SEATBELT-COMPLIANCE": {
    category: "Driver Monitoring",
    severity: "WARN",
    severityValue: 1,
  },
  "HARD-ACCELERATION": {
    category: "Driving Behavior",
    severity: "MODERATE",
    severityValue: 2,
  },
  "FOLLOWING-DISTANCE": {
    category: "Distance Compliance",
    severity: "WARN",
    severityValue: 1,
  },
  "HIGH-G": {
    category: "Driving Behavior",
    severity: "CRITICAL",
    severityValue: 3,
  },
  "DRIVER-STAR": {
    category: "Driver Performance",
    severity: "INFO",
    severityValue: 0,
  },
  "LOW-IMPACT": {
    category: "Collision Alert",
    severity: "MODERATE",
    severityValue: 2,
  },
  "POTENTIAL-COLLISION": {
    category: "Collision Alert",
    severity: "CRITICAL",
    severityValue: 3,
  },
};

// ----------------------------------------------------
// Intelligent Speed & G Force Logic
// ----------------------------------------------------
const generateMetrics = (type) => {
  switch (type) {
    case "HIGH-G":
      return {
        maxGForce: parseFloat((Math.random() * 3 + 3).toFixed(2)), // 3–6G
        maxVehicleSpeed: parseFloat((Math.random() * 80 + 40).toFixed(1)),
      };

    case "HARD-BRAKING":
      return {
        maxGForce: parseFloat((Math.random() * 2 + 2).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 60 + 30).toFixed(1)),
      };

    case "COLLISION-WARNING":
    case "POTENTIAL-COLLISION":
      return {
        maxGForce: parseFloat((Math.random() * 4 + 2).toFixed(2)),
        maxVehicleSpeed: parseFloat((Math.random() * 90 + 50).toFixed(1)),
      };

    case "DRIVER-DROWSINESS":
    case "DRIVER-DISTRACTION":
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

const generateRandomAlert = (monthsBack = 0) => {
  const randomTimestamp = generateRandomTimestamp(monthsBack);
  const type = randomItem(Object.keys(alertDefinitions));
  const alertMeta = alertDefinitions[type];
  const metrics = generateMetrics(type);

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
      vehicleNumber: `DL0${randomNumber(1, 9)}AB${randomNumber(1000, 9999)}`,
      vin: `VIN${randomNumber(100000, 999999)}`,
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
      severity: alertMeta.severityValue,
      confidence: parseFloat(Math.random().toFixed(2)),
      cause: randomNumber(1, 5),
      typeId: randomNumber(1, 30),
      typeDescription: type,
      alertVideoStatus: 2,
      severityDescription: alertMeta.severity,
      category: randomNumber(1, 5),
      subTypeDescription: "Auto Generated Event",
      categoryDescription: alertMeta.category,
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
