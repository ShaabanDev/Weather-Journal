/* Global Variables */
const basURL = "https://api.openweathermap.org/data/2.5/weather?";
const apiKey = "9c0aa596028b81d969c100c3e866ccc0";

const zip = document.getElementById("zip");
const generateButton = document.getElementById("generate");
const dateTime = document.getElementById("date");
const temp = document.getElementById("temp");
const areaName = document.getElementById("area-name");
const content = document.getElementById("content");
const feelings = document.getElementById("feelings");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() +1+ "." + d.getDate() + "." + d.getFullYear();

// getting data from open weather map website
const getDataFromOpenWeather = async () => {
  const response = await fetch(
    basURL + "zip=" + zip.value.trim() + "&appid=" + apiKey + "&units=metric"
  ).then((response) => response.json());

  return response;
};

// post data to the local server
const postDataToLocalServer = async (response) => {
  await fetch("/get-weather", {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      temperature: response.main != undefined ? response.main.temp : "",
      date: newDate,
      userResponse: feelings.value,
      code: response.cod,
      name:response.name !=undefined?response.name:'',
    }),
  });
};

// fetch data from the local server

const fetchData = async () => {
  return await fetch("/get-weather").then((response) => response.json());
};

// update the ui elements
const updateUI = (result) => {

  if (result.code === 200) {
    areaName.innerHTML = `<p>${result.name}</p>`;
    temp.innerHTML =`<p>Temperature : ${result.temperature}  </p>` ;
    dateTime.innerHTML = `<p>Date : ${result.date}  </p>`;
    content.innerHTML = `<p>Feelings : ${result.userResponse}  </p>`;
  }
};

// generate function

const generate = async () => {
  if (zip.value === "") {
    return window.alert("Please Enter The Zip Code");
  } else if (!Number.isInteger(parseInt(zip.value))) {
    return window.alert("Please Enter Right Zip Code");
  }
  const response = await getDataFromOpenWeather();

  await postDataToLocalServer(response)
    .then(() => {
      return fetchData();
    })
    .then((result) => {
      updateUI(result);
    });
};
// add the event listener to the button
generateButton.addEventListener("click", generate);
