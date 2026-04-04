from flask import Flask, request, jsonify
from flask_cors import CORS  # مهمة جداً لربط الـ Frontend
import pyodbc
import bcrypt

app = Flask(__name__)
CORS(app) # السماح للموقع (HTML/JS) بالتواصل مع السيرفر

# 🔗 إعدادات الاتصال بقاعدة البيانات
connection_string = (
    'DRIVER={ODBC Driver 17 for SQL Server};'
    'SERVER=DESKTOP-GT8N3EV;'  
    'DATABASE=GraduationProject;'
    'Trusted_Connection=yes;'
)

def get_db_connection():
    return pyodbc.connect(connection_string)

# ==============================
# 🧾 API: Register
# ==============================
@app.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        # تشفير الباسورد
        hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
        
        conn = get_db_connection()
        cursor = conn.cursor()
        
        # تخزين الباسورد كـ String
        cursor.execute(
            "INSERT INTO Users (email, password) VALUES (?, ?)",
            (email, hashed_password.decode('utf-8'))
        )
        conn.commit()
        conn.close()

        return jsonify({"message": "User registered successfully"}), 201

    except pyodbc.IntegrityError:
        return jsonify({"message": "Email already exists"}), 400
    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

# ==============================
# 🔐 API: Login
# ==============================
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"message": "Email and password are required"}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        
        cursor.execute("SELECT password FROM Users WHERE email=?", (email,))
        user = cursor.fetchone()
        conn.close()

        if user:
            stored_password = user[0] # الـ Hash المتخزن
            
            # مقارنة الباسورد المدخل مع المتخزن
            if bcrypt.checkpw(password.encode('utf-8'), stored_password.encode('utf-8')):
                return jsonify({"message": "Login successful"}), 200
            else:
                return jsonify({"message": "Wrong password"}), 401
        else:
            return jsonify({"message": "User not found"}), 404

    except Exception as e:
        return jsonify({"message": f"Error: {str(e)}"}), 500

# ==============================
# ▶ تشغيل السيرفر
# ==============================
if __name__ == '__main__':
    app.run(debug=True, port=5000) # السيرفر هيشتغل على http://127.0.0.1:5000