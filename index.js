const resultsElem = document.querySelector(".resultsTemp").innerHTML; //reference script
const resultsTemplate = Handlebars.compile(resultsElem); //compile script
const results = document.querySelector(".results");
const generateButton = document.getElementById("generate")
const makeValue = document.getElementById("make");
const colorValue = document.getElementById("color");
const reg_numberValue = document.getElementById("RegNum");
const priceValue = document.getElementById("price");


document.addEventListener('DOMContentLoaded', function () {

    var carsElem = document.querySelector('.cars');

    fetch("https://api-tutor.herokuapp.com/v1/cars")
        .then(function (response) {
            return response.json();
        })
        .then(function (carData) {
            var apiResults = resultsTemplate({ "results": carData });
            results.innerHTML = apiResults;

        })
        .catch(function (err) {
            carsElem.innerHTML = err;
            carsElem.style.backgroundColor = 'Crimson';

        })


});

const filterByMake = (make) => {
    axios.get(`https://api-tutor.herokuapp.com/v1/cars/make/${make}`)
        .then((response) => {
            const res = resultsTemplate({"results": response.data});
            results.innerHTML = res
        });
}

const filterByPrice = (price) => {
    axios.get(`https://api-tutor.herokuapp.com/v1/cars/price/${price}`)
        .then((response) => {
            const res = resultsTemplate({"results": response.data});
            results.innerHTML = res
        });
}

const filterByRegNo = (regNo) => {
    axios.get(`https://api-tutor.herokuapp.com/v1/cars/reg_number/${regNo}`)
        .then((response) => {
    
            const res = resultsTemplate({"results": response.data});
            results.innerHTML = res
        });
}


const filterByColor = (color) => {
    axios.get(`https://api-tutor.herokuapp.com/v1/cars/color/${color}`)
    .then((response) => {
        const res = resultsTemplate({"results": response.data});
        results.innerHTML = res
    });
}

const filterByMakeAndColor = (make, color) => {
    axios.get(`https://api-tutor.herokuapp.com/v1/cars/make/${make}/color/${color}`)
    .then((response) => {
        const res = resultsTemplate({"results": response.data});
        results.innerHTML = res
    });
}


generateButton.addEventListener("click",() =>{
    if (makeValue.value && colorValue.value ) {
        filterByMakeAndColor(makeValue.value, colorValue.value)
    } else if(makeValue.value){
        filterByMake(makeValue.value)
    }else if(colorValue.value){
        filterByColor(colorValue.value)
    }else if (reg_numberValue.value) {
       filterByRegNo(reg_numberValue.value)
    }
console.log(makeValue.value);
console.log(colorValue.value);
console.log(priceValue.value);

})

