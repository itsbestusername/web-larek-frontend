# Проектная работа "Веб-ларек"
Представляет собой интернет-магазин с товарами для веб-разработчиков. Здесь можно посмотреть каталог товаров, подробнее рассмотреть каждый товар отдельно, добавить товары в корзину и сделать заказ. 

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/scss/styles.scss — корневой файл стилей
- src/utils/constants.ts — файл с константами
- src/utils/utils.ts — файл с утилитами

## Установка и запуск
Для установки и запуска проекта необходимо выполнить команды

```
npm install
npm run start
```

или

```
yarn
yarn start
```
## Сборка

```
npm run build
```

или

```
yarn build
```

## Основные типы данных

 Это информация о товарах, заказах, пользователях и другие данные, необходимые для функционирования интернет-магазина.
### Тип PaymentMethod:
Тип данных, представляющий способы оплаты в интернет-магазине.
Варианты:
'cash'- Оплата наличными при получении товара.
'online'- Оплата банковской картой.

### Тип Category
Представляет собой варианты категорий товаров. От категории товара будет зависеть отображение в карточке с дополнительной информацией.
Варианты:
'софт-скил'
'другое'
'кнопка'
'хард-скил'
'дополнительное'

### Тип FormErrors
Используется для валидации и отображении ошибок при заполнении формы заказа.
Структура: Объект, ключами которого являются поля заказа ('payment', 'email', 'phone', 'address'), а значениями - сообщения об ошибках.  
```type FormErrors = Partial<Record<keyof IOrder, string>>;```

### Тип ApiListResponse<Type>
```javascript
type ApiListResponse<Type> = {
    total: number; //Общее количество элементов
    items: Type[]; //Массив элементов определенного типа 
}
```  
Предназначен для использования в ответах от API, где требуется возвращать список элементов определенного типа вместе с общим количеством таких элементов. 
Он содержит два основных поля:
- total: Значение, представляющее общее количество элементов, доступных в ответе от API.
- items: Массив элементов определенного типа Type, который содержит сами элементы данных.

### Тип ApiPostMethods
```type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';```  
Предназначен для обозначения вида запроса в методе post класса Api.

### Интерфейс IProduct:
Интерфейс, который определяет структуру данных для товара в интернет-магазине.  
```javascript
interface IProduct {
	category?: string; //категория товара
	description?: string; //описание
	id: string; //идентификатор товара
	image?: string; //ссылка на изображение
	price: number | null; //цена
	title: string; //название товара
}
```

### Интерфейс IAppState
Это интерфейс для отображения состояния интернет-магазина. Используется в хранении и управлении данными приложения.  
```javascript
interface IAppState {
	basket: string[]; //массив товаров, добавленных в корзину
	catalog: IProduct[]; //массив товаров, доступных в каталоге
	order: IOrder | null; //информация о текущем заказе
	preview: string | null; //идентификатор товара, открытого для предварительного просмотра
}
```

### Интерфейс IOrder
Интерфейс, который определяет структуру данных для заказа. Используется хранении информации о заказанных товарах.  
```javascript
interface IOrder extends IOrderForm {
	items: string[]; //массив идентификаторов товаров
	total?: number; //сумма корзины
}
```

### Интерфейс IOrderForm
Представляет форму для заполнения информации о заказе. Используется в определении формы заказа и валидации введенных данных.  
```javascript
interface IOrderForm {
	payment?: PaymentMethod; //метод оплаты
	email?: string; //почта
	phone?: string; //телефон
	address: string; //адрес
}
```

### Интерфейс IOrderResult
Представляет собой структуру данных, которые приходят с сервера при успешном заказе.  
```javascript
interface IOrderResult {
	id: string; //идентификатор заказа
	total: number; //сумма заказа
}
```

### Интерфейс IEvents
Описывает различные методы для работы с событиями.  
Метод **on** принимает два параметра:
- event: строка или регулярное выражение, представляющее имя события.
- callback: функция обратного вызова, которая будет вызвана при возникновении события. Эта функция принимает один аргумент data, тип которого является обобщенным и должен быть объектом. Функция не возвращает значения.

