import axios from 'axios';

const url = ''
  
export const getPlacesData = async(type,sw,ne) => {
    try {
        if(!type) type = 'restaurants'
        const {data : { data }} = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng
            },
            headers: {
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
              'x-rapidapi-key': '3133ceb1fbmsha91a50c37f2de10p173a58jsnf8a5af448b89'
            }
          });
        return data 
    } catch(error){
        console.log(error)
    }
}