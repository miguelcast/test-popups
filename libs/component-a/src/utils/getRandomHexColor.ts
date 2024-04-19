export function getRandomHexColor() {
  const randomHex = Math.floor(Math.random() * 16777215).toString(16);
  return '#' + '0'.repeat(6 - randomHex.length) + randomHex;
}
