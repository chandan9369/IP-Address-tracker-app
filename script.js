const ipInput = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const res = document.querySelector(".res");
const resItemText = document.querySelectorAll(".res-text");

const map = L.map("map");
const setMap = (lat, lng) => {
  map.setView([lat, lng], 13);

  const locationIcon = L.icon({
    iconUrl: "images/icon-location.svg",

    iconSize: [40, 50], // size of the icon
    iconAnchor: [20, 50], // point of the icon which will correspond to marker's location
  });

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker([lat, lng], { icon: locationIcon }).addTo(map);
};

// function to set the data on the window
const getLocation = async (ip) => {
  if (ip === undefined) {
    return;
  }
  const res = await fetch(
    `https://geo.ipify.org/api/v1?apiKey=at_DZ1VdYQwNiUJXhND5O2Y3DSM6qDyt&domain=${ip}`
  );
  const result = await res.json();
  let resIp = result.ip;
  let region = result.location.region;
  let city = result.location.city;
  let timeZone = result.location.timezone;
  let isp = result.isp;
  let lat = result.location.lat;
  let lng = result.location.lng;
  // setting the data
  resItemText[0].innerText = resIp;
  resItemText[1].innerText = `${city},${region}`;
  resItemText[2].innerText = timeZone;
  resItemText[3].innerText = isp;

  // pointing the location to the map
  setMap(lat, lng);
};

window.addEventListener("load", () => {
  setMap(25.44478, 81.84322);
  getLocation();
});

ipInput.addEventListener("change", () => {
  let ip = ipInput.value;
  getLocation(ip);
  ipInput.value = "";
});

searchBtn.addEventListener("click", () => {
  res.classList.toggle("active");
});
