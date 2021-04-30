from flask import Flask, request, jsonify, make_response
from utils import *
from db import *


app = Flask(__name__)
app.config['SECRET_KEY'] = "6b71f342fb3d3368afe1eacbf620e27e"


@app.route("/")
def test():
    return jsonify({"message": "Hello World"})


@app.route("/api/auth", methods=['POST'])
#token_required
def auth():
    return make_response(jsonify({"message": True}), 200)


@app.route("/api/auth2", methods=['POST'])
#token_required
def auth2():
    return make_response(jsonify({"message": True}), 200)


@app.route("/api/products/<items>")
#@token_required
def get_products(items)
    return make_response(jsonify({"message": True}), 200)


@app.route("/api/users/<username>")
#@token_required
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
    return make_response(jsonify({"message": data}), 200)


@app.route('/token', methods=['POST'])
def login():
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