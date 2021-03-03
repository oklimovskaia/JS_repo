const products = [
    {id: 1, title: "Notebook", price: 20000},
    {id: 2, title: "Mouse", price: 1500},
    {id: 3, title: "Keyboard", price: 5000},
    {id: 4, title: "Gamepad", price: 4500},
]

const renderProduct = (title, price, btn_text = 'Добавить в корзину') => {
    let div = document.createElement('div');
    div.innerHTML = 
    `<div class="product-item">
            <h3>${title}</h3>
            <p>${price}</p>
        <button class="by-btn" type="button">${btn_text}</button>
        </div>`;
    return div.firstChild;
}

const productList2 = (products) => {
    products.forEach( function (item) {
        
        document.querySelector('.products').appendChild(renderProduct(item.title, item.price));
    })
}

// еще один вариант
// const productList = (products) => {
//     products.forEach( function (item) {
    
//         //console.log(item.title + " " + item.price);
//         let div = document.createElement('div');
//         div.classList.add('product-item');
//         let h3 = document.createElement('h3');
//         h3.textContent = item.title;
//         div.appendChild(h3); 
//         let price = document.createElement('p');
//         price.textContent = item.price;
//         div.appendChild(price);
//         let button = document.createElement('button');
//         button.classList.add('by-btn');
//         button.textContent = 'Добавить в корзину';
//         button.setAttribute('type', 'button');
//         div.appendChild(button);
//         document.querySelector('.products').appendChild(div);

        
//     })
// }

  

    productList2(products);
  