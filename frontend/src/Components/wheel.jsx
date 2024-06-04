import React, { useState, useEffect } from 'react';
import fetchICSData from "../utils/reader"; // Assuming you have an ICS data reader function

export default function Wheel() {
  const [dates, setDates] = useState([]);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const storedDates = localStorage.getItem("dates_");
        const storedEvents = localStorage.getItem("events_");

        if (storedDates && storedEvents) {
			console.error("loaded from  local:");
          setDates(JSON.parse(storedDates));
          setEvents(JSON.parse(storedEvents));
        } else {
          const fetchedDates = await fetchICSData(true);
          const fetchedEvents = await fetchICSData(false);
          setDates(fetchedDates);
          setEvents(fetchedEvents);

          localStorage.setItem("dates_", JSON.stringify(fetchedDates));
          localStorage.setItem("events_", JSON.stringify(fetchedEvents));
		  console.error("saved in local:");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);


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
