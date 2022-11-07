let selector = seletor => document.querySelector(`${seletor}`)
let selectorAll = seletor => document.querySelectorAll(`${seletor}`)

let cabecalho = selector('.d-1--info-aviso span')
let cargo = selector('.d-1--info-cargo span')
let numeroTxt = selector('.d-1--info-numero')
let numeroCaixa = selector('.d-1--info-numeroCaixa')
let infoCandidato = selectorAll('.d-1--info-candidato p')
let imagem = selector('aside')
let instrucao = selector('.d-2')
let etapaAtual = 0
let numero = ''
let votoNulo = false
let votoBranco = false
let votoConfirmado = false
let voto = []

function comecarEtapa(){
    let etapa = etapas[etapaAtual]

    numero = ''
    let numeroHtml = ''
    votoNulo = false
    votoBranco = false

    for(let i=0; i <= etapa.numeros-1; i++){
        if(i === 0){
            numeroHtml += '<div class="d-1--info-numeroCaixa pisca"></div>'
        }else{
            numeroHtml += '<div class="d-1--info-numeroCaixa"></div>'
        }
    }

    cabecalho.style.opacity = 0
    cargo.innerHTML = etapa.cargo
    selector('.d-1--info-numeros').style.display = 'block'
    numeroTxt.innerHTML = numeroHtml
    imagem.style.opacity = 0
    infoCandidato.forEach(info => info.style.display = 'none')
    instrucao.style.opacity = 0
    selectorAll('aside .image').forEach(imagem => imagem.style.display = 'none')
    selector(`.d-1--info-candidato p:nth-child(1)`).style.display = 'none'
    selector(`.d-1--info-candidato p:nth-child(2)`).style.display = 'none'
}

