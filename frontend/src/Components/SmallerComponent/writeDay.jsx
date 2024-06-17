export function writeDay(ctx, centerX, centerY, dayAngleIncrement, radii, given_week, dayAngle, day_text,color="black") {

	const start_angle = dayAngle;
	const fontSize = 50;
	ctx.font = `${fontSize}px Arial, Helvetica, Verdana`;
ctx.fillStyle = color;
ctx.textAlign = "center";
ctx.textBaseline = "middle";

	
	ctx.save();

	const rad_increment = dayAngleIncrement * (Math.PI / 180);
	const mid_radii = (radii[given_week] + radii[given_week + 1]) / 2;
	const m_centerX = centerX + mid_radii * Math.cos(start_angle - rad_increment + rad_increment / 2); // r2
	const m_centerY = centerY + mid_radii * Math.sin(start_angle - rad_increment + rad_increment / 2); // r2

	let angle = Math.atan2(m_centerY - centerY, m_centerX - centerX);
	ctx.translate(m_centerX, m_centerY);
	ctx.rotate(Math.PI / 2 + angle)
	if(color.trim()=="green"){
		 
		 // Draw the text
		 ctx.font = '45px Arial, Helvetica, Verdana';
		 ctx.fillText(day_text, -ctx.measureText(day_text).width / 2, 0);

		 // Draw the icon
		 ctx.font = '25px Arial, Helvetica, Verdana';
		 ctx.fillText("🖎", ctx.measureText(day_text).width / 2, 0);
	}
	else{
	ctx.font = `50px Arial, Helvetica, Verdana`;
	
		ctx.fillText(day_text, 0, 0);
	}
	;
	ctx.restore();



}
