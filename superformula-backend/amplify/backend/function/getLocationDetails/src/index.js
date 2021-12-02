/* Amplify Params - DO NOT EDIT
	ENV
	REGION
	MAPBOX_API_ACCESS_TOKEN
	MAPBOX_API_URL
Amplify Params - DO NOT EDIT */

const axios = require('axios')

exports.handler = async (event) => {
  const { MAPBOX_API_URL, MAPBOX_API_ACCESS_TOKEN } = process.env;

  const { address } = event.arguments;
  const apiURL = `${MAPBOX_API_URL}/mapbox.places/${address}.json?access_token=${MAPBOX_API_ACCESS_TOKEN}`;

  try {
    const response = await axios.get(apiURL);
    const [longitude, latitude] = response.data?.features?.[0].center || [];
    return { longitude, latitude };
  } catch (error) {
    return `Failed to fetch location data: ${error}`;
  }
}