import numpy as np
from sklearn.preprocessing import LabelEncoder
#from tensorflow.keras.layers import Dense
#from tensorflow.keras.models import Sequential
#import tensorflow.keras.backend as K
#import tensorflow as tf
from joblib import load
import os


path = os.path.dirname(os.path.realpath(__file__)) + '/persistence/'


def data_treatment(entrada):
    lista_cats = ['entertainment', 'food_dining', 'gas_transport',
        'grocery_net', 'grocery_pos', 'health_fitness', 'home', 'kids_pets',
        'misc_net', 'misc_pos', 'personal_care', 'shopping_net', 'shopping_pos',
        'travel']

    vector_procesado = np.zeros((len(entrada)+13,))

    merchEnc = load(path + "LabelEncoder_merchant.joblib")

    vector_procesado[0] = int(merchEnc.transform([entrada[0]]))/692

    vector_procesado[lista_cats.index(entrada[1])+1] = 1

    vector_procesado[15] = (entrada[2]-1)/(28948.9-1)

    if entrada[3] == "M":
        vector_procesado[16]= 1
    else:
        vector_procesado[16] = 0

    vector_procesado[17] = entrada[4]
    vector_procesado[18] = entrada[5]

    vector_procesado[19] = (entrada[6]-23)/(2906700-23)

    vector_procesado[20] = (entrada[7]-16)/(96-16)

    vector_procesado[21] = entrada[8]
    vector_procesado[22] = entrada[9]

    return vector_procesado


def log_loss_penalized(y_true, y_pred):
    loss = -(1/1102173)*K.sum( 10*y_true * K.log(K.abs(y_pred+1*10**-8))+ (1-y_true)*K.log(K.abs(1-y_pred+ 1*10**-8)))
    return loss

    vector_procesado = data_treatment( ["fraud_Rippin, Kub and Mann", "grocery_pos", 16.5, "M", 36.0788,-81.1781 , 1000,21, 36.011293,-82.048315] )

    with open(path + "th_1.npy", 'rb') as f:
        th_ = np.load(f)

    NN_clf_loaded = tf.keras.models.load_model(path + "NN_CLF_1.h5", custom_objects = {"log_loss_penalized":log_loss_penalized})
    prediction = (NN_clf_loaded.predict(vector_procesado.reshape(1,-1))>th_)[0][0]
    
    return prediction