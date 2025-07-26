from fastapi import FastAPI
from chatbot import get_top_sold_products, get_order_status, get_product_stock

app = FastAPI()

@app.get("/")
def root():
    return {"message": "E-commerce Chatbot Backend is running!"}

@app.get("/top-products")
def top_products(limit: int = 5):
    return get_top_sold_products(limit)

@app.get("/order-status/{order_id}")
def order_status(order_id: int):
    return get_order_status(order_id)

@app.get("/product-stock")
def product_stock(product_name: str):
    return get_product_stock(product_name)