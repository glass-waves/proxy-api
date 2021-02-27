require('dotenv').config();
const geoData = require('../data/geo-data.js')
const weatherData = require('../data/weather-data.js');
const reviewData = require('../data/yelp-data.js')
const trailData = require('../data/trail-data.js')
const { formatLocation, formatWeather, parseReviewData, parseParkData } = require('../data/dataUtils');

test('returns first city formatted correctly', async () => {

    const expectation = {
        formatted_query: 'Portland, Multnomah County, Oregon, USA',
        latitude: '45.5202471',
        longitude: '-122.6741949'
    }

    const data = formatLocation(geoData)

    expect(data).toEqual(expectation);
});

test('returns first 7 days of forecast formatted correctly', async () => {

    const expectation = [
        { forecast: 'Scattered clouds', time: 'Tue May 05 2020' },
        { forecast: 'Light snow', time: 'Wed May 06 2020' },
        { forecast: 'Few clouds', time: 'Thu May 07 2020' },
        { forecast: 'Few clouds', time: 'Fri May 08 2020' },
        { forecast: 'Broken clouds', time: 'Sat May 09 2020' },
        { forecast: 'Overcast clouds', time: 'Sun May 10 2020' },
        { forecast: 'Overcast clouds', time: 'Mon May 11 2020' }
    ];


    const data = formatWeather(weatherData)

    expect(data).toEqual(expectation);
});



test('returns first 7 restaurant reviews', async () => {



    const expectation = [
        {
            name: 'Luc Lac',
            image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/azr6sD6VeJbdaiO2aKvSsw/o.jpg',
            price: '$$',
            rating: 4,
            url: 'https://www.yelp.com/biz/luc-lac-portland-7?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        },
        {
            name: 'Screen Door',
            image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/lqmMYlLRV-aoH73koWA6Ew/o.jpg',
            price: '$$',
            rating: 4.5,
            url: 'https://www.yelp.com/biz/screen-door-portland?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        },
        {
            name: 'Q Restaurant & Bar',
            image_url: 'https://s3-media2.fl.yelpcdn.com/bphoto/jAH0XyZe5N8YTrOy71SuJg/o.jpg',
            price: '$$',
            rating: 4.5,
            url: 'https://www.yelp.com/biz/q-restaurant-and-bar-portland?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        },
        {
            name: 'Voodoo Doughnut - Old Town',
            image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/qHrzQy5ih2Sjhn7MdsCASw/o.jpg',
            price: '$',
            rating: 3.5,
            url: 'https://www.yelp.com/biz/voodoo-doughnut-old-town-portland-2?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        },
        {
            name: 'Andina Restaurant',
            image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/Ij9yv97Ch6NwKhNdpezRhw/o.jpg',
            price: '$$$',
            rating: 4.5,
            url: 'https://www.yelp.com/biz/andina-restaurant-portland?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        },
        {
            name: 'Salt & Straw',
            image_url: 'https://s3-media1.fl.yelpcdn.com/bphoto/r6y-0Q2z3cnx1bQKxn-iHw/o.jpg',
            price: '$$',
            rating: 4.5,
            url: 'https://www.yelp.com/biz/salt-and-straw-portland-2?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        },
        {
            name: 'Lechon',
            image_url: 'https://s3-media4.fl.yelpcdn.com/bphoto/wxLJSjqdB0v3wZSRqyNweg/o.jpg',
            price: '$$',
            rating: 4.5,
            url: 'https://www.yelp.com/biz/lechon-portland?adjust_creative=PMWzz5uxRXaL4DS7OGdcyw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=PMWzz5uxRXaL4DS7OGdcyw'
        }
    ];


    const data = parseReviewData(reviewData)

    expect(data).toEqual(expectation);
});
test('parses park data into desired format', async () => {



    const expectation = [
        {
            "name": "California National Historic Trail",
            "location": "CA,CO,ID,KS,MO,NE,NV,OR,UT,WY",
            "stars": "N/A",
            "star_votes": "N/A",
            "summary": "Follow in the footsteps of over 250,000 emigrants who traveled to the gold fields and rich farmlands of California during the 1840s and 1850s: the greatest mass migration in American history. The California National Historic Trail is over 5,000 miles long and covers portions of 10 states. Step into history along more than 1,000 miles of ruts and traces from travelers and their overland wagons.",
            "trail_url": "https://www.nps.gov/cali/index.htm",
            "conditions": "Due to the length of the California National Historic Trail, be sure to consult local weather sources for the region you'll be visiting. Check out the forecast with the National Weather Service and search for the area you'd like to visit: www.weather.gov",
            "condition_date": "lat:42.3999643979285, long:-108.702415369046",
            "condition_time": "B39C368F-CB27-49EC-B2A9-E6C1552430FB"
        }
    ];


    const data = parseParkData(trailData)

    expect(data).toEqual(expectation);
});



