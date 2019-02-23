async function getAndSaveData() {
	let data = await fetch('data.json');
	data = await data.json();
	console.log('hey', data)
	localStorage.setItem('cities', JSON.stringify(data));
}

getAndSaveData();
let data = JSON.parse(localStorage.getItem('cities'));

let tempArray = [];

// on search box enter key is pressed
let searchBoxElement = document.querySelector('#searchbox');
searchBoxElement.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		tempArray.splice(0);

		data.forEach((item, index) => {
			if (item.city === searchBoxElement.value && item.date.includes('-06-')) {
				console.log(item.date)
				tempArray.push({x: item.date.substring(0,4), y: item.average_temperature});
			}
		});
		chart.render();
	}


});





	var chart = new CanvasJS.Chart("chartContainer", {
	animationEnabled: true,
	theme: "light2",
	title:{
		text: "June Temperature by Year"
	},
	axisX: {
		minimum: 1850,
		maximum: 2013,
		valueFormatString: "####",
		title: "Year"
	},
	axisY:{
		includeZero: false,
		title: "Temperature in C"
	},
	data: [{        
		type: "area",       
		dataPoints: tempArray
	}]
});
chart.render();
