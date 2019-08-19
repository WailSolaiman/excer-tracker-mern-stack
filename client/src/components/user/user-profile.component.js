import React, { Component } from 'react'
import Spinners from '../animation/spinners.component'
import { getAccessToken, getUser } from '../../utils/authentication'

export default class UserProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            username: '',
            email: '',
            loading: true,
        }
    }

    componentDidMount() {
        getUser()
            .then(response => {
                this.setState({
                    userId: response.data.user._id,
                    username: response.data.user.username,
                    email: response.data.user.email,
                })
            })
            .catch(error => console.log(error.response.data))
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    render() {
        if (getAccessToken() && this.state.loading) {
            return <Spinners loading={this.state.loading} />
        }
        return (
            <div className="jumbotron rounded-0">
                <h1 className="display-4 my-3">About User</h1>
                <p className="lead">Username: {this.state.username}</p>
                <p className="lead">E-Mail: {this.state.email}</p>
            </div>
        )
    }
}
