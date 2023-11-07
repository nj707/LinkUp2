import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import EventPage from "./EventPage";
import NavBar from "./NavBar"
import Profile from "./Profile"
import HomePage from "./HomePage"




function App() {
  const xurl = "http://127.0.0.1:5555"
  const [currUser, setCurrUser] = useState("")
  const [events, setEvents] = useState([])
  const [users, setUsers] = useState([])
  const [loggedIn, setLoggedIn] = useState([])






  useEffect(() => {
    fetch("/events")
      .then(r => r.json())
      .then(setEvents)
  }, [])

  useEffect(() => {
    fetch('/users')
      .then(r => r.json())
      .then(setUsers)
  }, [])

  function setLogIn(data) {
    setLoggedIn(data)
  }
  function setCurrentUser(data) {
    setCurrUser(data)
  }


  const handleUpdateEvent = (updatedEvent) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
  };






  function postFavorites(data) {
    setCurrUser({
      ...currUser,
      favorites: [
        ...currUser.favorites,
        data,
      ],
    })
    fetch(`/events/${data.event_id}`)
      .then(r => r.json())
      .then(d => {
        let newEventsList = []
        events.map((event) => {
          if (event.id === d.id) {
            newEventsList.push(d)
          } else {
            newEventsList.push(event)
          }
        })
        setEvents(newEventsList)
      })
    setUsers(users.map((user) => {
      if (user.id === currUser.id) {
        return {
          ...currUser,
          favorites: [
            ...currUser.favorites,
            data,
          ],
        }
      } else {
        return user
      }
    }))
  }
  function removeFavorite(data) {
    const newFavs = currUser.favorites.filter((fav) => fav.id !== data);
    setUsers(users.map((user) => {
      if (user.id === currUser.id) {
        return {
          ...currUser,
          favorites: newFavs,
        }
      } else {
        return user
      }
    }));
    setCurrUser({
      ...currUser,
      favorites: newFavs,
    });
  }










  function postSignups(data) {
    setCurrUser({
      ...currUser,
      signups: [
        ...currUser.signups,
        data,
      ],
    })
    fetch(`/events/${data.event_id}`)
      .then(r => r.json())
      .then(d => {
        let newEventsList = []
        events.map((event) => {
          if (event.id === d.id) {
            newEventsList.push(d)
          } else {
            newEventsList.push(event)
          }
        })
        setEvents(newEventsList)
      })
    setUsers(users.map((user) => {
      if (user.id === currUser.id) {
        return {
          ...currUser,
          signups: [
            ...currUser.signups,
            data,
          ],
        }
      } else {
        return user
      }
    }))
  }






  function removeSignup(data) {
    const newSus = currUser.signups.filter((sup) => sup.id !== data);
    setUsers(users.map((user) => {
      if (user.id === currUser.id) {
        return {
          ...currUser,
          signups: newSus,
        }
      } else {
        return user
      }
    }));
    setCurrUser({
      ...currUser,
      signups: newSus,
    });
  }

  function removeEvent(data) {
    const updatedCurrUserSus = currUser.events.filter(
      (event) => event.id !== data
    )
    const updatedEvents = events.filter(
      (event) => event.id !== data
    )
    setCurrUser({
      ...currUser,
      events: updatedCurrUserSus,
    })
    setEvents(updatedEvents)
  }


  function addUser(data) {
    setUsers([...users, data])
  }
  function removeUser(data) {
    setUsers(users.filter((user) => { if (user.id !== data.id) return user }))
  }

  function addEvent(data) {
    setEvents([...events, data])
  }
  // function (data) {
  //   setEvents(events.filter((event) => { if (event.id !== data.id) return event }))
  // }



  return (
    <div className="app">

      <Header />
      <NavBar currUser={currUser} />
      <Switch>
        <Route exact path="/">
          <HomePage events={events} />
        </Route>

        <Route exact path="/events">
          <EventPage currUser={currUser}
            events={events}
            xurl={xurl}
            postFavorites={postFavorites}
            removeFavorite={removeFavorite}
            postSignups={postSignups}
            removeSignup={removeSignup}
            removeEvent={removeEvent}
            setEvents={setEvents}
            addEvent={addEvent}
            currEvent={currEvent}
            setCurrentEvent={setCurrentEvent}
            handleUpdateEvent={handleUpdateEvent}
          />
        </Route>

        <Route exact path="/login">
          <Login users={users}
            currUser={currUser}
            loggedIn={loggedIn}
            setLogIn={setLogIn}
            setCurrentUser={setCurrentUser}
            xurl={xurl}
            addUser={addUser} />
        </Route>

        <Route exact path="/profile">
          <Profile events={events}
            loggedIn={loggedIn}
            currUser={currUser}
            setCurrentUser={setCurrentUser}
            xurl={xurl}
            removeUser={removeUser}
            postFavorites={postFavorites}
            removeFavorite={removeFavorite}
            postSignups={postSignups}
            removeSignup={removeSignup}
            removeEvent={removeEvent}
            addEvent={addEvent}
            currEvent={currEvent}
            setCurrentEvent={setCurrentEvent}
            handleUpdateEvent={handleUpdateEvent} />

        </Route>

      </Switch>


    </div>
  );
}




export default App;
