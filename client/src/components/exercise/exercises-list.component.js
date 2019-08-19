import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import bootbox from 'bootbox'
import Spinners from '../animation/spinners.component'
import {
    getAccessToken,
    getExercises,
    deleteTheExercise,
    getUser,
} from '../../utils/authentication'

const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration} min.</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={'/edit/' + props.exercise._id} className="text-info">
                    Edit
                </Link>{' '}
                |{' '}
                <a
                    href="#/"
                    className="text-danger"
                    onClick={() => {
                        props.deleteExercise(props.exercise._id)
                    }}
                >
                    Delete
                </a>
            </td>
        </tr>
    )
}

export default class ExercisesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userId: '',
            exercises: [],
            loading: true,
        }
    }

    componentDidMount() {
        getExercises()
            .then(response => {
                this.setState({
                    exercises: response.data,
                })
            })
            .catch(error => {
                console.log(error.response.data)
            })
        getUser()
            .then(response => this.setState({ userId: response.data.user._id }))
            .catch(error => console.log(error))
        setTimeout(() => {
            this.setState({ loading: false })
        }, 1000)
    }

    deleteExercise = id => {
        bootbox.confirm({
            size: 'small',
            message: 'Remove selected exercise?',
            callback: result => {
                if (result) {
                    deleteTheExercise(id)
                        .then(response => {
                            this.setState({
                                exercises: this.state.exercises.filter(
                                    exercise => exercise._id !== id
                                ),
                            })
                            console.log(response.data)
                        })
                        .catch(error => console.log(error.response.data))
                }
            },
        })
    }

    exerciseList = () => {
        return this.state.exercises.map(currentexercise => {
            if (currentexercise.userId === this.state.userId) {
                return (
                    <Exercise
                        exercise={currentexercise}
                        deleteExercise={this.deleteExercise}
                        key={currentexercise._id}
                    />
                )
            }
            return null
        })
    }

    render() {
        if (getAccessToken() && this.state.loading) {
            return <Spinners loading={this.state.loading} />
        }
        return (
            <div>
                <h1 className="display-4 my-3">Logged Exercises</h1>
                <table className="table table-striped">
                    <thead className="thead-light">
                        <tr>
                            <th>Description</th>
                            <th>Duration</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>{this.exerciseList()}</tbody>
                </table>
            </div>
        )
    }
}
