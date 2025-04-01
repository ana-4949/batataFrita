$(document).ready(function () {
    let tentativaMulti = 0;
    let tentativaVF = 0;
    const tentaMax = 2;

    const gabaritoMulti = [true, false, false];
    let respostaMulti = [false, false, false];

    const gabaritoVF = [true, false, true, false];
    let respostaVF = [];

    let isMultiDone = false;
    let isVFiDone = false;

    function reset() {
        $('.multi-choice ol li a').removeClass('selected').prop('disabled', false);
    }

    function mostrarPopup(type, pergunta) {
        if (type === 'correto') {
            $(`.feedback-correto[data-pergunta="${pergunta}"]`).show();
            $(`.feedback-try[data-pergunta="${pergunta}"]`).hide();
            $(`.feedback-incorreto[data-pergunta="${pergunta}"]`).hide();
        } else if (type === 'tentativa') {
            $(`.feedback-correto[data-pergunta="${pergunta}"]`).hide();
            $(`.feedback-try[data-pergunta="${pergunta}"]`).show();
            $(`.feedback-incorreto[data-pergunta="${pergunta}"]`).hide();
        } else if (type === 'erro') {
            $(`.feedback-correto[data-pergunta="${pergunta}"]`).hide();
            $(`.feedback-try[data-pergunta="${pergunta}"]`).hide();
            $(`.feedback-incorreto[data-pergunta="${pergunta}"]`).show();
        }
        $(`.btn-confirmar[data-pergunta="${pergunta}"]`).hide();

        if (pergunta === "multi-choice") {
            $('.multi-choice ol li a').prop('disabled', true);
        } else if (pergunta === "verdadeiro-falso") {
            $('.btn-vf').prop('disabled', true);
        }
    }

    $('.multi-choice ol li a').on('click', function () {
        if (isMultiDone) return;

        const index = $(this).parent().index();
        reset();
        $(this).addClass('selected');
        respostaMulti[index] = true;

        if (!isMultiDone) {
            $('.btn-confirmar[data-pergunta="multi-choice"]').show();
        }
    });

    
    function multiDisableEmAll() {
        $('.multi-choice ol li a').addClass('disabled-cursor').prop('disabled', true);
    }


    $('.btn-confirmar[data-pergunta="multi-choice"]').on('click', function () {
        if (JSON.stringify(gabaritoMulti) === JSON.stringify(respostaMulti)) {
            mostrarPopup('correto', 'multi-choice');
            isMultiDone = true;
            multiDisableEmAll();
        } else {
            tentativaMulti++;
            if (tentativaMulti < tentaMax) {
                mostrarPopup('tentativa', 'multi-choice');
            } else {
                mostrarPopup('erro', 'multi-choice');
                isMultiDone = true;
                multiDisableEmAll();
            }
        }
    });


    function VFDisableEmAll() {
        $('.btn-vf').addClass('disabled-cursor').prop('disabled', true);
    }
    

    function mostrarPopupVF(type) {
        if (type === 'correto') {
            $('.feedback-correto[data-pergunta="verdadeiro-falso"]').show();
            $('.feedback-try[data-pergunta="verdadeiro-falso"]').hide();
            $('.feedback-incorreto[data-pergunta="verdadeiro-falso"]').hide();
            isVFiDone = true;
            VFDisableEmAll();
        } else if (type === 'tentativa') {
            $('.feedback-correto[data-pergunta="verdadeiro-falso"]').hide();
            $('.feedback-try[data-pergunta="verdadeiro-falso"]').show();
            $('.feedback-incorreto[data-pergunta="verdadeiro-falso"]').hide();
        } else if (type === 'erro') {
            $('.feedback-correto[data-pergunta="verdadeiro-falso"]').hide();
            $('.feedback-try[data-pergunta="verdadeiro-falso"]').hide();
            $('.feedback-incorreto[data-pergunta="verdadeiro-falso"]').show();
            isVFiDone = true;
            VFDisableEmAll();
        }

        $('.btn-confirmar[data-pergunta="verdadeiro-falso"]').hide();
        if (isVFiDone) {
            $('.btn-vf').prop('disabled', true);
        }



    }

    $('.btn-vf').on('click', function () {
        const resposta = $(this).data('resposta');
        const index = $(this).closest('.buttons-vf').data('index'); 

        
        if (index === undefined) {
            console.error("Erro: data-index não encontrado");
            return;
        }

        if (resposta === 'V') {
            $(this).addClass('selected');
            $(this).siblings('.btn-vf[data-resposta="F"]').removeClass('selected');
            respostaVF[index] = true;
        } else {
            respostaVF[index] = false;
            $(this).addClass('selected');
            $(this).siblings('.btn-vf[data-resposta="V"]').removeClass('selected');
        }

        // console.log("index", index);
        // console.log("respostaVF", respostaVF);


        if (respostaVF.length === 4 && respostaVF.every(val => val !== undefined)) {
            $('.btn-confirmar[data-pergunta="verdadeiro-falso"]').show();
        }
    });

   



    $('.btn-confirmar[data-pergunta="verdadeiro-falso"]').on('click', function () {
        if (JSON.stringify(gabaritoVF) === JSON.stringify(respostaVF)) {
            mostrarPopupVF('correto');
        } else {
            tentativaVF++;
            if (tentativaVF < tentaMax) {
                mostrarPopupVF('tentativa');
            } else {
                mostrarPopupVF('erro');
            }
        }
    });
});