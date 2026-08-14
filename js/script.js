  /* ==========================================================================
   WanderWorld Travels - Main Script (Vanilla JavaScript)
   Handles: navigation, search, package rendering/filtering/sorting,
   modals, countdowns, animated stats, form validation and UI helpers.
   ========================================================================== */
(function () {
  "use strict";


  /* ----------------------------------------------------------------------
     Shared data
     ---------------------------------------------------------------------- */
  const IMG = "https://images.unsplash.com/";
  const q = "?auto=format&fit=crop&w=900&q=70";

  const DESTINATIONS = [
    {
      id: "paris", name: "Paris", country: "France", price: 899, rating: 4.8,
      img: IMG + "photo-1502602898657-3e91760cbb34" + q,
      short: "Romantic boulevards, world-class art and café culture.",
      long: "Stroll the Seine at sunset, climb the Eiffel Tower, and lose an afternoon inside the Louvre. Our Paris trips blend guided classics with free time in Montmartre and Le Marais.",
      highlights: ["Eiffel Tower skip-the-line", "Louvre guided tour", "Seine dinner cruise", "Versailles day trip"],
      best: "April – June, September – October"
    },
    {
      id: "dubai", name: "Dubai", country: "UAE", price: 749, rating: 4.7,
      img: IMG + "photo-1512453979798-5ea266f8880c" + q,
      short: "Futuristic skylines, golden dunes and luxury shopping.",
      long: "From the observation deck of the Burj Khalifa to a red-dune desert safari with a Bedouin dinner, Dubai packs contrast into every day.",
      highlights: ["Burj Khalifa Level 124", "Desert safari & BBQ", "Dubai Marina yacht cruise", "Old Souk & Abra ride"],
      best: "November – March"
    },
    {
      id: "bali", name: "Bali", country: "Indonesia", price: 649, rating: 4.9,
      img: IMG + "photo-1537996194471-e657df975ab4" + q,
      short: "Rice terraces, surf beaches and temple sunsets.",
      long: "Ubud's jungle valleys, Uluwatu's cliff temples and Nusa Penida's turquoise coves — Bali is the easiest place to combine adventure with slow mornings.",
      highlights: ["Tegallalang rice terraces", "Uluwatu sunset Kecak dance", "Nusa Penida island hop", "Balinese cooking class"],
      best: "May – September"
    },
    {
      id: "maldives", name: "Maldives", country: "Maldives", price: 1199, rating: 5.0,
      img: IMG + "photo-1514282401047-d79a71a590e8" + q,
      short: "Overwater villas above impossibly clear lagoons.",
      long: "Private-island resorts, house reefs a few steps from your deck and sunset dolphin cruises. The Maldives remains our most-requested honeymoon destination.",
      highlights: ["Overwater villa stay", "House-reef snorkelling", "Sunset dolphin cruise", "Private sandbank dinner"],
      best: "November – April"
    },
    {
      id: "switzerland", name: "Switzerland", country: "Switzerland", price: 1099, rating: 4.9,
      img: IMG + "photo-1530122037265-a5f1f91d3b99" + q,
      short: "Alpine peaks, glacier trains and lakeside towns.",
      long: "Ride the Glacier Express through the heart of the Alps, cruise Lake Lucerne and take the cogwheel railway up Jungfraujoch — the Top of Europe.",
      highlights: ["Glacier Express panoramic rail", "Jungfraujoch excursion", "Lake Lucerne cruise", "Interlaken paragliding"],
      best: "June – September, December – March"
    },
    {
       id: "london", name: "London", country: "United Kingdom", price: 829, rating: 4.6,
      img: IMG + "photo-1513635269975-59663e0ac1ad" + q,
      short: "Royal history, riverside icons and West End nights.",
      long: "Big Ben, the Tower of London and Borough Market in one walkable city, with easy day trips to Oxford, Bath and Stonehenge.",
      highlights: ["Tower of London & Crown Jewels", "Thames river cruise", "West End theatre night", "Windsor Castle day trip"],
      best: "May – September"
    },
    {
      id: "singapore", name: "Singapore", country: "Singapore", price: 699, rating: 4.7,
      img: IMG + "photo-1525625293386-3f8f99389edd" + q,
      short: "Garden city with hawker food and family thrills.",
      long: "Gardens by the Bay light shows, Sentosa's theme parks and a food scene that runs from Michelin hawker stalls to rooftop bars.",
      highlights: ["Gardens by the Bay", "Universal Studios Sentosa", "Night Safari", "Marina Bay light show"],
      best: "Year-round"
    },
    {
      id: "tokyo", name: "Tokyo", country: "Japan", price: 979, rating: 4.8,
      img: IMG + "photo-1540959733332-eab4deabeeaf" + q,
      short: "Neon districts, quiet shrines and bullet trains.",
      long: "Shibuya crossing at night, sunrise at Senso-ji, and a day trip to Mount Fuji by Shinkansen. Cherry blossom departures sell out early.",
      highlights: ["Shibuya & Shinjuku night walk", "Senso-ji temple", "Mt. Fuji & Hakone day trip", "Sushi-making workshop"],
      best: "March – May, October – November"
        }
  ];

  const PACKAGES = [
    {
      id: "p1", title: "Bali Adventure", destination: "Bali", type: "Adventure",
      days: 7, nights: 6, price: 899, rating: 4.8, category: "Adventure",
      img: IMG + "photo-1537996194471-e657df975ab4" + q,
      features: ["4★ Ubud resort", "Volcano sunrise trek", "Island hopping", "Airport transfers"],
      desc: "Seven days across Ubud, Uluwatu and Nusa Penida with a sunrise trek up Mount Batur."
    },
    {
      id: "p2", title: "Dubai Luxury Escape", destination: "Dubai", type: "Luxury",
      days: 5, nights: 4, price: 1499, rating: 4.9, category: "Luxury",
      img: IMG + "photo-1512453979798-5ea266f8880c" + q,
      features: ["5★ Marina hotel", "Desert safari & BBQ", "Burj Khalifa entry", "Private chauffeur"],
      desc: "Five days of skyline suites, desert dunes and private dining along Dubai Marina."
    },
    {
      id: "p3", title: "Maldives Honeymoon", destination: "Maldives", type: "Honeymoon",
      days: 6, nights: 5, price: 2199, rating: 5.0, category: "Honeymoon",
      img: IMG + "photo-1514282401047-d79a71a590e8" + q,
      features: ["Overwater villa", "Candlelit beach dinner", "Couples spa ritual", "Seaplane transfers"],
      desc: "A private-island escape built for two, with a sandbank dinner and daily reef snorkelling."
    },
    {
      id: "p4", title: "European Explorer", destination: "Paris", type: "Popular",
      days: 12, nights: 11, price: 2599, rating: 4.7, category: "Popular",
      img: IMG + "photo-1502602898657-3e91760cbb34" + q,
      features: ["4 countries", "High-speed rail passes", "Daily breakfast", "English-speaking guides"],
      desc: "Paris, Amsterdam, Lucerne and Rome across twelve days of rail travel and guided city walks."
    },
    {
      id: "p5", title: "Switzerland Scenic Tour", destination: "Switzerland", type: "Popular",
      days: 8, nights: 7, price: 1899, rating: 4.9, category: "Popular",
      img: IMG + "photo-1530122037265-a5f1f91d3b99" + q,
      features: ["Glacier Express", "Jungfraujoch pass", "Lake Lucerne cruise", "Alpine lodge stays"],
      desc: "Panoramic trains, glacier viewpoints and lakeside villages from Zurich to Zermatt."
    },
    {
      id: "p6", title: "Singapore Family Holiday", destination: "Singapore", type: "Family",
      days: 5, nights: 4, price: 1099, rating: 4.6, category: "Family",
      img: IMG + "photo-1525625293386-3f8f99389edd" + q,
      features: ["Universal Studios", "Night Safari", "Family suite", "Hop-on hop-off pass"],
      desc: "A theme-park-packed break with Sentosa beaches and Gardens by the Bay after dark."
    },
    {
      id: "p7", title: "Tokyo Culture Trail", destination: "Tokyo", type: "Popular",
      days: 9, nights: 8, price: 1799, rating: 4.8, category: "Popular",
      img: IMG + "photo-1540959733332-eab4deabeeaf" + q,
      features: ["JR rail pass", "Mt. Fuji day trip", "Sushi workshop", "Central Tokyo hotel"],
      desc: "Temples, neon districts and a Shinkansen run to Hakone and Mount Fuji."
    },
    {
      id: "p8", title: "London City Break", destination: "London", type: "Family",
      days: 4, nights: 3, price: 749, rating: 4.5, category: "Family",
      img: IMG + "photo-1513635269975-59663e0ac1ad" + q,
      features: ["Tower of London", "Thames cruise", "Oyster travel card", "Central hotel"],
      desc: "A long weekend of royal landmarks, museums and a West End show."
    }
  ];

  const TESTIMONIALS = [
    { name: "Aisha Rahman", place: "Maldives Honeymoon", stars: 5, avatar: IMG + "photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=70",
      text: "Every detail was handled — seaplane, villa upgrade, even a surprise anniversary cake. We didn't lift a finger the entire week." },
    { name: "Daniel Okoye", place: "Switzerland Scenic Tour", stars: 5, avatar: IMG + "photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=70",
      text: "The Glacier Express seats were exactly as promised and our guide in Interlaken was outstanding. Worth every rupee." },
    { name: "Meera Nair", place: "Bali Adventure", stars: 5, avatar: IMG + "photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=200&q=70",
      text: "The Mount Batur sunrise trek was the highlight of my year. Great pacing between adventure days and beach days." },
    { name: "Thomas Weber", place: "Dubai Luxury Escape", stars: 4, avatar: IMG + "photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=70",
      text: "Superb hotel and a genuinely knowledgeable driver. Only wish we had booked one extra night for the souks." },
    { name: "Priya Sharma", place: "Singapore Family Holiday", stars: 5, avatar: IMG + "photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=70",
      text: "Travelling with a 6-year-old is never simple, but the itinerary was paced perfectly and support replied within minutes." }
  ];

  /* ----------------------------------------------------------------------
     Small helpers
     ---------------------------------------------------------------------- */
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.prototype.slice.call((root || document).querySelectorAll(sel));

  function stars(rating) {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      html += i <= Math.floor(rating)
        ? '<i class="bi bi-star-fill"></i>'
        : (rating >= i - 0.5 ? '<i class="bi bi-star-half"></i>' : '<i class="bi bi-star"></i>');
    }
    return html;
  }

  function money(n) {
    return "$" + n.toLocaleString("en-US");
  }

  /** Shows a dismissible Bootstrap alert inside a container element. */
  function showAlert(container, message, type) {
    if (!container) return;
    container.innerHTML =
      '<div class="alert alert-' + (type || "success") + ' alert-dismissible fade show rounded-4" role="alert">' +
      '<i class="bi ' + (type === "danger" ? "bi-exclamation-triangle-fill" : "bi-check-circle-fill") + ' me-2"></i>' +
      message +
      '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
    container.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

  /* ----------------------------------------------------------------------
     Navbar: active link highlighting
     ---------------------------------------------------------------------- */
  function initNavbar() {
    const page = (location.pathname.split("/").pop() || "index.html").toLowerCase();
    $$(".nav-link[data-page]").forEach(function (link) {
      const isActive = link.getAttribute("data-page") === page.replace(".html", "");
      link.classList.toggle("active", isActive);
      if (isActive) link.setAttribute("aria-current", "page");
    });

    // Close the offcanvas menu after tapping a link on mobile.
    const offcanvasEl = $("#mainMenu");
    if (offcanvasEl && window.bootstrap) {
      $$("#mainMenu a").forEach(function (a) {
        a.addEventListener("click", function () {
          const inst = bootstrap.Offcanvas.getInstance(offcanvasEl);
          if (inst) inst.hide();
        });
      });
    }
  }

  /* ----------------------------------------------------------------------
     Destinations grid + modal
     ---------------------------------------------------------------------- */
  function initDestinations() {
    const grid = $("#destinationGrid");
    if (!grid) return;

    const limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    const list = limit ? DESTINATIONS.slice(0, limit) : DESTINATIONS;
 grid.innerHTML = list.map(function (d) {
      return '' +
        '<div class="col-12 col-sm-6 col-lg-3 reveal">' +
          '<article class="card">' +
            '<div class="card-img-wrap">' +
              '<img src="' + d.img + '" alt="' + d.name + ', ' + d.country + '" loading="lazy">' +
              '<span class="card-price">From ' + money(d.price) + '</span>' +
            '</div>' +
            '<div class="card-body">' +
              '<div class="d-flex justify-content-between align-items-start">' +
                '<div><h5 class="mb-0">' + d.name + '</h5>' +
                '<small class="text-muted"><i class="bi bi-geo-alt"></i> ' + d.country + '</small></div>' +
                '<span class="rating small text-nowrap">' + stars(d.rating) + '</span>' +
              '</div>' +
              '<p class="mt-2 mb-3 small">' + d.short + '</p>' +
              '<button class="btn btn-outline-ocean btn-sm w-100" data-destination="' + d.id + '">Explore ' + d.name + '</button>' +
            '</div>' +
          '</article>' +
        '</div>';
    }).join("");

    // Explore button -> Bootstrap modal with extra detail
    grid.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-destination]");
      if (!btn) return;
      const d = DESTINATIONS.find(function (x) { return x.id === btn.getAttribute("data-destination"); });
      if (!d) return;

      $("#destinationModalLabel").textContent = d.name + ", " + d.country;
      $("#destinationModalBody").innerHTML =
        '<img src="' + d.img + '" class="img-fluid rounded-4 mb-3" alt="' + d.name + '">' +
        '<p>' + d.long + '</p>' +
         '<h6 class="fw-bold mt-3">Trip highlights</h6>' +
        '<ul class="list-unstyled">' + d.highlights.map(function (h) {
          return '<li class="mb-1"><i class="bi bi-check2-circle text-ocean me-2"></i>' + h + '</li>';
        }).join("") + '</ul>' +
        '<div class="d-flex flex-wrap gap-2 mt-3">' +
          '<span class="badge badge-cat bg-ocean">From ' + money(d.price) + '</span>' +
          '<span class="badge badge-cat bg-sunset">Rated ' + d.rating.toFixed(1) + '/5</span>' +
          '<span class="badge badge-cat text-bg-light">Best time: ' + d.best + '</span>' +
        '</div>';
      const modalEl = $("#destinationModal");
      bootstrap.Modal.getOrCreateInstance(modalEl).show();
    });

    revealObserve();
  }
  /* ----------------------------------------------------------------------
     Packages: render, filter, sort
     ---------------------------------------------------------------------- */
  function packageCard(p) {
    return '' +
      '<div class="col-12 col-md-6 col-lg-4 reveal">' +
        '<article class="card">' +
          '<div class="card-img-wrap">' +
            '<img src="' + p.img + '" alt="' + p.title + '" loading="lazy">' +
            '<span class="card-price">' + money(p.price) + ' <small class="fw-normal">/ person</small></span>' +
          '</div>' +
          '<div class="card-body d-flex flex-column">' +
            '<div class="d-flex justify-content-between align-items-center mb-2">' +
              '<span class="badge badge-cat bg-sunset">' + p.category + '</span>' +
              '<span class="rating small">' + stars(p.rating) + ' <span class="text-muted">' + p.rating.toFixed(1) + '</span></span>' +
            '</div>' +
            '<h5 class="mb-1">' + p.title + '</h5>' +
            '<div class="small text-muted mb-2">' +
              '<i class="bi bi-geo-alt"></i> ' + p.destination +
              ' <span class="mx-1">•</span> <i class="bi bi-clock"></i> ' + p.days + 'D / ' + p.nights + 'N' +
            '</div>' +
            '<ul class="list-unstyled small mb-3">' + p.features.map(function (f) {
              return '<li class="mb-1"><i class="bi bi-check2 text-ocean me-2"></i>' + f + '</li>';
            }).join("") + '</ul>' +
             '<div class="mt-auto d-flex gap-2">' +
              '<button class="btn btn-outline-ocean btn-sm flex-fill" data-package="' + p.id + '">View Details</button>' +
              '<a class="btn btn-sunset btn-sm flex-fill" href="contact.html#booking">Book Now</a>' +
            '</div>' +
          '</div>' +
        '</article>' +
      '</div>';
  }

  function initPackages() {
    const grid = $("#packageGrid");
    if (!grid) return;

    const limit = parseInt(grid.getAttribute("data-limit") || "0", 10);
    const countEl = $("#packageCount");
    const emptyEl = $("#packageEmpty");
 function currentFilters() {
      return {
        destination: ($("#filterDestination") || {}).value || "",
        budget: ($("#filterBudget") || {}).value || "",
        duration: ($("#filterDuration") || {}).value || "",
        type: ($("#filterType") || {}).value || "",
        sort: ($("#sortPackages") || {}).value || "popular"
      };
    }

    function render() {
      const f = currentFilters();
      let list = PACKAGES.slice();

      if (f.destination) list = list.filter(function (p) { return p.destination === f.destination; });
      if (f.type) list = list.filter(function (p) { return p.type === f.type; });
      if (f.budget) {
        const parts = f.budget.split("-");
        const min = Number(parts[0]);
        const max = parts[1] ? Number(parts[1]) : Infinity;
        list = list.filter(function (p) { return p.price >= min && p.price <= max; });
      }
       if (f.duration) {
        const dp = f.duration.split("-");
        const dmin = Number(dp[0]);
        const dmax = dp[1] ? Number(dp[1]) : Infinity;
        list = list.filter(function (p) { return p.days >= dmin && p.days <= dmax; });
      }

      if (f.sort === "price-asc") list.sort(function (a, b) { return a.price - b.price; });
      else if (f.sort === "price-desc") list.sort(function (a, b) { return b.price - a.price; });
      else if (f.sort === "rating") list.sort(function (a, b) { return b.rating - a.rating; });
      else if (f.sort === "duration") list.sort(function (a, b) { return a.days - b.days; });

      if (limit) list = list.slice(0, limit);

      grid.innerHTML = list.map(packageCard).join("");
      if (countEl) countEl.textContent = list.length + (list.length === 1 ? " package" : " packages") + " found";
      if (emptyEl) emptyEl.classList.toggle("d-none", list.length > 0);
      revealObserve();
    }

    ["filterDestination", "filterBudget", "filterDuration", "filterType", "sortPackages"].forEach(function (id) {
      const el = document.getElementById(id);
      if (el) el.addEventListener("change", render);
    });

    const clearBtn = $("#clearFilters");
    if (clearBtn) {
       clearBtn.addEventListener("click", function () {
        ["filterDestination", "filterBudget", "filterDuration", "filterType"].forEach(function (id) {
          const el = document.getElementById(id);
          if (el) el.value = "";
        });
        const s = $("#sortPackages");
        if (s) s.value = "popular";
        render();
      });
    }

    // View details modal
    grid.addEventListener("click", function (e) {
      const btn = e.target.closest("[data-package]");
      if (!btn) return;
      const p = PACKAGES.find(function (x) { return x.id === btn.getAttribute("data-package"); });
      if (!p) return;
      $("#packageModalLabel").textContent = p.title;
      $("#packageModalBody").innerHTML =
        '<img src="' + p.img + '" class="img-fluid rounded-4 mb-3" alt="' + p.title + '">' +
        '<p>' + p.desc + '</p>' +
        '<div class="row g-3 my-1">' +
          '<div class="col-6 col-md-3"><small class="text-muted d-block">Duration</small><strong>' + p.days + 'D / ' + p.nights + 'N</strong></div>' +
          '<div class="col-6 col-md-3"><small class="text-muted d-block">Destination</small><strong>' + p.destination + '</strong></div>' +
          '<div class="col-6 col-md-3"><small class="text-muted d-block">Rating</small><strong>' + p.rating.toFixed(1) + ' / 5</strong></div>' +
          '<div class="col-6 col-md-3"><small class="text-muted d-block">Price</small><strong>' + money(p.price) + '</strong></div>' +
        '</div>' +
        '<h6 class="fw-bold">What\'s included</h6>' +
        '<ul class="list-unstyled">' + p.features.map(function (f) {
          return '<li class="mb-1"><i class="bi bi-check2-circle text-ocean me-2"></i>' + f + '</li>';
        }).join("") + '</ul>';
      bootstrap.Modal.getOrCreateInstance($("#packageModal")).show();
    });

    render();
  }

  /* ----------------------------------------------------------------------
     Testimonials carousel
     ---------------------------------------------------------------------- */
  function initTestimonials() {
    const inner = $("#testimonialInner");
    if (!inner) return;
    inner.innerHTML = TESTIMONIALS.map(function (t, i) {
      return '<div class="carousel-item' + (i === 0 ? " active" : "") + '">' +
        '<div class="testimonial-card">' +
          '<img class="testimonial-avatar" src="' + t.avatar + '" alt="' + t.name + '" loading="lazy">' +
          '<div class="rating mb-2">' + stars(t.stars) + '</div>' +
          '<p class="fst-italic mb-3">“' + t.text + '”</p>' +
          '<h6 class="mb-0">' + t.name + '</h6>' +
          '<small class="text-muted">Travelled to ' + t.place + '</small>' +
        '</div></div>';
    }).join("");
  }
  /* ----------------------------------------------------------------------
     Hero search
     ---------------------------------------------------------------------- */
  function initSearch() {
    const form = $("#searchForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();
      const alertBox = $("#searchAlert");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        showAlert(alertBox, "Please choose a destination and travel date to search.", "danger");
        return;
      }
      form.classList.remove("was-validated");
      const dest = $("#searchDestination").value;
      const date = $("#searchDate").value;
      const travellers = $("#searchTravellers").value;
      const type = $("#searchType").value || "any travel style";
      showAlert(alertBox,
        "<strong>Great choice!</strong> Showing trips to " + dest + " on " + date +
        " for " + travellers + " traveller(s) — " + type + ". Our team will confirm availability within 24 hours.",
        "success");
    });
  }
  /* ----------------------------------------------------------------------
     Countdown timers for special offers
     ---------------------------------------------------------------------- */
  function initCountdowns() {
    const els = $$("[data-countdown]");
    if (!els.length) return;

    const targets = els.map(function (el) {
      const days = parseFloat(el.getAttribute("data-countdown")) || 3;
      return { el: el, end: Date.now() + days * 86400000 };
    });

    function tick() {
      targets.forEach(function (t) {
        let diff = Math.max(0, t.end - Date.now());
        const d = Math.floor(diff / 86400000); diff -= d * 86400000;
        const h = Math.floor(diff / 3600000); diff -= h * 3600000;
        const m = Math.floor(diff / 60000); diff -= m * 60000;
        const s = Math.floor(diff / 1000);
        t.el.innerHTML =
         '<div><span>' + d + '</span><small>Days</small></div>' +
          '<div><span>' + String(h).padStart(2, "0") + '</span><small>Hours</small></div>' +
          '<div><span>' + String(m).padStart(2, "0") + '</span><small>Mins</small></div>' +
          '<div><span>' + String(s).padStart(2, "0") + '</span><small>Secs</small></div>';
      });
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ----------------------------------------------------------------------
     Animated statistics (counts up once in view)
     ---------------------------------------------------------------------- */
  function initStats() {
    const nums = $$("[data-count]");
    if (!nums.length) return;
     function animate(el) {
      const target = parseFloat(el.getAttribute("data-count"));
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1600;
      const start = performance.now();
      function step(now) {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    if (!("IntersectionObserver" in window)) { nums.forEach(animate); return; }
    const obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    nums.forEach(function (n) { obs.observe(n); });
  }
  /* ----------------------------------------------------------------------
     Booking form
     ---------------------------------------------------------------------- */
  function bookingReference() {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let ref = "";
    for (let i = 0; i < 6; i++) ref += chars.charAt(Math.floor(Math.random() * chars.length));
    return "WW-" + new Date().getFullYear() + "-" + ref;
  }

  function initBookingForm() {
    const form = $("#bookingForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const alertBox = $("#bookingAlert");
      const email = $("#bookEmail");
      const depart = $("#bookDeparture");
      const ret = $("#bookReturn");
 let valid = form.checkValidity();

      if (email.value && !EMAIL_RE.test(email.value.trim())) {
        email.setCustomValidity("invalid");
        valid = false;
      } else {
        email.setCustomValidity("");
      }

      if (depart.value && ret.value && new Date(ret.value) < new Date(depart.value)) {
        ret.setCustomValidity("invalid");
        valid = false;
      } else {
        ret.setCustomValidity("");
      }

      form.classList.add("was-validated");

      if (!valid) {
        showAlert(alertBox, "Please correct the highlighted fields before submitting your enquiry.", "danger");
        return;
      }

      const ref = bookingReference();
      showAlert(alertBox,
         "<strong>Booking request received!</strong> Your reference number is <span class=\"badge bg-ocean ms-1\">" + ref +
        "</span><br class=\"d-sm-none\"> A travel consultant will email you a confirmation within 24 hours.",
        "success");
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  /* ----------------------------------------------------------------------
     Contact form
     ---------------------------------------------------------------------- */
  function initContactForm() {
    const form = $("#contactForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const alertBox = $("#contactAlert");
      const email = $("#contactEmail");
      let valid = form.checkValidity();
      if (email.value && !EMAIL_RE.test(email.value.trim())) { email.setCustomValidity("invalid"); valid = false; }
      else { email.setCustomValidity(""); }
      form.classList.add("was-validated");
      if (!valid) {
        showAlert(alertBox, "Please complete all fields with a valid email address.", "danger");
        return;
         }
      showAlert(alertBox, "<strong>Message sent!</strong> Thanks for reaching out — we usually reply within a few hours.", "success");
      form.reset();
      form.classList.remove("was-validated");
    });
  }

  /* ----------------------------------------------------------------------
     Newsletter
     ---------------------------------------------------------------------- */
  function initNewsletter() {
    const form = $("#newsletterForm");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const input = $("#newsletterEmail");
      const alertBox = $("#newsletterAlert");
      if (!EMAIL_RE.test(input.value.trim())) {
        showAlert(alertBox, "Please enter a valid email address, e.g. name@example.com", "danger");
        input.focus();
        return;
      }
       showAlert(alertBox, "<strong>You're subscribed!</strong> Deals and new itineraries are on their way to " + input.value.trim() + ".", "success");
      form.reset();
    });
  }

  /* ----------------------------------------------------------------------
     Back-to-top button
     ---------------------------------------------------------------------- */
  function initBackToTop() {
    const btn = $("#backToTop");
    if (!btn) return;
    window.addEventListener("scroll", function () {
      btn.classList.toggle("show", window.scrollY > 420);
    }, { passive: true });
    btn.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
/* ----------------------------------------------------------------------
     Scroll reveal animations
     ---------------------------------------------------------------------- */
  let revealObserver = null;
  function revealObserve() {
    const items = $$(".reveal:not(.visible)");
    if (!items.length) return;
    if (!("IntersectionObserver" in window)) {
      items.forEach(function (i) { i.classList.add("visible"); });
      return;
    }
    if (!revealObserver) {
      revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
    }
    items.forEach(function (i) { revealObserver.observe(i); });
  }

  /* ----------------------------------------------------------------------
     Smooth scrolling for in-page anchors
     ---------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.addEventListener("click", function (e) {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#" || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  /* ----------------------------------------------------------------------
     Boot
     ---------------------------------------------------------------------- */
  document.addEventListener("DOMContentLoaded", function () {
    initNavbar();
    initDestinations();
    initPackages();
    initTestimonials();
    initSearch();
    initCountdowns();
    initStats();
    initBookingForm();
    initContactForm();
     initNewsletter();
    initBackToTop();
    initSmoothScroll();
    revealObserve();

    // Set sensible minimum dates on any date input.
    const today = new Date().toISOString().split("T")[0];
    $$('input[type="date"]').forEach(function (i) { i.min = today; });
  });
})();