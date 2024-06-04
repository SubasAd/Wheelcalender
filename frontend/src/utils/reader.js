export default async function fetchICSData(for_dates=false) {
	try {
		var response = null;
		if (for_dates){
			response = await fetch('http://localhost:5000/get_dates');
		}else{

			response = await fetch('http://localhost:5000/get_events');
		}

	  // Check for successful response
	  if (!response.ok) {
		throw new Error(`Error fetching data: ${response.status}`);
	  }
	  const data = await response.json();
	  return data;
	} catch (error) {
	  console.error('Error fetching data:', error);
	  return null; // Or handle the error differently (e.g., throw it again)
	}
  }
  