// Thêm thuộc tính preload cho audio để tải trước
document.getElementById('bgMusic').preload = 'auto';

// Phát nhạc ngay khi có thể
function playAudioImmediately() {
    const bgMusic = document.getElementById('bgMusic');
    bgMusic.volume = 0.3;
    
    // Đảm bảo audio đã sẵn sàng
    if (bgMusic.readyState >= 2) {
        bgMusic.play();
    } else {
        // Nếu audio chưa sẵn sàng, đợi cho đến khi sẵn sàng
        bgMusic.addEventListener('canplay', function() {
            bgMusic.play();
        });
    }

    // Xử lý khi trình duyệt chặn autoplay
    document.addEventListener('click', function playOnFirstClick() {
        bgMusic.play();
        document.removeEventListener('click', playOnFirstClick);
    }, { once: true });
}

// Gọi hàm ngay khi script được tải
playAudioImmediately();

// Xử lý khi audio bị lỗi
document.getElementById('bgMusic').addEventListener('error', function(e) {
    console.log('Lỗi audio:', e);
}); 