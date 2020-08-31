import time
from flask import Flask
from flask import request
from app_conf import app, db, migrate
from models import CoachesModel, ClientsModel, ReviewsModel
from flask_cors import cross_origin

# COACH

@app.route('/add_coach', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def add_coach():
    print(request.get_json())
    if request.is_json:
        data = request.get_json()
        new_coach = CoachesModel(name=data['name'], sport=data['sport'], email=data['email'], description=data['description'], website=data['website'])
        db.session.add(new_coach)
        db.session.commit()
        return {"message": f"coach {new_coach.name} has been created successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}
        
@app.route('/get_coaches', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def get_coaches():
    coaches = CoachesModel.query.all()
    results = [
        {
            "id": coach.id,
            "name": coach.name,
            "sport": coach.sport,
            "email": coach.email,
            "description": coach.description,
            "website": coach.website
        } for coach in coaches]
    return {"count": len(results), "coaches": results}

@app.route('/get_coach_by_id/<coach_id>', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def get_coach_by_id(coach_id):
    coach = CoachesModel.query.get_or_404(coach_id)
    result = {
        "id": coach.id,
        "name": coach.name,
        "sport": coach.sport,
        "email": coach.email,
        "description": coach.description,
        "website": coach.website
    }
    return {"coach": result}

@app.route('/update_coach', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def update_coach():
    if request.is_json:
        coach_data = request.get_json()
        coach_id = coach_data['id']
        del coach_data['id']
        coach = CoachesModel.query.filter_by(id=coach_id).first()
        for key in coach_data.keys():
            if key=="name":
                coach.name = coach_data[key]
            elif key=="sport":
                coach.sport = coach_data[key]
            elif key=="email":
                coach.email = coach_data[key]
            elif key=="description":
                coach.description = coach_data[key]
            elif key=="website":
                coach.website = coach_data[key]
        db.session.commit()
        return {"message": f"coach {coach.name} has been updated successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}

# USER

@app.route('/add_client', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def add_client():
    if request.is_json:
        data = request.get_json()
        new_client = ClientsModel(name=data['name'], email=data['email'], description=data['description'])
        db.session.add(new_client)
        db.session.commit()
        return {"message": f"client {new_client.name} has been created successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}
        
@app.route('/get_clients', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def get_clients():
    clients = ClientsModel.query.all()
    results = [
        {   
            "id": client.id,
            "name": client.name,
            "email": client.email,
            "description": client.description,
        } for client in clients]
    return {"count": len(results), "clients": results}

@app.route('/get_client_by_id/<client_id>', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def get_client_by_id(client_id):
    client = ClientsModel.query.get_or_404(client_id)
    result = {
        "id": client.id,
        "name": client.name,
        "email": client.email,
        "description": client.description,
    }
    return {"client": result}

@app.route('/update_client', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def update_client():
    if request.is_json:
        client_data = request.get_json()
        client_id = client_data['id']
        del client_data['id']
        client = ClientsModel.query.filter_by(id=client_id).first()
        for key in client_data.keys():
            if key=="name":
                client.name = client_data[key]
            elif key=="email":
                client.email = client_data[key]
            elif key=="description":
                client.description = client_data[key]
        db.session.commit()
        return {"message": f"client {client.name} has been updated successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}


# REVIEWS

@app.route('/add_review', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def add_review():
    if request.is_json:
        data = request.get_json()
        new_review = ReviewsModel(review=data['review'], rating=data['rating'], coach_id=data['coach_id'], client_id=data['client_id'])
        db.session.add(new_review)
        db.session.commit()
        return {"message": f"review coach:{new_review.coach_id} client:{new_review.client_id}"}
    else:
        return {"error": "The request payload is not in JSON format"}
        
@app.route('/get_reviews', methods=['GET'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def get_reviews():
    reviews = ReviewsModel.query.all()
    results = [
        {
            "id": review.id,
            "review": review.review,
            "rating": review.rating,
            "coach_id": review.coach_id,
            "client_id": review.client_id
        } for review in reviews]
    return {"count": len(results), "reviews": results}

@app.route('/update_review', methods=['POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def update_review():
    if request.is_json:
        review_data = request.get_json()
        review_id = review_data['id']
        del review_data['id']
        review = ReviewsModel.query.filter_by(id=review_id).first()
        for key in review_data.keys():
            if key=="review":
                review.review = review_data[key]
            elif key=="rating":
                review.rating = review_data[key]
            elif key=="coach_id":
                review.coach_id = review_data[key]
            elif key=="client_id":
                review.client_id = review_data[key]
        db.session.commit()
        return {"message": f"review {review} has been updated successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}


