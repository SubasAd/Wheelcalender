export function findEventsByMonth(month, events) {

	try {
		return events[month];


	} catch (error) {
		return [];
	}
}
