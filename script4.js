const categories = [
    {
        name: 'Laptops',
        items: [
            {
                title: 'Macbook Pro 14',
                img: 'https://hotline.ua/img/tx/302/3023483125.jpg',
                description: {
                    price: 2000,
                    color: 'Silver',
                }
            },
            {
                title: 'HP pavilion gaming 15',
                img: 'https://hotline.ua/img/tx/325/3257698955.jpg',
                description: {
                    price: 900,
                    color: 'Black',
                }
            },
        ]
    },
    {
        name: 'Phones',
        items: [
            {
                title: 'Iphone 15 Pro',
                img: 'https://img.mta.ua/image/cache/data/foto/z827/827117/photos/Apple-iPhone-15-Pro-Max-256GB-19-White-Titanium-01-600x600.jpg',
                description: {
                    price: 2000,
                    color: 'White',
                }
            },
            {
                title: 'Xiaomi 13 pro',
                img: 'https://hotline.ua/img/tx/392/3924570925.jpg',
                description: {
                    price: 1000,
                    color: 'Black',
                }
            },
        ]
    }
]

// Selectors
const asideList = document.querySelector('.aside__list');
const bodyList = document.querySelector('.body__list');
const infoList = document.querySelector('.info__list');

// Function to create a list item for the aside menu
function createAsideListItem(category) {
    const elem = document.createElement('button');
    elem.type = 'button';
    elem.textContent = category.name;
    elem.classList.add("aside__item");
    elem.setAttribute('data-category', category.name);
    elem.addEventListener("click", () => onAsideItemClick(category));
    return elem;
}

// Event handler for clicking on an aside item
function onAsideItemClick(category) {
    bodyList.innerHTML = '';
    infoList.innerHTML = '';
    category.items.forEach(item => bodyList.appendChild(createBodyListItem(item)));
}

// Function to create a list item for the body
function createBodyListItem(item) {
    const itemElem = document.createElement('button');
    const titleElem = document.createElement('h3');
    const imgElem = document.createElement('img');

    itemElem.type = 'button';
    itemElem.classList.add("body__item");
    titleElem.classList.add("body__name");
    imgElem.classList.add("body__img");

    titleElem.textContent = item.title;
    imgElem.setAttribute('src', item.img);
    itemElem.setAttribute('data-item', item.title);

    itemElem.appendChild(titleElem);
    itemElem.appendChild(imgElem);

    itemElem.addEventListener("click", () => onBodyItemClick(item));
    return itemElem;
}

function createBuyButton(item) {
    const buyButton = document.createElement('button');

    buyButton.type = 'button';
    buyButton.textContent = 'Купити';
    buyButton.classList.add("info__buy");

    buyButton.addEventListener("click", () => {
        infoList.appendChild(createBuyForm(item));
    });

    return buyButton;
}

function createBuyForm(item) {
    const buyForm = document.createElement('form');

    // ПІБ покупця
    const nameLabel = document.createElement('label');
    nameLabel.classList.add("info__form-label");
    nameLabel.textContent = 'ПІБ покупця: ';
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.required = true;
    nameInput.classList.add("info__form-input");
    nameLabel.appendChild(nameInput);

    // Місто (вибір зі списку)
    const cityLabel = document.createElement('label');
    cityLabel.classList.add("info__form-label");
    cityLabel.textContent = 'Місто: ';
    const citySelect = document.createElement('select');
    const cities = ['Київ', 'Львів', 'Одеса', 'Харків', 'Дніпро'];
    cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });
    citySelect.classList.add("info__form-input");
    cityLabel.appendChild(citySelect);

    // Склад Нової пошти для надсилання
    const postOfficeLabel = document.createElement('label');
    postOfficeLabel.classList.add("info__form-label");
    postOfficeLabel.textContent = 'Склад Нової пошти: ';
    const postOfficeInput = document.createElement('input');
    postOfficeInput.type = 'text';
    postOfficeInput.required = true;
    postOfficeInput.classList.add("info__form-input");
    postOfficeLabel.appendChild(postOfficeInput);

    // Післяплати або оплати банківської картки
    const paymentMethodLabel = document.createElement('label');
    paymentMethodLabel.classList.add("info__form-label");
    paymentMethodLabel.textContent = 'Спосіб оплати: ';
    const paymentMethodSelect = document.createElement('select');
    const paymentMethods = ['Післяплата', 'Банківська картка'];
    paymentMethods.forEach(method => {
        const option = document.createElement('option');
        option.value = method;
        option.textContent = method;
        paymentMethodSelect.appendChild(option);
    });
    paymentMethodSelect.classList.add("info__form-input");
    paymentMethodLabel.appendChild(paymentMethodSelect);

    // Кількість продукції, що купується
    const quantityLabel = document.createElement('label');
    quantityLabel.classList.add("info__form-label");
    quantityLabel.textContent = 'Кількість: ';
    const quantityInput = document.createElement('input');
    quantityInput.type = 'number';
    quantityInput.required = true;
    quantityInput.classList.add("info__form-input");
    quantityLabel.appendChild(quantityInput);

    // Коментар до замовлення
    const commentLabel = document.createElement('label');
    commentLabel.classList.add("info__form-label");
    commentLabel.textContent = 'Коментар до замовлення: ';
    const commentTextarea = document.createElement('textarea');
    commentTextarea.classList.add("info__form-input");
    commentLabel.appendChild(commentTextarea);

    // Кнопка відправки форми
    const submitButton = document.createElement('button');
    submitButton.type = 'submit';
    submitButton.textContent = 'Оформити замовлення';
    submitButton.classList.add("info__form-submit");

    buyForm.appendChild(nameLabel);
    buyForm.appendChild(cityLabel);
    buyForm.appendChild(postOfficeLabel);
    buyForm.appendChild(paymentMethodLabel);
    buyForm.appendChild(quantityLabel);
    buyForm.appendChild(commentLabel);
    buyForm.appendChild(submitButton);

    let orders = JSON.parse(localStorage.getItem('orders')) || [];

    function saveOrder(orderDetails) {
        orders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(orders));
    }

    buyForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Створення об'єкта деталей замовлення
        const orderDetails = {
            title: item.title,
            price: item.description.price,
            quantity: quantityInput.value,
            total: item.description.price * quantityInput.value,
            name: nameInput.value,
            city: citySelect.value,
            postOffice: postOfficeInput.value,
            paymentMethod: paymentMethodSelect.value,
            comment: commentTextarea.value
        };

        // Збереження замовлення
        saveOrder(orderDetails);
        displayOrders();


        alert(`Замовлення на ${item.title} оформлено. Кількість: ${quantityInput.value}, Місто: ${citySelect.value}`);
        // Тут можна додати додаткову логіку після оформлення замовлення
    });

    buyForm.classList.add("info__buy-form");

    return buyForm;
}

