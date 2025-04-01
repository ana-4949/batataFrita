function initializeCarousel() {
    const carouselElement = document.querySelector("#carousel-section");
    window.carouselViewed = false;

    if (carouselElement) {
        const carouselInstance = new bootstrap.Carousel(carouselElement);
        const slides = document.querySelectorAll(".carousel-item");
        const totalSlides = slides.length;
        let slidesViewed = new Set();

        function markSlideAsViewed(index) {
                slidesViewed.add(index);


            if (slidesViewed.size === totalSlides) {
                window.carouselViewed = true;
            }

            if (window.dynamicButtonsViewed && window.carouselViewed) {
                document.getElementById('the-end').style.display = 'block';
                document.getElementById('the-end').scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        carouselElement.addEventListener("slid.bs.carousel", function () {
            const activeSlide = document.querySelector(".carousel-item.active");
            if (activeSlide) {
                const slideIndex = Array.from(slides).indexOf(activeSlide);
                markSlideAsViewed(slideIndex);
            }
        });

        markSlideAsViewed(0);
        // console.log("Carrossel inicializado!");
    } else {
        // console.log(" Carrossel não encontrado.");
    }
}

document.addEventListener("aos:in", function (event) {
    if (event.detail === document.querySelector("#carousel-section")) {
        initializeCarousel();
    }
});
