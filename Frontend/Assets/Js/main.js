// ============================================
// Simple Auth System using Local Storage
// ============================================

// التحقق من تسجيل الدخول
function checkAuth() {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        window.location.href = "auth.html";
        return false;
    }
    return JSON.parse(currentUser);
}

// عرض معلومات المستخدم
function displayUserInfo() {
    const currentUser = checkAuth();
    if (currentUser) {
        const userEmailSpan = document.getElementById('userEmail');
        if (userEmailSpan) {
            userEmailSpan.innerText = currentUser.email;
        }
    }
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = "auth.html";
}

// ============================================
// Smart BI - Main JavaScript File
// ============================================

const dropZone = document.getElementById('dropZone');
const fileInput = document.getElementById('fileInput');
const fileError = document.getElementById('fileError');
const uploadContent = document.getElementById('uploadContent');
const uploadForm = document.getElementById('uploadForm');
let myChart = null;

// ============================================
// File Upload Handling
// ============================================

if (dropZone) dropZone.onclick = () => fileInput.click();
if (fileInput) fileInput.onchange = () => handleFile(fileInput.files[0]);

if (dropZone) {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file) {
            handleFile(file);
            fileInput.files = e.dataTransfer.files;
        }
    });
}

function handleFile(file) {
    if (!file) return;
    if (!file.name.match(/\.(xlsx|xls|csv)$/i)) {
        showError("عذراً، يجب اختيار ملف Excel أو CSV فقط.");
        fileInput.value = ''; 
        return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
        showError("حجم الملف كبير جداً. الحد الأقصى 10MB.");
        fileInput.value = '';
        return;
    }
    
    fileError.style.display = 'none';
    dropZone.classList.add('dragover');
    
    const fileSize = (file.size / 1024).toFixed(1);
    uploadContent.innerHTML = `
        <i class="bi bi-file-earmark-check-fill display-4 text-success"></i>
        <h5 class="mt-3 text-success fw-semibold">تم اختيار الملف بنجاح</h5>
        <p class="text-muted small mb-1"><strong>${file.name}</strong></p>
        <p class="text-muted small">الحجم: ${fileSize} KB</p>
        <p class="text-muted small mt-2">اضغط لتغيير الملف</p>
    `;
    
    setTimeout(() => {
        dropZone.classList.remove('dragover');
    }, 500);
}

function showError(msg) {
    fileError.innerText = msg;
    fileError.style.display = 'block';
    uploadContent.innerHTML = `
        <i class="bi bi-exclamation-triangle-fill display-4 text-warning"></i>
        <h5 class="mt-3 text-warning fw-semibold">تنبيه</h5>
        <p class="text-muted small">${msg}</p>
        <p class="text-muted small mt-2">اضغط لإعادة المحاولة</p>
    `;
    document.getElementById('dashboard').style.display = 'none';
    
    fileError.classList.add('shake');
    setTimeout(() => {
        fileError.classList.remove('shake');
    }, 500);
}

// ============================================
// API Submission
// ============================================

uploadForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('loading-spinner');
    const btnText = document.getElementById('btnText');
    const email = document.getElementById('email').value;
    
    if (!email) {
        showError("يرجى إدخال البريد الإلكتروني أولاً.");
        document.getElementById('email').focus();
        return;
    }
    
    if (!fileInput.files[0]) {
        showError("يرجى اختيار ملف أولاً.");
        return;
    }

    submitBtn.disabled = true;
    spinner.style.display = 'inline-block';
    btnText.innerText = "جاري تحليل البيانات...";

    const formData = new FormData();
    formData.append('email', email);
    formData.append('file', fileInput.files[0]);

    try {
        const response = await fetch('http://localhost:5678/webhook-test/31fc8a26-7929-40cf-9b35-9a537e2c6f19', { 
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (response.ok) {
            showDashboard(data);
            fileError.style.display = 'none';
            showToast("تم تحليل البيانات بنجاح!", "success");
        } 
        else if (response.status === 400) {
            showError(data.error || "⚠️ تنبيه: الملف المرفوع لا يحتوي على بيانات صالحة للتحليل.");
            showToast(data.error || "فشل تحليل البيانات", "error");
        } 
        else {
            showError("حدث خطأ غير متوقع في معالجة البيانات. الرجاء المحاولة مرة أخرى.");
            showToast("حدث خطأ في المعالجة", "error");
        }

    } catch (error) {
        console.error('Error:', error);
        showError("تعذر الاتصال بخادم n8n. تأكد من تشغيل البرنامج وفتح الـ Webhook.");
        showToast("تعذر الاتصال بالخادم", "error");
    } finally {
        spinner.style.display = 'none';
        submitBtn.disabled = false;
        btnText.innerText = "بدء التحليل الذكي";
    }
};

// ============================================
// Toast Notifications
// ============================================

function showToast(message, type = 'info') {
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
        document.body.appendChild(toastContainer);
    }
    
    const toastId = 'toast-' + Date.now();
    const bgColor = type === 'success' ? 'bg-success' : type === 'error' ? 'bg-danger' : 'bg-info';
    
    const toastHTML = `
        <div id="${toastId}" class="toast align-items-center text-white ${bgColor} border-0" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="true" data-bs-delay="3000">
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast"></button>
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    toast.show();
    
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}

// ============================================
// Dashboard Display
// ============================================

function showDashboard(data) {
    window.lastDashboardData = data;
    
    const dashboard = document.getElementById('dashboard');
    dashboard.style.display = 'block';
    dashboard.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    const peakHourElement = document.getElementById('val-peak-hour');
    const peakLabel = peakHourElement.closest('.stat-card').querySelector('p');
    
    if (data.peakHour && data.peakHour.includes("يوم:")) {
        peakLabel.innerText = "يوم الذروة";
        peakHourElement.innerText = data.peakHour.replace("يوم: ", "");
        peakHourElement.style.fontSize = "1.1rem";
    } else {
        peakLabel.innerText = "ساعة الذروة";
        peakHourElement.innerText = data.peakHour || "--:--";
        peakHourElement.style.fontSize = "";
    }
    
    const totalSales = parseFloat((data.totalSales || "0").replace(/[^0-9.-]+/g, ""));
    document.getElementById('val-total-sales').innerHTML = formatCurrency(totalSales);
    document.getElementById('val-orders').innerText = formatNumber(data.ordersCount || "0");
    document.getElementById('val-top-product').innerText = data.topProduct || "-";
    document.getElementById('val-insight').innerHTML = data.insight || "✨ أداؤك مستقر اليوم. استمر في تحليل البيانات لتحسين الأداء.";
    
    const topListContainer = document.getElementById('val-top-list');
    if (data.top5Products) {
        const productsArray = data.top5Products.split('<br>').filter(p => p.trim());
        topListContainer.innerHTML = productsArray.map((product, index) => {
            const cleanName = product.replace(/[•]/g, '').trim();
            return `
                <li class="list-group-item border-0 px-0 py-3 d-flex align-items-center justify-content-between">
                    <div class="d-flex align-items-center">
                        <span class="badge bg-light text-primary me-3">${index + 1}</span>
                        <span class="small fw-semibold">${cleanName}</span>
                    </div>
                    <i class="bi bi-bar-chart-steps text-muted"></i>
                </li>
            `;
        }).join('');
    } else {
        topListContainer.innerHTML = '<li class="list-group-item border-0 px-0 text-muted">لا توجد بيانات كافية</li>';
    }
    
    updateChart(data);
}

// ============================================
// Formatting Functions
// ============================================

function formatCurrency(amount) {
    if (isNaN(amount)) return '$0';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

function formatNumber(num) {
    return new Intl.NumberFormat('en-US').format(num);
}

// ============================================
// Chart Functions
// ============================================

function getChartColors() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    
    return {
        borderColor: isDark ? '#60a5fa' : '#2563eb',
        backgroundColor: isDark ? 'rgba(96, 165, 250, 0.1)' : 'rgba(37, 99, 235, 0.05)',
        pointBackgroundColor: isDark ? '#60a5fa' : '#2563eb',
        pointBorderColor: isDark ? '#1f1f2a' : '#ffffff',
        gridColor: isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
        textColor: isDark ? '#cbd5e1' : '#6b7280'
    };
}

function updateChart(data) {
    const ctx = document.getElementById('mainChart').getContext('2d');
    const colors = getChartColors();
    
    const rawSales = parseFloat((data.totalSales || "0").replace(/[^0-9.-]+/g, ""));
    const baseValue = isNaN(rawSales) ? 1000 : rawSales / 6;
    
    const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو'];
    const monthlyValues = [0.7, 1.1, 0.9, 1.3, 1.0, 1.2].map(factor => Math.round(baseValue * factor));
    
    if (myChart) {
        myChart.destroy();
    }
    
    myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: months,
            datasets: [{
                label: 'إجمالي المبيعات',
                data: monthlyValues,
                borderColor: colors.borderColor,
                backgroundColor: colors.backgroundColor,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointBackgroundColor: colors.pointBackgroundColor,
                pointBorderColor: colors.pointBorderColor,
                pointBorderWidth: 2,
                pointHoverBackgroundColor: colors.borderColor,
                pointHoverBorderColor: colors.pointBorderColor,
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index',
            },
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    labels: {
                        font: {
                            family: 'Cairo',
                            size: 12,
                            weight: '500'
                        },
                        color: colors.textColor,
                        usePointStyle: true,
                        boxWidth: 8,
                        padding: 15
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#ffffff',
                    titleFont: {
                        family: 'Cairo',
                        size: 13,
                        weight: 'bold'
                    },
                    bodyColor: '#ffffff',
                    bodyFont: {
                        family: 'Cairo',
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return `المبيعات: ${formatCurrency(context.parsed.y)}`;
                        }
                    }
                }
            },
            scales: {
                y: { 
                    beginAtZero: true,
                    grid: {
                        color: colors.gridColor,
                        drawBorder: false
                    },
                    ticks: { 
                        callback: (value) => formatCurrency(value),
                        font: { 
                            family: 'Cairo',
                            size: 11
                        },
                        color: colors.textColor,
                        stepSize: rawSales / 4
                    },
                    title: {
                        display: true,
                        text: 'القيمة ($)',
                        font: {
                            family: 'Cairo',
                            size: 12,
                            weight: '500'
                        },
                        color: colors.textColor
                    }
                },
                x: { 
                    grid: {
                        display: false,
                        drawBorder: false
                    },
                    ticks: { 
                        font: { 
                            family: 'Cairo',
                            size: 12
                        },
                        color: colors.textColor
                    }
                }
            },
            elements: {
                line: {
                    borderJoin: 'round'
                }
            },
            layout: {
                padding: {
                    top: 20,
                    bottom: 10
                }
            }
        }
    });
}

// ============================================
// Dark Mode Toggle
// ============================================

const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeIcon) {
        themeIcon.classList.remove('bi-moon-stars-fill');
        themeIcon.classList.add('bi-sun-fill');
    }
} else {
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeIcon) {
        themeIcon.classList.remove('bi-sun-fill');
        themeIcon.classList.add('bi-moon-stars-fill');
    }
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    if (themeIcon) {
        if (newTheme === 'dark') {
            themeIcon.classList.remove('bi-moon-stars-fill');
            themeIcon.classList.add('bi-sun-fill');
        } else {
            themeIcon.classList.remove('bi-sun-fill');
            themeIcon.classList.add('bi-moon-stars-fill');
        }
    }
    
    const dashboard = document.getElementById('dashboard');
    if (dashboard && dashboard.style.display !== 'none' && window.lastDashboardData) {
        updateChart(window.lastDashboardData);
    }
    
    document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
    setTimeout(() => {
        document.body.style.transition = '';
    }, 300);
}

if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// ============================================
// DOM Ready Events (with Auth Check)
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // التحقق من تسجيل الدخول أولاً
    const user = checkAuth();
    if (!user) return;
    
    // عرض معلومات المستخدم
    displayUserInfo();
    
    // إعداد زر تسجيل الخروج
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.onclick = (e) => {
            e.preventDefault();
            logout();
        };
    }
    
    // باقي الأحداث
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('focus', () => {
            emailInput.parentElement.parentElement.classList.add('focused');
        });
        
        emailInput.addEventListener('blur', () => {
            emailInput.parentElement.parentElement.classList.remove('focused');
        });
    }
    
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-4px)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});