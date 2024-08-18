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
    let continuando = false
    let zero = 0
    verify()
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
    function tudodozero(){
    if (firsttime) {
        builtlist = [];
        [mora, dano, upgrades, lvlallow, lvlallowed,clicks] = [0, 1, 1, 1, 1,0]
        aleat = false
        numberedit('vezes', '1')
        numberedit('total', '-2147483648')
        numberedit('mora', '0')
    }}
    function savemanual() {
        localStorage.setItem('dano', JSON.stringify(dano))
        localStorage.setItem('mora', JSON.stringify(mora))
        localStorage.setItem('upgrades', JSON.stringify(upgrades))
        localStorage.setItem('builtlist', JSON.stringify(builtlist))
        localStorage.setItem('lvlallow', JSON.stringify(lvlallow))
        localStorage.setItem('lvlallowed', JSON.stringify(lvlallowed))
        localStorage.setItem('aleat', JSON.stringify(aleat))
        localStorage.setItem('clicks', JSON.stringify(clicks))
    }
    function cantAfford(elemento) {
        const delay = 1000;
        if (upg.classList.contains('comprado')) return;
        elemento.classList.add('erro');
        setTimeout(function () {
            elemento.classList.remove('erro')
        }, delay);
        return;
    };
    function random(min, max) {
        return Math.ceil(Math.random() * (max - min) + min)
    }
    function aparece(div, div2 = null) {
        if (document.querySelector(div).classList.contains('desativado')) {
            document.querySelector(div).classList.remove('desativado')
        }
        else { document.querySelector(div).classList.add('desativado') }
        if (div2) document.querySelector(div2).classList.add('desativado')
    }
    function carga(itemid) {
        //carga: carrega|retorna o item sem parse (analisar, parse é tirar do JSON e retornar ao original)
        return JSON.parse(localStorage.getItem(itemid))
    }
    function numberedit(element, inner = '-2147483648') {
        //função para colocar o innerHTML e innerText ao abrir o jogo 
        const total = qtd.querySelector('.total')
        if (element === 'total') total.innerText = inner + ' de dano'
        if (element === 'vezes') vezes.innerHTML = inner + 'x'
        if (element === 'mora') morashow.innerText = inner
        if (element === 'built') {
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
        if (!carga('mora') || !carga('dano') || !carga('builtlist')) firsttime = true
    }
    function comprado(item) {
        upg.classList.add('comprado');
        builtlist.push(`${zero}${item}`)
        savemanual()
    };
    function espera(funcao, tempo = 10) {
        setTimeout(funcao, tempo)
    }
    function jack(e) {
        if (e.key === 'j') {
            if (preco !== 0) {
                preco = 0
                todos = document.querySelectorAll('.preco')
                for (cadatabela of todos) cadatabela.innerText = 0 + ' Mora'
            }
            else preco = 5
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
    function inicio(vai) {
        if (vai) {
            menu.classList.add('desativado')
            document.querySelector('section').classList.remove('desativado')
        }
        if (!vai) {
            menu.classList.remove('desativado')
            document.querySelector('section').classList.add('desativado')
        }
    }
    function mute(som) {
        const sommenu = document.querySelector('.som-menu')
        if (som) {
            sommenu.src = localStorage.getItem('musica') || "./assets/audio/Resonance HOME.mp3"
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
    function setarmusica(botao = 0) {
        if (botao === 1) return "./assets/audio/Resonance HOME.mp3"
        if (botao === 2) return "./assets/audio/I Feel It Coming.mp3"
        if (botao === 3) return "./assets/audio/Ritmadinha Magnífica.mp3"
        if (botao === 4) return "./assets/audio/Ritmada Celestial.mp3"
        if (botao === 5) return "./assets/audio/Une ile.mp3"
        if (botao === 6) return "./assets/audio/Piloto.mp3"
        if (botao === 7) return "./assets/audio/Out of Time.mp3"
        if (botao === 8) return "./assets/audio/Glorious morning.mp3"
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
                    tantodebuttons.push(zero);
                    upg.classList.add(`lvl${zero}`);
                    upg.querySelector('.preco').innerText = custo + ' Mora';
                    if (custo >= 10000) upg.querySelector('.preco').innerText = convert(custo) + ' Mora'
                    if (e.target === upg) {
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
                    if (e.target === upg) {
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
                console.log(clicks)
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
        if (dano > 262000 && upgrades === 9) {
            if (body.childElementCount <= 6 &&!continuando){
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
            img.src = 'https://i.ytimg.com/vi/CCdTu4FdfTQ/maxresdefault.jpg'
            qtd.querySelector('.total').style = corpyro
            if (propriety === 'dmgcolor') return corpyro
        }
        else if (dano > 60000) {
            img.src = 'https://upload-os-bbs.hoyolab.com/upload/2022/09/10/124817022/43f57df4182d9fdaca00c4e01e16613d_121478840972213191.jpg?x-oss-process=image%2Fresize%2Cs_1000%2Fauto-orient%2C0%2Finterlace%2C1%2Fformat%2Cwebp%2Fquality%2Cq_80'
            qtd.querySelector('.total').style = coranemo
            if (propriety === 'dmgcolor') return coranemo
        }
        else if (dano > 10000) {
            img.src = 'https://fextralife.com/wp-content/uploads/2020/11/charged-attack-damage.jpg'
            qtd.querySelector('.total').style = corpyro
            if (propriety === 'dmgcolor') return corpyro
        }
        else if (dano > 4000) {
            img.src = 'https://static.wikia.nocookie.net/gensin-impact/images/6/6a/Damage.png/revision/latest?cb=20230209045206'
            qtd.querySelector('.total').style = corhydro
            if (propriety === 'dmgcolor') return corhydro
        }
        else if (dano > 1000) {
            img.src = '../clicker/assets/img/dano1000.png'
            qtd.querySelector('.total').style = corhydro
            if (propriety === 'dmgcolor') return corhydro
        }
        else if (dano > 100) {
            img.src = 'https://i.ytimg.com/vi/QcfH3ilLUBY/mqdefault.jpg'
            qtd.querySelector('.total').style = corfisico
            if (propriety === 'dmgcolor') return corfisico
        }
        else if (dano >= 1) {
            img.src = '../clicker/assets/img/dano1.png'
            qtd.querySelector('.total').style = corgeo
            if (propriety === 'dmgcolor') return corgeo
        }
        function continua() {
            continuando = true
            body.removeChild(section)
        }
        function reseta() {
            firsttime = true
            tudodozero()
            numberedit('built')
            body.removeChild(section)
        }
    }
    function dmgshow(dano) {
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

    function executar() {
        aumenta()
    }
    executar()
}
setTimeout(escopo(), 10)
//dentro das div: aumentar fonte, criar um scroll pras musicas, colocar um p
//arrumar a div menu-buttons e deixar
//a h1 menos espaçada no mobile, colocar as musicas


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