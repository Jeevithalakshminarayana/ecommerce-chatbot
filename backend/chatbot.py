from data_loader import load_data

data = load_data()

def get_top_sold_products(limit=5):
    products = data["products"]
    sorted_products = sorted(products, key=lambda x: x["units_sold"], reverse=True)
    return sorted_products[:limit]

def get_order_status(order_id):
    for order in data["orders"]:
        if str(order["order_id"]) == str(order_id):
            return {"order_id": order_id, "status": order["status"]}
    return {"error": "Order not found"}

def get_product_stock(product_name):
    for product in data["products"]:
        if product["name"].lower() == product_name.lower():
            return {"name": product_name, "stock": product["stock"]}
    return {"error": "Product not found"}