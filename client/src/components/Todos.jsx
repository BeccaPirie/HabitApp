// import { styled } from '@mui/material/styles';
// import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Checkbox from '@mui/material/Checkbox';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { TodoList } from './styles/Todo.styled';
import { useState, useContext } from "react"
import { UserContext } from '../context/user/UserContext'

export default function Todos({todos, axiosJWT}) {
    const [showForm, setShowForm] = useState(false)
    const { user, dispatch } = useContext(UserContext)
    const [todo, setTodo] = useState('')

    const deleteTodo = async(id) => {
        try {
            await axiosJWT.put('http://localhost:5000/server/habit/remove-todo', {id:id}, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"DELETE_TODO", payload: id})
            console.log("todo deleted")
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const addTodo = async(e) => {
        const newTodo = {
            todo: '',
            isComplete: false
        }
        try {
            const res = await axiosJWT.put('http://localhost:5000/server/habit/add-todo', newTodo, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"ADD_TODO", payload: res.data})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const updateTodo = async(e) => {
        try {
            await axiosJWT.put('http://localhost:5000/server/habit/update-todo', todo, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_TODO", payload: todo})
        } catch (err) {
            console.error(err.response.data)
        }
    }

    return(
        <TodoList>
            <div>Todos</div>
            <List>
                {todos !== undefined && todos.map(todo => {
                    return (
                        <ListItem secondaryAction={
                            <>
                                <IconButton edge="end" aria-label="edit" onClick={() => setShowForm(!showForm)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={deleteTodo}>
                                    <DeleteIcon />
                                </IconButton>
                            </>
                          }>
                            <ListItemAvatar>
                                    <Checkbox
                                        icon={<CheckCircleOutlinedIcon />}
                                        checkedIcon={<CheckCircleIcon />}
                                    />
                            </ListItemAvatar>
                            <ListItemText primary={todo.name}/>
                        </ListItem>
                    )
                })}
            </List>

            {showForm ? 
            <form onSubmit={addTodo}>
                <TextField
                    id="outlined-basic"
                    label="Add new todo"
                    variant="outlined"
                    value={todo || ''}
                    onChange={(e) => setTodo(e.target.value)}
                />
                <Button variant="text">add to list</Button>
            </form>
             :  <Fab onClick={() => setShowForm(!showForm)} color="primary" size="medium" aria-label="add">
                    <AddIcon />
                </Fab>}

            
        </TodoList>
    )
}