import './scss/styles.scss';

import { LarekAPI } from './components/LarekApi';
import { API_URL, CDN_URL } from './utils/constants';
import { EventEmitter } from './components/base/events';
import {
	AppState,
	CatalogChangeEvent
} from './components/AppData';
import { Page } from './components/Page';
import { Modal } from './components/common/Modal';
import { ensureElement, cloneTemplate } from './utils/utils';
import { BasketItem, CatalogItem } from './components/Card';
import { Basket } from './components/common/Basket';
import { Order } from './components/Order';
import { IOrderForm, IProduct } from './types';
import { Contacts } from './components/Contacts';
import { Success } from './components/common/Success';

const events = new EventEmitter();
const api = new LarekAPI(CDN_URL, API_URL);

// Модель данных приложения
const appData = new AppState({}, events);

// Глобальные контейнеры
const page = new Page(document.body, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

// Все шаблоны
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');

// Переиспользуемые части интерфейса
const basket = new Basket(cloneTemplate(basketTemplate), events);
const order = new Order(cloneTemplate(orderTemplate), events);
const contacts = new Contacts(cloneTemplate(contactsTemplate), events);


// Чтобы мониторить все события, для отладки
events.onAll(({ eventName, data }) => {
	console.log(eventName, data);
});

// Изменились элементы каталога
events.on<CatalogChangeEvent>('items:changed', () => {
	const cards = appData.catalog.map((item) => {
		const card = new CatalogItem(cloneTemplate(cardCatalogTemplate), {
			onClick: () => events.emit('card:select', item),
		});
		return card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			price: item.price,
			category: item.category,
			id: item.id,
		});
	});
	//Для добавления на страницу
	page.catalog = cards;
});

// Открыть карточку
events.on('card:select', (item: IProduct) => {
	appData.setPreview(item);
});

// Изменена открытая карточка
events.on('preview:changed', (item: IProduct) => {
	const card = new CatalogItem(cloneTemplate(cardPreviewTemplate));
	// Устанавливаем обработчик на кнопку "в корзину"
	card.addToCart = () => {
		appData.toggleOrderedItem(item.id, true);
		card.buttonText = 'Удалить'; // Изменяем текст кнопки
		modal.close(); // Закрываем модальное окно
		events.emit('larek:changed');
		basket.selected = appData.getTotal();
	};

	// Устанавливаем обработчик на кнопку "удалить"
	if (appData.order.items.includes(item.id)) {
		card.buttonText = 'Удалить'; // Изменяем текст кнопки
		card.addToCart = () => {
			appData.toggleOrderedItem(item.id, false);
			card.buttonText = 'В корзину'; // Изменяем текст кнопки
			modal.close(); // Закрываем модальное окно
			events.emit('larek:changed');
			basket.selected = appData.getTotal();
		};
	}
	modal.render({
		content: card.render({
			title: item.title,
			image: item.image,
			description: item.description,
			category: item.category,
			price: item.price,
			id: item.id,
		}),
	});
});

// обновление корзины
events.on('larek:changed', () => {
	page.counter = appData.itemCount();
	basket.total = appData.getTotal();
	basket.items = appData.getSelectedItems().map((item, index) => {
		const card = new BasketItem(cloneTemplate(cardBasketTemplate), {
			onClick: (event) => {
				const deleteBasketButton = event.target as HTMLButtonElement;
				appData.toggleOrderedItem(item.id, false);
				page.counter = appData.itemCount();
				basket.total = appData.getTotal();
				basket.selected = appData.getTotal();
				appData.total = appData.getTotal();
				// Обновление отображения позиций в корзине
				events.emit('larek:changed');
			},
		});
		// Устанавливаем индекс для карточки
		card.setIndex(index);
		appData.total = appData.getTotal();
		basket.selected = appData.getTotal();
		return card.render({
			title: item.title,
			price: item.price,
		});
	});
});

events.on('basket:open', () => {
	modal.render({
		content: basket.render(),
	});
});

// Открыть форму заказа
events.on('order:open', () => {
	modal.render({
		content: order.render({
			payment: 'online',
			address: '',
			valid: false,
			errors: [],
		}),
	});
});

// Изменилось одно из полей заказа
events.on(
	/^order\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setOrderField(data.field, data.value);
	}
);

//изменился способ оплаты
events.on(
	'payment:change',
	(data: {
		payment: 'cash' | 'online';
		clickedButton: HTMLButtonElement;
		otherButton: HTMLButtonElement;
	}) => {
		order.toggleActiveButton(data.clickedButton, data.otherButton);
		appData.setPaymentField(data.payment);
		appData.validateOrder();
	}
);

// Изменилось состояние валидации формы
events.on('formErrors:change', (errors: Partial<IOrderForm>) => {
	const { payment, address } = errors;
	order.valid = !payment && !address;
	order.errors = Object.values({ payment, address })
		.filter((i) => !!i)
		.join('; ');
});

// Открыть форму контактов
events.on('contacts:open', () => {
	modal.render({
		content: contacts.render({
			phone: '',
			email: '',
			valid: false,
			errors: [],
		}),
	});
});

//изменилось один из контактов
events.on(
	/^contacts\..*:change/,
	(data: { field: keyof IOrderForm; value: string }) => {
		appData.setContactField(data.field, data.value);
	}
);

// Изменилось состояние валидации формы
events.on('formErrors:contactsChange', (errors: Partial<IOrderForm>) => {
	const { email, phone } = errors;
	contacts.valid = !email && !phone;
	contacts.errors = Object.values({ phone, email })
		.filter((i) => !!i)
		.join('; ');
});

// Отправлена форма заказа
events.on('contacts:submit', () => {
	api
		.orderProduct(appData.order)
		.then((result) => {
			const totalDescription = result.total.toString();
			const success = new Success(
				cloneTemplate(successTemplate),
				totalDescription,
				{
					onClick: () => {
						modal.close();
						appData.clearBasket();
						events.emit('larek:changed');
						basket.selected = appData.getTotal(); //отключаем кнопку корзины после заказа
					},
				}
			);
			appData.clearBasket();
			events.emit('larek:changed');
			basket.selected = appData.getTotal();
			modal.render({
				content: success.render({}),
			});
		})
		.catch((err) => {
			console.error(err);
		});
});

// Блок прокрутки страницы при открытии модалки
events.on('modal:open', () => {
	page.locked = true;
});

// ... и разблокируем
events.on('modal:close', () => {
	page.locked = false;
});

// Получаем товары с сервера
api.getProductList()
	.then((items) => {
		appData.setCatalog(items);
	})
	.catch((err) => {
		console.error(err);
	});
