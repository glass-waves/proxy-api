const formatLocation = (locData) => {
    const firstCity = locData[0];
    return {
        formatted_query: firstCity.display_name,
        latitude: firstCity.lat,
        longitude: firstCity.lon
    }
}

const formatWeather = (weatherData) => {

    const dataArr = weatherData.data;
    const mungedDataArr = dataArr.map(day => {
        const correctDate = new Date(day.ts * 1000).toDateString();
        return {
            forecast: day.weather.description,
            time: correctDate 
        }
    })
    return mungedDataArr.slice(0, 7);
}

const parseReviewData = (reviewData) => {
    const parsedData = reviewData.map(business => {
        return {
            name: business.name,
            image_url: business.image_url,
            price: business.price,
            rating:business.rating,
            url: business.url,
        }
    })
    return parsedData.slice(0,7);
}

const parseStateData = (stateData) => {
    return stateData.address.state_code;
}

const parseParkData = (parkData) => {
    parkData.map(park => {
        
    })
}


module.exports = {formatLocation, formatWeather, parseReviewData, parseStateData};