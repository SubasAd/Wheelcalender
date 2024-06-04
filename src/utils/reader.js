import icsToJson from 'ics-to-json';
import fs from 'fs';
import path from 'path';

const convert = () => {
  try {
    // Get the absolute path of the ICS file
    const icsFilePath = path.join(__dirname, 'src', 'sa.ics');

    // Read the ICS file data
    const icsData = fs.readFileSync(icsFilePath, 'utf8');

    // Convert ICS data to JSON
    const data = icsToJson(icsData);
    return data;
  } catch (error) {
    console.error('Error reading ICS file:', error);
    return null;
  }
};