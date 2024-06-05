import React, { useState, useEffect, useRef } from 'react';
import fetchICSData from "../utils/reader"; // Assuming you have an ICS data reader function
import NepaliDate from 'nepali-date';


export default function Wheel() {
  const finalFormattedDates = useRef(null);
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
		formatDates(fetchedDates, fetchedEvents);
		
  
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

	try {
	// Initialize a 2D array to hold the formatted dates, each sub-array represents a month with up to 35 entries
	const formattedDates = Array.from({ length: 4 }, () =>
		Array.from({ length: 12 }, () => Array(35).fill(null))
	  );
	let errorCountDates = 0;
	let errorCountEvents = 0;
  
	// Helper function to convert Gregorian date to Nepali date and return relevant info
	const convertToNepaliDate = (gregorianDateString) => {
	  const year = parseInt(gregorianDateString.slice(0, 4));
	  const month = parseInt(gregorianDateString.slice(4, 6)) ;
	  const day = parseInt(gregorianDateString.slice(6, 8));
	  const nepaliDate = new NepaliDate(new Date(year, month, day));
	  
	if (month === 0){
		console.log("ZERO month")

	}
	const bj ={

		date: nepaliDate,
		year: nepaliDate.getYear(),
		month: nepaliDate.getMonth() ,
		day: nepaliDate.getDay(), // Nepali dates are 1-indexed, array is 0-indexed
		
	  }
	   
	  return bj;
	};
	// Flatten the dates and events arrays
	let yearLists = [];
	function handleYear(year) {
		const yearIndex = yearLists.indexOf(year);
		if (yearIndex !== -1) {
		  // Year exists in yearLists
		  return yearIndex;
		} else {
		  
		  // Add the year to yearLists
		  yearLists.push(year);
		  console.log(yearLists)
		  const newIndex = yearLists.indexOf(year);
		  if (yearLists.length > 4) {
			return "Maximum length reached";
		  }
		  return newIndex;
		}
	  }
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
  
		const { year,date, month, day } = convertToNepaliDate(dateEnglish);
		
		  const year_index_to = handleYear(year,);
	
		  formattedDates[year_index_to][month][day] = {
			"n_date": date.format('YYYY-MM-DD'),
			"e_date": dateEnglish,
			"n_day":event["SUMMARY"],
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
  
		const {year, date, month, day } = convertToNepaliDate(dateEnglish);
		const year_index_to = handleYear(year);
		
		  
		if (formattedDates[year_index_to][month][day] === null) {
		  formattedDates[month][day] = {
			"n_date": date.format('YYYY-MM-DD'),
			"events": [event.SUMMARY], //one day could have several special days
		  };
		  errorCountEvents++;
		} else if (formattedDates[year_index_to][month][day].events) {
		  formattedDates[year_index_to][month][day].events.push(event.SUMMARY);
		} else {
		  formattedDates[year_index_to][month][day].events = [event.SUMMARY];
		}
		
	});
  
	console.log("Date Errors:", errorCountDates);
	console.log("Event Errors:", errorCountEvents);
	finalFormattedDates.current = formattedDates;
	console.log(finalFormattedDates.current);
			
} catch (error) {
	console.log(error)		
}

  };
  
  const createTable = (monthData, index) => {
	// Create a table for each month
	const weeks = [];
	let week = [];
	let counter = 0;
  
	// Skip the first element (0) and start from the second element (1)
	for (let i = 0; i < monthData.length; i++) {
	  const day = monthData[i];
	  week.push(<td key={i}>{day ? day.n_day : ''}</td>);
	  counter++;
  
	  // After every 7 days (a week), add the week to the weeks array and reset the week
	  if (counter === 7) {
		weeks.push(<tr key={i}>{week}</tr>);
		week = [];
		counter = 0;
	  }
	}
  
	// Add the remaining days of the last week
	if (week.length > 0) {
	  weeks.push(<tr key={weeks.length}>{week}</tr>);
	}
  
	return (
	  <div key={index}>
		<h2>Month {index + 1}</h2>
		<table>
		  <thead>
			<tr>
			  <th>Sun</th>
			  <th>Mon</th>
			  <th>Tue</th>
			  <th>Wed</th>
			  <th>Thu</th>
			  <th>Fri</th>
			  <th>Sat</th>
			</tr>
		  </thead>
		  <tbody>{weeks}</tbody>
		</table>
	  </div>
	);
  };
  return (
    <div>
      {isLoading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error fetching data: {error.message}</p>
      ) : (
				<div>
					{finalFormattedDates.current?.map((yeardata)=> yeardata.map((monthData, index) => createTable(monthData, index)))}
			  </div>
			
			)
		}
    </div>
  );
}
