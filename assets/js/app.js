
//function
const dateCurrent = () => {
    const date = new Date();

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
}

setTimeout(() => {
    document.body.append(
        modalComponent({
            type: 'win',
            resultCount: 13
        })
    );
}, 700);
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
    const leadersTableGameButtonElem = component.querySelector('.table-game');
    const newGameButton = () => {
        newGameButtonElem.addEventListener('click', (e) => {
            startGame()
        })
        
    //
    }
    newGameButton()

    const openLeadersTable = () => {
        leadersTableGameButtonElem.addEventListener('click', () => {
            document.body.append(
                modalComponent({
                    type: 'leaders'
                })
            );
        })
    }
    openLeadersTable()
}

const startGame = () => {
    currentGame.remove()

    currentGame = gameComponent(preparationGame());

    document.body.append(
        currentGame,
    );
}

const settingsGame = (component) => {
    let gameCountResult = component.querySelector('.count-result span.count');
    let gameCountSteps = component.querySelector('.count-steps span');
    
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
                    gameCountSteps.textContent++;
                    if(resultCards[0] == resultCards[1]) {
                        activeElems.forEach((e) => {
                            e.classList.add('disabled');
                        })
                        gameCountResult.textContent++;
                        endGame(gameCountSteps.textContent);
                    }
                }
            })
        })
    }
    showCardUser();

    const endGame = (countSteps) => {
        if(Number(gameCountResult.textContent) == 8) {
            setTimeout(() => {
                document.body.append(
                    modalComponent({
                        type: 'win',
                        resultCount: countSteps
                    })
                );
            }, 700);
        }
    }
}

