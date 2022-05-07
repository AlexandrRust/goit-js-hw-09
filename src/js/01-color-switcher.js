const refs = {
    body: document.querySelector('body'),
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

let styleColor = null;

function colorStyle() {
    refs.body.style.backgroundColor = getRandomHexColor();
};

refs.btnStart.addEventListener('click', () => {
    styleColor = setInterval(colorStyle, 1000);
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;
});
    
refs.btnStop.addEventListener('click', () => {
    clearInterval(styleColor);
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;
})
    

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }