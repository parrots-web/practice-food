window.addEventListener('DOMContentLoaded', () => {

    // Tabs
    const tabs = document.querySelectorAll('.tabheader__item'),
        tabsContent = document.querySelectorAll('.tabcontent'),
        tabsParent = document.querySelector('.tabheader__items');

        function hideTabContent() {
            tabsContent.forEach(item => {
                item.style.display = 'none';
            });

            tabs.forEach(item => {
                item.classList.remove('tabheader__item_active');
            });
        }

        function showTabContent(i = 0) {
            tabsContent[i].style.display = 'block';
            tabs[i].classList.add('tabheader__item_active');
        }

        hideTabContent();
        showTabContent();

        tabsParent.addEventListener('click', (event) => {
            const target = event.target;

            if (target && target.classList.contains('tabheader__item')) {
                tabs.forEach((item, i) => {
                    if (target == item) {
                        hideTabContent();
                        showTabContent(i);
                    }
                });
            }
        });

        // Timer

        const deadline = '2021-08-27T17:00:00';

        function getTimeRemaining(endtime) {
           const t = Date.parse(endtime) - Date.parse(new Date()),
                days = Math.floor(t / (1000 * 60 * 60 * 24)),
                hours = Math.floor((t / (1000 * 60 * 60) % 24)),
                minutes = Math.floor((t / 1000 / 60) % 60),
                seconds = Math.floor((t / 1000) % 60);

            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
       } 

       function getZero(num) {
           if (num >= 0 && num < 10) {
               return `0${num}`;
           } else {
               return num;
           }
       }

       function setClock(selector, endtime) {
            const timer = document.querySelector(selector), 
                days = timer.querySelector('#days'),
                hours = timer.querySelector('#hours'),
                minutes = timer.querySelector('#minutes'),
                seconds = timer.querySelector('#seconds'),
                timeInterval = setInterval(updateClock, 1000);

            updateClock();

            function updateClock() {
                const t = getTimeRemaining(endtime);

                days.innerHTML = getZero(t.days);
                hours.innerHTML = getZero(t.hours);
                minutes.innerHTML = getZero(t.minutes);
                seconds.innerHTML = getZero(t.seconds);  
                
                if (t.total <= 0) {
                    clearInterval(timeInterval);
                }
            }

       }

       setClock('.timer', deadline);

       // Modal

       const modalTrigger = document.querySelectorAll('[data-modal]'),
            modal = document.querySelector('.modal'),
            modalCloseBtn = document.querySelector('[data-close]');

        function openModal() {
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden'; 
            clearInterval(modalTimerId);      
        }

        modalTrigger.forEach(btn => {
            btn.addEventListener('click', openModal);
        });

        function closeModal() {
            modal.style.display = 'none' ;
            document.body.style.overflow = '';
        }

        modalCloseBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.code === "Escape" && modal.style.display === 'block') {
                closeModal();
            }
        });

        // const modalTimerId = setTimeout(openModal, 5000);

        function showModalByScroll() {
            if (window.pageYOffset + document.documentElement.clientHeight  >= document.documentElement.scrollHeight) {
                openModal();
                window.removeEventListener('scroll', showModalByScroll);
            }
        }

        window.addEventListener('scroll', showModalByScroll);

        // Dynamic menu

        // class MenuItem {
        //     constructor(imageSrc, title, description, price) {
        //         this.imageSrc = imageSrc;
        //         this.title = title;
        //         this.description = description;
        //         this.price = price;
        //     }
        //     displayProps() {
        //         console.log(`${this.imageSrc} ${this.title} ${this.description} ${this.price}`);
        //     }

        //     updateCard(holderNumber) {
        //         const imgHolder = document.querySelectorAll('.menu__item img'),
        //             titleHolder = document.querySelectorAll('.menu__item-subtitle'),
        //             descriptionHolder = document.querySelectorAll('.menu__item-descr'),
        //             priceHolder = document.querySelectorAll('.menu__item-price span');

        //         imgHolder[holderNumber].innerHTML = `<img src="${this.imageSrc}" alt="elite"> </img>`;
        //         titleHolder[holderNumber].innerHTML = this.title;
        //         descriptionHolder[holderNumber].innerHTML = this.description;
        //         priceHolder[holderNumber].innerHTML = this.price;
        //     }
        // }

        // const menuFitness = new MenuItem('img/tabs/vegy.jpg', 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', '228');
        // const menuPremium = new MenuItem('img/tabs/elite.jpg', 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', '548');
        // const menuFatless = new MenuItem('img/tabs/post.jpg', 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', '428');

        // menuFitness.updateCard(1);
        // menuPremium.updateCard(2);
        // menuFatless.updateCard(0);

        class MenuCard {
            constructor(src, alt, title, descr, price, parentSelector, ...classes) {
                this.src = src;
                this.alt = alt;
                this.title = title;
                this.descr = descr;
                this.price = price;
                this.classes = classes;
                this.parent = document.querySelector(parentSelector);
                this.transfer = 27;
                this.changeToUAH();
            }

            changeToUAH() {
                this.price = this.price * this.transfer;
            }

            render() {
                const element = document.createElement('div');
                if (this.classes.length === 0) {
                    this.element = 'menu__item';
                    element.classList.add(this.element);
                } else {
                    this.classes.forEach(className => element.classList.add(className));
                }

                element.innerHTML = `
                        <img src=${this.src} alt=${this.alt}>
                        <h3 class="menu__item-subtitle">${this.title}</h3>
                        <div class="menu__item-descr">${this.descr} </div>
                        <div class="menu__item-divider"></div>
                        <div class="menu__item-price">
                            <div class="menu__item-cost">Цена:</div>
                            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                        </div>
                `;
                this.parent.append(element);
            }
        }

        new MenuCard(
            "img/tabs/vegy.jpg", 
            "vegy",
            'Меню "Фитнес"', 
            'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!', 
            9.1,
            '.menu .container'
        ).render();

        new MenuCard(
            'img/tabs/elite.jpg', 
            'elite',
            'Меню “Премиум”', 
            'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 
            20.1,
            '.menu .container'
        ).render();

        new MenuCard(
            'img/tabs/post.jpg', 
            'post',
            'Меню "Постное"', 
            'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.', 
            16,
            '.menu .container'
        ).render();
}); 