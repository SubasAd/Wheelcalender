export function drawWeek(centerX, radii, weekAngle, centerY, ctx) {
	const weekStartX = centerX + radii[1] * Math.cos(weekAngle); // r2
	const weekStartY = centerY + radii[1] * Math.sin(weekAngle); // r2
	const weekEndX = centerX + radii[7] * Math.cos(weekAngle); // r8
	const weekEndY = centerY + radii[7] * Math.sin(weekAngle); // r8

	ctx.beginPath();
	ctx.moveTo(weekStartX, weekStartY);
	ctx.lineTo(weekEndX, weekEndY);
	ctx.strokeStyle = 'gray';
	ctx.lineWidth = 1;
	ctx.stroke();
}