Метод **emit** также принимает два параметра:
- event: строка, представляющая имя события.
- data: опциональный параметр, объект, который передается вместе с событием. Тип этого параметра также является обобщенным и должен быть объектом.

Метод **trigger** принимает два параметра:
- event: строка, представляющая имя события.
- context: опциональный параметр, который может быть частичным объектом типа T. Этот параметр представляет контекст или дополнительные данные, которые могут быть связаны с событием.

Все методы emit и trigger не возвращают значения, но trigger возвращает функцию обратного вызова, которая принимает один аргумент data с типом T и не возвращает значения.
Этот интерфейс описывает методы для управления событиями, указывая, какие типы данных принимаются и как они используются.

### Интерфейс IBasketView
Описывает структуру данных, которая представляет вид корзины товаров на веб-странице. Используется для добавления/удаления товара из корзины и проверки для активации кнопки оформления заказа.  
```javascript
interface IBasketView {
	items: HTMLElement[]; //массив из DOM-элементов(товары)
	total: number; //общая сумма
	selected: string[]; //массив из идентификаторов выбранных товаров
}
```

### Интерфейс IFormState
```javascript
interface IFormState {
	valid: boolean; //Это булево значение, указывающее на то, является ли форма валидной
	errors: string[]; //массив строк, содержащий сообщения об ошибках, возникших при валидации формы
}
```
Описывает структуру данных, которая хранит состояние формы на веб-странице.

### Интерфейс IPage
Представляет собой отображение страницы каталога.  
```javascript
interface IPage {
	counter: number; //счетчик на значке корзины
	catalog: HTMLElement[]; //каталог товаров
	locked: boolean; //заблокированное состояние страницы при открытии модалок
}
```

### Интерфейс ILarekAPI
```javascript
interface ILarekAPI {
	getProductList: () => Promise<IProduct[]>;
	getProductItem: (id: string) => Promise<IProduct>;
	orderProduct: (order: IOrderForm) => Promise<IOrderResult>;
}
```  
Этот интерфейс определяет методы для работы с API:
- **getProductList:** Получает список продуктов из магазина.
- **getProductItem:** Получает информацию о конкретном продукте по - его идентификатору.
- orderProduct: Оформляет заказ на покупку продуктов.


## Базовый код 
### Класс Api
***
Класс для работы с API, выполняющий отправку запросов на сервер и обработку ответов.
#### Конструктор
- **baseUrl:** Строка, представляющая базовый URL для всех запросов.  
- **options:** Объект с параметрами для настройки запросов. По умолчанию пустой объект.
#### Методы
- **get(uri: string)**  
Отправляет GET-запрос на сервер.
uri: Строка, представляющая конечный путь для запроса.

- **post(uri: string, data: object, method?: ApiPostMethods)**  
Отправляет POST-запрос на сервер.
uri: Строка, представляющая конечный путь для запроса.
data: Объект с данными для отправки на сервер.
method: Опциональный параметр, определяющий метод запроса (POST, PUT или DELETE). По умолчанию используется POST.

- **handleResponse(response: Response)**  
Защищенный метод, который Обрабатывает ответ от сервера.
response: Объект, представляющий ответ от сервера.

### Класс Component<T>
***
Абстрактный базовый компонент для работы с DOM в дочерних компонентах. Предоставляет удобный интерфейс для управления элементами на веб-странице.
#### Конструктор
**container**: HTML-элемент, представляющий контейнер, в котором будет размещаться компонент.
#### Методы
- **toggleClass(element: HTMLElement, className: string, force?: boolean)**  
Переключает класс у указанного DOM-элемента.
element: HTML-элемент, у которого нужно изменить класс.
className: Строка, представляющая имя класса.
force: Опциональный параметр, определяющий, нужно ли явно включить или выключить класс. По умолчанию переключает состояние класса.

