// Đặt ngày đích (ngày cưới)
const weddingDate = new Date('2025-03-08T00:00:00').getTime();

// Lưu giá trị trước đó để so sánh
let previousSeconds = -1;
let previousMinutes = -1;
let previousHours = -1;
let previousDays = -1;

// Cập nhật đếm ngược mỗi giây
const countdown = setInterval(function() {
    const now = new Date().getTime();
    const distance = weddingDate - now;
    
    if (distance > 0) {
        // Tính toán thời gian
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Cập nhật với hiệu ứng flip nếu giá trị thay đổi
        if (seconds !== previousSeconds) {
            flipNumber('seconds', seconds);
            previousSeconds = seconds;
        }
        if (minutes !== previousMinutes) {
            flipNumber('minutes', minutes);
            previousMinutes = minutes;
        }
        if (hours !== previousHours) {
            flipNumber('hours', hours);
            previousHours = hours;
        }
        if (days !== previousDays) {
            flipNumber('days', days);
            previousDays = days;
        }
    } else {
        clearInterval(countdown);
        ['days', 'hours', 'minutes', 'seconds'].forEach(id => {
            document.getElementById(id).innerHTML = '00';
        });
    }
}, 1000);

function formatNumber(number) {
    return number < 10 ? '0' + number : number.toString();
}

function flipNumber(id, number) {
    const element = document.getElementById(id);
    const formattedNumber = formatNumber(number);

    // Tạo các phần tử cho hiệu ứng flip
    const current = element.innerHTML;
    const flipCard = document.createElement('div');
    flipCard.className = 'flip-card';
    
    const top = document.createElement('div');
    top.className = 'top';
    top.innerHTML = current;
    
    const bottom = document.createElement('div');
    bottom.className = 'bottom';
    bottom.innerHTML = formattedNumber;
    
    const flipTop = document.createElement('div');
    flipTop.className = 'flip-top';
    flipTop.innerHTML = current;
    
    const flipBottom = document.createElement('div');
    flipBottom.className = 'flip-bottom';
    flipBottom.innerHTML = formattedNumber;

    // Xóa nội dung cũ
    element.innerHTML = '';
    
    // Thêm các phần tử mới
    flipCard.appendChild(top);
    flipCard.appendChild(flipTop);
    flipCard.appendChild(flipBottom);
    flipCard.appendChild(bottom);
    element.appendChild(flipCard);

    // Kích hoạt animation
    requestAnimationFrame(() => {
        flipCard.classList.add('flip');
    });

    // Dọn dẹp sau khi animation hoàn thành
    setTimeout(() => {
        element.innerHTML = formattedNumber;
    }, 300);
}

// Thêm CSS cho hiệu ứng flip
const style = document.createElement('style');
style.textContent = `
    .countdown-item span {
        position: relative;
        display: inline-block;
        min-width: 60px;
        height: 80px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        perspective: 400px;
        overflow: hidden;
    }

    .flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
    }

    .top, .bottom, .flip-top, .flip-bottom {
        position: absolute;
        width: 100%;
        height: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 2.5rem;
        font-weight: bold;
        color: white;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(5px);
    }

    .top, .flip-top {
        background: rgba(255, 255, 255, 0.15);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        transform-origin: bottom;
    }

    .bottom, .flip-bottom {
        bottom: 0;
        background: rgba(255, 255, 255, 0.1);
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
        transform-origin: top;
    }

    .flip-top {
        z-index: 2;
        transform-origin: bottom;
    }

    .flip-bottom {
        z-index: 1;
        transform-origin: top;
    }

    .flip .flip-top {
        animation: flip-top 0.3s ease-in;
        animation-fill-mode: forwards;
    }

    .flip .flip-bottom {
        animation: flip-bottom 0.3s ease-out;
        animation-fill-mode: forwards;
        animation-delay: 0.15s;
    }

    @keyframes flip-top {
        0% {
            transform: rotateX(0deg);
        }
        100% {
            transform: rotateX(-90deg);
        }
    }

    @keyframes flip-bottom {
        0% {
            transform: rotateX(90deg);
        }
        100% {
            transform: rotateX(0deg);
        }
    }

    .countdown-item {
        text-align: center;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        padding: 20px;
        border-radius: 15px;
        min-width: 120px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        transition: transform 0.3s ease;
    }

    .countdown-item:hover {
        transform: translateY(-5px);
    }

    .countdown-item p {
        margin-top: 10px;
        color: rgba(255, 255, 255, 0.8);
        font-size: 0.9rem;
    }

    @media (max-width: 768px) {
        .countdown-item span {
            height: 60px;
            min-width: 50px;
        }

        .top, .bottom, .flip-top, .flip-bottom {
            font-size: 2rem;
        }
    }
`;
document.head.appendChild(style); 