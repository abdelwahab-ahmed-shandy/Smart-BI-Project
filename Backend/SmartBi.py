# 
import os
import psycopg2
import bcrypt
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)

# تحميل الإعدادات
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")

def get_db_connection():
    return psycopg2.connect(DATABASE_URL, sslmode='require')

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
        cur.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, hashed_password))
        conn.commit()
        cur.close()
        conn.close()
        return jsonify({"message": "تم إنشاء الحساب بنجاح"}), 201
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
        cur.execute("SELECT password FROM users WHERE email = %s", (email,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if user and bcrypt.checkpw(password.encode('utf-8'), user[0].encode('utf-8')):
            return jsonify({"message": "تم تسجيل الدخول بنجاح", "email": email}), 200
        else:
            return jsonify({"message": "البريد الإلكتروني أو كلمة المرور غير صحيحة"}), 401
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok"}), 200

if __name__ == '__main__':
    app.run(debug=True, port=5000)