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

const asideList = document.querySelector('.aside__list')
const bodyList = document.querySelector('.body__list')
const infoList = document.querySelector('.info__list')

categories.forEach((category) => {
    const elem = document.createElement('li')
    elem.textContent = category.name
    elem.classList.add("aside__item")
    elem.setAttribute('data-category', category.name);
    asideList.appendChild(elem)

    elem.addEventListener("click", (event) => {
        if (event.currentTarget.dataset.category === category.name) {
            bodyList.innerHTML = '';
            infoList.innerHTML = '';
            category.items.forEach((item) => {
                const itemElem = document.createElement('li')
                const titleElem = document.createElement('h2')
                const imgElem = document.createElement('img')
                // itemElem.textContent = item.title
                itemElem.classList.add("body__item")
                titleElem.classList.add("body__name")
                imgElem.classList.add("body__img")
                titleElem.textContent = item.title
                imgElem.setAttribute('src', item.img)
                itemElem.setAttribute('data-item', item.title);
                bodyList.appendChild(itemElem)
                itemElem.appendChild(titleElem)
                itemElem.appendChild(imgElem)
                itemElem.addEventListener("click", (event) => {
                    if (event.currentTarget.dataset.item === item.title) {
                        infoList.innerHTML = '';
                        for (const [key, value] of Object.entries(item.description)) {
                            const infoElem = document.createElement('li')
                            const infoSpan = document.createElement('span');
                            const infoSpan2 = document.createElement('span');
                            infoElem.classList.add("info__item")
                            infoSpan.classList.add("info__name")
                            infoSpan2.classList.add("info__value")
                            infoSpan.textContent = key === 'price' ? 'Ціна: ' : 'Колір: '
                            infoSpan2.textContent = key === 'price' ? `${value}$` : value
                            infoList.appendChild(infoElem)
                            infoElem.appendChild(infoSpan)
                            infoElem.appendChild(infoSpan2)
                        }
                    }
                    // console.log(event.currentTarget.dataset.item);
                })
            })
        }
        // console.log(event.currentTarget.dataset.category);
    })
})