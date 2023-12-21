import Hero from './components/Hero.js';
import NewGameMenu from './components/NewGameMenu.js';
import MainMenu from './components/MainMenu.js';
import AboutUs from './components/AboutUs.js';

async function buttonClickHandler(buttonText) {

    setTimeout(async () => {
        if (buttonText === "New Game") {
            const newGame = new NewGameMenu();
            document.getElementById('menu').innerHTML = await newGame.getHtml();

        } else if (buttonText === "About Us") {
            const aboutUs = new AboutUs();
            const modalHtml = await aboutUs.getHtml();
      
            // Вставляем HTML модального окна в документ
            menuContainer.innerHTML = modalHtml;
      
            // Активируем модальное окно с помощью Bootstrap
            const aboutUsModal = new bootstrap.Modal(document.getElementById('aboutUsModal'));
            aboutUsModal.show();
      
            // После закрытия модального окна восстанавливаем исходное содержимое
            aboutUsModal._element.addEventListener('hidden.bs.modal', function () {
              menuContainer.innerHTML = originalContent;
            });
            

        } else if (buttonText === "Settings") {
            // Другие действия...
        } else if (buttonText === "Back") {
            const menu = new MainMenu();
            document.getElementById('menu').innerHTML = await menu.getHtml();
        }

    }, 400); // Установите нужное вам время задержки
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
    }
});



