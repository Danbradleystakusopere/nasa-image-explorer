document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetchBtn");
  const dateInput = document.getElementById("dateInput");

  console.log("NASA Image Explorer is ready.");
});
  fetchBtn.addEventListener("click", () => {
    const selectedDate = dateInput.value;

    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }

    const apiKey = "DEMO_KEY"; 
    const url = `https://api.nasa.gov/planetary/apod?date=${selectedDate}&api_key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data); 
        document.getElementById("title").textContent = data.title;
        document.getElementById("date").textContent = data.date;
        document.getElementById("image").src = data.url;
        document.getElementById("image").alt = data.title;
        document.getElementById("explanation").textContent = data.explanation;
      })
      .catch((error) => {
        console.error("Error fetching image:", error);
        alert("Could not load image. Please try again later.");
      });
  });

