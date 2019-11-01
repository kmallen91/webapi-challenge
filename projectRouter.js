const express = require('express')
const Actions = require('./data/helpers/actionModel')
const Projects = require('./data/helpers/projectModel')
const router = express.Router()

router.get('/', (req, res) => {
    Projects
        .get()
            .then(project => res.status(200).json(project))
            .catch(err => res.status(500).json({error: 'Error getting projects data'}))
})

router.get('/:id/actions', (req, res) => {
    Projects    
        .getProjectActions(id)
            .then(action => res.status(200).json(action))
            .catch(err => res.status(500).json({error: `Error findin actions for project ${id}`}))
})

router.post('/', (req, res) => {
    const {name, description} = req.body
    if (name && description) {
         Projects    
            .insert(req.body)
                .then(project => res.status(201).json(project))
                .catch(err=> res.status(500).json({error: 'Error posting project data'}))
    } else {
        res.status(400).json({error: 'Please provide a name and description'})
    }
   
})

router.post('/:id/actions', validateProjectID, (req, res) => {
    const {id} = req.params
    const {project_id, description, notes} = req.body
    if (project_id && description && notes){
        Actions
            .insert(req.body)
                .then(action => res.status(201).json(action))
                .catch(err => res.status(500).json({error: 'error posting action'}))
    } else if (!project_id) {
        res.status(400).json({error: 'please provide a valid project ID'})
    } else {
        res.status(400).json({error: 'please provide a description and notes for your action'})
    }
})

router.put('/:id', (req, res) =>{
    const {id} = req.params
    const {name, description} = req.body
    if (id) {
        Projects
            .update(req.body)
                .then(project => {
                    if (name && description) {
                        res.status(201).json(project)
                    } else {
                        res.status(400).json({error: 'please provide a name and description'})
                    }
                }) 
                .catch(err => res.status(500).json({error: 'error editing the project data'}))
    } else {
        res.status(401).json({error: 'please provide a valid project ID'})
    }
})

router.put('/:id/actions/:id', validateProjectID, (req, res)=> {
    const {id} = req.params
    const {project_id, description, notes} = req.body
    if (id) {
        Actions
            .update(req.body)
                .then(action => {
                    if (notes && description) {
                        res.status(201).json(action)
                    } else {
                        res.status(400).json({error: 'please provide notes and a description'})
                    }
                }) 
                .catch(err => res.status(500).json({error: 'error editing the action data'}))
    } else {
        res.status(401).json({error: 'please provide a valid action ID'})
    } 
})

router.delete('/:id', (req, res) => {
    const {id} = req.params
    if (id) {
        Projects
            .remove(id)
                .then(project => res.status(200).json(project))
                .catch(err => res.status(500).json({error: 'error deleting the project'}))
    } else {
        res.status(400).json({message: 'please provide a valid project ID'})
    }
})

router.delete('/:id/actions/:id', (req,res) => {
    const {id} = req.params
    if (id) {
        Actions
            .remove(id)
                .then(action => res.status(200).json(action))
                .catch(err => res.status(500).json({error: 'error deleting the project'}))
    } else {
        res.status(400).json({message: 'please provide a valid action ID'})
    }
})

// middleware

function validateProjectID(req, res, next) {
    const {id} = req.params
    id
    ? next()
    : res.status(400).json({message: 'not a valid project ID'})
}

module.export = router