import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import { getAccessToken, removeAccessToken } from '../../utils/authentication'

class Navbar extends Component {
    onFormSubmit = e => {
        e.preventDefault()
        removeAccessToken()
    }

    render() {
        return (
            <nav className="navbar navbar-light alert alert-secondary navbar-expand-lg rounded-0 mb-0 px-0 text-center">
                <div className="w-100">
                    <div className="col-12">
                        <Link to="/" className="navbar-brand m-0">
                            <h1>ExcerTracker</h1>
                        </Link>
                    </div>
                    <div className="col-12">
                        <div className="collpase navbar-collapse">
                            <ul className="navbar-nav justify-content-center w-100">
                                <li className="navbar-item">
                                    <Link
                                        to="/list"
                                        className="nav-link text-uppercase lead"
                                    >
                                        All Exercises
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        to="/create"
                                        className="nav-link text-uppercase lead"
                                    >
                                        Create Exercise
                                    </Link>
                                </li>
                                <li className="navbar-item">
                                    <Link
                                        to="/profile"
                                        className="nav-link text-uppercase lead"
                                    >
                                        User Profile
                                    </Link>
                                </li>
                            </ul>
                            <form
                                onSubmit={this.onFormSubmit}
                                className={
                                    getAccessToken() === null
                                        ? 'd-none form-inline my-2 my-lg-0'
                                        : 'd-block form-inline my-2 my-lg-0'
                                }
                            >
                                <button
                                    className="btn btn-danger rounded-0"
                                    type="submit"
                                >
                                    Logout
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }
}

export default withRouter(Navbar)
