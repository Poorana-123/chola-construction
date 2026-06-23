window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar");

    if (navbar) {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
});


// ================= GLOBAL VARIABLES =================
let map;
let marker;
let zoneFactor = 1;

let miniMap;
let miniMarker;


// ================= MAIN MAP =================
function initMap() {

    map = L.map('map').setView([10.7905, 78.7047], 7);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    map.on('click', function (e) {

        let lat = e.latlng.lat;
        let lng = e.latlng.lng;

        document.getElementById("coords").innerText =
            lat.toFixed(4) + ", " + lng.toFixed(4);

        if (marker) map.removeLayer(marker);

        marker = L.marker([lat, lng]).addTo(map);

        zoneFactor = getZone(lat, lng);

        // ⭐ IMPORTANT: UPDATE MINI MAP
        updateMiniMap(lat, lng);
    });
}


// ================= MINI MAP =================
function initMiniMap() {

    miniMap = L.map('miniMap', {
        zoomControl: false,
        attributionControl: false,
        interactive: false   // makes it icon-like
    }).setView([10.7905, 78.7047], 6);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png')
        .addTo(miniMap);
}

function updateMiniMap(lat, lng) {

    if (!miniMap) return;

    miniMap.setView([lat, lng], 12);

    if (miniMarker) {
        miniMap.removeLayer(miniMarker);
    }

    miniMarker = L.marker([lat, lng]).addTo(miniMap);
}


// ================= ZONE LOGIC =================
function getZone(lat, lng) {
    if (lat > 13) return 3.0;
    if (lat > 11) return 2.0;
    return 1.2;
}


// ================= MATERIAL RATE =================
function getMaterialRate(type) {
    if (type === "basic") return 1200;
    if (type === "standard") return 1800;
    if (type === "premium") return 2500;
    return 1200;
}


function calculatePrice() {

    let area = parseFloat(document.getElementById("area").value);
    let material = document.getElementById("material").value;

    if (!area || area <= 0) {
        alert("Enter valid area");
        return;
    }

    let landRate = 600;

    let landCost = area * landRate * zoneFactor;
    let constructionCost = area * getMaterialRate(material);

    let total = landCost + constructionCost;

    document.getElementById("landCost").innerText =
        landCost.toLocaleString();

    document.getElementById("constructionCost").innerText =
        constructionCost.toLocaleString();

    document.getElementById("total").innerText =
        total.toLocaleString();

    // Show Result Card
    document.querySelector(".result-card")
            .classList.add("active");
}
// ================= FEATURE ANIMATION =================
const features = document.querySelectorAll(".feature");

if (features.length > 0) {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    }, { threshold: 0.2 });

    features.forEach(feature => observer.observe(feature));

    features.forEach(feature => {
        feature.addEventListener("click", () => {
            features.forEach(f => f.classList.remove("active"));
            feature.classList.add("active");
        });
    });
}


// ================= PARALLAX =================
const leftSide = document.querySelector(".left-side");

document.addEventListener("mousemove", (e) => {
    if (!leftSide) return;

    let x = (e.clientX / window.innerWidth - 0.5) * 20;
    let y = (e.clientY / window.innerHeight - 0.5) * 20;

    leftSide.style.transform = `translate(${x}px, ${y}px)`;
});


// ================= START =================
window.onload = function () {
    initMap();
    initMiniMap();   // ⭐ IMPORTANT FIX
};

let slides = document.querySelectorAll(".testimonial-card");
let dots = document.querySelectorAll(".dot");

let index = 0;

function showSlide(n){

    slides.forEach(slide => slide.classList.remove("active"));
    dots.forEach(dot => dot.classList.remove("active"));

    slides[n].classList.add("active");
    dots[n].classList.add("active");
}

setInterval(() => {

    index++;

    if(index >= slides.length){
        index = 0;
    }

    showSlide(index);

}, 4000);

const showMoreBtn = document.getElementById("showMoreBtn");

if (showMoreBtn) {

    showMoreBtn.addEventListener("click", function () {

        document.querySelectorAll(".hidden-brand").forEach(card => {
            card.classList.add("show");
        });

        this.style.display = "none";

    });

}

const track = document.querySelector(".blog-track");

const nextBtn = document.querySelector(".next");

const prevBtn = document.querySelector(".prev");

nextBtn.addEventListener("click", () => {

    track.scrollBy({

        left:350,

        behavior:"smooth"

    });

});

prevBtn.addEventListener("click", () => {

    track.scrollBy({

        left:-350,

        behavior:"smooth"

    });

});
