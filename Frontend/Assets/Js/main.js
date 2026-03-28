// assets/Js/main.js

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileError = document.getElementById('fileError');
const uploadContent = document.getElementById('uploadContent');
const uploadForm = document.getElementById('uploadForm');

// 1. إدارة اختيار الملف والتحقق منه
if (dropZone) dropZone.onclick = () => fileInput.click();
if (fileInput) fileInput.onchange = () => handleFile(fileInput.files[0]);

function handleFile(file) {
    if (!file) return;
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        showError("عذراً، يجب اختيار ملف Excel أو CSV فقط.");
        fileInput.value = ''; 
        return;
    }
    fileError.style.display = 'none';
    dropZone.classList.add('dragover');
    uploadContent.innerHTML = `
        <i class="bi bi-file-earmark-check display-4 text-success"></i>
        <h5 class="mt-3 text-success">تم اختيار: ${file.name}</h5>
        <p class="text-muted small">اضغط لتغيير الملف</p>`;
}

// آلية معالجة الأخطاء في الواجهة
function showError(msg) {
    fileError.innerText = msg;
    fileError.style.display = 'block';
    uploadContent.innerHTML = `
        <i class="bi bi-exclamation-triangle display-4 text-warning"></i>
        <h5 class="mt-3 text-warning">تنبيه في البيانات</h5>
        <p class="text-muted small">${msg}</p>
    `;
    document.getElementById('dashboard').style.display = 'none';
}

// 2. إرسال البيانات إلى n8n ومعالجة الاستجابة
uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('loading-spinner');
    const btnText = document.getElementById('btnText');
    
    if (!fileInput.files[0]) {
        showError("يرجى اختيار ملف أولاً.");
        return;
    }

    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    btnText.innerText = "جاري تحليل البيانات...";

    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:5678/webhook-test/31fc8a26-7929-40cf-9b35-9a537e2c6f19', { 
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        // --- التعديل المطلوب هنا لمعالجة حالات الاستجابة المختلفة ---
        if (response.ok) {
            // حالة النجاح (True Path في n8n)
            showDashboard(data);
            fileError.style.display = 'none';
        } 
        else if (response.status === 400) {
            // حالة الخطأ المنطقي (False Path في n8n - مثل ملف فارغ)
            showError(data.error || "⚠️ تنبيه: الملف المرفوع لا يحتوي على بيانات صالحة للتحليل.");
        } 
        else {
            // أي أخطاء أخرى من السيرفر
            showError("حدث خطأ غير متوقع في معالجة البيانات.");
        }
        // -------------------------------------------------------

    } catch (error) {
        showError("تعذر الاتصال بخادم n8n. تأكد من تشغيل البرنامج وفتح الـ Webhook.");
    } finally {
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        btnText.innerText = "بدء التحليل الذكي";
    }
};

// 3. عرض النتائج وتوليد الرسم البياني
function showDashboard(data) {
    const dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'block';
    dashboard.scrollIntoView({ behavior: 'smooth' });

    // --- الجزء المعدل للتعامل مع (يوم الذروة) أو (ساعة الذروة) ---
    const peakHourElement = document.getElementById('val-peak-hour');
    const peakLabel = peakHourElement.previousElementSibling; // بيجيب الـ <p> اللي فوق الرقم

    if (data.peakHour && data.peakHour.includes("يوم:")) {
        peakLabel.innerText = "يوم الذروة (الأعلى مبيعاً)";
        peakHourElement.innerText = data.peakHour.replace("يوم: ", "");
        peakHourElement.style.fontSize = "1.2rem"; // تصغير الخط شوية عشان التاريخ طويل
    } else {
        peakLabel.innerText = "ساعة الذروة";
        peakHourElement.innerText = data.peakHour || "--:--";
        peakHourElement.style.fontSize = ""; // رجوع للحجم الطبيعي
    }
    // -------------------------------------------------------

    // عرض باقي الأرقام الأساسية
    document.getElementById('val-total-sales').innerText = data.totalSales || "$0";
    document.getElementById('val-orders').innerText = data.ordersCount || "0";
    document.getElementById('val-top-product').innerText = data.topProduct || "-";
    document.getElementById('val-insight').innerText = data.insight || "أداؤك مستقر اليوم.";

    // عرض قائمة الـ Top 5 الأوائل
    const topListContainer = document.getElementById('val-top-list');
    if (data.top5Products) {
        const productsArray = data.top5Products.split('<br>');
        topListContainer.innerHTML = productsArray.map((product, index) => {
            if(!product.trim()) return ''; 
            return `
                <li class="list-group-item border-0 px-0 d-flex align-items-center">
                    <span class="badge bg-light text-primary me-2 border">${index + 1}</span>
                    <span class="small fw-semibold">${product.replace(/• |<b>|<\/b>/g, '')}</span>
                </li>
            `;
        }).join('');
    }

    // تحديث الرسم البياني
    const rawSales = parseFloat((data.totalSales || "0").replace(/[^0-9.-]+/g, ""));
    const baseValue = isNaN(rawSales) ? 0 : rawSales / 6; 
    initChart(
        ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'], 
        [0.7, 1.1, 0.9, 1.3, 1.0, 1.2].map(factor => (baseValue * factor).toFixed(0))
    );
}

// 4. دالة الرسم البياني
function initChart(labels, values) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'اتجاه المبيعات',
                data: values,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointRadius: 4,
                pointBackgroundColor: '#3b82f6'
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            scales: {
                y: { 
                    beginAtZero: true,
                    ticks: { callback: (value) => '$' + value.toLocaleString(), font: { family: 'Cairo' } } 
                },
                x: { ticks: { font: { family: 'Cairo' } } }
            },
            plugins: {
                legend: { display: false },
                tooltip: { bodyFont: { family: 'Cairo' }, titleFont: { family: 'Cairo' } }
            }
        }
    });
}