export default async function handler (req, res){
    const api = process.env.API_KEY;

    const baseCity = req.query.city || 'kolkata'

    if(!api){
        throw new Error("No API KEY")
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${baseCity}&appid=${api}`)

        
        
        if(response.status == 404){
            console.log("Api response: ", response);
            // return res.status(400)
        }

        const data = await response.json()
    
        return res.status(200).json(data)
    } catch (error) {
        throw new Error('Fetching weather data failed')
    }
    
}