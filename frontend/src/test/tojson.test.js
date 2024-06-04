
import fetchICSData from "../utils/reader";
jest.mock('ics-to-json'); // Mock the icsToJson function


describe('ICS to JSON conversion', () => {
  it('converts valid ICS data to JSON', async () => {
    

    const convertedData = await fetchICSData();
	console.log(convertedData);

  });


});
