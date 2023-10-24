    import Container from 'react-bootstrap/Container';
    import Button from 'react-bootstrap/Button';
    import Form from 'react-bootstrap/Form';
    import Stack from 'react-bootstrap/Stack';
    import Row from 'react-bootstrap/Row';
    import Col from 'react-bootstrap/Col';
    import {MdDelete} from 'react-icons/Md';
    import { MdOutlineDownloadDone } from 'react-icons/Md'


    import { useState } from 'react';
    import { useQuery, useMutation } from '@apollo/client';
    import { QUERY_TASKS } from '../utils/queries';
    import { ADD_TASK, UPDATE_TASK, DELETE_TASK } from '../utils/mutations';

    export default function Todo() {
        
        const [formState, setFormState]= useState({
            title:'',
            description:''
        })

        const { loading, data, error } = useQuery(QUERY_TASKS);
        const finished = [];
        const toBeDone = [];
        if (!loading) {

            data.tasks.forEach((el) => {
                el.status === 'completed' ? finished.push(el) : toBeDone.push(el);
            })
        }
        const [addTask, { err1 }] = useMutation(ADD_TASK, {
            refetchQueries: [
                QUERY_TASKS,
                'tasks'
            ]
        });
        const [updateTask, { err2 }] = useMutation(UPDATE_TASK, {
            refetchQueries: [
                QUERY_TASKS,
                'tasks'
            ]
        });
        const [removeTask, { err3 }] = useMutation(DELETE_TASK, {
            refetchQueries: [
                QUERY_TASKS,
                'tasks'
            ]
        });

        //use mutation to add a task, or remove
    //delete Task
    const handleDelete = async (Id)=>{
        try{
            const {deleteTask} = await removeTask(
                {
                    variables:{Id}
                }
            )
            if(deleteTask){
                refetch();
            }
        }catch(err){
            console.error(err);
        }
    }
//add task
    const handleChange = (event) =>{
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await addTask({
                variables:{
                    title:formState.title,
                    description:formState.description
                }
            })
        }catch(err){
            console.error(err);
        }
        setFormState({
            title: '',
            description: '',
        });
    } 
//update task
const handleComplete = async(Id) =>{
    try{
    const {data} = await updateTask({
        variables:{
            Id,
            status:'completed'
        }
    })
    }catch(err){
        console.error(err);
    }
}

        return (
            <>
                <Container>

                        <h4 className='mt-3'>Add New Task:</h4>
                        <div>

                        <Form.Control className="p-2 m-2" placeholder="Enter new task"
                        name="title"
                        value={formState.title}
                        onChange={handleChange} />
                        <Form.Control className="p-2 m-2" placeholder="Description"
                        as="textarea" rows={3} 
                        name="description"
                        value={formState.description}
                        onChange={handleChange} />
                        </div>
                        <div class="d-flex justify-content-end">
                        <Button variant="primary" className='px-5 py-2' 
                        onClick={handleSubmit}>Save</Button>
                        </div>
                    
                    <Container className='mt-2 border-top pt-2'>
                        <Row>
                            <Col><h3>To Do:</h3></Col>
                            <Col><h3>Completed:</h3></Col>
                        </Row>
                        {loading ? (<div>loading...</div>)
                            :
                            <Row>
                                <Col>
                                    <Stack gap={1}>
                                        {
                                            toBeDone.map((element) =>

                                            (

                                                <div key={element._id}>
                                                    <h5 className='p-1'>{element.title}
                                                    </h5>
                                                    <p className='p-2'>
                                                        {element.description}
                                                    </p>
                                                    <Button
                                                    onClick={()=>{handleComplete(element._id)}}><MdOutlineDownloadDone/></Button>
                                                    <Button
                                                    onClick={()=>{
                                                        handleDelete(element._id);
                                                    }}><MdDelete/></Button>
                                                </div>
                                            )
                                            )
                                        }
                                    </Stack>
                                </Col>
                                <Col>
                                    <Stack gap={1}>
                                        {
                                            finished.map((element) =>

                                            (

                                                <div key={element._id}>
                                                    <h5 className='p-1'>{element.title}
                                                    </h5>
                                                    <p className='p-2'>
                                                        {element.description}
                                                    </p>
                                                    <Button
                                                        onClick={() => {
                                                            handleDelete(element._id);
                                                        }}><MdDelete /></Button>
                                                </div>
                                            )
                                            )
                                        }
                                    </Stack>
                                </Col>
                            </Row>}

                    </Container>
                </Container>
            </>
        )
    }