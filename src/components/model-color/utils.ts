/**
 * It takes a hexadecimal color string and returns an array of three numbers representing the red,
 * green, and blue values of the color
 * @param {string} hex - The hexadecimal color value to convert to RGB.
 * @returns An array of three numbers, each representing the red, green, and blue values of the hex
 * color.
 */
export const hexToRgb = (hex: string): [number, number, number] => {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
}

/**
 * It takes an array of three numbers, representing the red, green, and blue values of a color, and
 * returns either 'black' or 'white' depending on whether the color is light or dark
 * @param rgb - [number, number, number]
 * @returns A function that takes in an array of 3 numbers and returns a string.
 */
export const setForegroundColor = (rgb: [number, number, number]) =>{
  var sum = Math.round(((rgb[0] * 299) + (rgb[1] * 587) + (rgb[2] * 114)) / 1000);
  return (sum > 180) ? 'black' : 'white';
}
