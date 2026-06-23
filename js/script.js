// ======================================================
// CHOLA CONSTRUCTION
// SCRIPT.JS - PART 1
// Navbar + Process + Map + Calculator
// ======================================================


// ================= NAVBAR SCROLL =================

window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

});


// ======================================================
// CONSTRUCTION PROCESS
// ======================================================

const steps = document.querySelectorAll(".step");

if (steps.length > 0) {

    let current = 0;
    let interval;

    function activate(index){

        steps.forEach(step=>{
            step.classList.remove("active");
        });

        steps[index].classList.add("active");
    }

    function startAnimation(){

        interval = setInterval(()=>{

            current++;

            if(current >= steps.length){
                current = 0;
            }

            activate(current);

        },2000);

    }

    activate(0);

    startAnimation();

    steps.forEach((step,index)=>{

        step.addEventListener("click",()=>{

            clearInterval(interval);

            current = index;

            activate(current);

            startAnimation();

        });

    });

}

// ======================================================
// GLOBAL VARIABLES
// ======================================================

let map;
let marker;
let zoneFactor = 1;

let miniMap;
let miniMarker;



// ======================================================
// MAIN MAP
// ======================================================

function initMap() {

    const mapContainer = document.getElementById("map");

    if (!mapContainer) return;

    map = L.map("map").setView([10.7905, 78.7047], 7);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {
            attribution: "© OpenStreetMap contributors"
        }

    ).addTo(map);



    map.on("click", function (e) {

        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        const coord = document.getElementById("coords");

        if (coord) {

            coord.innerText =
                lat.toFixed(4) + ", " + lng.toFixed(4);

        }

        if (marker) {

            map.removeLayer(marker);

        }

        marker = L.marker([lat, lng]).addTo(map);

        zoneFactor = getZone(lat, lng);

        updateMiniMap(lat, lng);

    });

}



// ======================================================
// MINI MAP
// ======================================================

function initMiniMap() {

    const mini = document.getElementById("miniMap");

    if (!mini) return;

    miniMap = L.map("miniMap", {

        zoomControl: false,
        attributionControl: false,
        interactive: false

    }).setView([10.7905, 78.7047], 6);

    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"

    ).addTo(miniMap);

}



function updateMiniMap(lat, lng) {

    if (!miniMap) return;

    miniMap.setView([lat, lng], 12);

    if (miniMarker) {

        miniMap.removeLayer(miniMarker);

    }

    miniMarker = L.marker([lat, lng]).addTo(miniMap);

}



// ======================================================
// ZONE FACTOR
// ======================================================

function getZone(lat, lng) {

    if (lat > 13) return 3.0;

    if (lat > 11) return 2.0;

    return 1.2;

}



// ======================================================
// MATERIAL RATE
// ======================================================

function getMaterialRate(type) {

    switch (type) {

        case "basic":
            return 1200;

        case "standard":
            return 1800;

        case "premium":
            return 2500;

        default:
            return 1200;

    }

}



// ======================================================
// COST CALCULATOR
// ======================================================

function calculatePrice() {

    const areaInput = document.getElementById("area");
    const materialInput = document.getElementById("material");

    if (!areaInput || !materialInput) return;

    const area = parseFloat(areaInput.value);

    const material = materialInput.value;

    if (!area || area <= 0) {

        alert("Please enter a valid area.");

        return;

    }

    const landRate = 600;

    const landCost = area * landRate * zoneFactor;

    const constructionCost =
        area * getMaterialRate(material);

    const total = landCost + constructionCost;



    document.getElementById("landCost").innerText =
        landCost.toLocaleString();

    document.getElementById("constructionCost").innerText =
        constructionCost.toLocaleString();

    document.getElementById("total").innerText =
        total.toLocaleString();



    const resultCard =
        document.querySelector(".result-card");

    if (resultCard) {

        resultCard.classList.add("active");

    }

}

// ======================================================
// CHOLA CONSTRUCTION
// SCRIPT.JS - PART 2
// Features + Parallax + Testimonials +
// Materials + Blog Slider + Initialize
// ======================================================



// ======================================================
// WHY CHOLA FEATURES
// ======================================================

const features = document.querySelectorAll(".feature");

if (features.length > 0) {

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {

        threshold: 0.2

    });

    features.forEach(feature => observer.observe(feature));



    features.forEach(feature => {

        feature.addEventListener("click", () => {

            features.forEach(f => {

                f.classList.remove("active");

            });

            feature.classList.add("active");

        });

    });

}



// ======================================================
// PARALLAX IMAGE
// ======================================================

const leftSide = document.querySelector(".left-side");

if (leftSide) {

    document.addEventListener("mousemove", (e) => {

        const x =
            (e.clientX / window.innerWidth - 0.5) * 20;

        const y =
            (e.clientY / window.innerHeight - 0.5) * 20;

        leftSide.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}



// ======================================================
// TESTIMONIAL SLIDER
// ======================================================

const slides =
    document.querySelectorAll(".testimonial-card");

const dots =
    document.querySelectorAll(".dot");

if (slides.length > 0) {

    let currentSlide = 0;

    function showSlide(index) {

        slides.forEach(slide => {

            slide.classList.remove("active");

        });

        dots.forEach(dot => {

            dot.classList.remove("active");

        });

        slides[index].classList.add("active");

        if (dots[index]) {

            dots[index].classList.add("active");

        }

    }

    setInterval(() => {

        currentSlide++;

        if (currentSlide >= slides.length) {

            currentSlide = 0;

        }

        showSlide(currentSlide);

    }, 4000);

}



// ======================================================
// SHOW MORE MATERIALS
// ======================================================

const showMoreBtn =
    document.getElementById("showMoreBtn");

if (showMoreBtn) {

    showMoreBtn.addEventListener("click", function () {

        const hiddenCards =
            document.querySelectorAll(".hidden-brand");

        hiddenCards.forEach(card => {

            card.classList.add("show");

        });

        this.style.display = "none";

    });

}



// ======================================================
// BLOG SLIDER
// ======================================================

const track =
    document.querySelector(".blog-track");

const nextBtn =
    document.querySelector(".next");

const prevBtn =
    document.querySelector(".prev");

if (track && nextBtn && prevBtn) {

    nextBtn.addEventListener("click", () => {

        track.scrollBy({

            left: 360,

            behavior: "smooth"

        });

    });



    prevBtn.addEventListener("click", () => {

        track.scrollBy({

            left: -360,

            behavior: "smooth"

        });

    });

}



// ======================================================
// WINDOW LOAD
// ======================================================

window.addEventListener("load", () => {

    if (document.getElementById("map")) {

        initMap();

    }

    if (document.getElementById("miniMap")) {

        initMiniMap();

    }

});



// ======================================================
// SMOOTH SCROLL FOR HASH LINKS
// ======================================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function (e) {

        const target =
            document.querySelector(this.getAttribute("href"));

        if (target) {

            e.preventDefault();

            target.scrollIntoView({

                behavior: "smooth"

            });

        }

    });

});