import React from 'react'
import { useSelector } from 'react-redux'
import {useHistory} from 'react-router-dom'

const StudentsearchStudent = () => {
    const store = useSelector((store) => store)
    const history = useHistory()
    return (
        <div>
            {store.student.isAuthenticated ? <><HomeHelper /></> : (history.push('/'))}
        </div>
    )
}

export default StudentsearchStudent
