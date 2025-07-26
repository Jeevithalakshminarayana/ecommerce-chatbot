from fastapi import fastapi
from chatbot import get_top_sold_products, get_order_status, get_product_stock
app = FastAPI()
def root():return {"message": "E-commerce Chatbot Backend is running!"}
def top_products(limit: int = 5):
    return get_top_sold_products(limit)
    def order_status(Order_id: int):
        return get_order_status(order_id)
        def product_stock(product-stock)
        return get_product_stock(product_name)