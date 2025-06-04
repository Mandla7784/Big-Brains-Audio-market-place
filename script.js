document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const header = document.querySelector("header");
  let mobileMenu;

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", () => {
      toggleMobileMenu();
    });
  }

  function toggleMobileMenu() {
    if (!mobileMenu) {
      createMobileMenu();
    }

    document.body.classList.toggle("mobile-menu-open");
  }

  function createMobileMenu() {
    mobileMenu = document.createElement("div");
    mobileMenu.className = "mobile-menu";

    // Clone navigation links
    const navLinks = document.querySelector(".nav-links").cloneNode(true);
    mobileMenu.appendChild(navLinks);

    // Clone CTA buttons
    const headerCta = document.querySelector(".header-cta").cloneNode(true);
    mobileMenu.appendChild(headerCta);

    // Append to header
    header.appendChild(mobileMenu);

    // Add event listeners to links
    const links = mobileMenu.querySelectorAll("a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("mobile-menu-open");
      });
    });
  }

  // Header scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Testimonial Slider
  const track = document.querySelector(".testimonial-track");
  const slides = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".dot");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  let currentIndex = 0;

  if (track && slides.length > 0) {
    // Set up slider
    function goToSlide(index) {
      if (index < 0) {
        index = slides.length - 1;
      } else if (index >= slides.length) {
        index = 0;
      }

      track.style.transform = `translateX(-${index * 100}%)`;
      currentIndex = index;

      // Update dots
      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === currentIndex);
      });
    }

    // Event listeners
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        goToSlide(currentIndex + 1);
      });
    }

    dots.forEach((dot, i) => {
      dot.addEventListener("click", () => {
        goToSlide(i);
      });
    });

    // Auto slide
    let slideInterval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 5000);

    // Pause on hover
    track.addEventListener("mouseenter", () => {
      clearInterval(slideInterval);
    });

    track.addEventListener("mouseleave", () => {
      slideInterval = setInterval(() => {
        goToSlide(currentIndex + 1);
      }, 5000);
    });
  }

  // Pricing toggle
  const billingToggle = document.getElementById("billing-toggle");
  const priceElements = document.querySelectorAll(".amount");
  const periodElements = document.querySelectorAll(".period");

  const monthlyPrices = ["0", "19", "49"];
  const annualPrices = ["0", "15", "39"];

  if (billingToggle) {
    billingToggle.addEventListener("change", function () {
      const isAnnual = this.checked;

      priceElements.forEach((el, i) => {
        el.textContent = isAnnual ? annualPrices[i] : monthlyPrices[i];
      });

      periodElements.forEach((el) => {
        el.textContent = isAnnual ? "/year" : "/month";
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animateElements = document.querySelectorAll(
    ".feature-card, .step, .pricing-card"
  );
  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Form handling (placeholder)
  const forms = document.querySelectorAll("form");
  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      // Add your form handling logic here
      console.log("Form submitted");
    });
  });

  // Add loading states to buttons
  const buttons = document.querySelectorAll(".btn");
  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      if (this.href && this.href.includes("#")) {
        return; // Skip for anchor links
      }

      // Add loading state
      const originalText = this.textContent;
      this.textContent = "Loading...";
      this.disabled = true;

      // Reset after 2 seconds (replace with actual action)
      setTimeout(() => {
        this.textContent = originalText;
        this.disabled = false;
      }, 2000);
    });
  });

  // Add parallax effect to hero section
  window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image");

    if (heroImage) {
      const rate = scrolled * -0.5;
      heroImage.style.transform = `translateY(${rate}px)`;
    }
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = "";

    let i = 0;
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      }
    };

    // Start typing effect after a short delay
    setTimeout(typeWriter, 500);
  }

  // Add counter animation for stats
  const stats = document.querySelectorAll(".stat-number");
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent =
          target + (element.textContent.includes("%") ? "%" : "+");
        clearInterval(timer);
      } else {
        element.textContent =
          Math.floor(current) + (element.textContent.includes("%") ? "%" : "+");
      }
    }, 20);
  };

  // Observe stats for counter animation
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = Number.parseInt(entry.target.textContent);
        animateCounter(entry.target, target);
        statsObserver.unobserve(entry.target);
      }
    });
  });

  stats.forEach((stat) => {
    statsObserver.observe(stat);
  });
});
