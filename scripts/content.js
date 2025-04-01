function initContent() { 
    const btnStart = document.getElementById("btn-start");
    if (btnStart) {
        btnStart.addEventListener("click", function () {
            const choosingSection = document.querySelector(".choosing");

            if (choosingSection) {
                choosingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } 
        });
    } 


    const btnVideo = document.getElementById("btn-video");
    if (btnVideo) {
        btnVideo.addEventListener("click", function () {
            const choosingSection = document.querySelector(".video");

           window.pulouConteudo = true;
           document.getElementById('the-end').style.display = 'block';
           $("#the-end p").html('<span class="title orange-dark">Muito Bem!</span> Você pulou direto para o vídeo e pode fazer a avaliação.');
    

            if (choosingSection) {
                choosingSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            } 
        });
    } 

    $("#img-zoom").on("click", function () {
        $(this).toggleClass("active");

        if ($(this).hasClass("active")) {
            $(this).css("cursor", "url('https://cdn.jsdelivr.net/npm/bootstrap-icons/font/icons/zoom-out.svg'), zoom-out");
        } else {
            $(this).css("cursor", "url('https://cdn.jsdelivr.net/npm/bootstrap-icons/font/icons/zoom-in.svg'), zoom-in");
        }
    });



    $("video").on("click", function () {
        var videoOffset = $(this).offset().top;
        var videoHeight = $(this).outerHeight();
        var windowHeight = $(window).height();
        var scrollTo = videoOffset - (windowHeight / 2) + (videoHeight / 2);

        $("html, body").animate({
            scrollTop: scrollTo
        }, 500); 
    });
}
