import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import bootbox from 'bootbox'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Spinners from '../animation/spinners.component'
import {
    getAccessToken,
    getOneExercise,
    updateExercise,
} from '../../utils/authentication'

class EditExercise extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            loading: true,
        }
    }

    componentDidMount() {
        getOneExercise(this.props.match.params.id)
            .then(response => {
                this.setState({
                    username: response.data.username,
                    description: response.data.description,
                    duration: response.data.duration,
                    date: new Date(response.data.date),
                })
            })
            .catch(error => console.log(error.response.data))
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
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date,
        }
        updateExercise(this.props.match.params.id, exercise).then(response => {
            bootbox.alert({
                size: 'small',
                title: response.data,
                message: this.state.description,
                callback: () => {
                    this.props.history.push('/list')
                },
            })
        })
    }

    render() {
        if (getAccessToken() && this.state.loading) {
            return <Spinners loading={this.state.loading} />
        }
        return (
            <div>
                <h1 className="display-4 my-3">Edit Selected Exercise</h1>
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
                            value="Edit Exercise Log"
                            className="btn btn-outline-info rounded-0"
                        />
                    </div>
                </form>
            </div>
        )
    }
}

export default withRouter(EditExercise)
