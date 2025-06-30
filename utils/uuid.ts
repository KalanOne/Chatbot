export { generateUUIDv4, getRandomInt };

function generateUUIDv4(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

function getRandomInt(min: number, max: number) {
  // Retorna entero aleatorio en [min, max]
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
