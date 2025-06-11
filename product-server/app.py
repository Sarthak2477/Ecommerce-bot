from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from mock_data import products
from groq_utils import get_sql_from_groq
from sqlalchemy import text
from flask_cors import CORS

# Flask setup
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
CORS(app)
# Product model
class Product(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    price = db.Column(db.Float, nullable=False)
    original_price = db.Column(db.Float)
    image = db.Column(db.String)
    category = db.Column(db.String)
    description = db.Column(db.Text)
    rating = db.Column(db.Float)
    reviews = db.Column(db.Integer)
    in_stock = db.Column(db.Boolean)
    tags = db.Column(db.PickleType)  # stores Python list



# Route to test if server is running
@app.route('/')
def home():
    return "Flask backend is working!"


@app.route('/chat', methods=['POST'])
def chat_handler():
    user_input = request.json.get('message', '')

    sql_query = get_sql_from_groq(user_input)

    if not sql_query:
        return jsonify({"error": "Couldn't understand the query."}), 400

    try:
        result = db.session.execute(text(sql_query)).mappings().all()
        print(result)
        products = [dict(row) for row in result]

        return jsonify({
            "reply": f"Found {len(products)} result(s).",
            "sql": sql_query,
            "products": products
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
if __name__ == '__main__':
    app.run(debug=True)