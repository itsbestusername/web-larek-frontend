import {Form} from "./common/Form";
import {IOrderForm} from "../types";
import { IEvents } from "./base/events";
import { ensureElement } from "../utils/utils";

export class Order extends Form<IOrderForm> {
    protected _nextButton: HTMLButtonElement;
    protected _payCash: HTMLButtonElement;
    protected _payOnline: HTMLButtonElement;
    protected _address: HTMLInputElement;

    constructor(container: HTMLFormElement, events: IEvents) {
        super(container, events);

// Поиск и обеспечение существования элементов
this._nextButton = ensureElement<HTMLButtonElement>('.order__button', container);
this._payCash = ensureElement<HTMLButtonElement>('button[name="cash"]', container);
this._payOnline = ensureElement<HTMLButtonElement>('button[name="card"]', container);
this._address = ensureElement<HTMLInputElement>('input[name="address"]', container);

        this._nextButton.addEventListener('click', () => {
            this.events.emit('contacts:open');
        })
        
        this._payCash.addEventListener('click', () => {
            this._payCash.classList.add('button_alt-active');
            this._payOnline.classList.remove('button_alt-active');
            this.events.emit('payment:change', { payment: 'cash' });
        })

        this._payOnline.addEventListener('click', () => {
            this._payOnline.classList.add('button_alt-active');
            this._payCash.classList.remove('button_alt-active');
            this.events.emit('payment:change', { payment: 'online' });
        });
    }

    //не находит address
    // set address(value: string) {
    //     (this.container.elements.namedItem('adress') as HTMLInputElement).value = value;
    
    // console.log(this.container.elements.namedItem('adress'))
    // }
}