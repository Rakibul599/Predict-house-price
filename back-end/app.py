from flask import Flask,jsonify,request
from flask_cors import CORS
from dotenv import load_dotenv
import os
from utils.calculate_price import calculate

load_dotenv()

app = Flask(__name__)
CORS(app)



@app.route('/')
def home():
    return f"Hello, Flask is running on port {os.getenv('FLASK_PORT', '5000')}!"
@app.route('/predict_price', methods=['POST'])
def predict_price():
    data = request.get_json()
    print(data)
    benefits = data.get("benefits", {})
    score=0
    for feature, is_enabled in benefits.items():
        if is_enabled:
            score+=1
        else:
            score+=0
        print(f"{feature}: {is_enabled}")
    print(score)

    house_info={
                'area': data.get("area"),
                'bedrooms': data.get("bedrooms"),
                'bathrooms': data.get("bathrooms"),
                'stories': data.get("stories"),
                'parking': data.get("parking"),
                'amenities_score': score
            }
    print(house_info)
    pr=calculate(house_info)
    rounded = round(pr, 2)
    print(rounded)
    return jsonify({"price":rounded})


if __name__ == '__main__':
    app.run(debug=True,port=os.getenv("port"))
