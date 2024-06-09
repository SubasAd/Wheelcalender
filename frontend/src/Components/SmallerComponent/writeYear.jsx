import { config } from './create3DArray';

export function writeYear(centerX, centerY, ctx, year = "२०८१") {

	const fontSize = config.font_size;
	ctx.font = `${fontSize}px Arial`;
	ctx.fillStyle = "purple";
	ctx.textAlign = "center";
	ctx.textBaseline = "middle";
	ctx.save();


	ctx.translate(centerX, centerY);
	ctx.fillText(year, 0, 0);

	ctx.restore();

}
