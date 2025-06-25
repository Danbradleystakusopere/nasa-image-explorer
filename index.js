document.addEventListener("DOMContentLoaded", () => {
  const fetchBtn = document.getElementById("fetchBtn");
  const dateInput = document.getElementById("dateInput");
  const favoriteBtn = document.getElementById("favoriteBtn");
  const saveNoteBtn = document.getElementById("saveNoteBtn");
  const noteText = document.getElementById("noteText");
  const favoritesList = document.getElementById("favoritesList");

  let currentImage = {};

  console.log("NASA Image Explorer is ready.");

  
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
        currentImage = {
          title: data.title,
          date: data.date,
          imageUrl: data.url,
          explanation: data.explanation
        };

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

  
  favoriteBtn.addEventListener("click", () => {
    if (!currentImage.imageUrl) {
      alert("No image to favorite yet.");
      return;
    }

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites.push(currentImage);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    alert("Image saved to favorites!");
    renderFavorites();
  });

  
  saveNoteBtn.addEventListener("click", () => {
    const note = noteText.value.trim();
    if (!note || !currentImage.date) {
      alert("Please load an image and write a note.");
      return;
    }

    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    notes[currentImage.date] = note;
    localStorage.setItem("notes", JSON.stringify(notes));
    noteText.value = "";
    alert("Note saved!");
    renderFavorites(); 
  });

  
  function renderFavorites() {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const notes = JSON.parse(localStorage.getItem("notes")) || {};
    favoritesList.innerHTML = "";

    favorites.forEach((item) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>${item.title}</strong> (${item.date})<br/>
        <img src="${item.imageUrl}" alt="${item.title}" width="200"/><br/>
        <em>Note: ${notes[item.date] || "No note added."}</em>
        <hr/>
      `;
      favoritesList.appendChild(li);
    });
  }

  renderFavorites(); 
});
