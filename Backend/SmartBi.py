# |------------------------------------------------------------------------------------------------------------
# | Deployment Note:                                                                                             |
# | This code is currently hosted and running live on PythonAnywhere.                                           |
# | API Endpoint: https://aaas.pythonanywhere.com                                                               |
# | Connected to Frontend at: https://abdelwahab-ahmed-shandy.github.io/Smart-BI-Project/Frontend/auth.html     |
# -------------------------------------------------------------------------------------------------------------

# The code that was uploaded to Python Anywhere allows anyone to log in to the site from anywhere, like this: https://abdelwahab-ahmed-shandy.github.io/Smart-BI-Project/Frontend/auth.html
import os
import sqlite3
import bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# 1. تحديد مسار قاعدة البيانات (في نفس فولدر الملف)
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'database.db')

def get_db_connection():
    # SQLite بيستخدم connect لملف محلي
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row # عشان يرجع النتائج كـ Dictionary
    return conn

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "بيانات غير مكتملة"}), 400

    try:
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
        conn = get_db_connection()
        cur = conn.cursor()

        # في SQLite بنستخدم '?' بدل '%s'
        cur.execute("INSERT INTO users (email, password) VALUES (?, ?)", (email, hashed_password))

        conn.commit()
        conn.close()
        return jsonify({"message": "تم إنشاء الحساب بنجاح"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"message": "هذا البريد الإلكتروني مسجل بالفعل"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "بيانات غير مكتملة"}), 400

    try:
        conn = get_db_connection()
        cur = conn.cursor()

        # البحث عن المستخدم
        cur.execute("SELECT password FROM users WHERE email = ?", (email,))
        user = cur.fetchone()
        conn.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
            return jsonify({"message": "تم تسجيل الدخول بنجاح", "email": email}), 200
        else:
            return jsonify({"message": "البريد الإلكتروني أو كلمة المرور غير صحيحة"}), 401
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "database": "SQLite"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)