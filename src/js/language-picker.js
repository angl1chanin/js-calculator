const lp = document.querySelector(".language-picker");
const lpBtn = document.querySelector(".language-picker__btn");
const lpContent = document.querySelector(".language-picker__content");
const lpOptionBtns = document.querySelectorAll(".language-picker__option");
let lpCurrentLang = document.getElementById("language-picker__lang");

function updateLanguage(btn) {
    lpCurrentLang.innerText = btn.innerText;

    // remove selected from previous button
    // lpOptionBtns.forEach(el => {
    //     if (el.getAttribute("selected")) {
    //         el.removeAttribute("selected");
    //     }
    // })
}

lpBtn.addEventListener("click", () => {
    lp.classList.toggle("active");
})

lpOptionBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        lpCurrentLang.innerText = btn.innerText;
        lp.classList.toggle("active");
    });
})