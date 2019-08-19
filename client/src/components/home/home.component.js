import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Spinners from '../animation/spinners.component'
import { getAccessToken, getUser } from '../../utils/authentication'

const Home = () => {
    const [userName, setUserName] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (getAccessToken()) {
            getUser()
                .then(response => setUserName(response.data.user.username))
                .catch(error => console.log(error.response.data))
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
    }, [])

    if (getAccessToken() && loading) {
        return <Spinners loading={loading} />
    }
    return (
        <div className="jumbotron rounded-0 text-center">
            {getAccessToken() ? (
                <p className="lead">
                    Welcome back to your ExcerTracker{' '}
                    <span className="text-info">{userName}</span>.
                </p>
            ) : (
                <div>
                    <h1 className="display-4">Welcome to ExcerTracker App.</h1>
                    <p className="lead">
                        ExcerTracker is an application that help you to manage
                        all your exercises.
                    </p>
                    <hr className="my-4" />
                    <p className="lead">
                        Please <strong>register</strong> to start using
                        ExcerTracker, or <strong>login</strong> if you already
                        have an account.
                    </p>
                    <div
                        className="btn-group btn-group-lg"
                        role="group"
                        aria-label="Basic example"
                    >
                        <Link
                            type="button"
                            className="btn btn-primary"
                            to="/register"
                        >
                            REGISTER
                        </Link>
                        <Link
                            type="button"
                            className="btn btn-primary"
                            to="/login"
                        >
                            LOGIN
                        </Link>
                    </div>
                    <hr className="my-4" />
                    <p className="">
                        You can use the following dummy data to{' '}
                        <strong>login</strong> and run/test the app:
                        <br /> Email: <u>dummyuser@hotmail.com</u>, Password:{' '}
                        <u>dummyuser</u>. Or you can use your personal data to{' '}
                        <strong>register</strong>.
                    </p>
                </div>
            )}
        </div>
    )
}

export default Home
