from flask import Flask, request, jsonify, make_response
from utils import *
from db import *
from models.models import *


app = Flask(__name__)


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
    data = get_products_sample(int(items))
    
    return make_response(jsonify({"data": data}), 200)


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



if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
