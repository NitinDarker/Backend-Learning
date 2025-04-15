function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer); // reset the timer if called again
    timer = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

function handleSearch(e) {
  console.log("API Call for:", e.target.value);
}

const debouncedSearch = debounce(handleSearch, 300);

document
  .getElementById("searchInput")
  .addEventListener("input", debouncedSearch);
