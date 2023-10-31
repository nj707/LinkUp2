#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Event, Favorite, SignUp

# if __name__ == '__main__':
fake = Faker()
with app.app_context():
    print("Starting seed...")
    # Seed code goes here!
    print("Deleting data...")
    User.query.delete()
    Event.query.delete()
    SignUp.query.delete()
    Favorite.query.delete()

    print("creating events...")
    event1 = Event(
        name = "Studio Session",
        time = 9,
        date = "November 10, 2018",
        location = "The Crib",
        host = "Yaboi Nilo",
        info = "Come slide to the studio session and have fun",

    )
    events = [event1]

    print("creating users...")
    user1 = User(name="Nial Johnson", username="yaboinilo", profession="Musician", password="1234hi")
    user2 = User(name = "Will Bargemann", username="chillitswill", profession="Videographer", password="cwilly")
    user3 = User(name="Henick Baptiste", username="oh3", profession= "Musician, Videographer", password="ooo3")
    users = [user1, user2, user3]
    db.session.add_all(events)
    db.session.add_all(users)
    db.session.commit()

    print('creating signups and favs')
    signup1 = SignUp(user_id=3 ,event_id=1)
    fav1 = Favorite(user_id=2, event_id=1)
    signups = [signup1]
    favorites = [fav1]
    db.session.add_all(signups)
    db.session.add_all(favorites)
    db.session.commit()

    print("Seeding done!")