- **setText(element: HTMLElement, value: unknown)**  
Устанавливает текстовое содержимое указанному DOM-элементу.
element: HTML-элемент, которому нужно установить текст.
value: Значение, которое нужно установить в качестве текста.

- **setDisabled(element: HTMLElement, state: boolean)**  
Устанавливает состояние блокировки (disabled) для указанного DOM-элемента.
element: HTML-элемент, которому нужно установить состояние блокировки.
state: Булево значение, определяющее состояние блокировки (true - заблокирован, false - разблокирован). Будет использован для блокировки и активации кнопок при валидации форм оформления заказа.

- **setHidden(element: HTMLElement)**  
Скрывает указанный DOM-элемент.
element: HTML-элемент, который нужно скрыть.

- **setVisible(element: HTMLElement)**  
Отображает указанный DOM-элемент.
element: HTML-элемент, который нужно отобразить.

- **setImage(element: HTMLImageElement, src: string, alt?: string)**  
Устанавливает изображение с альтернативным текстом для указанного тега <img>.
element: HTML-элемент <img>, которому нужно установить изображение.
src: Строка, представляющая путь к изображению.
alt: Опциональный параметр, строка с альтернативным текстом для изображения.

- **render(data?: Partial<T>): HTMLElement**  
Генерирует HTML-элемент компонента на основе переданных данных.
data: Частичный объект с данными для отображения.

### Класс EventEmitter
***
Имплементирован с интерфейсом IEvents. Это реализация брокера событий, позволяющего подписываться на события, генерировать события и управлять обработчиками.
#### Свойства
**_events**: Карта, которая хранит имена событий (или шаблоны) в качестве ключей и множества функций-подписчиков в качестве значений.
#### Методы
- **on<T>(event: EventName, callback: (data: T) => void): void:** Подписывает на событие с указанным именем или регулярным выражением и связывает его с функцией обратного вызова.

- **off(eventName: EventName, callback: Subscriber): void:** Отменяет подписку определенной функции обратного вызова на событие.

- **emit<T>(event: string, data?: T): void:** Генерирует событие с опциональными данными, вызывая все связанные с этим событием функции обратного вызова.

- **onAll(callback: (event: EmitterEvent) => void): void:** Подписывается на все события, отправленные объектом EventEmitter.

- **offAll(): void:** Отменяет подписку всех функций обратного вызова на все события.

- **trigger<T>(event: string, context?: Partial<T>): (data: T) => void:** Возвращает функцию обратного вызова, которая, когда вызвана, генерирует указанное событие с предоставленными данными.

### Класс Model<T>
***
Абстрактный класс. Базовая модель, позволяющая отличить модель от простых объектов данных и уведомлять об изменениях.
#### Конструктор
**constructor(data: Partial<T>, events: IEvents):** Инициализирует модель частичными данными и объектом-посредником событий.
#### Методы
- **emitChanges(event: string, payload?: object): void:** Уведомляет всех слушателей о том, что модель изменилась, при необходимости предоставляя дополнительные данные.
- Вспомогательная функция
**isModel(obj: unknown): obj is Model<any>:** Проверяет, является ли объект экземпляром класса Model.



## View 
Это пользовательский интерфейс, который пользователь видит и с которым взаимодействует. Он включает в себя главную страницу, модальные окна, страницы просмотра товара и оформления заказа. Он нужен для взаимодействия с интернет-магазином. Включает в себя отображение каталога товаров, модальных окон с детальной информацией о товаре, корзину и другие элементы интерфейса.
### Класс Basket
***
Представляет собой компонент, отвечающий за отображение содержимого корзины покупок. Он позволяет пользователю просматривать список товаров в корзине, управлять выбранными товарами и оформлять заказы. Basket является подклассом класса Component.
#### Конструктор
- **constructor(container: HTMLElement, events: EventEmitter):** Создает новый экземпляр класса Basket, принимая контейнер DOM элемента, в котором будет отображаться корзина, и объект EventEmitter для обработки событий.
#### Свойства
- **_list: HTMLElement:** DOM элемент, представляющий список товаров в корзине.
- **_total: HTMLElement:** DOM элемент, отображающий общую сумму корзины.
- **_button: HTMLElement:** DOM элемент кнопки для оформления заказа.
#### Методы
- **set items(items: HTMLElement[]):** Устанавливает список товаров в корзине для отображения.
- **set selected(total: number):** Устанавливает количество выбранных товаров и управляет доступностью кнопки оформления заказа.
- **set total(total: number):** Устанавливает общую сумму корзины для отображения.

