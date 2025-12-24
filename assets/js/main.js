// for filter events in events.html 
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

// for contact form validation in contact.html
document.getElementById("contactForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  let name = document.getElementById("name").value;
  let email = document.getElementById("email").value;

  let alertBox = document.getElementById("alertBox");

  if(name === "" || email === ""){
    alertBox.innerHTML = "<div class='alert alert-danger'>يرجى تعبئة الحقول</div>";
  } else {
    alertBox.innerHTML = "<div class='alert alert-success'>تم الإرسال بنجاح</div>";
  }
});
