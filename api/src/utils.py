import jwt
from flask import jsonify, request
import datetime
from functools import wraps
#from security.admins import db
import hashlib


def get_params(args):
    params = args.to_dict()

    return params

"""
def check_identity(username, password):
    if username in db["users"] and password in db["passwords"]:
        return True
    else:
        return False
"""

def check_credentials(username, password):
    passwd = "5f4dcc3b5aa765d61d8327deb882cf99" #Mongo normal passwd
    tmp = hashlib.md5(password.encode()).hexdigest()
    
    if passwd == tmp:
        return True
    else:
        return False


def two_factor_auth(username, password, ip):
    passwd_real = "5f4dcc3b5aa765d61d8327deb882cf99" #Mongo 2fa passwd
    ip_real =  "f528764d624db129b32c21fbca0cb8d6" # Mongo ip
    passwd_hash = hashlib.md5(password.encode()).hexdigest()
    ip_hash = hashlib.md5(ip.encode()).hexdigest()

    if passwd_real == passwd_hash and ip_real == ip_hash:
        return True
    else:
        return False

"""
def create_token(username, key):
    token = jwt.encode({'user' : username, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(days=30)}, key, algorithm="HS256")

    return token
"""
"""
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        try:
            token = get_params(request.args, token=True)
        except Exception as e:
            return jsonify({'message' : str(e)}), 400

        if not token:
            return jsonify({'message' : 'Token is missing.'}), 403

        try:
            data = jwt.decode(token, get_secret_key(), algorithms="HS256")
        except:
            return jsonify({'message' : 'Token is invalid.'}), 403

        return f(*args, **kwargs)

    return decorated
"""

if __name__ == '__main__':
    #print(check_credentials("aldosandov", "password", fa=True))
    print(two_factor_auth("aldosandov", "password", "127.0.0.1"))