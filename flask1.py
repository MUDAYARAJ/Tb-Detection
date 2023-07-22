from PIL import Image
import image as image
import numpy as np
import tensorflow
from flask import Flask, request, jsonify, render_template
import os
import streamlit as st
from keras.models import load_model
import tensorflow
from keras.utils import img_to_array
import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
import json
from flask import Flask
from datetime import date
listPercentages = []
app = Flask(__name__)
cred = credentials.Certificate(
    'tbtracking-73f85-firebase-adminsdk-xtgbp-73cb2335b1.json')

firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://tbtracking-73f85-default-rtdb.firebaseio.com'
})

ref = db.reference('py/users/-NXkCKsw5TdMmfRp2Qu6/user')
users_ref = ref.child('user')
data = ref.get()



# Update the data in the database
ref.set(data)


@app.route("/")
def index():
    return render_template("login.html")


@app.route("/home")
def home():
    return render_template("home.html")


def loading_model():
    fp = "model.h5"
    model_loader = load_model(fp)
    return model_loader


cnn = loading_model()


@app.route("/upload", methods=["GET", "POST"])
def upload():
    path_up = os.getcwd()
    image_file = request.files["image"]
    # image_file=request.form["image"
    print(os.path.join(path_up, image_file.filename))
    # Get the uploaded file from the request object
    # image_file = request.files["image"]

    # Save the file to the server
    path = os.path.join("./static/images", image_file.filename)
    image_file.save(os.path.join("./static/images", image_file.filename))

    # -------------------------------------------------------------------#
    img = tensorflow.keras.utils.load_img(path, target_size=(
        500, 500), color_mode='grayscale')

    # Preprocessing the image
    pp_img = img_to_array(img)
    pp_img = pp_img / 255
    pp_img = np.expand_dims(pp_img, axis=0)
    
    # predict
    preds = cnn.predict(pp_img)
    if preds >= 0.5:
        type = "Tb"
        out = ('I am {:.2%} percent confirmed that this is a Tuberculosis case'.format(
            preds[0][0]))

    else:
        type = "Normal"
        out = ('I am {:.2%} percent confirmed that this is a Normal case'.format(
            1 - preds[0][0]))
    if preds>=0.5:
        current_percentage = (preds[0][0])*100
    else:
        current_percentage = (1-preds[0][0])*100
    response = jsonify({
        'result': out
    })
    current_date = date.today()
    currdate_str = json.dumps({'created_at': current_date}, default=str)
    
    listPercentages.append(current_percentage)
    users_ref.push().set({
        'user': {
            'type': type,
            'percentage': current_percentage ,
            'current_date': currdate_str,
            'listOfPercentages':listPercentages
        }
    })
    # new_value = 6
    # if "percentages" in data:
    #     data["percentages"].append(new_value)
    # else:
    #     data["percentages"] = [new_value]
    # print(data["percentages"])
    # listPercentages = data["percentages"]
    #listPercentages = [6,5,4,3,2,1]

    # response.headers.add('Access-Control-Allow-Origin', '*')
    if preds >= 0.5:
        return render_template('index.html', out=out, img=image_file.filename, type="Tb", percentage=(1 - preds[0][0])*100, listPercentages=listPercentages)
    else:
        return render_template('index.html', out=out, img=image_file.filename, type='Normal', percentage=(1 - preds[0][0])*100, listPercentages=listPercentages)

    # st.success(out)

    # image = Image.open(temp)
    # st.image(image, use_column_width=True)
    # Return a response to the client
    # return jsonify({'message': out})


if __name__ == "__main__":
    app.run(debug=True)
