import Hero from './components/Hero.js';
import NewGameMenu from './components/NewGameMenu.js';
import MainMenu from './components/MainMenu.js';
import AboutUs from './components/AboutUs.js';
import GamePage from './components/GamePage.js';
import GameMode from './components/GameMode.js';
import Tournament from './components/Tournament.js';


function findContent(text) {
    for (const button of document.querySelectorAll('button')) {
        if (button.textContent.includes('About Us')) {
            button.setAttribute('data-bs-toggle', 'modal');
            button.setAttribute('data-bs-target', '#staticBackdrop');
        }
    }

}

async function buttonClickHandler(buttonText) {
    setTimeout(async () => {
        
        if (buttonText === "New Game") {
            const newGame = new NewGameMenu();
            document.getElementById('menu').innerHTML = await newGame.getHtml();

        } else if (buttonText === "About Us") {
            // const aboutUs = new AboutUs();
            // aboutUs.findContent(buttonText);
            
        } else if (buttonText === "Settings") {
            
        } else if (buttonText === "Main Menu") {
            const menu = new MainMenu();
            document.getElementById('menu').innerHTML = await menu.getHtml();
            findContent("About Us");        
        } else if (buttonText === "Game Mode") {
            const gameMode = new GameMode();
            document.getElementById('menu').innerHTML = await gameMode.getHtml();

        } else if (buttonText === "Tournament") {
            const tournament = new Tournament();
            document.getElementById('menu').innerHTML = await tournament.getHtml();

        }
    }, 400);
    
}


/*
    функция navigateTo принимает url и использует history.pushState для 
    обновления URL-адреса в адресной строке браузера без 
    перезагрузки страницы.

    После этого вызывается функция router, которая обновляет содержимое
 */
const navigateTo = url => {
    history.pushState(null, null, url);
    router();
};

/*

    функция router сопоставляет текущий URL-адрес с каждым маршрутом
    и вызывает функцию getHtml для соответствующего представления.
    Затем она обновляет содержимое элемента app в index.html
    с помощью полученного HTML-кода.


*/

const router = async () => {

    /* 
        routes - массив объектов, содержащих путь и представление
        создаем массив routes и заполняем его объектами, содержащими строку "путь" 
        и представление "класс или в нашем случае компонент"
    */

    const routes = [
        { path: '/', view: Hero },
    ];

    /* 
        map - метод массива, который создает новый массив, применяя к каждому элементу callback-функцию
        создаем новый массив potentialMatches, который содержит объекты, route (это объект из массива routes) и 
        isMatch (это bool сравнение текущего пути (location.pathname) с путем из объекта route)

    */

    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });
    
    /* 
        find - метод массива, который возвращает значение первого найденного в массиве элемента, 
        которое удовлетворяет условию переданному в callback-функции
        создаем переменную match, которая содержит объект из массива potentialMatches, у которого isMatch = true
        если такого объекта нет, то создаем объект с route = routes[0] и isMatch = true
    */

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);
    if (!match) {
        match = {
            route: routes[0],
            isMatch: true
        };

    }

    /* 
        создаем объект view, который содержит представление из объекта match
        и обновляем содержимое элемента app в index.html с помощью полученного HTML-кода
    */

    const view = new match.route.view();
    document.getElementById('app').innerHTML = await view.getHtml();

    /* после рендеринга дома бежим циклом по всем кнопкам которые получаем с помощью querySelectorAll
        и если текст кнопки содержит "About Us", то добавляем атрибуты data-bs-toggle и data-bs-target
        для открытия модального окна
    */

    findContent("About Us");

};

/* 
    добавляем обработчик события popstate, который вызывает функцию router
    и обновляет содержимое элемента app в index.html с помощью полученного HTML-кода

    indow.addEventListener('popstate', router);: Это добавляет слушатель события popstate 
    для объекта window. Событие popstate возникает, когда изменяется 
    история браузера, например, при нажатии на кнопки "назад" или "вперед". 
    Когда событие происходит, вызывается функция router, которая, 
    вероятно, обрабатывает изменения состояния истории.
*/

window.addEventListener('popstate', router);

/*
    добавляем обработчик события DOMContentLoaded, который вызывает функцию router
    и обновляет содержимое элемента app в index.html с помощью полученного HTML-кода

    Событие DOMContentLoaded происходит, когда загружается весь HTML и построена начальная 
    структура документа, но до завершения загрузки всех внешних ресурсов (
        картинок, стилей и т.д.). Когда событие происходит, вызывается функция router(), 
        предположительно для начальной инициализации страницы.
*/

document.addEventListener('DOMContentLoaded', () => {
    router();
});




document.addEventListener('click', async e => {
    if (e.target.className === 'link') {
        e.preventDefault();
        navigateTo(e.target.href);
    }
    if (e.target.classList.contains('button_text')) {
        e.preventDefault();
        await buttonClickHandler(e.target.innerHTML);
        findContent("About Us");
    }
});



