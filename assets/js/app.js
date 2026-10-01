
//function

const preparationGame = () => {
    let arrayImage = [
        'assets/img/person/error.png',
        'assets/img/person/fine.png',
        'assets/img/person/hi.png',
        'assets/img/person/money.png',
        'assets/img/person/say.png',
        'assets/img/person/superman.png',
        'assets/img/person/wanted.png',
        'assets/img/person/welcome.png',
    ];

    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
            
        }
    }

    let resultArrayOne = [...arrayImage];
    let resultArrayTwo = [...arrayImage];

    shuffle(resultArrayOne);
    shuffle(resultArrayTwo);

    let result = resultArrayOne.concat(resultArrayTwo)
    
    shuffle(result);
    
    return result;
}

const settingsHeader = (component) => {
    const newGameButtonElem = component.querySelector('.start-game');
    const newGameButton = () => {
        /*newGameButtonElem.addEventListener('click', (e) => {
            console.log(123)
        })*/
       console.log(newGameButtonElem)
        
    }
    newGameButton()
}

const settingsGame = (component) => {
    let gameCountResult = component.querySelector('.count-result span');
    
    const gameListElem = component.querySelector('.game-list');
    const gameCardsElems = component.querySelectorAll('.game-card');
    

    const showCardUser = () => {
        gameCardsElems.forEach((e) => {
            e.addEventListener('click', () => {
                if(!e.classList.contains('disabled')) {
                    e.classList.add('active');
                }
                if(component.querySelectorAll('.game-card.active').length == 2) {
                    gameListElem.classList.add('blocked');
                    let activeElems = component.querySelectorAll('.game-card.active');

                    let resultCards = [];
                    activeElems.forEach((e) => {
                        resultCards.push(e.querySelector('.game-card-open img').getAttribute('src'));
                        setTimeout(() => {
                            e.classList.remove('active');
                            gameListElem.classList.remove('blocked');
                        }, 800);
                    })
                    if(resultCards[0] == resultCards[1]) {
                        activeElems.forEach((e) => {
                            e.classList.add('disabled');
                        })
                        console.log(gameCountResult.textContent++)
                        //gameCountResult.textContent = Number(gameCountResult.textContent)++;
                    } else {
                        console.log('не ура')
                    }
                }
            })
        })
    }
    showCardUser();

}



const createComponent = (elem, className = [], attributes = {}, textElem = '') => {
    elem.classList.add(...className);

    Object.entries(attributes).forEach(([name, value]) => {
        elem.setAttribute(name, value);
    });

    if (textElem) {
        elem.textContent = textElem;
    }
    
    return elem;
}

const headerComponent = () => {
    const header = createComponent(
        document.createElement("header"), 
        ['header']
    );
    const container = createComponent(
        document.createElement("div"), 
        ['container']
    );
    const headerWrapper = createComponent(
        document.createElement("div"), 
        ['header-wrapper', 'f-jcsb-center']
    );
    const headerLogoOne = createComponent(
        document.createElement("a"), 
        ['header-logo'],
        {
            href: ''
        }
    );
    const headerLogoImageOne = createComponent(
        document.createElement("img"), 
        ['img-contain'],
        {
            src: 'assets/img/logo-rs.png',
            alt: 'RS School'
        }
    );
    const headerText = createComponent(
        document.createElement("div"), 
        ['header-text', 'f-dc-center-center']
    );
    const headerTextMain = createComponent(
        document.createElement("p"), 
        ['header-text__main'], 
        {},
        'Memory Game'
    );
    const headerTextYear = createComponent(
        document.createElement("p"), 
        ['header-text__year'], 
        {},
        '2026'
    );
    const headerLogoTwo = createComponent(
        document.createElement("a"), 
        ['header-logo'],
        {
            href: ''
        }
    );
    const headerLogoImageTwo = createComponent(
        document.createElement("img"), 
        ['img-contain'],
        {
            src: 'assets/img/github.png',
            alt: 'GitHub'
        }
    );
    const headerPanel = createComponent(
        document.createElement("div"), 
        ['header-panel', 'f-jcsb-center']
    );
    const headerPanelButtonNewGame = createComponent(
        document.createElement("button"), 
        ['header-panel__button', 'button', 'start-game'],
        {},
        'Новая игра'
    );
    const headerPanelButtonTableLeaders = createComponent(
        document.createElement("button"), 
        ['header-panel__button', 'button', 'table-game'],
        {},
        'Таблица лидеров'
    );
    header.append(container);

    container.append(headerWrapper);
    container.append(headerPanel);

    headerWrapper.append(headerLogoOne);
    headerWrapper.append(headerText);
    headerWrapper.append(headerLogoTwo);

    headerLogoOne.append(headerLogoImageOne);
    
    headerText.append(headerTextMain);
    headerText.append(headerTextYear);

    headerLogoTwo.append(headerLogoImageTwo);

    headerPanel.append(headerPanelButtonNewGame);
    headerPanel.append(headerPanelButtonTableLeaders);
    

    settingsHeader(header)
    return header;
}

