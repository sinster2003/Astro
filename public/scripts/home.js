const arrowElement = document.querySelector(".tag-line-div svg");
const homeElement = document.querySelector(".home-content");
const mainElement = document.querySelector(".main-content");
const upArrowElement = document.querySelector(".main-content div svg");

arrowElement.addEventListener("click",()=>{
    homeElement.classList.add("home-content-section-transform");
    setTimeout(()=>{
        mainElement.classList.add("main-content-visible");
    },650)
    homeElement.classList.remove("home-content-section-transformUp");
});

upArrowElement.addEventListener("click",()=>{
    homeElement.classList.add("home-content-section-transformUp");
    mainElement.classList.remove("main-content-visible");
    homeElement.classList.remove("home-content-section-transform");
});