### Класс Form  
***
Представляет собой компонент для управления формами, обработки ввода пользователей и отображения ошибок ввода. Является подклассом класса Component.
#### Конструктор
- **constructor(container: HTMLFormElement, events: IEvents):** Создает новый экземпляр класса Form, принимая DOM элемент формы и объект IEvents для обработки событий.
#### Методы
- **onInputChange(field: keyof T, value: string):** Защищенный метод, вызываемый при изменении значения в поле ввода. Эмитирует событие change с информацией о поле и его значении.
- **set valid(value: boolean):** Устанавливает доступность кнопки отправки формы в зависимости от валидности формы.
- **set errors(value: string):** Отображает сообщение об ошибке на форме.
- **render(state: Partial<T> & IFormState):** Отображает текущее состояние формы, включая валидность и ошибки.

### Класс Modal  
***
Представляет собой компонент модального окна, которое отображается поверх основного контента и используется для показа дополнительной информации или выполнения определенных действий. Является подклассом класса Component.
#### Конструктор
- **constructor(container: HTMLElement, events: IEvents):** Создает новый экземпляр класса Modal, принимая DOM элемент контейнера модального окна и объект IEvents для обработки событий.
- Также навешиваются слушатели:
- Обработчик для события click на кнопке закрытия (_closeButton): При клике на кнопку вызывается метод close, который закрывает модальное окно. Привязка метода close к текущему контексту (экземпляру класса) обеспечивается с помощью bind(this), чтобы метод close мог использовать контекст экземпляра класса.
- Обработчик для события click на контейнере модального окна (container): При клике на область вне контента модального окна (на самом окне), также вызывается метод close, чтобы закрыть модальное окно.
- Обработчик для события click на контенте модального окна (_content): Этот обработчик предотвращает всплытие события клика, чтобы клики на контенте модального окна не приводили к его закрытию. Таким образом, модальное окно будет оставаться открытым, когда пользователь кликает на контент.
#### Методы
- **open():** Открывает модальное окно и эмитирует событие modal:open.
- **close():** Закрывает модальное окно и эмитирует событие modal:close.
- **render(data: IModalData):** Отображает содержимое модального окна и открывает его.

### Класс Success
Представляет собой компонент для отображения информации о успешном завершении заказа, такой как общая сумма заказа и номер заказа. Является подклассом класса Component.
#### Конструктор
- **constructor(container: HTMLElement, totalDescription: string, actions: ISuccessActions):** Создает новый экземпляр класса Success, принимая DOM элемент контейнера для отображения сообщения об успешном заказе, описание общей суммы заказа и объект действий для выполнения при закрытии окна.

