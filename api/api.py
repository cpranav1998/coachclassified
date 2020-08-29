import time
from flask import Flask
from app_conf import app, db, migrate
from models import CoachesModel, UsersModel, ReviewsModel

# COACH

@app.route('/add_coach', methods=['POST'])
def add_coach():
    if request.is_json:
        data = request.get_json()
        new_coach = CoachesModel(name=data['name'], sport=data['sport'], email=data['email'], description=data['description'], website=data['website'])
        db.session.add(new_coach)
        db.session.commit()
        return {"message": f"coach {new_coach.name} has been created successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}
        
@app.route('/get_coaches', methods=['GET'])
def get_coaches():
    coaches = CoachesModel.query.all()
    results = [
        {
            "name": coach.name,
            "sport": coach.sport,
            "email": coach.email,
            "description": coach.description,
            "website": coach.website
        } for coach in coaches]
    return {"count": len(results), "coaches": results}

@app.route('/get_coach_by_id/<coach_id>', methods=['GET'])
def get_coach_by_id(coach_id):
    coach = CoachesModel.query.get_or_404(coach_id)
    result = {
        "name": coach.name,
        "sport": coach.sport,
        "email": coach.email,
        "description": coach.description,
        "website": coach.website
    }
    return {"coach": result}


# USER

@app.route('/add_user', methods=['POST'])
def add_user():
    if request.is_json:
        data = request.get_json()
        new_user = UsersModel(name=data['name'], email=data['email'], description=data['description'])
        db.session.add(new_user)
        db.session.commit()
        return {"message": f"user {new_user.name} has been created successfully."}
    else:
        return {"error": "The request payload is not in JSON format"}
        
@app.route('/get_users', methods=['GET'])
def get_users():
    users = UsersModel.query.all()
    results = [
        {
            "name": user.name,
            "email": user.email,
            "description": user.description,
        } for user in users]
    return {"count": len(results), "users": results}

@app.route('/get_user_by_id/<user_id>', methods=['GET'])
def get_user_by_id(user_id):
    user = UsersModel.query.get_or_404(user_id)
    result = {
        "name": user.name,
        "email": user.email,
        "description": user.description,
    }
    return {"user": result}

# REVIEWS

@app.route('/add_review', methods=['POST'])
def add_review():
    if request.is_json:
        data = request.get_json()
        new_review = ReviewsModel(review=data['review'], rating=data['rating'], coach_id=data['coach_id'], user_id=data['user_id'])
        db.session.add(new_review)
        db.session.commit()
        return {"message": f"review coach:{new_review.coach_id} user:{new_review.user_id}"}
    else:
        return {"error": "The request payload is not in JSON format"}
        
@app.route('/get_reviews_for_coach/<coach_id>', methods=['GET'])
def get_reviews_for_coach(coach_id):
    reviews = ReviewsModel.query.filter_by(coach_id=coach_id)
    results = [
        {
            "review": review.review,
            "rating": review.rating,
            "coach_id": review.coach_id,
            "user_id": review.user_id
        } for review in reviews]
    return {"count": len(results), "reviews": results}



