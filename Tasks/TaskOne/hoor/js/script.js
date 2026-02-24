const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const submitBtn = document.getElementById('submitBtn');
const emailInput = document.getElementById('emailInput');

// إنشاء عنصر لعرض رسائل الحالة إذا لم يكن موجوداً
let statusMessage = document.getElementById('statusMessage');
if (!statusMessage) {
    statusMessage = document.createElement('p');
    statusMessage.id = 'statusMessage';
    statusMessage.style.textAlign = 'center';
    statusMessage.style.marginTop = '15px';
    document.querySelector('.analysis-card').appendChild(statusMessage);
}

let selectedFile = null;

// --- إدارة اختيار الملفات ---

// فتح نافذة اختيار الملفات عند الضغط على منطقة الإفلات
dropZone.onclick = () => fileInput.click();

// تحديث الملف المختار عند التغيير
fileInput.onchange = (e) => {
    if (e.target.files.length > 0) {
        selectedFile = e.target.files[0];
        updateUI(selectedFile.name);
    }
};

// تأثيرات السحب والإفلات
dropZone.ondragover = (e) => {
    e.preventDefault();
    dropZone.style.background = "rgba(255, 255, 255, 0.2)";
};

dropZone.ondragleave = () => {
    dropZone.style.background = "transparent";
};

dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.style.background = "transparent";
    if (e.dataTransfer.files.length > 0) {
        selectedFile = e.dataTransfer.files[0];
        updateUI(selectedFile.name);
    }
};

// تحديث شكل الواجهة عند اختيار ملف
function updateUI(fileName) {
    const p = dropZone.querySelector('p');
    const span = dropZone.querySelector('span');
    if (p) p.innerText = "تم اختيار: " + fileName;
    if (span) span.innerText = "الملف جاهز للتحليل";
    dropZone.style.borderColor = "#8cf3a2";
}

// --- معالجة الإرسال عند الضغط على الزر ---

submitBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();

    // التحقق من المدخلات
    if (!email || !selectedFile) {
        alert("من فضلك أدخل البريد الإلكتروني وأرفق ملف Excel أولاً");
        return;
    }

    // تجهيز البيانات
    const formData = new FormData();
    formData.append('email', email);
    formData.append('data', selectedFile);

    // تحديث حالة الزر والرسالة
    submitBtn.disabled = true;
    submitBtn.innerText = "جاري الإرسال...";
    statusMessage.innerText = "جاري رفع الملف ومعالجته...";
    statusMessage.style.color = "#fff";

    try {
        // إرسال البيانات إلى n8n
        const response = await fetch('https://shaamss.app.n8n.cloud/webhook-test/31fc8a26-7929-40cf-9b35-9a537e2c6f19', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            statusMessage.innerText = "✅ تم الإرسال بنجاح! سيصلك التقرير على بريدك قريباً.";
            statusMessage.style.color = "#bc8cf3";
            submitBtn.innerText = "تم الإرسال";
        } else {
            throw new Error('فشل الاستجابة');
        }
    } catch (error) {
        console.error("Error:", error);
        statusMessage.innerText = "❌ فشل الإرسال. تأكد من تفعيل Webhook في n8n.";
        statusMessage.style.color = "#ff6b6b";
        submitBtn.disabled = false;
        submitBtn.innerText = "إعادة المحاولة";
    }
});