function getRandomColor() {
  // Generate random RGB values
  var red = Math.floor(Math.random() * 256);
  var green = Math.floor(Math.random() * 256);
  var blue = Math.floor(Math.random() * 256);

  // Convert RGB to hexadecimal format
  var hexRed = red.toString(16).padStart(2, '0');
  var hexGreen = green.toString(16).padStart(2, '0');
  var hexBlue = blue.toString(16).padStart(2, '0');

  // Return the color in hexadecimal format
  return '#' + hexRed + hexGreen + hexBlue;
}

export default getRandomColor;