### Класс Card<T>  
***
Представляет компонент карточки товара, который отображает информацию о товаре, включая его изображение, описание, цену и др. Card является потомком класса Component<ICard<T>>.
#### Свойства
- **_title: HTMLElement:** Элемент заголовка карточки товара.
- **_image?: HTMLImageElement:** Элемент изображения товара.
- **_button?: HTMLButtonElement:** Элемент кнопки (если присутствует).
- **_description?: HTMLElement:** Элемент описания товара.
- **_price: HTMLElement:** Элемент отображения цены товара.
- **_category: HTMLElement:** Элемент отображения категории товара.
#### Конструктор
конструктор создает экземпляр класса Card<T>, который представляет собой компонент для отображения карточки товара. 
- **blockName:** строка, представляющая имя блока или класса, который содержит карточку товара. Это используется для создания селекторов элементов внутри контейнера.
- **container:** элемент HTML (HTMLElement), который является контейнером для карточки товара.
- **actions (опционально):** объект, содержащий действия, которые могут быть выполнены при взаимодействии с карточкой товара.
- Вызывается конструктор родительского класса Component<IProduct>, который инициализирует компонент, принимая контейнер, в который будет встроен компонент.
- Используется функция ensureElement, чтобы найти и инициализировать различные элементы карточки товара, такие как название (_title), изображение (_image), кнопка (_button), описание (_description), цена (_price) и категория (_category). Элементы находятся в контейнере container с использованием селекторов, формируемых на основе переданного blockName.
- Если кнопка actions передана и установлено действие onClick, то для кнопки добавляется обработчик события click, который вызывает соответствующее действие.
Этот конструктор инициализирует экземпляр класса Card<T> и настраивает его для работы с элементами внутри указанного контейнера, используя переданный blockName для создания селекторов. 
#### Методы
- **set id(value: string):** Устанавливает идентификатор карточки.
- **get id(): string:** Возвращает идентификатор карточки.
- **set title(value: string):** Устанавливает заголовок карточки.
- **get title(): string:** Возвращает заголовок карточки.
- **set image(value: string):** Устанавливает изображение карточки.
- **set description(value: string | string[]):** Устанавливает описание карточки.
- **set price(value: number | null):** Устанавливает цену карточки.
- **set category(value: string):** Устанавливает категорию карточки.

### Класс Contacts  
***
Представляет форму для ввода контактных данных пользователя при оформлении заказа.
Contacts является наследником класса Form<IOrderForm>.
#### Конструктор:
- **container:** элемент HTML формы (HTMLFormElement), который будет управляться этим компонентом.
- **events:** объект, реализующий интерфейс IEvents, предоставляющий функциональность для работы с событиями.
- Вызывается конструктор родительского класса Component<IFormState>, который инициализирует компонент и принимает контейнер формы container. Также передается объект events, который будет использоваться для управления событиями компонента.
#### Методы
- **set phone(value: string):** Устанавливает значение поля ввода телефона.
- **set email(value: string):** Устанавливает значение поля ввода email.

### Класс Order  
***
Представляет форму для оформления заказа с возможностью выбора способа оплаты и ввода адреса доставки.
Order является наследником класса Form<IOrderForm>.
#### Конструктор
- container: элемент HTML формы заказа (HTMLFormElement), который будет управляться этим компонентом.
- events: объект, реализующий интерфейс IEvents, предоставляющий функциональность для работы с событиями.
- Вызывается конструктор родительского класса Form<IOrderForm>, который инициализирует компонент и принимает контейнер формы container. Также передается объект events, который будет использоваться для управления событиями компонента.
- Используя функцию ensureElement, происходит поиск и обеспечение существования различных элементов формы заказа, таких как кнопки "Далее", кнопка "Оплата наличными", кнопка "Оплата онлайн" и поле для ввода адреса.
- Для кнопки "Далее" (_nextButton): устанавливается обработчик события клика, который при вызове эмитирует событие contacts:open через объект events.
- Для кнопки "Оплата наличными" (_payCash): устанавливается обработчик события клика, который при вызове эмитирует событие payment:change, передавая объект с информацией о выбранном способе оплаты (payment: 'cash') и кнопках для оплаты онлайн и наличными.
- Для кнопки "Оплата онлайн" (_payOnline): устанавливается аналогичный обработчик события клика, который при вызове эмитирует событие payment:change, передавая объект с информацией о выбранном способе оплаты (payment: 'online') и кнопках для оплаты онлайн и наличными.
#### Методы
- **toggleActiveButton(clickedButton: HTMLButtonElement, otherButton: HTMLButtonElement):** Переключает активную кнопку между способами оплаты.
- **set address(value: string):** Устанавливает значение поля ввода адреса доставки.

