import { create3DArray } from './create3DArray';

export function drawStructureOfCalender(ctx, canvas, radii, centerX, centerY, colors, widths, separation) {
	let array = create3DArray();
	// Clear the canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);

	// Draw circles
	radii.forEach((radius, index) => {
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
		ctx.strokeStyle = colors[index];
		ctx.lineWidth = widths[index];
		ctx.stroke();
	});

	//innermost radii
	const innermost_radii = radii[7] - separation * 8;
	ctx.beginPath();
	ctx.arc(centerX, centerY, innermost_radii, 0, 2 * Math.PI);
	ctx.strokeStyle = colors[0];
	ctx.lineWidth = widths[0];
	ctx.stroke();
	return { innermost_radii, array };
}
