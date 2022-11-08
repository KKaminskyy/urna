let selector = seletor => document.querySelector(`${seletor}`)
let selectorAll = seletor => document.querySelectorAll(`${seletor}`)
let etapaAtual = 0
let etapas = [
    {
        cargo: 'vereador',
        numeros: 5,
        candidatos: [
            {
                numero: '91001',
                nome: 'basketBall',
                partido: 'PEsp',
                fotos: [
                    {url:'assets/images/person01.jpg', legenda: 'vereador'}
                ]
            },
            {
                numero: '92002',
                nome: 'rock',
                partido: 'PMus',
                fotos: [
                    {url: 'assets/images/person04.jpg', legenda: 'vereador'}
                ]
            },
            {
                numero: '93004',
                nome: 'oktoberfest',
                partido: 'PFest',
                fotos: [
                    {url: 'assets/images/person08.jpg', legenda: 'vereador'}
                ]
            },
            {
                numero: '94007',
                nome: 'terraria',
                partido: 'PJ',
                fotos: [
                    {url: 'assets/images/person06.jpg', legenda: 'vereador'}
                ]
            }
        ]
    },
    {
        cargo: 'prefeito',
        numeros: 2,
        candidatos: [
            {
                numero: '91',
                nome: 'natação',
                partido: 'PEsp',
                vicePrefeito: 'Musculação',
                fotos: [
                    {url: 'assets/images/person02.jpg', legenda: 'prefeito'},
                    {url: 'assets/images/person05.jpg', legenda: 'vice-prefeito', small: true},
                ]
            },
            {
                numero: '92',
                nome: 'Heavy Metal',
                partido: 'PMus',
                vicePrefeito: 'Indie',
                fotos: [
                    {url: 'assets/images/person03.jpg', legenda: 'prefeito'},
                    {url: 'assets/images/person07.jpg', legenda: 'vice-prefeito', small: true},
                ]
            }
        ]
    }
]

function informacoesCandidatos(){
    let index = etapaAtual
    let candidatosGerais = etapas[index].candidatos
    selector('.candidato').innerHTML = ''

    candidatosGerais.map((candidato) => {
        let candidatoInfo = selector('.models .candidatos--candidato').cloneNode(true)
            candidatoInfo.querySelector('img').src = candidato.fotos[0].url
            candidatoInfo.querySelector('h1').innerHTML = candidato.partido
            candidatoInfo.querySelector('p').innerHTML = candidato.numero
        selector('.candidato').append(candidatoInfo)
        switch (index) {
            case 0:
                selector('.candidatos h1').innerHTML = 'vereadores'
                break;
        
            case 1:
                selector('.candidatos h1').innerHTML = 'prefeito'
                let vice = selector('.models .candidatos--vice').cloneNode(true)
                    vice.querySelector('img').src = candidato.fotos[1].url
                    vice.querySelector('h1').innerHTML = candidato.fotos[1].legenda
                    vice.querySelector('p').innerHTML = candidato.vicePrefeito
                selector('.candidato').append(vice)    
                break;
            }
            
            
            
  
    })
    

}