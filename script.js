document.addEventListener('DOMContentLoaded', () => {
    // Корзина в localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Обновление счетчика корзины
    function updateCartCounter() {
        document.querySelectorAll('#cart-counter').forEach(el => {
            el.textContent = cart.length;
        });
    }
    
    // Добавление товара
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const productCard = e.target.closest('.product-card');
            const product = {
                id: e.target.dataset.id,
                name: productCard.querySelector('h3').textContent,
                price: productCard.querySelector('.price').textContent,
                image: productCard.querySelector('img').src
            };
            
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCounter();
            showAddedNotification(product.name);
        });
    });
    
    // Показать уведомление
    function showAddedNotification(productName) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = `${productName} добавлен в корзину!`;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 2000);
    }
    
    // Отображение корзины
    if (document.querySelector('#cart-items')) {
        const cartItemsEl = document.getElementById('cart-items');
        const totalPriceEl = document.getElementById('total-price');
        
        let total = 0;
        
        cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'cart-item';
            itemEl.innerHTML = `
                <img src="${item.image}" alt="${item.name}" width="60">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p>${item.price}</p>
                </div>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            
            cartItemsEl.appendChild(itemEl);
            total += parseInt(item.price.replace(/\D/g, ''));
        });
        
        totalPriceEl.textContent = total;
        
        // Удаление товаров
        document.querySelectorAll('.remove-item').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.dataset.index;
                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                location.reload();
            });
        });
    }
    
    // Инициализация
    updateCartCounter();
    
    // Стили для уведомлений
    const style = document.createElement('style');
    style.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 25px;
            border-radius: 5px;
            box-shadow: 0 3px 10px rgba(0,0,0,0.2);
            z-index: 1000;
        }
    `;
    document.head.appendChild(style);
});
