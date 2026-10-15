export default async function handler (req, res){
    const api = process.env.API_KEY;
    const baseCity = req.query.city || 'kolkata';

    if (!api) {
        return res.status(500).json({ error: "No API KEY configured" });
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&q=${baseCity}&appid=${api}`);
        
        const data = await response.json();

        // OpenWeatherMap returns cod as a string (e.g., "404") or number (404) for errors
        if (data.cod != 200) {
            return res.status(Number(data.cod) || 400).json({ 
                error: data.message || 'City not found' 
            });
        }
    
        // Return the successful weather data with a 200 status
        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json({ error: 'Fetching weather data failed' });
    }
}