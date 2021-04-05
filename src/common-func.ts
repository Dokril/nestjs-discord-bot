export const randomInteger = function (min: number, max: number): number {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
