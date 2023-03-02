- set up the api key for the weather app

- create an event listener for the function that will begin the search 
$("#cat-button").on("click", function() {

- create a varible to store that api key 
var queryURL

- use the ajax method using GET to get the data needed from the api key
$.ajax({
        url: queryURL,
        method: "GET"
      })

- create and store the 5 day weather forcast using some sort of tag? maybe a container one? for example 
var catImage = $("<img>");


//search button being clicked
$('#search-button').on('click', function(event){
    event.preventDefault()
    //store the city name into variable
    cityInput = $('#search-input')
})




//search button being clicked
$('#search-button').on('click', function(event){
    event.preventDefault()
    //store the city name into variable
    cityName = $('#search-input')
})


//button function
$(document).ready(function (){

})

API_KEY = "50d14b542a99d05eeb69480ad6afefb4