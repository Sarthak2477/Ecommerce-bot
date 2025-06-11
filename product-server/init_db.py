from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from mock_data import products
from sqlalchemy.dialects.sqlite import JSON

# Flask setup
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///ecommerce.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

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
    tags = db.Column(JSON)  # stores Python list


# Initialize and populate database
with app.app_context():
    db.drop_all()
    db.create_all()
    for item in products:
        db.session.add(Product(
            id=item['id'],
            name=item['name'],
            price=item['price'],
            original_price=item.get('original_price'),  
            image=item['image'],
            category=item['category'],
            description=item['description'],
            rating=item['rating'],
            reviews=item['reviews'],
            in_stock=item['in_stock'],  
            tags=item['tags']
        ))

    db.session.commit()
    print("✅ Database initialized with products.")
