import pymongo


client = pymongo.MongoClient("db uri")
db = client.get_database('fraud_db')

users = db.users
products = db.products
#print(users.count(), products.count())


def get_user_info(username):
    try:
        return users.find_one({"username": username})
    except:
        return False


def get_products_sample(n):
    
    tmp = products.aggregate( [ { "$sample": { "size": n } } ])
    data = list(tmp)
    res = []

    for e in data:
        elem = {
            "merchant": e["merchant"],
            "category": e["category"],
            "merchant_location": e["merchant_location(lat,long)"]
        }

        res.append(elem)

    return res