const gameComponent = (arrayGame) => {
    const game = createComponent(
        document.createElement("section"), 
        ['game']
    );
    const container = createComponent(
        document.createElement("div"), 
        ['container']
    );
    const gameWrapper = createComponent(
        document.createElement("div"), 
        ['game-wrapper']
    );
    const gamePanel = createComponent(
        document.createElement("div"), 
        ['game-panel', 'f-jcsb-center']
    );
    const gamePanelTextOne = createComponent(
        document.createElement("p"), 
        ['game-panel__text', 'count-steps'],
        {},
        'Количество ходов: '
    );
    const gamePanelTextOneSpan = createComponent(
        document.createElement("span"), 
        [],
        {},
        '0'
    );
    const gamePanelTextTwo = createComponent(
        document.createElement("p"), 
        ['game-panel__text', 'count-result'], 
        {},
        'Найдено: '
    );
    const gamePanelTextTwoSpan = createComponent(
        document.createElement("span"), 
        [],
        {},
        '0'
    );
    const gameBlock = createComponent(
        document.createElement("div"), 
        ['game-block']
    );
    const gameList = createComponent(
        document.createElement("ul"), 
        ['game-list', 'flex', 'wrap']
    );

    game.append(container);
    container.append(gameWrapper);

    gameWrapper.append(gamePanel);

    gamePanel.append(gamePanelTextOne);
    gamePanelTextOne.append(gamePanelTextOneSpan);
    
    gamePanel.append(gamePanelTextTwo);
    gamePanelTextTwo.append(gamePanelTextTwoSpan);
    

    gameWrapper.append(gameBlock);
    gameBlock.append(gameList);
    
    for(let i = 0; i < 16; i++) {
        
        const gameCard = createComponent(
            document.createElement("li"), 
            ['game-card']
        );
        const gameCardClose = createComponent(
            document.createElement("div"),
            ['game-card-close', 'f-center-center']
        )
        const gameCardCloseImage = createComponent(
            document.createElement("img"), 
            ['img-contain'],
            {
                src: 'assets/img/logo-rs.png',
                alt: 'RS School'
            }
        );
        const gameCardOpen = createComponent(
            document.createElement("div"),
            ['game-card-open', 'f-center-center']
        )
        const gameCardOpenImage = createComponent(
            document.createElement("img"), 
            ['img-contain'],
            {
                src: arrayGame[i],
                alt: 'RS School'
            }
        );
        
        gameList.append(gameCard);
        
        gameCard.append(gameCardClose);
        gameCardClose.append(gameCardCloseImage);
        
        gameCard.append(gameCardOpen);
        gameCardOpen.append(gameCardOpenImage);
    }
    settingsGame(game);
    return game;
}


document.body.append(
    headerComponent(),
    gameComponent(preparationGame())
);

/*

headerTag.classList.add('header')
divTag.classList.add('container')
headerTag.appendChild(divTag)

document.body.append(headerTag);*/