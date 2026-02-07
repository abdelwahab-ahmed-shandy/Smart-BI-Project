


```sh
Smart-BI-Project/
│
├── frontend/                # مجلد واجهة المستخدم
│   ├── assets/              # الصور، الأيقونات، وملفات الـ CSS/JS الخاصة بك
│   │   ├── css/
│   │   │   └── style.css    # التنسيقات الإضافية فوق Bootstrap
│   │   ├── js/
│   │   │   ├── main.js      # التعامل مع الـ DOM (أزرار، رفع ملفات)
│   │   │   └── api.js       # كود الاتصال بـ n8n (Fetch API)
│   │   └── img/             # شعار المشروع أو أي صور توضيحية
│   └── index.html           # الصفحة الرئيسية للمشروع
│
├── n8n-workflows/           # مجلد لحفظ نسخ الـ Workflows (للتوثيق)
│   ├── main-workflow.json   # ملف الـ Workflow المصدر من n8n
│   └── ai-prompts.txt       # ملف لحفظ الـ Prompts التي استخدمتها مع الـ AI
│
├── samples/                 # ملفات Excel تجريبية للاختبار
│   └── test-sales.xlsx
│
└── README.md                # وصف المشروع، طريقة التشغيل، والأدوات المستخدمة
```