from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.orm import validates


from config import db, metadata

# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    profession = db.Column(db.String)

    signups = db.relationship("SignUp", backref = 'user', cascade = "all, delete")
    favorites = db.relationship("Favorite", backref = 'user', cascade = "all, delete")
    # events = db.relationship("Event", backref = 'user', cascade= "all, delete")

    serialize_rules = ("-signups.user", "-favorites.user", "-signups.event", )

    @validates("name")
    def validate_name(self, key, name):
        if not name or len(name) < 0:
            raise ValueError("Must Provide a Name")
        return name
    @validates("username")
    def validate_username(self, key, username):
        if not username or len(username) < 0:
            raise ValueError("Must Provide a UserName")
        return username
    @validates("password")
    def validate_name(self, key, password):
        if not password or len(password) < 0:
            raise ValueError("Must Provide a Password")
        return password
    @validates("profession")
    def validate_name(self, key, profession):
        if not profession or len(profession) < 0:
            raise ValueError("Must Provide a Profession")
        return profession

    def __repr__(self):
        return f"<User {self.id}: {self.name}>"



class Event(db.Model, SerializerMixin):
    __tablename__ = 'events'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    time = db.Column(db.String)
    date = db.Column(db.String)
    location = db.Column(db.String)
    host = db.Column(db.String)
    info = db.Column(db.String)

    # user_id = db.Column(db.Integer, db.ForeignKey("users.id")) 
    signups = db.relationship("SignUp", backref = 'event', cascade = "all, delete")
    favorites = db.relationship("Favorite", backref = 'event', cascade = "all, delete")

    serialize_rules = ("-signups.event", "-favorites.event", "-signups.user",)

    # @validates("user_id")
    # def validate_id(self, key, value):
    #     if not value or type(value) != int:
    #         raise ValueError("Not in DataBase")
    #     if key == "user_id" and User.query.filter_by(id = value).one_or_none() == None:
    #         raise ValueError("Not in Database")
    #     return value
    @validates("time")
    def validate_age(self, key, time):
        if not 0 <= time <= 23:
            raise ValueError("Invalid time")
        return time
    @validates("name", "host","location", "date", "info" )
    def validate_event(self, key, value):
        if not value or len(value) < 1:
            raise ValueError("Input must be valid")
        return value




class Favorite(db.Model, SerializerMixin):
    __tablename__ = 'favorites'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))

    serialize_rules = ( "-user.favorites", "-event.favorites", )

    @validates("user_id", "event_id")
    def validate_ids(self, key, value):
        if not value or type(value) != int:
            raise ValueError("Not in the database")
        if key == "user_id" and User.query.filter_by(id=value).one_or_none() == None:
            raise ValueError("Not in the database")
        if key == "event_id" and Event.query.filter_by(id=value).one_or_none() == None:
            raise ValueError("Not in the database")
        return value

    def __repr__(self):
        return f"<Favorite {self.id}>"



class SignUp(db.Model, SerializerMixin):
    __tablename__ = 'signups'

    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    event_id = db.Column(db.Integer, db.ForeignKey("events.id"))

    serialize_rules = ("-user.signups", "-event.signups",)

    @validates("user_id", "event_id")
    def validate_ids(self, key, value):
        if not value or type(value) != int:
            raise ValueError("Not in the database")
        if key == "user_id" and User.query.filter_by(id=value).one_or_none() == None:
            raise ValueError("Not in the database")
        if key == "event_id" and Event.query.filter_by(id=value).one_or_none() == None:
            raise ValueError("Not in the database")
        return value

    def __repr__(self):
        return f"<Signup {self.id}>"





