import { config } from './create3DArray';

export function getCanvasValues(canvas) {
	const centerX = canvas.width / 2;
	const centerY = canvas.height / 2;

	const separation = config.separation;
	const initialRadius = centerX - config.initialRadius;

	const numCircles = 8;
	//			decrease separation geometrically.
	const radii = Array.from({ length: numCircles }, (_, index) => initialRadius - separation * index);


	const colors = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3', '#8B4513']; // Different colors
	const widths = [5, 2, 2, 2, 2, 2, 2, 2]; // Widths for each circle

	const nepMonthToEng = [
		"Apr/May",
		"May/Jun",
		"Jun/Jul",
		"Jul/Aug",
		"Aug/Sep",
		"Sep/Oct",
		"Oct/Nov",
		"Nov/Dec",
		"Dec/Jan",
		"Jan/Feb",
		"Feb/Mar",
		"Mar/Apr",
	];
	return { radii, centerX, centerY, colors, widths, separation, nepMonthToEng };
}
