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

    print("creating users...")
    user1 = User(name="Nial Johnson", username="yaboinilo", profession="Musician", password="1234hi", image="http://res.cloudinary.com/dvzwroul1/image/upload/v1699454964/hutablkaypklrdjd49qu.jpg")
    user2 = User(name = "Will Bargemann", username="chillitswill", profession="Videographer", password="cwilly")
    user3 = User(name="Henick Baptiste", username="oh3", profession= "Musician, Videographer", password="ooo3", image="https://res.cloudinary.com/dvzwroul1/image/upload/v1699456097/hsapgcqm0vtmybb3hb5y.jpg")
    user4 = User(name="Travis Scott", username="travis", profession="Musician, Producer", password="astro")
    users = [user1, user2, user3, user4] 
 
    db.session.add_all(users)
    db.session.commit()

    print("creating events...")
    event1 = Event(
        name = "Studio Session",
        time = "9 P.M",
        date = "November 10, 2023",
        location = "The Crib",
        host = "Yaboi Nilo",
        info = "Come slide to the studio session and let's make something dope",
        user_id= 1 ,

    )
    event2 = Event(
        name = "Sacramento Photo Session",
        time = "Around 11 in the morning",
        date = "November 12, 2023",
        location = "Sacrament State University",
        host = "William Bargemann",
        info = "I just need models. Show up in your Sac State gear!",
        user_id= 2 ,

    )
    event3 = Event(
        name = "Circus Maximus Tour",
        time = "7",
        date = "October 31, 2023",
        location = "Oakland Arena",
        host = "Live Nation",
        info = "Travis Scott Live in Concert",
        user_id= 4,

    )
    event4 = Event(
        name = "Sippin' Sundays",
        time = "6",
        date = "November 13, 2023",
        location = "Vallejo, California",
        host = "Lets Function",
        info = "Yaboi Nilo and Oh3 Live",
        user_id= 3,

    )
    events = [event1, event2, event3, event4]
    db.session.add_all(events)
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



