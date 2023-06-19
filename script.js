const url = 'https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=kolkata';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '0e2dd88649msh73d8e04e2ce0229p167de5jsn3b3375e2950a',
		'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
	}
};
const getWeather=(city)=>{
	cityName.innerHTML =city.toUpperCase();
	fetch(url,options)
	.then(response => response.json())
	.then((response) =>{
		cloud_pct.innerHTML=response.cloud_pct
		temp.innerHTML=response.temp
		feels_like.innerHTML=response.feels_like
		humidity.innerHTML=response.humidity
		min_temp.innerHTML=response.min_temp
		max_temp.innerHTML=response.max_temp
		wind_speed.innerHTML=response.wind_speed
		wind_degrees.innerHTML=response.wind_degrees
		sunrise.innerHTML=response.sunrise
		sunset.innerHTML=response.sunset	
		console.log(response)
	})
	.catch(err => console.log(err))
}
submit.addEventListener("click",(e)=>{
	console.log("i am working")
			getWeather(inputText.value);
});
getWeather("kolkata");