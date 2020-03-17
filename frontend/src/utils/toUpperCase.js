export function toUpperCase(str = "") {
  let words = str.split(" ");
  words = words.map(item => item.charAt(0).toUpperCase() + item.slice(1));

  return words.join(" ");
}
