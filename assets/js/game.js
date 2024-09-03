function escopo() {
    const img = document.querySelector('.clicavel');
    const qtd = document.querySelector('.qtd');
    const morashow = document.querySelector('.mora');
    const listabuttons = document.querySelectorAll('.upgbutton');
    const listaeqps = document.querySelectorAll('.eqpbutton')
    const personagens = document.querySelector('.paginas').querySelector('.personagens')
    const equipamentos = document.querySelector('.paginas').querySelector('.equipamentos')
    const dmgbox = document.querySelector('.dmg-box')
    const menu = document.querySelector('.menu')
    const playbutton = menu.querySelector('.play')
    const menubutton = document.querySelector('.menubutton')
    const vezes = qtd.querySelector('.vezes');
    const p = document.createElement('p');
    qtd.appendChild(p).classList.add('total');
    let firsttime = false
    let continuando = carga('continuando')
    let zero = 0
    verify() // ve se eh a primeira vez e seta firsttime como true
    let builtlist = carga('builtlist')
    let musicaatual
    let [mora, upavel, preco] = [carga('mora'), true, 5];
    let dano = carga('dano')
    let upgrades = carga('upgrades')
    let [lvlallow, lvlallowed] = [carga('lvlallow'), carga('lvlallowed')]
    let aleat = carga('aleat')
    let clicks = carga('clicks')
    numberedit('vezes', upgrades)
    numberedit('total', Math.floor(dano))
    numberedit('mora', mora)
    load()
    tudodozero()
    numberedit('built')
    function tudodozero(){//se first time for true reseta tudo
    if (firsttime) {//se for primeira vez seta todos os valores para isso
        builtlist = [];//builtlist eh o array que vai salvar todos os valores
        [mora, dano, upgrades, lvlallow, lvlallowed,clicks] = [0, 1, 1, 1, 1,0]
        aleat = false
        continuando = false
        numberedit('vezes', '1')
        numberedit('total', '-2147483648')
        numberedit('mora', '0')
    }}
    function savemanual() {//salvar variaveis no armazenamento local para salvar o progresso
        localStorage.setItem('dano', JSON.stringify(dano))
        localStorage.setItem('mora', JSON.stringify(mora))
        localStorage.setItem('upgrades', JSON.stringify(upgrades))
        localStorage.setItem('builtlist', JSON.stringify(builtlist))
        localStorage.setItem('lvlallow', JSON.stringify(lvlallow))
        localStorage.setItem('lvlallowed', JSON.stringify(lvlallowed))
        localStorage.setItem('aleat', JSON.stringify(aleat))
        localStorage.setItem('clicks', JSON.stringify(clicks))
        localStorage.setItem('continuando', JSON.stringify(continuando))
    }
    function cantAfford(elemento) {//funcao para quando n for possivel comprar (mora < custo)
        const delay = 1000;
        if (upg.classList.contains('comprado')) return;
        elemento.classList.add('erro');
        setTimeout(function () {
            elemento.classList.remove('erro')
        }, delay);
        return;
    };
    function random(min, max) {//funcao random padrao
        return Math.ceil(Math.random() * (max - min) + min)
    }
    function aparece(div, div2 = null) {
        if (document.querySelector(div).classList.contains('desativado')) {
            document.querySelector(div).classList.remove('desativado')
        }
        else { document.querySelector(div).classList.add('desativado') }
        if (div2) document.querySelector(div2).classList.add('desativado')
    }
    function carga(itemid) {//pega o item salvo no localStorage
        //carga: carrega|retorna o item sem parse (analisar, parse é tirar do JSON e retornar ao original)
        return JSON.parse(localStorage.getItem(itemid))
    }
    function numberedit(element, inner = '-2147483648') {//funcao para colocar o innerHTML e innerText ao abrir o jogo 
        const total = qtd.querySelector('.total')
        switch(element){
            case 'total': total.innerText = inner + ' de dano'
            break
            case 'vezes': vezes.innerHTML = inner + 'x'
            break
            case 'mora': morashow.innerText = inner
            break
            case 'built': 
            for (upg of listabuttons) {
                zero++
                if (builtlist.includes(`${zero}p`)) upg.classList.add('comprado')
                else( upg.classList.remove('comprado'))
            }
            zero = 0
            for (upg of listaeqps) {
                zero++
                if (builtlist.includes(`${zero}e`)) upg.classList.add('comprado')
                else( upg.classList.remove('comprado'))
            }
            zero = 0
        }
        }
    function verify() {
        if (!carga('dano') || !carga('builtlist')) firsttime = true
    }
    function comprado(item) {
        upg.classList.add('comprado');
        builtlist.push(`${zero}${item}`)
        savemanual()
    };
    function espera(funcao, tempo = 10) {
        setTimeout(funcao, tempo)
    }
    function jack(e) {//cheat
        if (e.key === 'j') {
            todos = document.querySelectorAll('.preco')
            if (preco !== 0) {
                preco = 0
                for (cadatabela of todos) cadatabela.innerText = 0 + ' Mora'
            }
            else{
                preco = 5
                for (cadatabela of todos) cadatabela.innerText = 'troque a pag.'
            }
        }
    }
    function convert(numero) {
        const dezM = 10000000
        const cemka = 100000
        numero = numero.toString()
        if (numero < cemka) return numero[0] + numero[1] + ',' + numero[2] + numero[1] + 'k'
        if (numero >= cemka && numero < dezM / 10) return numero[0] + numero[1] + numero[2] + ',' + numero[1] + numero[2] + 'k'
        if (numero < dezM) return numero[0] + ',' + numero[1] + numero[2] + 'M'
        if (numero > dezM) return numero[0] + numero[1] + ',' + numero[2] + numero[3] + 'M'
        if (numero > dezM * 100) return numero[0] + numero[1] + numero[2] + ',' + numero[3] + 'M'
    }
    function trocapag(pagina1) {
        for (upg of listaeqps) {
            if (pagina1) upg.classList.add('desativado')
            if (!pagina1) upg.classList.remove('desativado')
        }
        for (upg of listabuttons) {
            if (pagina1) upg.classList.remove('desativado')
            if (!pagina1) upg.classList.add('desativado')
        }
    }
    function inicio(vai) {//se carrega o menu ou nao
        if (vai) {
            menu.classList.add('desativado')
            document.querySelector('section').classList.remove('desativado')
        }
        if (!vai) {
            menu.classList.remove('desativado')
            load()
            document.querySelector('section').classList.add('desativado')
        }
    }
    function mute(som) {//funcao para as musicas
        const sommenu = document.querySelector('.som-menu')
        if (som) {
            sommenu.src = localStorage.getItem('musica') || "./assets/audio/Feel-good.mp3"
        }
        else { sommenu.src = '#' }
    }
    function selectAll(elemento, event) {
        if (typeof elemento === 'object') {
            for (i of elemento) {
                if (event.target === i) return true
            }
        }
    }
    function setarmusica(botao = 0) {//pega os arquivos das musicas
        if (botao === 1) return "./assets/audio/Feel-good.mp3"
        if (botao === 2) return "./assets/audio/Why-we-lose.mp3"
        if (botao === 3) return "./assets/audio/Symbolism.mp3"
        if (botao === 4) return "./assets/audio/Faded.mp3"
        if (botao === 5) return "./assets/audio/Une-ile.mp3"
        if (botao === 6) return "./assets/audio/Heroes-tonight.mp3"
        if (botao === 7) return "./assets/audio/On-e-on.mp3"
        if (botao === 8) return "./assets/audio/Glorious-morning.mp3"
    }
    function aumenta() {
        let [m1, m2] = [2, 4];
        const mutebutton = document.querySelector('.mute')
        if (vezes.innerHTML) numberedit()
        qtd.querySelector('.total').style = 'color:#fb9e0c'
        document.addEventListener('keyup', e => jack(e))
        document.addEventListener('click', (e) => {
            if (document.querySelector('.clickertitle').innerText != 'Clicker') {
                document.querySelector('.clickertitle').innerText = 'Clicker';
            }
            let tantodebuttons = [];

            setTimeout(function () {
                for (upg of listabuttons) {
                    zero++;
                    upavel = true
                    if (!aleat) aleat = random(2, 5)
                    let custo = Math.ceil((zero ** zero / 10) * m1 * preco * aleat)
                    if (zero >= 8) custo = Math.ceil((zero ** zero / 50) * m1 * preco * aleat)
                    tantodebuttons.push(zero);//varias linhas que poderiam estar em outro lugar...
                    upg.classList.add(`lvl${zero}`);
                    upg.querySelector('.preco').innerText = custo + ' Mora';
                    if (custo >= 10000) upg.querySelector('.preco').innerText = convert(custo) + ' Mora'
                    if (e.target == upg || e.target == upg.children[0]) {
                        if (mora - custo < 0 || lvlallow < zero) {
                            upavel = false;
                            cantAfford(upg);
                        };
                        if (upg.classList.contains('comprado') || !upavel) return;
                        mora = mora - custo;
                        upgrades = zero + 1;
                        lvlallow++
                        numberedit('vezes', upgrades);
                        numberedit('mora', mora);
                        comprado('p')
                        load()
                        savemanual()
                    };
                };
                zero = 0
                for (upg of listaeqps) {
                    zero++;
                    upavel = true
                    if (!aleat) aleat = random(2, 5)
                    let custo = Math.ceil((zero ** zero / 10) * m2 * preco * aleat)
                    if (zero >= 7) custo = Math.ceil((zero ** zero / 120) * m2 * preco * aleat)
                    if (zero > listaeqps.length - 1) custo = Math.ceil((zero ** zero / 1020) * m2 * preco * aleat)
                    tantodebuttons.push(zero);
                    upg.classList.add(`lvl${zero}`);
                    upg.querySelector('.preco').innerText = custo + ' Mora';
                    if (custo >= 10000) upg.querySelector('.preco').innerText = convert(custo) + ' Mora'
                    if (e.target === upg || e.target == upg.children[0]) {
                        if (mora - custo < 0 || lvlallowed < zero) {
                            upavel = false;
                            cantAfford(upg);
                        };
                        if (upg.classList.contains('comprado') || !upavel) return;
                        mora = mora - custo;
                        dano = dano * m2
                        lvlallowed++
                        numberedit('total', Math.floor(dano))
                        numberedit('mora', mora);
                        comprado('e');
                        load()
                        savemanual()
                    };
                };
                zero = 0
            }, 100);
            if (e.target === equipamentos) trocapag(false)
            if (e.target === personagens) trocapag(true)

            if (e.target === img || selectAll(dmgbox.querySelectorAll('.dmg-effect'), e)) {
                if (mora > 10000000000) return
                upavel = true
                clicks++
                console.log(clicks + ' clicks')
                img.classList.add('efeito')
                setTimeout(function () {
                    img.classList.remove('efeito')
                }, 100)
                if (dano / 2 > 1) moraconta = Math.ceil(mora + dano / 2 * upgrades)
                else moraconta = Math.ceil(mora + dano * upgrades)
                mora = moraconta

                numberedit('total', Math.floor(dano))
                numberedit('mora', mora)
                load()
                dmgshow(dano)
                savemanual()
            }
            if (e.target === playbutton) {
                inicio(true)
                aparece('.musicas', '.musicas')
                aparece('.creditos', '.creditos')
            }
            if (e.target === menubutton) {
                inicio(false)
            }
            if (e.target === mutebutton) {
                mute(mutebutton.checked)
            }
            if (e.target === document.querySelector('.credit')) {
                aparece('.creditos', '.musicas')
            }
            if (e.target === document.querySelector('.choice')) {
                aparece('.musicas', '.creditos')
            }
            for (m of document.querySelectorAll('.msc-box')) {
                zero++
                if (e.target === m || e.target === m.querySelector('p')) {
                    musicaatual = setarmusica(zero)
                    localStorage.setItem('musica', musicaatual)
                    mute(mutebutton.checked)
                }
            }
            zero = 0
        })
    }
    function load(propriety) {
        const corfisico = 'color:#fff;text-shadow:gray 1.5px -1.5px, gray -1.5px 1.5px, gray 1.5px 1.5px, gray -1.5px -1.5px'
        const corhydro = 'color:#3ab9e1;text-shadow:rgb(75, 138, 170) 1.5px -1.5px, rgb(75, 138, 170) -1.5px 1.5px, rgb(75, 138, 170) 1.5px 1.5px, rgb(75, 138, 170) -1.5px -1.5px'
        const corpyro = 'color:#fb9e0c;text-shadow:rgb(139, 81, 27) 1.5px -1.5px, rgb(139, 81, 27) -1.5px 1.5px, rgb(139, 81, 27) 1.5px 1.5px, rgb(139, 81, 27) -1.5px -1.5px'
        const coranemo = 'color:#4cc7ac;text-shadow:rgb(15, 100, 81) 1.5px -1.5px, rgb(15, 100, 81) -1.5px 1.5px, rgb(15, 100, 81) 1.5px 1.5px, rgb(15, 100, 81) -1.5px -1.5px'
        const corgeo = 'color:#feca07;text-shadow:rgb(214, 159, 104) 1.5px -1.5px, rgb(214, 159, 104) -1.5px 1.5px, rgb(214, 159, 104) 1.5px 1.5px, rgb(214, 159, 104) -1.5px -1.5px'
        const section = document.createElement('section')
        const body = document.querySelector('body')
        const h61 = document.createElement('h6')
        const h62 = document.createElement('h6')
        const div = document.createElement('div')
        const resetbtn = document.querySelector('.menu-buttons').children[3]
        if(continuando){
            resetbtn.classList.add('reset','playstyle')
            resetbtn.innerHTML = 'Reiniciar'
            var val
            resetbtn.addEventListener('click',() => {
                val = confirm('Tem certeza que deseja reiniciar todo o progresso?')
                if(val){
                    resetbtn.setAttribute('style','display:none')
                    reseta()
                    }
            })
        }
        if (dano > 262000 && upgrades === 9) {
            if (body.childElementCount <= 7 && !continuando){
            body.appendChild(section).classList.add('parabens')
            body.querySelector('.parabens').innerText = 'Parabéns!'
            body.querySelector('.parabens').appendChild(div)
            div.appendChild(h61).classList.add('parabens-continua')
            div.appendChild(h62).classList.add('parabens-reseta')
            h61.title = 'Continua sem reiniciar o progresso'
            h62.title = 'Exclui todo o progresso para um novo jogo'
            h61.innerText = 'Continuar'
            h62.innerText = 'Resetar'
            h61.addEventListener('click', continua)
            h62.addEventListener('click', reseta)
        }}
         if (dano > 200000) {
            img.src = 'assets/img/dano200000.jpg'
            qtd.querySelector('.total').style = corpyro
            if (propriety === 'dmgcolor') return corpyro
        }
        else if (dano > 60000) {
            img.src = 'assets/img/dano60000.webp'
            qtd.querySelector('.total').style = coranemo
            if (propriety === 'dmgcolor') return coranemo
        }
        else if (dano > 10000) {
            img.src = 'assets/img/dano10000.webp'
            qtd.querySelector('.total').style = corpyro
            if (propriety === 'dmgcolor') return corpyro
        }
        else if (dano > 4000) {
            img.src = 'assets/img/dano4000.webp'
            qtd.querySelector('.total').style = corhydro
            if (propriety === 'dmgcolor') return corhydro
        }
        else if (dano > 1000) {
            img.src = 'assets/img/dano1000.png'
            qtd.querySelector('.total').style = corhydro
            if (propriety === 'dmgcolor') return corhydro
        }
        else if (dano > 100) {
            img.src = 'assets/img/dano100.jpg'
            qtd.querySelector('.total').style = corfisico
            if (propriety === 'dmgcolor') return corfisico
        }
        else if (dano >= 1) {
            img.src = 'assets/img/dano1.png'
            qtd.querySelector('.total').style = corgeo
            if (propriety === 'dmgcolor') return corgeo
        }
        function continua() {
            continuando = true
            savemanual()
            body.removeChild(section)
        }
        function reseta() {
            firsttime = true
            tudodozero()
            savemanual()
            numberedit('built')
            body.removeChild(section)
        }
    }
    function dmgshow(dano) {//funcao para mostrar os danos na tela
        const div = document.createElement('div')
        dmgbox.appendChild(div).classList.add('dmg-effect')
        div.innerText = dano
        let daninhos = dmgbox.querySelectorAll('.dmg-effect')
        let tamanhodaimg = random(290, -290)
        const randomposition = `right:${tamanhodaimg}px;${load('dmgcolor')}`
        for (d of daninhos) {
            if (d.attributes.length === 1) d.setAttribute('style', randomposition)
        }
        espera(function () { dmgbox.querySelector('.dmg-effect').remove() }, 2000)
    }

    aumenta()
}
setTimeout(escopo(), 10)
//arrumar mobile

    // function load() {
    //     const upg1 = 'upg1.html'
    //     const upg2 = 'upg2.html'
    //     espera(nav.addEventListener('click', (e) => {
    //         if (e.target.innerText === 'Personagens') {
    //             carregar(upg1);
    //         }
    //         if (e.target.innerText === 'Equipamentos') {
    //             carregar(upg2);
    //         };
    //     }))
    // };
    // async function carregar(link){
    //     try{
    //     const html = await fetch(link);
    //     if (html.status !== 100) throw new Error('Erro 40404');
    //     const htmltudo = await html.text();
    //     const num1 = htmltudo.indexOf('<!-- Code i')
    //     const num2 = htmltudo.indexOf('// ]]') + 16
    //     const htmlcerto = htmltudo.replace(htmltudo.slice(num1,num2),'')
    //     buton.innerHTML = htmlcerto;
    //     console.log(htmlcerto)
    //     }
    //     catch(e){
    //     console.log(e);
    //     };
    // };