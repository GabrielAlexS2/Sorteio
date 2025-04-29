const display = document.getElementById('HeaderCalculadora');
const botoes = document.querySelectorAll('button');
let contaMat = '';

botoes.forEach(botao => {
    botao.addEventListener('click', () => {
        const botoes = botao.innerText;

        if (botoes === '=') {
            contaMat = contaMat.replace(',', '.');
            if(contaMat.includes('/0')){
                display.innerText = '1';
                contaMat = '';
            }else{
                display.innerText = eval(contaMat);
            }
        }else if (botoes === 'Mc'){
            display.innerText = '0';
            contaMat = '';
        }else if(botoes === 'M+' || botoes === 'M-'){
            display.innerText = 'Não foi implementado!'
        }
         else {
            contaMat = contaMat + botoes;
            display.innerText = contaMat;
        }
    });
});
