// API Key and baseURL

const apiKey = '&appid=fd3b8e623e6b404f3f9ef2e2d9d6018e&units=metric';
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';


// Get date

let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// Get UI elements by id 

const generate = document.getElementById('generate');

// add eventListener to content 

generate.addEventListener('click', generateWeather);

// Create the function generate weather using nested promises

function generateWeather(e) {
    let zip = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    getWeather(apiUrl, zip, apiKey)
        .then(function(dataW) {
            console.log(dataW);
            postData('/weather', {
                    name: dataW.name,
                    mainly: dataW.weather[0].main,
                    date: newDate,
                    temp: dataW.main.temp,
                    feelings: feelings,
                })
                // .then(() => {
                //     getData('/all')
                // })
                .then(() => {
                    updateUI()
                });
        });

}

// Get the data from weather api 

const getWeather = async(apiUrl, zip, apiKey) => {

    const response = await fetch(apiUrl + zip + apiKey);

    try {
        const dataW = await response.json();
        console.log(dataW);
        return dataW;
    } catch (error) {
        console.log("error", error);
    }
};

// POST ROUTE 

const postData = async(url = '', data = {}) => {
    // console.log(data);
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        const newData = await response.json();
        console.log(newData);
        return newData;
    } catch (error) {
        console.log("error", error);
    }
}

// GET ROUT

const getData = async(url = '') => {

    const request = await fetch(url);

    try {
        const all = await request.json();
        // console.log(all);
        // return all;
    } catch (error) {
        console.log("error", error);
    }
};

// Update the UI

const updateUI = async() => {

    const request = await fetch('/all');

    try {
        const allData = await request.json();
        document.getElementById('name').innerHTML = 'Weather in ' + allData['name'];
        document.getElementById('mainly').innerHTML = 'Mainly ' + allData['mainly'];
        document.getElementById('date').innerHTML = 'Date: ' + allData['date'];
        document.getElementById('temp').innerHTML = allData['temp'] + '°C';
        document.getElementById('content').innerHTML = 'I feel ' + allData['feelings'];

    } catch (error) {
        console.log("error", error);
    }
};