#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Event, Favorite, SignUp


# Views go here!
app.secret_key=b'\xf3\xffD(\xc0e\x05\x10\x8c;t\x87\x8d\xec\x14\xb3'

@app.route('/')
def index():
    return '<h1>LinkUp Event List</h1>'


class UserList(Resource):
    def get(self):
        return_list = [u.to_dict() for u in User.query.all()]
        return make_response(return_list, 200)

    def post(self):
        data = request.get_json()
        try:
            user_hold = User(name=data["name"], username=data["username"], password=data["password"], profession =data['profession'])
            db.session.add(user_hold)
            db.session.commit()
            session["user_id"] = user_hold.id
            return make_response(user_hold.to_dict(), 201)
        except:
            return make_response("Failed to create user", 400)

api.add_resource(UserList, "/users")


class UserByID(Resource):
    def get(self, id):
        user_hold = User.query.filter_by(id=id).one_or_none()
        if not user_hold:
            return make_response("User not found", 404)
        return make_response(user_hold.to_dict(), 200)

    def delete(self, id):
        user_hold = User.query.filter_by(id=id).one_or_none()
        if not user_hold:
            return make_response("User not found", 404)
        db.session.delete(user_hold)
        db.session.commit()
        return make_response("Successful delete", 204)

    def patch(self, id):
        user_hold = User.query.filter_by(id=id).one_or_none()
        if not user_hold:
            return make_response("User not found", 404)
        try:
            data = request.get_json()
            for attr in data:
                setattr(user_hold,attr,data[attr])
            db.session.add(user_hold)
            db.session.commit()
            return make_response(user_hold.to_dict(),202)
        except:
            return make_response("Failed to update user",400)

api.add_resource(UserByID, "/users/<int:id>")

class FavoriteList(Resource):
    def get(self):
        return_list = [f.to_dict() for f in Favorite.query.all()]
        return make_response(return_list, 200)

    def post(self):
        data = request.get_json()
        try:
            favorite_hold = Favorite(
                user_id=int(data["user_id"]), event_id=int(data["event_id"])
            )
            db.session.add(favorite_hold)
            db.session.commit()
            return make_response(favorite_hold.to_dict(), 201)
        except:
            return make_response("Failed to create favorite", 400)

api.add_resource(FavoriteList, "/favorites")


class FavoriteByID(Resource):
    def get(self, id):
        favorite_hold = Favorite.query.filter_by(id=id).one_or_none()
        if not favorite_hold:
            return make_response("Favorite not found", 404)
        return make_response(favorite_hold.to_dict(), 200)

    def delete(self, id):
        favorite_hold = Favorite.query.filter_by(id=id).one_or_none()
        if not favorite_hold:
            return make_response("Favorite does not exist", 404)
        db.session.delete(favorite_hold)
        db.session.commit()
        return make_response("We have one!", 204)

    def patch(self, id):
        favorite_hold = Favorite.query.filter_by(id=id).one_or_none()
        if not favorite_hold:
            return make_response("not found", 404)
        try:
            data = request.get_json()
            for attr in data:
                setattr(favorite_hold,attr,data[attr])
            db.session.add(favorite_hold)
            db.session.commit()
            return make_response(favorite_hold.to_dict(),202)
        except:
            return make_response("Failed to update ",400)
    
api.add_resource(FavoriteByID, "/favorites/<int:id>")


class SignUpList(Resource):
    def get(self):
            return_list = [s.to_dict() for s in SignUp.query.all()]
            return make_response(return_list, 200)

    def post(self):
        data = request.json
        try:
            signup = SignUp(
                user_id=data["user_id"],
                event_id=data["event_id"],
                )
            db.session.add(signup)
            db.session.commit()
            return make_response(signup.to_dict(), 200)
        except ValueError:
            return make_response({"errors": ["validation errors"]}, 400)

api.add_resource(SignUpList, "/signups")

class SignUpId(Resource):
    def delete(self, id):
        user_hold = SignUp.query.filter_by(id=id).one_or_none()
        if not user_hold:
            return make_response("Signup not found", 404)
        db.session.delete(user_hold)
        db.session.commit()
        return make_response("Successful delete", 204)
    
api.add_resource(SignUpId,"/signups/<int:id>" )



class EventList(Resource):
    def post(self):
        data = request.json
        try:
            event = Event(
                name=data["name"],
                time=data["time"],
                date=data["date"],
                location=data["location"],
                host=data["host"],
                info=data["info"]
            )
            db.session.add(event)
            db.session.commit()
            return make_response(event.to_dict(), 200)
        except ValueError:
            return make_response({"errors": ["Validation errors"]}, 400)

    def get(self):
        events = Event.query.all()
        event_list = [event.to_dict() for event in events]
        return make_response(event_list, 200)

api.add_resource(EventList, "/events")

class EventId(Resource):
    def delete(self, id):
        event = Event.query.get(id)
        if not event:
            return make_response("Event not found", 404)
        db.session.delete(event)
        db.session.commit()
        return make_response("Successful delete", 204)

    def get(self, id):
        event = Event.query.get(id)
        if not event:
            return make_response("Event not found", 404)
        return make_response(event.to_dict(), 200)

api.add_resource(EventId, "/events/<int:id>")

class AuthSession(Resource):
    def get(self):
        user_hold = User.query.filter_by(id=session.get("user_id")).one_or_none()
        if not user_hold:
            return make_response("User not found",404)
        return make_response(user_hold.to_dict(),200)

api.add_resource(AuthSession, "/authorized")


if __name__ == '__main__':
    app.run(port=5555, debug=True)

