import _ from "lodash";
import { IOrderForm } from "../types";
import {Model} from "./base/Model";
import { FormErrors, IAppState, IProduct, IOrder, Category } from "../types";

export type CatalogChangeEvent = {
    catalog: ProductItem[]
};

export class ProductItem extends Model<IProduct> {
    id: string;
    description: string;
    image: string;
    title: string;
    category: Category;
    price: number|null;
    }

export class AppState extends Model<IAppState> {
    basket: string[];
    catalog: IProduct[];
    order: IOrder = {
        email: '',
        phone: '',
        address: '',
        payment: 'online',
        items: [],
        total: 0
    };
    preview: string | null;
    formErrors: FormErrors = {};

    setCatalog(items: IProduct[]) {
        this.catalog = items.map(item => new ProductItem(item, this.events));
        this.emitChanges('items:changed', { catalog: this.catalog });
    }

    setPreview(item: ProductItem) {
        this.preview = item.id;
        this.emitChanges('preview:changed', item);
    }

    // toggleOrderedItem(id: string, isIncluded: boolean) {
    //     const index = this.order.items.indexOf(id);
    //     if (isIncluded) {
    //         //добавление товара в корзину
    //         if (index === -1) {
    //             this.order.items.push(id); // добавляем только если не найден в массиве
    //         }
    //     } else {
    //         //удаление из корзины
    //         if (index !== -1) {
    //             this.order.items.splice(index, 1); // удаляем только если найден в массиве
    //         }
    //     }
    // }

    toggleOrderedItem(id: string, isIncluded: boolean) {
        if (isIncluded) {
            //добавление товара в корзину
            this.order.items = _.uniq([...this.order.items, id]);
        } else {
            //удаление из корзины
            this.order.items = _.without(this.order.items, id);
        }
    }

    clearBasket() {
        this.order.items.forEach(id => {
            this.toggleOrderedItem(id, false);
        });
    }

    getTotal() {
        return this.order.items.reduce((a, c) => a + this.catalog.find(it => it.id === c).price, 0)
    }

    // Метод для вычисления количества товаров в корзине
    itemCount(): number {
        return this.order.items.length;
    }
    //добавленные товары
    getSelectedItems(): IProduct[] {
        return this.catalog.filter(item => this.order.items.includes(item.id));
    }

    setOrderField(field: keyof IOrderForm, value: string) {
        // this.order[field] = value;
        // Если изменяемое поле - payment, устанавливаем значение online
    if (field === 'payment') {
        this.order[field] = 'online';
    } else {
        // Иначе, устанавливаем значение, переданное в параметре
        this.order[field] = value;
    }

        if (this.validateOrder()) {
            this.events.emit('order:ready', this.order);
        }
    }

    validateOrder() {
        const errors: typeof this.formErrors = {};
        if (!this.order.address) {
            errors.address = 'Необходимо указать адрес';
        }
        if (!this.order.email) {
            errors.email = 'Необходимо указать email';
        }
        if (!this.order.phone) {
            errors.phone = 'Необходимо указать телефон';
        }
        this.formErrors = errors;
        this.events.emit('formErrors:change', this.formErrors);
        return Object.keys(errors).length === 0;
    }
}