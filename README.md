# Проектная работа "Веб-ларек"

Стек: HTML, SCSS, TS, Webpack

Структура проекта:
- src/ — исходные файлы проекта
- src/components/ — папка с JS компонентами
- src/components/base/ — папка с базовым кодом

Важные файлы:
- src/pages/index.html — HTML-файл главной страницы
- src/types/index.ts — файл с типами
- src/index.ts — точка входа приложения
- src/styles/styles.scss — корневой файл стилей
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

## Основные части архитектуры проекта:
### Данные:
 Это информация о товарах, заказах, пользователях и другие данные, необходимые для функционирования интернет-магазина. Эти данные позволяют интернет-магазину отслеживать товары, заказы и информацию о клиентах.
### Отображение: 
Это пользовательский интерфейс, который пользователь видит и с которым взаимодействует. Он включает в себя главную страницу, модальные окна, страницы просмотра товара и оформления заказа. Он нужен для взаимодействия с интернет-магазином. Включает в себя отображение каталога товаров, модальных окон с детальной информацией о товаре, корзину и другие элементы интерфейса.
### Экраны: 
Это различные страницы, которые пользователь посещает при использовании интернет-магазина, такие как главная страница, страница просмотра товара, страница оформления заказа и другие. Каждый экран имеет свои функции и взаимодействует с данными и отображением для обеспечения корректного отображения и функционирования. Каждый экран имеет свои функции и взаимодействует с данными и отображением для обеспечения корректного отображения и функционирования.

## Взаимодействие между частями:
- Данные используются отображением для отображения информации о товарах, пользователях и заказах.
- Отображение использует данные для отображения каталога товаров, информации о товарах, корзины и других элементов интерфейса.
- Экраны используют данные и отображение для отображения различных страниц интернет-магазина и обработки действий пользователя.

## Описание данных:
### Product:
- Интерфейс, который определяет структуру данных для товара в интернет-магазине. Он включает в себя уникальный идентификатор товара (id), название (name), описание (description), цену (price) и URL изображения (imageUrl). Свойства id, price имеют тип number, а name, description, imageUrl - string.

### CartItem:
- Интерфейс, определяющий структуру данных для элемента корзины. Содержит информацию о товаре в корзине (product) и его количестве (quantity). Свойство product имеет тип Product, а quantity - number.

### Order:
- Интерфейс, который определяет структуру данных для заказа. Содержит информацию о способе оплаты (paymentMethod), адресе доставки (shippingAddress), емейл (email) и телефон (phone) получателя, список товаров в заказе (items). Свойство items имеет тип массива CartItem[], остальные свойства имеют тип string.

## Компоненты
### ProductService:
- Класс, предоставляющий метод getProducts для работы с товарами.
Он отправляет запрос на сервер и возвращает массив карточек.

### CartService:
- Класс, предоставляющий методы для управления корзиной.
В классе есть свойство cart типа CartItem[], которое хранит содержимое корзины.
Содержит метод addToCart, который принимает товар product типа Product и добавляет его в корзину или прибавляет количество этого товара, если он уже был в корзине.
Также содержит метод для удаления товара из корзины removeFromCart и
метод для получения содержимого корзины getCartItems.

### OrderService:
- Класс, который содержит метод placeOrder для оформления заказа.
Метод принимает данные о заказе (order) типа Order и отправляет на сервер.
Если при выполнении запроса возникнет ошибка, она будет выведена в консоль. Если запрос прошел успешно, то вызывается модальное окно об успешном заказе.



