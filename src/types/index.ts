// Тип для способов оплаты
export type PaymentMethod = 'cash' | 'online';

// Тип для статуса заказа
export enum OrderStatus {
    Pending = 'pending',
    Processing = 'processing',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Cancelled = 'cancelled'
}

export type Category =
    'софт-скил'
    |'другое'
    |'кнопка'
    |'хард-скил'
    |'дополнительное'


//интерфейс для товара
export interface IProduct {
    category?: string;
    description?: string;
    id: string;
    image?: string;
    price: number|null;
    title: string;
}

export interface IAppState {
    catalog: IProduct[];
    basket: string[];
    preview: string | null;
    order: IOrder | null;
    // loading: boolean;
}

//интерфейс для заказа
export interface IOrderForm  {
    payment?: PaymentMethod;
    email: string;
    phone: string;
    address: string;
}
//заказанные товары
export interface IOrder extends IOrderForm {
    items: string[]
    total?: number;
}

export type FormErrors = Partial<Record<keyof IOrder, string>>;

//интерфейс для ответа на успешный заказ
export interface IOrderResult {
    id: string;
    total: number;
} 