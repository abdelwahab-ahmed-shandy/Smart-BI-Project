// assets/js/main.js

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileError = document.getElementById('fileError');
const uploadContent = document.getElementById('uploadContent');
const uploadForm = document.getElementById('uploadForm');

// 1. إدارة اختيار الملف والتحقق منه
if (dropZone) {
    dropZone.onclick = () => fileInput.click();
}

if (fileInput) {
    fileInput.onchange = () => handleFile(fileInput.files[0]);
}

function handleFile(file) {
    if (!file) return;

    // التحقق من النوع
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        showError("عذراً، يجب اختيار ملف Excel أو CSV فقط.");
        return;
    }

    // التحقق من الحجم (10MB)
    if (file.size > 10 * 1024 * 1024) {
        showError("حجم الملف كبير جداً. الحد الأقصى هو 10 ميجابايت.");
        return;
    }

    fileError.style.display = 'none';
    dropZone.classList.remove('is-invalid');
    dropZone.classList.add('dragover');
    uploadContent.innerHTML = `
        <i class="bi bi-file-earmark-check display-4 text-success"></i>
        <h5 class="mt-3 text-success">تم اختيار: ${file.name}</h5>
        <p class="text-muted small">${(file.size / 1024).toFixed(2)} KB</p>
    `;
}

function showError(msg) {
    fileError.innerText = msg;
    fileError.style.display = 'block';
    dropZone.classList.add('is-invalid');
    fileInput.value = ''; 
    uploadContent.innerHTML = `
        <i class="bi bi-exclamation-circle display-4 text-danger"></i>
        <h5 class="mt-3 text-danger">ملف غير صالح</h5>
        <p class="text-muted small">يرجى المحاولة مرة أخرى</p>
    `;
}

// 2. إرسال البيانات إلى n8n
uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    
    if (fileInput.files.length === 0) {
        showError("يرجى اختيار ملف أولاً");
        return;
    }

    const btnText = document.getElementById('btnText');
    const spinner = document.getElementById('loading-spinner');
    const submitBtn = document.getElementById('submitBtn');

    btnText.innerText = 'جاري تحليل البيانات...';
    spinner.style.display = 'inline-block';
    submitBtn.disabled = true;

    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('file', fileInput.files[0]);

    try {
        // سيتم تغيير الرابط عند البدء في n8n
        const response = await fetch('YOUR_N8N_WEBHOOK_URL', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            const data = await response.json();
            showDashboard(data);
        } else {
            throw new Error("حدث خطأ في الاتصال بالسيرفر");
        }
    } catch (error) {
        alert("حدث خطأ أثناء المعالجة، تأكد من تشغيل n8n.");
        console.error(error);
    } finally {
        btnText.innerText = 'بدء التحليل الذكي';
        spinner.style.display = 'none';
        submitBtn.disabled = false;
    }
};

// 3. عرض النتائج في الـ Dashboard
function showDashboard(data) {
    document.getElementById('dashboard').style.display = 'block';
    window.scrollTo({ top: document.getElementById('dashboard').offsetTop - 100, behavior: 'smooth' });

    document.getElementById('val-total-sales').innerText = data.totalSales || "$0";
    document.getElementById('val-top-product').innerText = data.topProduct || "-";
    document.getElementById('val-orders').innerText = data.ordersCount || "0";
    document.getElementById('ai-response').innerText = data.aiInsight || "لا توجد توصيات حالياً.";

    initChart(data.chartLabels, data.chartData);
}

function initChart(labels = ['يناير', 'فبراير', 'مارس'], values = [0, 0, 0]) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    if (window.myChart) window.myChart.destroy();

    window.myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'المبيعات',
                data: values,
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}