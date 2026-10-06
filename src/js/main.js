(function () {
  "use strict";

  // Mobile nav toggle
  var toggle = document.querySelector(".site-nav__toggle");
  var list = document.querySelector(".site-nav__list");
  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var isOpen = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    list.querySelectorAll(".has-children > a").forEach(function (link) {
      link.addEventListener("click", function (event) {
        if (window.matchMedia("(max-width: 920px)").matches) {
          event.preventDefault();
          link.parentElement.classList.toggle("is-open");
        }
      });
    });
  }

  // Generic "mark as submitted" handling for demo forms (no backend wired up yet)
  document.querySelectorAll("form[data-demo-form]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var successId = form.getAttribute("data-success-target");
      var success = successId ? document.getElementById(successId) : null;
      if (success) {
        success.classList.add("is-visible");
        success.setAttribute("tabindex", "-1");
        success.focus();
      }
      form.reset();
    });
  });

  // Job search / filter engine (client-side demo over static mock data)
  var board = document.querySelector("[data-job-board]");
  if (board) {
    var cards = Array.prototype.slice.call(board.querySelectorAll("[data-job-card]"));
    var countEl = board.querySelector("[data-job-count]");
    var emptyEl = board.querySelector("[data-job-empty]");
    var keywordInput = board.querySelector("[name='keyword']");
    var sectorSelect = board.querySelector("[name='sector']");
    var locationSelect = board.querySelector("[name='location']");
    var contractSelect = board.querySelector("[name='contract']");

    function applyFilters() {
      var keyword = (keywordInput.value || "").trim().toLowerCase();
      var sector = sectorSelect.value;
      var location = locationSelect.value;
      var contract = contractSelect.value;
      var visibleCount = 0;

      cards.forEach(function (card) {
        var matchesKeyword =
          !keyword ||
          card.dataset.title.toLowerCase().indexOf(keyword) !== -1 ||
          card.dataset.summary.toLowerCase().indexOf(keyword) !== -1;
        var matchesSector = !sector || card.dataset.sector === sector;
        var matchesLocation = !location || card.dataset.location === location;
        var matchesContract = !contract || card.dataset.contract === contract;
        var visible = matchesKeyword && matchesSector && matchesLocation && matchesContract;
        card.style.display = visible ? "" : "none";
        if (visible) visibleCount += 1;
      });

      if (countEl) {
        countEl.textContent = visibleCount + (visibleCount === 1 ? " role found" : " roles found");
      }
      if (emptyEl) {
        emptyEl.classList.toggle("is-visible", visibleCount === 0);
      }
    }

    [keywordInput, sectorSelect, locationSelect, contractSelect].forEach(function (control) {
      if (!control) return;
      control.addEventListener("input", applyFilters);
      control.addEventListener("change", applyFilters);
    });

    board.querySelector("form").addEventListener("submit", function (event) {
      event.preventDefault();
      applyFilters();
    });

    // Pre-fill filters from the query string, e.g. /for-candidates/jobs/?sector=IT
    var params = new URLSearchParams(window.location.search);
    if (params.get("sector") && sectorSelect) sectorSelect.value = params.get("sector");
    if (params.get("location") && locationSelect) locationSelect.value = params.get("location");
    if (params.get("contract") && contractSelect) contractSelect.value = params.get("contract");
    if (params.get("keyword") && keywordInput) keywordInput.value = params.get("keyword");

    applyFilters();
  }
})();
