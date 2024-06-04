import icsToJson from 'ics-to-json'
 
// Get ICS text however you like, example below
// Make sure you have the right CORS settings if needed
const convert = async (fileLocation) => {
    const icsRes = await fetch(fileLocation)
    const icsData = await icsRes.text()
    // Convert
    const data = icsToJson(icsData)
    return data
}