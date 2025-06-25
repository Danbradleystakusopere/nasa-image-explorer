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
    const favoriteBtn = document.getElementById("favoriteBtn");

  favoriteBtn.addEventListener("click", () => {
    const title = document.getElementById("title").textContent;
    const date = document.getElementById("date").textContent;
    const imageUrl = document.getElementById("image").src;

    if (!title || !imageUrl) {
      alert("No image to favorite yet.");
      return;
    }

    const favorite = {
      title,
      date,
      imageUrl
    };

    localStorage.setItem("favoriteImage", JSON.stringify(favorite));
    alert("Image saved to favorites!");
  });


