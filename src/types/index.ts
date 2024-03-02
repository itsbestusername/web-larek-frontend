// Тип для способов оплаты
type PaymentMethod = 'cash' | 'card';

// Тип для статуса заказа
enum OrderStatus {
    Pending = 'pending',
    Processing = 'processing',
    Shipped = 'shipped',
    Delivered = 'delivered',
    Cancelled = 'cancelled'
}

//интерфейс для товара
interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
}

//интерфейс для элемента корзины
interface CartItem {
    product: Product;
    quantity: number;
}

//интерфейс для заказа
interface Order {
    paymentMethod: string;
    shippingAddress: string;
    email: string;
    phone: string;
    items: CartItem[];
}

