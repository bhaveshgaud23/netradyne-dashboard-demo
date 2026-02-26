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
 
// ---------------------------------------------
// OFFICIAL NETRADYNE SEVERITY CLASSIFICATION
// ---------------------------------------------
const alertConfig = {
  "Collision Warning": {
    severity: "ALERT",
    severityValue: 1,
    category: "Collision Alert",
  },
 
  "Potential Collision": {
    severity: "ALERT",
    severityValue: 1,
    category: "Collision Alert",
  },
 
  "Driver Drowsiness": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driver Monitoring",
  },
 
  "Driver Distraction": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driver Monitoring",
  },
 
  "Traffic Light Violation": {
    severity: "ALERT",
    severityValue: 1,
    category: "Safety Alert",
  },
 
  "Railroad Crossing": {
    severity: "ALERT",
    severityValue: 1,
    category: "Safety Alert",
  },
 
  "High-G": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driving Behavior",
  },
 
  "Low Impact": {
    severity: "ALERT",
    severityValue: 1,
    category: "Collision Alert",
  },
 
  "Hard Braking": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driving Behavior",
  },
 
  "Hard Acceleration": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driving Behavior",
  },
 
  "Relative Speeding": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driving Behavior",
  },
 
  "Speeding Violations": {
    severity: "ALERT",
    severityValue: 1,
    category: "Driving Behavior",
  },
 
  "Camera Obstruction": {
    severity: "ALERT",
    severityValue: 1,
    category: "System Alert",
  },
 
  "Following Distance": {
    severity: "WARN",
    severityValue: 2,
    category: "Driving Behavior",
  },
 
  "Hard Turn": {
    severity: "WARN",
    severityValue: 2,
    category: "Driving Behavior",
  },
 
  Weaving: {
    severity: "WARN",
    severityValue: 2,
    category: "Driving Behavior",
  },
 
  Swerve: {
    severity: "WARN",
    severityValue: 2,
    category: "Driving Behavior",
  },
 
  "U-Turn": {
    severity: "WARN",
    severityValue: 2,
    category: "Driving Behavior",
  },
 
  "Sign Violations": {
    severity: "WARN",
    severityValue: 2,
    category: "Safety Alert",
  },
 
  "No Trucks Sign Violations": {
    severity: "WARN",
    severityValue: 2,
    category: "Safety Alert",
  },
 
  "Seatbelt Compliance": {
    severity: "WARN",
    severityValue: 2,
    category: "Driver Monitoring",
  },
 
  "Face Mask Compliance": {
    severity: "WARN",
    severityValue: 2,
    category: "Driver Monitoring",
  },
 
  "Driver-initiated": {
    severity: "WARN",
    severityValue: 2,
    category: "Driver Monitoring",
  },
 
  DriverStar: {
    severity: "DRIVER-STAR",
    severityValue: 3,
    category: "Driver Performance",
  },
 
  "Neutral Events": {
    severity: "NEUTRAL",
    severityValue: 4,
    category: "System Event",
  },
 
  "Error Events": {
    severity: "NEUTRAL",
    severityValue: 4,
    category: "System Alert",
  },
 
  "Requested Video": {
    severity: "NEUTRAL",
    severityValue: 4,
    category: "System Event",
  },
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
 
  let availableTypes = Object.keys(alertConfig);
 
  // Filter by severity if provided
  if (severityFilter) {
    availableTypes = availableTypes.filter((type) =>
      alertConfig[type].severity
        .toUpperCase()
        .includes(severityFilter.toUpperCase()),
    );
  }
 
  if (availableTypes.length === 0) {
    availableTypes = Object.keys(alertConfig);
  }
 
  const type = randomItem(availableTypes);
  const config = alertConfig[type];
 
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
      severity: config.severityValue,
      severityDescription: config.severity,
      cause: randomNumber(1, 5),
      typeId: randomNumber(1, 50),
      category: randomNumber(1, 5),
      subTypeDescription: "Auto Generated Event",
      categoryDescription: config.category,
      typeDescription: type,
      confidence: parseFloat(Math.random().toFixed(2)),
      alertVideoStatus: 2,
      maxGForce: metrics.maxGForce,
      maxVehicleSpeed: metrics.maxVehicleSpeed,
      location: {
        address: selectedLocation.address,
        city: selectedLocation.city,
        country: "India",
        postalCode: selectedLocation.postalCode,
        state: selectedLocation.state,
      },
    },
 
    camera: {
      id: `CAM${randomNumber(1000, 9999)}`,
    },
 
    timestamp: randomTimestamp,
    status: randomItem(["CONFIRMED", "PENDING_REVIEW"]),
  };
};
 
module.exports = generateRandomAlert;
 
 