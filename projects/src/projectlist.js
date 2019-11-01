import React, {useState, useEffect} from 'react'
import axios from 'axios'

const ProjectList = () => {
    const [projects, setProject] = useState()

    useEffect(()=> {
        axios   
            .get('http://localhost:4000/api/projects')
            .then(res => {
                setProject(res.data)
            })
            .catch(err => console.log('error from get', err))

    })

    return (
        <div className='project-container'>
            {projects.map(project=> (
                <div className='projects'>
                    {project}
                </div>
            ))}

        </div>
    )


}

export default ProjectList