// Event handler for clicking on a body item
function onBodyItemClick(item) {
    infoList.innerHTML = '';
    Object.entries(item.description).forEach(([key, value]) =>
        infoList.appendChild(createInfoListItem(key, value))
    );
    const buyButton = createBuyButton(item);

    infoList.appendChild(buyButton);
}

// Function to create a list item for the info
function createInfoListItem(key, value) {
    const infoElem = document.createElement('li');
    const infoSpan = document.createElement('span');
    const infoSpan2 = document.createElement('span');

    infoElem.classList.add("info__item");
    infoSpan.classList.add("info__name");
    infoSpan2.classList.add("info__value");

    infoSpan.textContent = key === 'price' ? 'Ціна: ' : 'Колір: ';
    infoSpan2.textContent = key === 'price' ? `${value}$` : value;

    infoElem.appendChild(infoSpan);
    infoElem.appendChild(infoSpan2);

    return infoElem;
}

// Initialization
categories.forEach(category => asideList.appendChild(createAsideListItem(category)));

const asideButton = document.querySelector('.aside__button');
const asideOrders = document.querySelector('.aside__orders');

function deleteOrder(title) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const index = orders.findIndex(order => order.title === title);
    orders.splice(index, 1);
    localStorage.setItem('orders', JSON.stringify(orders));
}

function createOrderDetailElement(label, value) {
    const container = document.createElement('div');
    const labelSpan = document.createElement('span');
    const valueSpan = document.createElement('span');

    labelSpan.classList.add("aside__name");
    valueSpan.classList.add("aside__value");

    labelSpan.textContent = label + ': ';
    valueSpan.textContent = value;

    container.appendChild(labelSpan);
    container.appendChild(valueSpan);

    return container;
}

function createOrdersList(order) {
    const orderElem = document.createElement('li');
    const deleteButton = document.createElement('button');

    deleteButton.type = 'button';
    deleteButton.textContent = 'Видалити';
    deleteButton.classList.add("aside__delete");
    deleteButton.addEventListener("click", () => {
        deleteOrder(order.title);
        displayOrders();
    });

    orderElem.classList.add("aside__item");

    orderElem.appendChild(createOrderDetailElement('Назва', order.title));
    orderElem.appendChild(createOrderDetailElement('Ціна', order.price + '$'));
    orderElem.appendChild(createOrderDetailElement('Кількість', order.quantity));
    orderElem.appendChild(createOrderDetailElement('Загальна сума', order.total + '$'));
    orderElem.appendChild(createOrderDetailElement('ПІБ покупця', order.name));
    orderElem.appendChild(createOrderDetailElement('Місто', order.city));
    orderElem.appendChild(createOrderDetailElement('Склад Нової пошти', order.postOffice));
    orderElem.appendChild(createOrderDetailElement('Спосіб оплати', order.paymentMethod));
    orderElem.appendChild(createOrderDetailElement('Коментар', order.comment));
    orderElem.appendChild(deleteButton);

    return orderElem;
}

function displayOrders() {
    // Очищення існуючого списку
    asideOrders.innerHTML = '';

    // Зчитування замовлень з localStorage
    const orders = JSON.parse(localStorage.getItem('orders')) || [];

    // Створення HTML для кожного замовлення
    orders.forEach(order => {
        asideOrders.appendChild(createOrdersList(order));
    });
}

asideButton.addEventListener("click", () => {
    asideOrders.classList.toggle('aside__orders--active');
    displayOrders();
})