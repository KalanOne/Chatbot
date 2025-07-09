export { getRandomInt };

function getRandomInt(min: number, max: number) {
  // Retorna entero aleatorio en [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
