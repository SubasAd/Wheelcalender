

import fs from 'fs';
import path from 'path';
import express from 'express';
import ical2json from "ical2json";
import cors from 'cors';

const app = express();
app.use(cors());
const PORT = 5000;

const convertEvents = async (for_date) => {
  try {
    // Get the absolute path of the ICS file
	var icsFilePath = "";
	if (for_date){
		icsFilePath = path.join(path.resolve(),'ics_folder', 'events1.ics');
	}else{

		icsFilePath = path.join(path.resolve(),'ics_folder', 'Nepali Events.ics');
	}
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


app.get('/get_events',async (req, res) => {
  const jsonData = await convertEvents();
  jsonData = jsonData['0']['VEVENT']
  if (jsonData) {
    res.json(jsonData);
  } else {
    res.status(500).json({ error: 'Failed to parse ICS data' });
  }
});

app.get('/get_dates',async (req, res) => {
	let jsonData = await convertEvents(true);
  jsonData = jsonData['0']
	if (jsonData) {
	  res.json(jsonData);
	} else {
	  res.status(500).json({ error: 'Failed to parse ICS data' });
	}
  });

app.get('/get_color',async (req,res)=>{
  fs.readFile('ics_folder/dat.json',(err,data)=>{
    if(err) res.json(err)
      else{
    res.json(JSON.parse(data))
      }
  })
})
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});