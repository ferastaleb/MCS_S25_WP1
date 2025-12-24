document.getElementById("categoryFilter")?.addEventListener("change", function () {
  let value = this.value;
  let events = document.querySelectorAll(".event-item");

  events.forEach(event => {
    if (value === "all" || event.dataset.category === value) {
      event.style.display = "block";
    } else {
      event.style.display = "none";
    }
  });
});