function atualizaInterface(){

    const getCandidato = (etapa, n) => {
        let candidatos = etapas[etapa].candidatos
        let candidato = candidatos.find(item => item.numero.slice(0, n) === numero)
        verificar = n === 2 && candidato == undefined ? votoNulo = true : votoNulo = false
        return candidato
    }

    const mostrarInfo = (n, posicao, info, cargo , erro, avisoErro)=>{
        let candidato = getCandidato(etapaAtual, n)
        
        if(candidato !== undefined){
            let cargoInfo
            verificar = cargo === 'partido' ? cargoInfo = candidato.partido : cargoInfo = candidato.nome
            selector(`.d-1--info-candidato p:nth-child(${posicao})`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(${posicao})`).innerHTML = `${info}: <span>${cargoInfo}</span>`
        }else{
            selector(`.d-1--info-candidato p:nth-child(1)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(1)`).innerHTML = erro
            selector(`.d-1--info-candidato p:nth-child(2)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(2)`).style.fontSize = '2rem'
            selector(`.d-1--info-candidato p:nth-child(2)`).style.top = ''
            selector(`.d-1--info-candidato p:nth-child(2)`).style.bottom = '5px'
            selector(`.d-1--info-candidato p:nth-child(2)`).innerHTML = avisoErro
        }
    }
    
    if(numero.length === 2 && etapaAtual == 0){
        mostrarInfo(2, 4, 'Partido','partido', 'número errado', 'voto nulo')
        cabecalho.style.opacity = 1
        instrucao.style.opacity = 1
        
    }else if(etapaAtual == 0 && votoNulo == false){
        let candidato = getCandidato(0, 5)
        mostrarInfo(5, 3, 'Nome', '', 'candidato inexistente', 'voto de legenda')

        if(candidato !== undefined){
            selectorAll('aside .image')[0].style.display = `block`
            selectorAll('aside .image img')[0].src = candidato.fotos[0].url
            selectorAll('aside .image p')[0].innerHTML = candidato.fotos[0].legenda
            imagem.style.opacity = 1
        } 
    }else{
        let candidato = getCandidato(1, 2)

        if(candidato !== undefined){
            selector(`.d-1--info-candidato p:nth-child(3)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(3)`).innerHTML = `Nome: <span>${candidato.nome}</span>`
            selector(`.d-1--info-candidato p:nth-child(4)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(4)`).innerHTML = `Partido: <span>${candidato.partido}</span>`
            selector(`.d-1--info-candidato p:nth-child(5)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(5)`).innerHTML = `Vice-Prefeito: <span>${candidato.vicePrefeito}</span>`

            selectorAll('aside .image').forEach(div => div.style.display = `block`)
            selectorAll('aside .image img')[0].src = candidato.fotos[0].url
            selector('aside .image.small img').src = candidato.fotos[1].url
            selectorAll('aside .image p')[0].innerHTML = candidato.fotos[0].legenda
            selector('aside .image.small p').innerHTML = candidato.fotos[1].legenda
            imagem.style.opacity = 1
        }else{
            selector(`.d-1--info-candidato p:nth-child(1)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(1)`).innerHTML = "Número errado"
            selector(`.d-1--info-candidato p:nth-child(2)`).style.display = 'block'
            selector(`.d-1--info-candidato p:nth-child(2)`).style.fontSize = '2rem'
            selector(`.d-1--info-candidato p:nth-child(2)`).style.top = ''
            selector(`.d-1--info-candidato p:nth-child(2)`).style.bottom = '5px'
            selector(`.d-1--info-candidato p:nth-child(2)`).innerHTML = 'Voto nulo'
        }

        cabecalho.style.opacity = 1
        instrucao.style.opacity = 1
    }

    

    
    
}

selectorAll('.teclado--botao').forEach(tecla => tecla.addEventListener('click', e =>{
        switch(tecla.innerHTML){
            case 'branco':
                branco()
                break
            case 'corrige':
                comecarEtapa()
                break
            case 'confirma':
                confirma()
                break
            default:
                let elementoNumero = selector('.d-1--info-numeroCaixa.pisca')
                if(elementoNumero !== null){
                    elementoNumero.innerHTML = tecla.innerHTML
                    numero = `${numero}${tecla.innerHTML}`

                    elementoNumero.classList.remove('pisca')
                    if(numero.length === 2){
                        atualizaInterface()
                    }
                    verificar = elementoNumero.nextElementSibling !== null ? elementoNumero.nextElementSibling.classList.add('pisca') : atualizaInterface()
                    
                }
        }
        
}))

function branco(){
    if(numero.length === 0){
        votoBranco = true
        cabecalho.style.opacity = 1
        selector('.d-1--info-numeros').style.display = 'none'
        selector(`.d-1--info-candidato p:nth-child(2)`).style.display = 'block'
        selector(`.d-1--info-candidato p:nth-child(2)`).style.fontSize = '2rem'
        selector(`.d-1--info-candidato p:nth-child(2)`).style.top = '20px'
        selector(`.d-1--info-candidato p:nth-child(2)`).innerHTML = 'Voto em branco'
    }else{
        window.alert('Para votar em BRANCO o campo de voto deve estar vazio.')
    }
}

function confirma(){
    if(votoBranco){
        votoConfirmado = true
        voto.push({
            etapa: etapas[etapaAtual].cargo,
            voto: 'BRANCO'
        })
    }else if(votoNulo){
        votoConfirmado = true
        voto.push({
            etapa: etapas[etapaAtual].cargo,
            voto: 'NULO'
        })
    }else if(numero.length === etapas[etapaAtual].numeros){
        votoConfirmado = true
        voto.push({
            etapa: etapas[etapaAtual].cargo,
            voto: numero
        })
    }


    if(votoConfirmado){
        etapaAtual++
        votoConfirmado = false
        if(etapas[etapaAtual] !== undefined){
            comecarEtapa()
        }else{
            console.log(voto)
            etapaAtual = 0
            selector('.d-1').style.display = 'none'
            selector('.d-2').style.display = 'none'
            selector('.fim').style.display = 'flex'
        
            setTimeout(()=> {
                selector('.fim').style.display = 'none'
                selector('.d-1').style.display = 'flex'
                selector('.d-2').style.display = 'flex'
                comecarEtapa()
            }, 2000)
            
        }
    }
    
}


comecarEtapa()
