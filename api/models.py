from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from app_conf import app, db, migrate


class CoachesModel(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    sport = db.Column(db.String())
    email = db.Column(db.String())
    description = db.Column(db.String())
    website = db.Column(db.String())

    def __init__(self, name, sport, email, description, website):
        self.name = name
        self.sport = sport
        self.email = email
        self.description = description
        self.website = website

    def __repr__(self):
        return f"<Coach {self.name} {self.sport}>"

class ClientsModel(db.Model):
    __tablename__ = 'clients'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String())
    email = db.Column(db.String())
    description = db.Column(db.String())

    def __init__(self, name, email, description):
        self.name = name
        self.email = email
        self.description = description

    def __repr__(self):
        return f"<Client {self.name}>"


class ReviewsModel(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String())
    rating = db.Column(db.Integer())
    coach_id = db.Column(db.Integer())
    client_id = db.Column(db.Integer())

    def __init__(self, review, rating, coach_id, client_id):
        self.review = review
        self.rating = rating
        self.coach_id = coach_id
        self.client_id = client_id

    def __repr__(self):
        return f"<Review coach:{self.coach_id} client:{self.client_id}>"


