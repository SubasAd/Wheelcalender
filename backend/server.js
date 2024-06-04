


// From JSON to ical

import fs from 'fs';
import path from 'path';
import express from 'express';
import ical2json from "ical2json";
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

const convert = async () => {
  try {
    // Get the absolute path of the ICS file
    const icsFilePath = path.join(path.resolve(),'ics_folder', 'Nepali Events.ics');
    // Read the ICS file data
    const icsFileData = fs.readFileSync(icsFilePath, 'utf8');
    // Convert ICS data to JSON
	
// From ical to JSON
	var jsonData = ical2json.convert(icsFileData);	
    //const jsonData = icsToJson(icsFileData);
    return jsonData;
  } catch (error) {
    console.error('Error parsing ICS data:', error);
    return null;
  }
};

app.get('/get_json',async (req, res) => {
  const jsonData = await convert();
  if (jsonData) {
    res.json(jsonData);
  } else {
    res.status(500).json({ error: 'Failed to parse ICS data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});