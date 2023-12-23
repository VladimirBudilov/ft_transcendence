export default class AboutUs {
    constructor() {
        document.title = 'About Us';
    }

    async getHtml() {
        return `
            <p>
                Мы - Виктор, Алексей, Владимир и Геворг, стоящие за созданием 
                захватывающей игры Ping Pong, реализованной веб-технологиями с 
                использованием Jango и Vanilla JavaScript. Наша команда разработчиков 
                объединяет уникальные навыки и страсть к созданию игр, и мы гордимся представить вам ft_transcendence.
            </p>
            <p>
                Наш проект, основанный на теме ft_transcendence, 
                предлагает захватывающий и интересный опыт игры 
                в пинг-понг прямо в веб-браузере. Мы стремились создать 
                уникальное взаимодействие с игрой, используя последние 
                веб-технологии и обеспечивая потрясающую графику и игровой процесс.
            </p>
            <p>
                Нашей целью было не просто создать игру, но и сделать 
                ее интересной и доступной для всех. Мы уделили 
                внимание деталям, чтобы обеспечить вас увлекательным и уникальным 
                опытом игры в Ping Pong. Спасибо, 
                что присоединились к нам в этом захватывающем приключении!
            </p>
            <p>
            С любовью,<br>
            Команда разработчиков ft_transcendence
            </p>

        `;
    }

    // findContent(text) {
    //     const matches = [];
    //     for (const button of document.querySelectorAll('button')) {
    //         if (button.textContent.includes(text)) {
    //             button.setAttribute('data-bs-toggle', 'modal');
    //             button.setAttribute('data-bs-target', '#staticBackdrop');
    //             // button.setAttribute('id', 'modal_button');
    //         }
    //     }
    // }

}