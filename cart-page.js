// دالة للحصول على عربة التسوق من LocalStorage
function getCart() {
    // استرجاع عربة التسوق من LocalStorage
    return JSON.parse(localStorage.getItem('cart')) || [];
}

// دالة لعرض المنتجات في عربة التسوق
function displayCart() {
    const cartItems = getCart(); // نحصل على عربة التسوق من LocalStorage
    const cartContainer = document.getElementById('cart-items'); // المكان الذي سيتم عرض المنتجات فيه

    // إذا كانت عربة التسوق فارغة
    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Cart Is Empty</p>';
    } else {
        cartContainer.innerHTML = ''; // نبدأ بإزالة أي محتوى سابق
        let totalPrice = 0;

        // عرض كل منتج في العربة
        cartItems.forEach((item, index) => {
            totalPrice += item.price; // إضافة السعر الإجمالي

            // إضافة المنتج إلى العربة مع زر حذف
            cartContainer.innerHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" width="100" height="100">
                    <p>${item.name}</p>
                    <p>Price: ${item.price} Egp</p>
                    <button onclick="removeFromCart(${index})">Remove From Cart</button>
                </div>
            `;
        });

        // عرض إجمالي السعر
        cartContainer.innerHTML += `
            <div class="cart-total">
                <p>Total Price: ${totalPrice} Egp</p>
            </div>
        `;
    }
}

// دالة لحذف المنتج من العربة
function removeFromCart(index) {
    let cart = getCart(); // الحصول على عربة التسوق من LocalStorage
    cart.splice(index, 1); // إزالة المنتج من المصفوفة باستخدام splice

    // تخزين العربة المحدثة في LocalStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // تحديث عرض العربة بعد الحذف
    displayCart(); // إعادة عرض العربة المحدثة
}

// دالة للتوجه إلى صفحة الدفع
function goToCheckout() {
    // هنا يمكننا التحقق من وجود عناصر في العربة قبل الانتقال
    const cartItems = getCart();
    if (cartItems.length > 0) {
        window.location.href = 'checkout.html'; // الانتقال إلى صفحة الدفع
    } else {
        alert('Cart Is Empty!'); // تنبيه إذا كانت العربة فارغة
    }
}

// استدعاء دالة لعرض محتويات العربة عند تحميل الصفحة
window.onload = displayCart;
