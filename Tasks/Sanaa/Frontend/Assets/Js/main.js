// assets/js/main.js

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
    // التحقق من امتداد الملف
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        showError("عذراً، يجب اختيار ملف Excel أو CSV فقط.");
        fileInput.value = ''; // تفريغ المدخل
        return;
    }
    fileError.style.display = 'none';
    dropZone.classList.add('dragover');
    uploadContent.innerHTML = `
        <i class="bi bi-file-earmark-check display-4 text-success"></i>
        <h5 class="mt-3 text-success">تم اختيار: ${file.name}</h5>
        <p class="text-muted small">اضغط لتغيير الملف</p>`;
}





// آلية معالجة الأخطاء
function showError(msg) {
    fileError.innerText = msg;
    fileError.style.display = 'block';
    uploadContent.innerHTML = `
        <i class="bi bi-exclamation-triangle display-4 text-warning"></i>
        <h5 class="mt-3 text-warning">تنبيه في البيانات</h5>
        <p class="text-muted small">${msg}</p>
    `;
    // إخفاء الداشبورد إذا كان ظاهراً بسبب خطأ سابق
    document.getElementById('dashboard').style.display = 'none';
}





// 2. إرسال البيانات إلى n8n (محدث ليتناسب مع نود الـ If)
uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('loading-spinner');
    const btnText = document.getElementById('btnText');
    
    if (!fileInput.files[0]) {
        showError("يرجى اختيار ملف أولاً.");
        return;
    }

    // تجهيز حالة التحميل
    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    btnText.innerText = "جاري تحليل البيانات...";

    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('file', fileInput.files[0]);

    try {
        // تأكد من استخدام URL الـ Webhook الصحيح (Production أو Test)
        const response = await fetch('http://localhost:5678/webhook-test/46488668-8527-4d29-9a58-9fabe36cbd2c',{ 
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            // نجاح التحليل (المسار True في نود If)
            showDashboard(data);
            fileError.style.display = 'none';
        } else {
            // فشل التحليل (المسار False في نود If - مثل الملف الفارغ)
            showError(data.error || "حدث خطأ في محتوى الملف.");
        }
    } catch (error) {
        showError("تعذر الاتصال بخادم n8n. تأكد من تشغيل البرنامج.");
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

    // عرض الأرقام الأساسية
    document.getElementById('val-total-sales').innerText = data.totalSales || "$0";
    document.getElementById('val-orders').innerText = data.ordersCount || "0";
    document.getElementById('val-top-product').innerText = data.topProduct || "-";
    document.getElementById('val-insight').innerText = data.insight || "أداؤك مستقر اليوم.";

    // --- الجزء الجديد: عرض قائمة الـ Top 5 ---
    const topListContainer = document.getElementById('val-top-list');
    if (data.top5Products) {
        // تحويل النص (المنتجات المفصولة بـ |) إلى مصفوفة ثم إلى عناصر HTML
        const productsArray = data.top5Products.split(' | ');
        topListContainer.innerHTML = productsArray.map((product, index) => `
            <li class="list-group-item border-0 px-0 d-flex align-items-center">
                <span class="badge bg-light text-primary me-2 border">${index + 1}</span>
                <span class="small fw-semibold">${product}</span>
            </li>
        `).join('');
    }

    // تحديث الرسم البياني
    const rawSales = parseFloat((data.totalSales || "0").replace(/[^0-9.-]+/g, ""));
    const baseValue = isNaN(rawSales) ? 0 : rawSales / 6; 
    initChart(['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'], 
              ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'].map(() => (baseValue * (0.8 + Math.random() * 0.4)).toFixed(0)));
}





// 4. دالة الرسم البياني
function initChart(labels, values) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    
    if (window.myChart) {
        window.myChart.destroy();
    }

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'اتجاه المبيعات التقريبي',
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
                    ticks: { 
                        callback: (value) => '$' + value.toLocaleString(),
                        font: { family: 'Cairo' }
                    } 
                },
                x: {
                    ticks: { font: { family: 'Cairo' } }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: { bodyFont: { family: 'Cairo' }, titleFont: { family: 'Cairo' } }
            }
        }
    });
}