const settingsModal = (component) => {
    const newGameButton = component.querySelector('.new-game');
    const closeButton = component.querySelector('.close-popup');

    if(closeButton) {
        const closeModal = () => {
            closeButton.addEventListener('click', () => {
                component.remove()
            })
        }
        closeModal();
    }

    if(newGameButton) {
        const newGameModal = () => {
            newGameButton.addEventListener('click', () => {
                component.remove()
                startGame()
            })
        }
        newGameModal();
    }
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
        ['count'],
        {},
        '0'
    );
    const gamePanelTextTwoSeparator = createComponent(
        document.createElement("span"), 
        [],
        {},
        ' / '
    );
    const gamePanelTextTwoSpanAll = createComponent(
        document.createElement("span"), 
        ['all'],
        {},
        '8'
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
    gamePanelTextTwo.append(gamePanelTextTwoSeparator);
    gamePanelTextTwo.append(gamePanelTextTwoSpanAll);
    

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

const modalComponent = ({
    type,
    resultCount
}) => {
    const popup = createComponent(
        document.createElement('div'),
        ['popup', 'open']
    )
    const popupWrapper = createComponent(
        document.createElement('div'),
        ['popup-wrapper']
    )
    const popupHeader = createComponent(
        document.createElement('p'),
        ['popup-header']
    )
    const popupBody = createComponent(
        document.createElement('div'),
        ['popup-body']
    )
    const popupBodyTitle = createComponent(
        document.createElement('p'),
        ['popup-body__title'],
        {},
        'Для победы Вам понадобилось'
    )
    const popupBodyResult = createComponent(
        document.createElement('div'),
        ['popup-body-result']
    )
    const popupBodyResultImg = createComponent(
        document.createElement('img'),
        ['popup-body-result-person'],
        {
            src: 'assets/img/person/superman.png',
            alt: 'RS School Person'
        }
    )
    const popupBodyResultCount = createComponent(
        document.createElement('p'),
        ['popup-body-result__count', 'f-center-center'],
        {},
        '0'
    )
    const popupBodyResultText = createComponent(
        document.createElement('p'),
        ['popup-body-result__text'],
        {},
        'Хода(ов)'
    )
    const popupBodyPanel = createComponent(
        document.createElement('div'),
        ['popup-body-panel'],
    )
    const popupBodyPanelText = createComponent(
        document.createElement('p'),
        ['popup-body-panel__text'],
        {},
        'Попробуем еще раз?'
    )
    const popupBodyPanelBtns = createComponent(
        document.createElement('div'),
        ['popup-body-panel-btns'],
    )
    const popupBodyPanelButtonNewGame = createComponent(
        document.createElement('button'),
        ['popup-body-panel__button', 'button', 'new-game'],
        {},
        'Новая игра'
    )
    const popupBodyPanelButtonClose = createComponent(
        document.createElement('button'),
        ['popup-body-panel__button', 'button', 'close-popup'],
        {},
        'Закрыть'
    )

    popup.append(popupWrapper);

    
    let resultGame = JSON.parse(localStorage.getItem('memoryLeaders')) || [];
    resultGame = [...resultGame].sort((a, b) => a.steps - b.steps)

    const modalWin = () => {
        
        popupWrapper.append(popupHeader);
        popupHeader.textContent = 'Победаааа!!!';

        popupWrapper.append(popupBody);

        popupBody.append(popupBodyTitle);
        popupBody.append(popupBodyResult);
        popupBody.append(popupBodyPanel);

        popupBodyResult.append(popupBodyResultCount);
        popupBodyResultCount.textContent = resultCount;

        popupBodyResult.append(popupBodyResultText);
        popupBodyResult.append(popupBodyResultImg);
        

        popupBodyPanel.append(popupBodyPanelText);
        popupBodyPanel.append(popupBodyPanelBtns);
        popupBodyPanelBtns.append(popupBodyPanelButtonNewGame);
        popupBodyPanelBtns.append(popupBodyPanelButtonClose);


        
        console.log([...resultGame]);
        if(resultGame.length >= 10) {
            for(let i = 0; i < resultGame.length; i++) {
                if (resultCount == resultGame[i].steps) {
                    break;
                } else if(resultCount <= resultGame[i].steps) {
                    resultGame.splice(i, 0, {
                        steps: Number(resultCount),
                        date: dateCurrent(),
                    })
                    if(resultGame.length > 10) {
                        resultGame.pop();
                    }
                    break;
                }
            }
        } else {
            resultGame.push({
                steps: Number(resultCount),
                date: dateCurrent(),
            })
        }
        localStorage.setItem('memoryLeaders', JSON.stringify(resultGame));
    }
    
    const modalTable = () => {

        const popupBodyTable = createComponent(
            document.createElement('div'),
            ['popup-body-table'],
        )
        const popupBodyTableHead = createComponent(
            document.createElement('div'),
            ['popup-body-table-head', 'f-center'],
        )
        const popupBodyTableBody = createComponent(
            document.createElement('div'),
            ['popup-body-table-inner'],
        )

        popup.append(popupWrapper);
        
        popupWrapper.append(popupHeader);
        popupHeader.textContent = 'Таблица лидеров';
        
        popupWrapper.append(popupBody);
        

        let results = JSON.parse(localStorage.getItem('memoryLeaders'));


        if(results != null) {
            popupBody.append(popupBodyTable);
            

            popupBodyTable.append(popupBodyTableHead);
            let headTable = ['Место', 'Количество ходов', 'Дата']
            for(let i = 0; i < headTable.length; i++) {
                const popupBodyTableCell = createComponent(
                    document.createElement('div'),
                    ['popup-body-table-cell', 'f-center-center'],
                )

                const popupBodyTableCellText = createComponent(
                    document.createElement('p'),
                    ['popup-body-table-cell__text'],
                    {},
                    headTable[i]
                )
                
                popupBodyTableHead.append(popupBodyTableCell);
                popupBodyTableCell.append(popupBodyTableCellText);
            }

            popupBodyTable.append(popupBodyTableBody);

            for(let i = 0; i < 10; i++) {
                const popupBodyTableBodyLine = createComponent(
                    document.createElement('div'),
                    ['popup-body-table-inner-line', 'flex'],
                )
                popupBodyTableBody.append(popupBodyTableBodyLine);

                for(let j = 0; j < 3; j++) {
                    if(j == 0) {
                        text = i;
                        text++
                    } else {
                        text = '-';
                    }
                    const popupBodyTableCell = createComponent(
                        document.createElement('div'),
                        ['popup-body-table-cell', 'f-center-center']
                    )

                    const popupBodyTableCellText = createComponent(
                        document.createElement('p'),
                        ['popup-body-table-cell__text'],
                        {},
                        text
                    )

                    if(j == 1) {
                        if(resultGame[i] != undefined) {
                            popupBodyTableCellText.textContent = resultGame[i].steps;
                        }
                    }
                    if(j == 2) {
                        if(resultGame[i] != undefined) {
                            popupBodyTableCellText.textContent = resultGame[i].date;
                        }
                    }
                    //console.log(resultGame[i])
                    popupBodyTableBodyLine.append(popupBodyTableCell);
                    popupBodyTableCell.append(popupBodyTableCellText);
                }

            }

            
            
        } else {
            popupBody.append(popupBodyResultImg);
            popupBodyResultImg.classList.add('normal')
            popupBodyResultImg.setAttribute('src', 'assets/img/person/fine.png');
            popupBody.append(popupBodyTitle);
            popupBodyTitle.textContent = 'Результаты пока отсутствуют :( \n Будь первым';

            
        }
        
        popupBody.append(popupBodyPanel);
        popupBodyPanel.append(popupBodyPanelBtns);
        popupBodyPanelBtns.append(popupBodyPanelButtonClose);
    }

    switch(type) {
        case 'win': modalWin();
        break;
        case 'leaders': modalTable();
        break;
    }
    settingsModal(popup);
    return popup;
}

let currentGame = gameComponent(preparationGame());

document.body.append(
    headerComponent(),
    currentGame,
);
