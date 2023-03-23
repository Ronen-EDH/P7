export function fetchNow() {
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello");
    }, 1000);
  });
}
