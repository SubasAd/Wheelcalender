import icsToJson from 'ics-to-json';

const convert = () => {
  // Read ICS file from local storage
  const icsData = localStorage.getItem('icsFile');

  if (icsData) {
    // Convert ICS data to JSON
    const data = icsToJson(icsData);
    return data;
  } else {
    console.error('ICS file not found in local storage');
    return null;
  }
};