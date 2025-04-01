function initContent() { 
    const startButton = document.getElementById("btn-start");
    if (startButton) {
        startButton.addEventListener("click", function () {
            const choosingSection = document.querySelector(".choosing");

            if (choosingSection) {
                choosingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } 
        });
    } 
}

