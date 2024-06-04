import icsToJson from 'ics-to-json'; // Assuming ics-to-json is a mock or imported correctly

jest.mock('ics-to-json'); // Mock the icsToJson function

describe('ICS to JSON conversion', () => {
  it('converts valid ICS data to JSON', async () => {
    const mockIcsData = `BEGIN:VCALENDAR
VERSION:2.0
... (other valid ICS data)
END:VCALENDAR`; // Replace with a valid ICS sample

    // Mock the fetch response to return the mock ICS data
    icsToJson.mockResolvedValueOnce(JSON.parse(mockIcsData));

    const fileLocation = 'src/ics_folder/Nepali Events.ics'; // Replace with a valid URL or file path

    const convertedData = await convert(fileLocation);

    expect(icsToJson).toHaveBeenCalledWith(mockIcsData); // Assert that icsToJson was called with the fetched data
    expect(convertedData).toBeInstanceOf(Object); // Assert the returned data is an object
    // Add more assertions based on the expected structure of the converted JSON data
  });

  it('throws an error for invalid ICS data or network issues', async () => {
    const fileLocation = 'https://example.com/invalid-ics-file.ics'; // Replace with an invalid URL or simulate network error

    // Mock fetch to throw an error
    icsToJson.mockRejectedValueOnce(new Error('Network error or invalid ICS data'));

    await expect(convert(fileLocation)).rejects.toThrowError('Network error or invalid ICS data');
  });
});
