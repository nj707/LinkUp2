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
  // const [sus, setSus] = useState([])
  // const [favorites, setFavorites] = useState([])
  const [loggedIn, setLoggedIn] = useState([])






  useEffect(() => {
    fetch(xurl + "/events")
      .then(r => r.json())
      .then(setEvents)
  }, [])

  useEffect(() => {
    fetch(`${xurl}/users`)
      .then(r => r.json())
      .then(setUsers)
  }, [])

  // useEffect(() => {
  //   fetch(`${xurl}/signups`)
  //     .then(r => r.json())
  //     .then(setSus)
  // }, [])

  // useEffect(() => {
  //   fetch(`${xurl}/favorites`)
  //     .then(r => r.json())
  //     .then(setFavorites)
  // }, [])

  function setLogIn(data) {
    setLoggedIn(data)
  }
  function setCurrentUser(data) {
    setCurrUser(data)
  }


  function postFavorites(data) {
    setCurrUser({
      ...currUser,
      favorites: [
        ...currUser.favorites,
        data,
      ],
    })
    fetch(`${xurl}/events/${data.event_id}`)
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
  }
  function removeFavorite(data) {
    const updatedCurrUserFavs = currUser.favorites.filter(
      (favorite) => favorite.id !== data
    )
    setCurrUser({
      ...currUser,
      favorites: updatedCurrUserFavs,
    })
  }

  function postSignups(data) {
    setCurrUser({
      ...currUser,
      signups: [
        ...currUser.signups,
        data,
      ],
    })
    fetch(`${xurl}/events/${data.event_id}`)
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
  }
  function removeSignup(data) {
    const updatedCurrUserFavs = currUser.signups.filter(
      (signup) => signup.id !== data
    )
    setCurrUser({
      ...currUser,
      favorites: updatedCurrUserFavs,
    })
  }











  function addUser(data) {
    setUsers([...users, data])
  }
  function removeUser(data) {
    setUsers(users.filter((user) => { if (user.id !== data.id) return user }))
  }






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
            removeSignup={removeSignup} />
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
            removeSignup={removeSignup} />

        </Route>

      </Switch>


    </div>
  );
}




export default App;
