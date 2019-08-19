import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import bootbox from 'bootbox'
import { register } from '../../utils/authentication'

export default class RegisterComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: '',
            password: '',
            userId: null,
        }
    }

    onUsernameChange = e => {
        this.setState({
            username: e.target.value,
        })
    }

    onEmailChange = e => {
        this.setState({
            email: e.target.value,
        })
    }

    onPasswordChange = e => {
        this.setState({
            password: e.target.value,
        })
    }

    onFormSubmit = e => {
        e.preventDefault()
        register({
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                this.setState({
                    username: '',
                    email: '',
                    password: '',
                    userId: response.data.userId,
                })
            })
            .catch(error => {
                bootbox.alert(error.response.data)
            })
    }

    render() {
        if (this.state.userId) {
            return (
                <div>
                    <h1 className="display-4 text-center text-uppercase my-5">
                        Please{' '}
                        <Link to="/login" className="text-decoration-none">
                            login
                        </Link>{' '}
                        to access the exercise app.
                    </h1>
                </div>
            )
        }
        return (
            <div className="card">
                <h5 className="card-header info-color white-text text-center py-4">
                    <strong className="display-4">Register</strong>
                </h5>
                <div className="card-body px-lg-5 pt-0">
                    <form
                        onSubmit={this.onFormSubmit}
                        className="text-center p-5"
                    >
                        <div className="form-row">
                            <div className="col-12">
                                <p className="lead text-left">
                                    Fill in the following to create an account.
                                </p>
                            </div>
                            <div className="col-12">
                                <input
                                    type="text"
                                    placeholder="Username"
                                    name="username"
                                    className="form-control mb-4"
                                    value={this.state.username}
                                    onChange={this.onUsernameChange}
                                />
                            </div>
                            <div className="col">
                                <div className="md-form">
                                    <input
                                        type="text"
                                        placeholder="Email"
                                        name="email"
                                        className="form-control mb-4"
                                        value={this.state.email}
                                        onChange={this.onEmailChange}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="md-form">
                                    <input
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        className="form-control mb-4"
                                        value={this.state.password}
                                        onChange={this.onPasswordChange}
                                    />
                                </div>
                            </div>
                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-block my-4"
                                >
                                    Create new account
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
