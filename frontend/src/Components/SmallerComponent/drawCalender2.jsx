export function drawCalender2(i, angleIncrement, centerX, radii, centerY, innermost_radii, ctx) {
	const angle = (i * angleIncrement) * (Math.PI / 180); 

	const startX = centerX + radii[0] * Math.cos(angle); // r2
	const startY = centerY + radii[0] * Math.sin(angle); // r2

	const endX = centerX + innermost_radii * Math.cos(angle); // r8
	const endY = centerY + innermost_radii * Math.sin(angle); // r8
	console.log(endX,endY)
	console.log(centerX,centerY)
	
	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(endX, endY);
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 1;
	ctx.stroke();
	return angle;
}
