document.addEventListener('DOMContentLoaded', function() {
    const wishForm = document.querySelector('.rsvp-form');
    const wishesContainer = document.querySelector('.wishes-container');

    // Dữ liệu mẫu ban đầu
    const initialWishes = [
        {
            name: "minh",
            message: "hellytgfjujkm",
            timestamp: "2024-03-08T10:30:00Z"
        },
        {
            name: "321321",
            message: "Chúc mừng hạnh phúc! Chúc hai bạn trăm năm hạnh phúc!",
            timestamp: "2024-03-08T10:25:00Z"
        },
        {
            name: "3123",
            message: "321323213dsadsa",
            timestamp: "2024-03-08T10:20:00Z"
        },
        {
            name: "Nguyễn Mạnh Dũng",
            message: "Chúc mừng hạnh phúc",
            timestamp: "2024-03-08T10:15:00Z"
        },
        {
            name: "Hồng Hoa A1",
            message: "Cô dâu xinh quá! Chú rể cũng là người tinh tế, tinh cảm nữa nên tớ tin 2 bạn sẽ hạnh phúc bên nhau. Chúc cho cuộc sống sau này của 2 bạn dù có cùng nhau trải qua hy nô đi ở vẫn luôn yêu",
            timestamp: "2024-03-08T10:10:00Z"
        }
    ];

    // Hàm để lấy wishes từ localStorage
    function getWishes() {
        const wishes = localStorage.getItem('wedding-wishes');
        if (!wishes) {
            // Nếu chưa có dữ liệu, khởi tạo với dữ liệu mẫu
            localStorage.setItem('wedding-wishes', JSON.stringify(initialWishes));
            return initialWishes;
        }
        return JSON.parse(wishes);
    }

    // Hàm để lưu wishes vào localStorage
    function saveWishes(wishes) {
        localStorage.setItem('wedding-wishes', JSON.stringify(wishes));
    }

    // Hàm để tạo HTML cho một lời chúc
    function createWishElement(wish) {
        const wishElement = document.createElement('div');
        wishElement.className = 'wish-item';
        wishElement.innerHTML = `
            <h4>${wish.name}</h4>
            <p>${wish.message}</p>
            <div class="wish-reaction" style="opacity: 0; transform: translateY(10px);">
                <span>↪</span>
                <span class="reaction-emoji">❤️</span>
                <span>Cảm ơn nha ạ</span>
            </div>
        `;

        // Thêm xử lý sự kiện click cho reaction
        const reaction = wishElement.querySelector('.wish-reaction');
        reaction.addEventListener('click', function(e) {
            // Thêm class active
            this.classList.toggle('active');
            
            // Tạo hiệu ứng trái tim bay
            const heart = document.createElement('span');
            heart.innerHTML = '❤️';
            heart.className = 'flying-heart';
            heart.style.left = e.clientX + 'px';
            heart.style.top = e.clientY + 'px';
            document.body.appendChild(heart);
            
            // Xóa element trái tim sau khi animation kết thúc
            setTimeout(() => {
                heart.remove();
            }, 1000);
        });

        return wishElement;
    }

    // Hiển thị các lời chúc đã lưu
    function displayWishes() {
        const wishes = getWishes();
        wishesContainer.innerHTML = '';
        wishes.forEach(wish => {
            const wishElement = createWishElement(wish);
            wishesContainer.appendChild(wishElement);
            setTimeout(() => {
                const reaction = wishElement.querySelector('.wish-reaction');
                reaction.style.transition = 'all 0.5s ease';
                reaction.style.opacity = '1';
                reaction.style.transform = 'translateY(0)';
            }, 500);
        });
    }

    // Load wishes khi trang được tải
    displayWishes();

    // Xử lý submit form
    wishForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = wishForm.querySelector('input[type="text"]').value;
        const message = wishForm.querySelector('textarea').value;

        if (!name || !message) {
            alert('Vui lòng nhập đầy đủ thông tin!');
            return;
        }

        // Tạo wish mới
        const newWish = {
            name: name,
            message: message,
            timestamp: new Date().toISOString()
        };

        // Lấy danh sách wishes hiện tại và thêm wish mới vào đầu
        const wishes = getWishes();
        wishes.unshift(newWish);
        
        // Lưu vào localStorage
        saveWishes(wishes);

        // Tạo và hiển thị wish mới
        const wishElement = createWishElement(newWish);
        wishesContainer.insertBefore(wishElement, wishesContainer.firstChild);

        // Reset form
        wishForm.reset();

        // Hiển thị reaction sau 0.5s
        setTimeout(() => {
            const reaction = wishElement.querySelector('.wish-reaction');
            reaction.style.transition = 'all 0.5s ease';
            reaction.style.opacity = '1';
            reaction.style.transform = 'translateY(0)';
        }, 500);
    });
}); 