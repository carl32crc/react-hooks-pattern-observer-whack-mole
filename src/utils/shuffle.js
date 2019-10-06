export function* shuffle(array) {

  let index = array.length;

  while (index--) {
      yield array.splice(Math.floor(Math.random() * (index+1)), 1)[0];
  }
}