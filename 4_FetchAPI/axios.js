await fetch("https://example.com/api", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    name: "Nitin",
    job: "Engineer",
  }),
});
