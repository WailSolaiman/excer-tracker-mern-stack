import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap'
import PrivateRoute from './routes/private-route.component'
import Home from './components/home/home.component'
import RegisterComponent from './components/register/register.component'
import LoginComponent from './components/login/login.component'
import Navbar from './components/navbar/navbar.component'
import ExercisesList from './components/exercise/exercises-list.component'
import EditExercise from './components/exercise/edit-exercise.component'
import CreateExercise from './components/exercise/create-exercise.component'
import UserProfile from './components/user/user-profile.component'

function App() {
    return (
        <div className="container">
            <Router>
                <Navbar />
                <Route exact path="/" component={Home} />
                <Route path="/register" component={RegisterComponent} />
                <Route path="/login" component={LoginComponent} />
                <PrivateRoute path="/list" component={ExercisesList} />
                <PrivateRoute path="/edit/:id" component={EditExercise} />
                <PrivateRoute path="/create" component={CreateExercise} />
                <PrivateRoute path="/profile" component={UserProfile} />
            </Router>
        </div>
    )
}

export default App
