const N8N_WEBHOOK_URL = 'http://localhost:5678/webhook-test/31fc8a26-7929-40cf-9b35-9a537e2c6f19';

const uploadForm = document.getElementById('uploadForm');
const fileInput = document.getElementById('excelFile');
const dropZone = document.getElementById('dropZone');
const submitBtn = document.getElementById('submitBtn');

// تشغيل اختيار الملف عند الضغط
dropZone.onclick = () => fileInput.click();

// تحديث الواجهة عند اختيار ملف
fileInput.onchange = () => {
    if (fileInput.files.length > 0) {
        document.getElementById('dropZoneContent').innerHTML = `
            <i class="bi bi-file-earmark-check display-3 text-success"></i>
            <h5 class="mt-3 text-success">تم اختيار: ${fileInput.files[0].name}</h5>`;
    }
};

uploadForm.onsubmit = async (e) => {
    e.preventDefault();

    if (!fileInput.files[0]) return alert("اختار ملف إكسيل الأول");

    // حالة التحميل
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> جاري التحليل...`;

    const formData = new FormData();
    formData.append('email', document.getElementById('email').value);
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:5678/webhook-test/31fc8a26-7929-40cf-9b35-9a537e2c6f19', { method: 'POST', body: formData });
        const data = await response.json();

        if (response.ok) {
            // إخفاء الرفع وإظهار الداشبورد فوراً
            document.getElementById('uploadSection').classList.add('d-none');
            document.getElementById('resultDashboard').classList.remove('d-none');

            // ملء الأرقام
            document.getElementById('val-total-sales').innerText = data.totalSales || "$0";
            document.getElementById('val-orders').innerText = data.ordersCount || "0";
            document.getElementById('val-top-product').innerText = data.topProduct || "-";

            // ملء قائمة الـ Top 5
            const list = document.getElementById('val-top-list');
            list.innerHTML = "";
            if (data.top5Products) {
                const products = data.top5Products.split(' | ');
                products.forEach((p, i) => {
                    list.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center border-0 px-0">
                        <span class="badge bg-light text-primary border">${i+1}</span>
                        <span class="fw-bold small">${p}</span>
                    </li>`;
                });
            }

            // رسم التشارت
            renderChart(data.chartLabels, data.chartValues);
        }
    } catch (error) {
        alert("فشل الاتصال بـ n8n. تأكد من تشغيل الـ Workflow.");
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerText = "بدء التحليل الذكي";
    }
};

function renderChart(labels, values) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels || ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'],
            datasets: [{
                data: values || [10, 50, 30, 90, 40, 100],
                borderColor: '#3b82f6',
                tension: 0.4,
                fill: true,
                backgroundColor: 'rgba(59, 130, 246, 0.05)'
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            maintainAspectRatio: false
        }
    });

}