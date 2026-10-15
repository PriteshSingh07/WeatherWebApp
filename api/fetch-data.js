export default async function handler (req, res){
    const api = process.env.API_KEY;

    const baseCity = req.query.city || 'kolkata'

    if(!api){
        throw new Error("No API KEY")
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?&units=metric&q=${baseCity}&appid=${api}`)

        const data = await response.json()
        
        if(data.cod == "404"){
            // return res.status(404).json(data)
            return res.status(404).json(data)
        }

        // const data = await response.json()
    
        return res.status(200).json(data)
    } catch (error) {
        throw new Error('Fetching weather data failed')
    }
    
}