### Класс Page  
***
Представляет страницу приложения и управляет отображением содержимого на странице, включая каталог товаров и корзину.
Page является наследником класса Component.
#### Свойства
- **_counter: HTMLElement:** Элемент счетчика товаров в корзине.
- **_catalog: HTMLElement:** Элемент каталога товаров.
- **_wrapper: HTMLElement:** Обертка страницы.
- **_basket: HTMLElement:** Элемент корзины товаров.
#### Конструктор
Принимает два параметра:
- **container:** HTML-элемент, который является контейнером для страницы веб-приложения.
- **events:** объект, реализующий интерфейс IEvents и предоставляющий - - происходит инициализация элементов страницы, таких как счетчик корзины, галерея товаров и т. д. Затем устанавливается обработчик события клика на элементе корзины, который при активации генерирует событие 'basket:open' с использованием объекта events.emit.
#### Методы
- **set counter(value: number):** Устанавливает значение счетчика товаров в корзине.
- **set catalog(items: HTMLElement[]):** Устанавливает содержимое каталога товаров.
- **set locked(value: boolean):** Блокирует или разблокирует страницу.



## Model
### Класс AppState  
***
Представляет модель состояния приложения, отвечающую за управление данными, связанными с корзиной, каталогом товаров, заказами и другими параметрами состояния.
AppState является потомком класса Model<IAppState>.
#### Свойства
- **basket: string[]:** Массив идентификаторов товаров в корзине.
- **catalog: IProduct[]:** Массив объектов IProduct, представляющих каталог товаров.
- **order: IOrder:** Объект, содержащий информацию о заказе, включая товары, общую сумму, контактные данные и т. д.
- **preview: string | null:** Идентификатор выбранного товара для предпросмотра.
- **formErrors: FormErrors:** Объект, содержащий информацию об ошибках в формах.
#### Методы
- **setCatalog(items: IProduct[]):** Устанавливает каталог товаров, обновляя его с учетом предварительной обработки.
- **setPreview(item: IProduct):** Устанавливает выбранный товар для предпросмотра.
- **toggleOrderedItem(id: string, isIncluded: boolean):** Добавляет или удаляет товар из корзины.
- **clearBasket():** Очищает корзину, удаляя все товары из заказа.
- **getTotal():** Вычисляет общую сумму заказа на основе цен товаров.
- сеттер **set total(total: number):** Устанавливает значение суммы товаров
- **itemCount():** number: Возвращает количество товаров в корзине.
- **getSelectedItems(): IProduct[]:** Возвращает товары, добавленные в корзину.
- **setOrderField(field: keyof IOrderForm, value: string):** Устанавливает значение поля заказа и проверяет его на валидность.
- **setPaymentField(payment: 'cash' | 'online'):** Устанавливает способ оплаты заказа.
- **validateOrder():** Проверяет данные заказа на валидность.
- **setContactField(field: keyof IOrderForm, value: string):** Устанавливает значение полей контактов и проверяет его на валидность.
- **validateContacts():** Проверяет контактные данные на валидность.



## Класс LarekAPI   
***
Является подклассом класса Api и предоставляет методы для взаимодействия с API Larek, такие как получение списка товаров, получение информации о конкретном товаре и размещение заказа.
#### Конструктор
- **constructor(cdn: string, baseUrl: string, options?: RequestInit):** Создает новый экземпляр класса LarekAPI с указанным CDN, базовым URL и опциями запроса.
#### Свойства
- **cdn: string:** URL-адрес CDN для загрузки изображений товаров.
#### Методы
- **getProductList(): Promise<IProduct[]>:** Получает список товаров с сервера и возвращает Promise, который разрешается в массив объектов IProduct, каждый из которых представляет собой информацию о товаре, включая его изображение.

- **getProductItem(id: string): Promise<IProduct>:** Получает информацию о товаре с указанным идентификатором с сервера и возвращает Promise, который разрешается в объект IProduct, представляющий конкретный товар, включая его изображение.

- **orderProduct(order: IOrderForm): Promise<IOrderResult>:** Отправляет данные о заказе на сервер и возвращает Promise, который разрешается в объект IOrderResult, представляющий результат успешного заказа.


