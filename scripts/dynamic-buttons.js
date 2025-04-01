const clickedButtons = new Set();
window.dynamicButtonsViewed = false;

function dynamicButtons(id, btnId) { 
    const buttons = document.querySelectorAll('.btn-dynamic');
    buttons.forEach(btn => btn.classList.remove('active'));

    document.getElementById(btnId).classList.add('active');

    document.querySelectorAll('.info').forEach(div => {
        div.style.display = 'none';
        div.classList.remove('show');
    });

    const element = document.getElementById(id);
    element.style.display = 'flex';
    setTimeout(() => {
        element.classList.add('show');
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 10);

    document.getElementById('initial-msg').style.display = 'none';

    clickedButtons.add(btnId);

    if (clickedButtons.size === buttons.length) {
        window.dynamicButtonsViewed = true;
    }

    if (window.dynamicButtonsViewed && window.carouselViewed) {
        document.getElementById('the-end').style.display = 'block';
        document.getElementById('the-end').scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}
