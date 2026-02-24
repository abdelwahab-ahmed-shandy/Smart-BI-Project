document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const status = document.getElementById('statusMessage');
    status.style.color = "#2c3e50";
    status.style.marginTop = "15px";
    status.innerText = "جاري رفع الملف إلى منصة إكسيلو...";
});