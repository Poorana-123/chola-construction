window.addEventListener("scroll", () => {

    const navbar = document.querySelector(".navbar");

    if(window.scrollY > 50){
        navbar.classList.add("scrolled");
    }else{
        navbar.classList.remove("scrolled");
    }

});

function calculateCost() {
    let area = document.getElementById("area").value;
    let costPerSqFt = 1800; // example rate
    let total = area * costPerSqFt;

    document.getElementById("result").innerText =
        "Estimated Cost: ₹ " + total;
}