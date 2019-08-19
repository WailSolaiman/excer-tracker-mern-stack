import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import bootbox from 'bootbox'
import Spinners from '../animation/spinners.component'
import {
    login,
    getAccessToken,
    setAccessToken,
    removeAccessToken,
    getUser,
} from '../../utils/authentication'

class LoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            accessToken: null,
            username: '',
            loading: true,
        }
    }

    componentDidMount() {
        if (getAccessToken()) {
            this.setState({
                accessToken: getAccessToken(),
            })
            this.welcomeMessage()
        }
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    welcomeMessage = () => {
        getUser()
            .then(response => {
                this.setState({ username: response.data.user.username })
            })
            .catch(error => {
                removeAccessToken()
                console.log(error.response.data)
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
        login({
            email: this.state.email,
            password: this.state.password,
        })
            .then(response => {
                setAccessToken(response.data)
                this.setState({
                    email: '',
                    password: '',
                })
                this.props.history.push('/list')
            })
            .catch(error => {
                bootbox.alert(error.response.data)
            })
    }

    render() {
        if (this.state.accessToken) {
            if (this.state.loading) {
                return <Spinners loading={this.state.loading} />
            }
            return (
                <div>
                    <p>
                        Welcome <strong>{this.state.username}</strong>
                    </p>
                </div>
            )
        }
        return (
            <div className="card">
                <h5 className="card-header info-color white-text text-center py-4">
                    <strong className="display-4">Login</strong>
                </h5>
                <div className="card-body px-lg-5 pt-0">
                    <form
                        onSubmit={this.onFormSubmit}
                        className="text-center p-5"
                    >
                        <div className="form-row">
                            <div className="col-12">
                                <p className="lead text-left">
                                    If you already have an account with
                                    ExcerTracker, please login with your email
                                    address and password.
                                </p>
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
                                    Accesss ExcerTracker
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(LoginComponent)
