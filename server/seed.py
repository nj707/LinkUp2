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
        date = "November 10, 2023",
        location = "The Crib",
        host = "Yaboi Nilo",
        info = "Come slide to the studio session and have fun",

    )
    event2 = Event(
        name = "Astroworld Tour",
        time = 9,
        date = "November 12, 2023",
        location = "Los Angeles at SoFI Stadium",
        host = "Travis Scott",
        info = "Travis Scott Live in Concert",

    )
    event3 = Event(
        name = "Circus Maximus Tour",
        time = 7,
        date = "October 31, 2023",
        location = "Oakland Arena",
        host = "Live Nation",
        info = "Travis Scott Live in Concert",

    )
    event4 = Event(
        name = "Sippin' Sundays",
        time = 6,
        date = "November 13, 2023",
        location = "Vallejo, California",
        host = "Lets Function",
        info = "Yaboi Nilo and Oh3 Live",

    )
    events = [event1, event2, event3, event4]

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
    # fav1 = Favorite(user_id=2, event_id=1)
    # fav2 = Favorite(user_id=1, event_id=2 )
    # fav3 = Favorite(user_id=1, event_id=3 )
    
    signups = [signup1]
    # favorites = [fav1, fav2, fav3]
    db.session.add_all(signups)
    # db.session.add_all(favorites)
    db.session.commit()

    print("Seeding done!")



