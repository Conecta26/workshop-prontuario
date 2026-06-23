const registrationUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfuC7JVK72mfr4aB2aZDk5X_IbRNSQXpQ95G5__HeU089r6ig/viewform";

// Mantém todos os links de inscrição apontando para o formulário oficial.
document.querySelectorAll('a[href*="docs.google.com/forms"]').forEach((link) => {
  link.href = registrationUrl;
});

// Contador regressivo para o início do workshop.
const countdown = document.querySelector("[data-countdown]");

function updateCountdown() {
  if (!countdown) return;

  const targetDate = new Date(countdown.dataset.countdown).getTime();
  const distance = Math.max(0, targetDate - Date.now());
  const day = 1000 * 60 * 60 * 24;
  const hour = 1000 * 60 * 60;
  const minute = 1000 * 60;

  countdown.querySelector("[data-days]").textContent = Math.floor(distance / day);
  countdown.querySelector("[data-hours]").textContent = Math.floor((distance % day) / hour).toString().padStart(2, "0");
  countdown.querySelector("[data-minutes]").textContent = Math.floor((distance % hour) / minute).toString().padStart(2, "0");
  countdown.querySelector("[data-seconds]").textContent = Math.floor((distance % minute) / 1000).toString().padStart(2, "0");
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Copia a chave PIX e dá retorno visual no botão.
const copyPixButton = document.querySelector("[data-copy-pix]");

if (copyPixButton) {
  copyPixButton.addEventListener("click", async () => {
    const pixKey = document.getElementById("pix-key").textContent.trim();
    const originalText = copyPixButton.textContent;

    try {
      await navigator.clipboard.writeText(pixKey);
      copyPixButton.textContent = "Chave copiada";
    } catch {
      copyPixButton.textContent = "PIX: " + pixKey;
    }

    setTimeout(() => {
      copyPixButton.textContent = originalText;
    }, 2200);
  });
}

// Accordion da política de cancelamento.
const accordionTrigger = document.querySelector(".accordion-trigger");

if (accordionTrigger) {
  accordionTrigger.addEventListener("click", () => {
    const content = document.getElementById(accordionTrigger.getAttribute("aria-controls"));
    const isOpen = accordionTrigger.getAttribute("aria-expanded") === "true";

    accordionTrigger.setAttribute("aria-expanded", String(!isOpen));
    content.classList.toggle("open", !isOpen);
  });
}

// Animação suave ao rolar a página.
const revealElements = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.14 });

revealElements.forEach((element) => revealObserver.observe(element));

// Caso as fotos ainda não estejam na pasta assets, mostra um fallback elegante com iniciais.
document.querySelectorAll(".speaker-card img").forEach((image) => {
  const showFallback = () => image.closest(".speaker-card").classList.add("image-missing");

  image.addEventListener("error", () => {
    showFallback();
  });

  if (image.complete && image.naturalWidth === 0) {
    showFallback();
  }
});
