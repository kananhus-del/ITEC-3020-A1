
// ==========================================
// 1. HAMBURGER MENU FUNCTIONALITY
// ==========================================

const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {

    hamburger.addEventListener("click", function () {

        navLinks.classList.toggle("show-menu");

        const isExpanded =
            hamburger.getAttribute("aria-expanded") === "true";

        hamburger.setAttribute("aria-expanded", !isExpanded);

    });

}


// ==========================================
// 2. RESTAURANT SEARCH AND FILTER
// ==========================================

const searchInput = document.getElementById("search-input");
const categoryFilter = document.getElementById("category-filter");
const restaurantContainer =
    document.getElementById("restaurant-container");

const noResults = document.getElementById("no-results");

if (searchInput && categoryFilter && restaurantContainer) {

    const restaurantCards =
        Array.from(document.querySelectorAll(".restaurant-card"));

    function filterRestaurants() {

        const searchValue =
            searchInput.value.toLowerCase().trim();

        const selectedCategory = categoryFilter.value;

        let visibleCount = 0;

        restaurantCards.forEach(function (card) {

            const restaurantName =
                card.dataset.name.toLowerCase();

            const restaurantCategory =
                card.dataset.category;

            const matchesSearch =
                restaurantName.includes(searchValue);

            const matchesCategory =
                selectedCategory === "all" ||
                restaurantCategory === selectedCategory;

            if (matchesSearch && matchesCategory) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });

        if (noResults) {

            noResults.hidden = visibleCount !== 0;

        }

    }

    searchInput.addEventListener("input", filterRestaurants);

    categoryFilter.addEventListener("change", filterRestaurants);

}


// ==========================================
// 3. SORT RESTAURANTS BY RATING
// ==========================================

const sortOption = document.getElementById("sort-option");

if (sortOption && restaurantContainer) {

    sortOption.addEventListener("change", function () {

        const restaurantCards =
            Array.from(document.querySelectorAll(".restaurant-card"));

        const sortValue = sortOption.value;

        if (sortValue === "highest") {

            restaurantCards.sort(function (a, b) {

                return Number(b.dataset.rating) -
                       Number(a.dataset.rating);

            });

        } else if (sortValue === "lowest") {

            restaurantCards.sort(function (a, b) {

                return Number(a.dataset.rating) -
                       Number(b.dataset.rating);

            });

        }

        restaurantCards.forEach(function (card) {

            restaurantContainer.appendChild(card);

        });

    });

}


// ==========================================
// 4. FAVOURITE BUTTONS AND COUNTER
// ==========================================

const favouriteButtons =
    document.querySelectorAll(".favorite-btn");

const favouriteCount =
    document.getElementById("favourite-count");

let totalFavourites = 0;

favouriteButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (button.classList.contains("favourited")) {

            button.classList.remove("favourited");

            button.textContent = "♡ Add to Favourites";

            totalFavourites--;

        } else {

            button.classList.add("favourited");

            button.textContent = "♥ Remove Favourite";

            totalFavourites++;

        }

        if (favouriteCount) {

            favouriteCount.textContent =
                "Favourites: " + totalFavourites;

        }

    });

});


// ==========================================
// 5. CONTACT FORM VALIDATION
// ==========================================

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value.trim();

        const email =
            document.getElementById("email").value.trim();

        const message =
            document.getElementById("message").value.trim();

        const feedback =
            document.getElementById("form-feedback");

        // Check that all fields are completed

        if (name === "" || email === "" || message === "") {

            feedback.textContent =
                "Please complete all fields before submitting.";

            feedback.style.color = "red";

            return;

        }

        // Check that the email has a valid format

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {

            feedback.textContent =
                "Please enter a valid email address.";

            feedback.style.color = "red";

            return;

        }

        // Display success message

        feedback.textContent =
            "Thank you! Your message has been submitted successfully.";

        feedback.style.color = "green";

        // Clear the form

        contactForm.reset();

    });

}
