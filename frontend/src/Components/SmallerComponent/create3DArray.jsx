export const config = {
	width: 3000,
	height: 3000,
	font_size: 40,
	initialRadius: 10,
	separation: 100
};
const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
export const monthNamesNepali = [
	'बैशाख', 'जेठ', 'असार', 'साउन', 'भदौ', 'असोज', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फागुन', 'चैत'
];
export const nepDayNames = ["आइत", "सोम", "मंगल", "बुध", "बिहि", "शुक्र", "शनि"];
const devanagariNumbers = [
    "१", "२", "३", "४", "५", "६", "७", "८", "९", "१०",
    "११", "१२", "१३", "१४", "१५", "१६", "१७", "१८", "१९", "२०",
    "२१", "२२", "२३", "२४", "२५", "२६", "२७", "२८", "२९", "३०",
    "३१", "३२", "३३", "३४", "३५"
];

const date_in_2081 = [31, 32, 31, 32, 31, 30, 30, 30, 29, 30, 29, 31];

function mergeArrays(arr1, arr2) {
    let merged = [];
    for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
        if (arr1[i] !== undefined && arr1[i] !== "") {
            merged[i] = arr1[i];
        } else if (arr2[i] !== undefined && arr2[i] !== "") {
            merged[i] = arr2[i];
        } else {
            merged[i] = "";
        }
    }
    return merged;
}
export function create3DArray() {

const bikramSambatDates = [];
function calculateMonth(i,week_num) {
    let count = 1;

    for (let j = 0; j < 6; j++) {
        bikramSambatDates[i][j] = [];

        for (let k = 0; k < 7; k++) {
            if (k < week_num) {
                bikramSambatDates[i][j][k] = "";
            }
            else if (count <= date_in_2081[i]) {
                bikramSambatDates[i][j][k] = devanagariNumbers[count-1];
                count++;
                week_num = (week_num + 1) % 7;
            }
           else{
			bikramSambatDates[i][j][k] = " ";
		   }

        }
		

    }
	bikramSambatDates[i][0] = mergeArrays(bikramSambatDates[i][0],bikramSambatDates[i][5])
    return week_num
}

let day_counter = 6;
for (let i = 0; i < date_in_2081.length; i++) {
    bikramSambatDates[i] = [];
	
    day_counter = calculateMonth(i,day_counter);
}

console.log(bikramSambatDates)
return bikramSambatDates

}