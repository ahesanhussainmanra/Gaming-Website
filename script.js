document.querySelectorAll(".card").forEach(card => {
  card.addEventListener("mouseover", () => {
    card.style.transform = "scale(1.1)";
  });

  card.addEventListener("mouseout", () => {
    card.style.transform = "scale(1)";
  });
});