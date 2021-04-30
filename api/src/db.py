import pymongo


client = pymongo.MongoClient("mongodb+srv://Aldo:98WgdtkbH7dlxDys@cluster0.hk31r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
db = client.get_database('fraud_db')

users = db.users
products = db.products
#print(users.count(), products.count())


def get_user_info(username):
    try:
        return users.find_one({"username": username})
    except:
        return False


def get_products(n):
    pass
