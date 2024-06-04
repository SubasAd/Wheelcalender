import React, { useState, useEffect } from 'react';
import fetchICSData from "../utils/reader"; // Assuming you have an ICS data reader function
import NepaliDate from 'nepali-date';


export default function Wheel() {
  const [finalFormattedDates, setFormattedDates] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const storedDates = localStorage.getItem("dates_");
        const storedEvents = localStorage.getItem("events_");

		let fetchedDates;
        let fetchedEvents;

        if (storedDates && storedEvents) {
			fetchedDates = JSON.parse(storedDates);
			fetchedEvents = JSON.parse(storedEvents);
		} else {
			fetchedDates = await fetchICSData(true);
			fetchedEvents = await fetchICSData(false);
  
			localStorage.setItem("dates_", JSON.stringify(fetchedDates));
			localStorage.setItem("events_", JSON.stringify(fetchedEvents));
		}
		
		// Use the most recent version of dates and events to format them
		const formatted = formatDates(fetchedDates, fetchedEvents);
		setFormattedDates(formatted);
  
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


const formatDates = (dates, events) => {
	// Initialize a 2D array to hold the formatted dates, each sub-array represents a month with up to 35 entries
	const formattedDates = Array.from({ length: 12 }, () => Array(35).fill(null));
	let errorCountDates = 0;
	let errorCountEvents = 0;
  
	// Helper function to convert Gregorian date to Nepali date and return relevant info
	const convertToNepaliDate = (gregorianDateString) => {
	  const year = parseInt(gregorianDateString.slice(0, 4));
	  const month = parseInt(gregorianDateString.slice(4, 6)) ;
	  const day = parseInt(gregorianDateString.slice(6, 8));
	  const nepaliDate = new NepaliDate(new Date(year, month, day));
	  
	  const dateString = nepaliDate.format('m');
	  // Extract the day part from the formatted string

	  return {
		date: nepaliDate,
		month: nepaliDate.getMonth() ,
		day: nepaliDate.getDate() - 1, // Nepali dates are 1-indexed, array is 0-indexed
		
	  };
	};
	// Flatten the dates and events arrays
	
	// Process dates
	dates = dates["VCALENDAR"][0]["VEVENT"]
	dates.forEach(event => {
	// Process dates
   
		const dateEnglish = event["DTSTART;VALUE=DATE"];
		if (!dateEnglish) {
			errorCountDates++;
			console.log("inalid data dates");
			return;
		  }
  
		const { date, month, day } = convertToNepaliDate(dateEnglish);
		
	
		  formattedDates[month][day] = {
			"n_date": date.format('YYYY-MM-DD'),
			"e_date": dateEnglish,
			"n_day":event["SUMM"],
		  };
	
	});

	// Process events
	events = events["VCALENDAR"][0]["VEVENT"]
	events.forEach(event => {

		const dateEnglish = event["DTSTART;VALUE=DATE"];
		if (!dateEnglish) {
		  errorCountEvents++;
		  return;
		}
  
		const { date, month, day } = convertToNepaliDate(dateEnglish);
  
		if (formattedDates[month][day] === null) {
		  formattedDates[month][day] = {
			"n_date": date.format('YYYY-MM-DD'),
			"events": [event.SUMMARY], //one day could have several special days
		  };
		  errorCountEvents++;
		} else if (formattedDates[month][day].events) {
		  formattedDates[month][day].events.push(event.SUMMARY);
		} else {
		  formattedDates[month][day].events = [event.SUMMARY];
		}
		
	});
  
	console.log("Date Errors:", errorCountDates);
	console.log("Event Errors:", errorCountEvents);
	setFormattedDates(formattedDates);
  };
  

  return (
    <div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
      <p>OKay..</p>
      )}
    </div>
  );
}
