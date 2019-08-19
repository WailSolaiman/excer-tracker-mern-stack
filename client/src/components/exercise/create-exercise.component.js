import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import bootbox from 'bootbox'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Spinners from '../animation/spinners.component'
import {
    getAccessToken,
    createExercise,
    getUser,
} from '../../utils/authentication'

class CreateExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            loading: true,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    onChangeDescription = e => {
        this.setState({
            description: e.target.value,
        })
    }

    onChangeDuration = e => {
        this.setState({
            duration: e.target.value,
        })
    }

    onChangeDate = date => {
        this.setState({
            date: date,
        })
    }

    onSubmit = e => {
        e.preventDefault()
        getUser().then(response => {
            this.setState({
                username: response.data.user.username,
                userId: response.data.user._id,
            })
            const exercise = {
                userId: response.data.user._id,
                username: response.data.user.username,
                description: this.state.description,
                duration: this.state.duration,
                date: this.state.date,
            }
            createExercise(exercise)
                .then(response => {
                    bootbox.alert({
                        size: 'small',
                        title: response.data,
                        message: this.state.description,
                        callback: () => {
                            this.props.history.push('/list')
                        },
                    })
                })
                .catch(error => console.log(error.reponse.data))
        })
    }

    render() {
        if (getAccessToken() && this.state.loading) {
            return <Spinners loading={this.state.loading} />
        }
        return (
            <div>
                <h1 className="display-4 my-3">Create New Exercise</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Description: </label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            value={this.state.description}
                            onChange={this.onChangeDescription}
                        />
                    </div>
                    <div className="form-group">
                        <label>Duration (in minutes): </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.duration}
                            onChange={this.onChangeDuration}
                        />
                    </div>
                    <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                className="form-control"
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="submit"
                            value="Create Exercise Log"
                            className="btn btn-outline-success rounded-0"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(CreateExercise)
