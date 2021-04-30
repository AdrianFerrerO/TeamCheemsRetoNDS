from flask import Flask, request, jsonify, make_response
from utils import *
from db import *
from models.models import *


app = Flask(__name__)
app.config['SECRET_KEY'] = "6b71f342fb3d3368afe1eacbf620e27e"


@app.route("/")
def test():
    return jsonify({"message": "Hello World"})


@app.route("/api/auth", methods=['POST'])
#token_required
def auth():
    params = request.get_json()
    username = params['username']
    password = params['password']
    auth = check_credentials(username, password)
    
    if auth:
        return make_response(jsonify({"message": "True"}), 200)
    else:
        return make_response(jsonify({"message": "False"}), 401)


@app.route("/api/auth2", methods=['POST'])
#token_required
def auth2():
    params = request.get_json()
    username = params['username']
    password = params['password']
    ip = params['ip']
    auth = two_factor_auth(username, password, ip)
    
    if auth:
        return make_response(jsonify({"message": "True"}), 200)
    else:
        return make_response(jsonify({"message": "False"}), 401)


@app.route("/api/products/<items>")
#@token_required

def get_products(items):
    return make_response(jsonify({"message": 0}), 200)


@app.route("/api/users/<username>")
#@token_required
#var user_info = {"user_name":"seb123", "full_name":"Sebas", "gender":"M", "age":18, "coordinates":[1, 2]}
#var transactions= [{"transaction_id" : 123, "category": "string", "marchant":"string", "merchant_location":[123, 456], "amount":1234}]
def get_user(username):

    data = get_user_info(username)
    if data:
        return make_response(jsonify({"message": data}), 200)
    """
    try:
        hardness, prod_rate, quality = get_params(request.args)
        res = build_json(hardness, prod_rate, quality)

        return jsonify(res)

    except Exception as e:
        return make_response(jsonify({"message": str(e)}), 400)
        """


@app.route("/api/predict")
#@token_required
def predict():
    args = get_params(request.args)
    input = [args["merchant"], args["category"], float(args["amt"]), args["gender"], float(args["lat"]), float(args["long"]), float(args["city_pop"]), int(args["age"]), float(args["merch_lat"]), float(args["merch_long"])]
    tmp = make_prediction(input)
    return make_response(jsonify({"fraud": str(tmp)}), 200)


@app.route('/token', methods=['POST'])
def get_token():
    try:
        params = request.get_json()
        username = params['username']
        password = params['password']

        if check_identity(username, password):
            return jsonify({'token' : create_token(username, app.config['SECRET_KEY'])})
        else: 
            raise Exception

    except:
        return make_response(jsonify({'message':'Login error, username or password are missing or not allowed.'}), 401)


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')

"""
user = {
    "ObjectId": 0,
    "username": "first_last",
    "fullname": "Aldo Sandoval",
    "gender": "M",
    "age": 18,
    "coordinates": [20.1154, -99.01154],
    "password": "password", #generado hasheando el username con md5
    "password_2": "password_2":#generado hasheando la edad con md5
    "ip": "127.0.0.1",
    "ip_hash": "asdgasrfhasdfgherthrt", #generado hasheando la ip con md5
    "transactions": [{
        "transaction_id": 123, 
        "category": "string", 
        "marchant":"string", 
        "merchant_location":[12.47546, 45.5466], 
        "amount":1234
    },
    {
        "transaction_id": 123, 
        "category": "string", 
        "marchant":"string", 
        "merchant_location":[12.47546, 45.5466], 
        "amount":1234
    }]
}

product = {
    "ObjectId": 0, #Generado por mongo
    "merchant": "Name",
    "category": "category",
    "merchant_location": [25.1354, 25.1234]
}
"""