## Presenter (Cписок событий)
### events.onAll(({ eventName, data }) => {console.log(eventName, data);});  
***
Это событие используется для мониторинга всех событий в приложении в целях отладки. Когда любое событие происходит, этот обработчик выводит имя события и связанные с ним данные в консоль для отслеживания.

### events.on<CatalogChangeEvent>('items:changed')  
***
Это событие срабатывает, когда элементы в каталоге изменяются. В ответ на это событие создаются новые карточки товаров на основе обновленных данных каталога. Каждая карточка привязывается к обработчику клика, который вызывает событие ***'card:select'****, когда пользователь выбирает карточку.

### events.on('card:select')  
***
Это событие срабатывает, когда пользователь выбирает карточку товара. В ответ на это событие вызывается метод *appData.setPreview*, который устанавливает выбранную карточку для предварительного просмотра и вызывает событие ***'preview:changed'***.

### events.on('preview:changed')  
***
Этот обработчик вызывается при изменении выбранной карточки. В ответ на это событие создается новая карточка товара с информацией о выбранном лоте. Карточка содержит кнопку "в корзину", которая добавляет товар в корзину при нажатии. Если товар уже находится в корзине, кнопка меняется на "удалить", и при нажатии товар удаляется из корзины. После добавления или удаления товара из корзины событие ***'larek:changed'*** вызывается для обновления данных о корзине.

### events.on('larek:changed')  
***
Этот обработчик вызывается при обновлении корзины. В ответ на это событие обновляется информация о количестве товаров, меняется счетчик и общая стоимость корзины. Каждый товар в корзине представлен карточкой, содержащей порядковый номер, название товара, его цену и кнопку удаления. При нажатии на кнопку удаления товара, товар удаляется из корзины, и событие ***'larek:changed'*** вызывается для обновления данных о корзине.

### events.on('basket:open')  
***
При вызове этого события открывается модальное окно с содержимым корзины.

### events.on('order:open')  
***
При вызове этого события открывается модальное окно с формой заказа, где нужно выбрать способ оплаты и заполнить адрес.

### events.on(/^order..*:change/)  
***
Этот обработчик вызывается при изменении одного из полей формы заказа с методом оплаты и адресом. Он обновляет соответствующее поле в данных заказа.

### events.on('payment:change')  
***
Этот обработчик вызывается при изменении способа оплаты. Он переключает активную кнопку оплаты, обновляет данные о выбранном способе оплаты в данных заказа и вызывает валидацию формы.

### events.on('formErrors:change')  
***
Этот обработчик вызывается при изменении состояния валидации формы заказа. Он обновляет информацию о состоянии валидации и выводит ошибки.

### events.on('contacts:open')  
***
При вызове этого события открывается модальное окно с формой контактов, где нужно указать почту и телефон.

### events.on(/^contacts..*:change/)  
***
Этот обработчик вызывается при изменении одного из полей формы контактов. Он обновляет соответствующее поле в данных контактов.

### events.on('formErrors:contactsChange')  
***
Этот обработчик вызывается при изменении состояния валидации формы контактов. Он обновляет информацию о состоянии валидации и выводит ошибки.

### events.on('contacts:submit')  
***
При отправке формы заказа вызывается этот обработчик. Он отправляет данные о заказе на сервер и обрабатывает результат. В случае успешного заказа отображается модальное окно с информацией о заказе и кнопкой для закрытия. При нажатии на кнопку модальное окно закрывается, корзина очищается, обновляется счетчик и происходит обновление данных о заказе.

### events.on('modal:open')  
***
При открытии модального окна вызывается этот обработчик. Он блокирует прокрутку страницы, чтобы предотвратить скроллинг фона.

### events.on('modal:close')  
***
При закрытии модального окна вызывается этот обработчик. Он разблокирует прокрутку страницы, чтобы вернуть ее в нормальное состояние после закрытия модального окна.

### api.getProductList()  
***
Этот блок кода отправляет запрос на сервер для получения списка товаров. В случае успеха список товаров устанавливается в приложении, а в случае ошибки выводится сообщение об ошибке в консоль.