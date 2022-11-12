import axios from 'axios';

export const getPlacesData = async (type, sw, ne) => {
  try {
    //request
    const {
      data: { data }
    } = await axios.get(
      `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
      {
        params: {
          bl_latitude: sw.lat,
          tr_latitude: ne.lat,
          bl_longitude: sw.lng,
          tr_longitude: ne.lng
        },
        headers: {
          'X-RapidAPI-Key':
            '02e8113f17msh7a075a43feeae72p14edeejsn75e92671fd57',
          'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
        }
      }
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};
