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
import { useState, useContext, useEffect } from "react"
import { UserContext } from '../context/user/UserContext'
import { Tooltip } from '@mui/material';
import { HabitContext } from '../context/habit/HabitContext';

export default function Todos({habit, axiosJWT}) {
    const [showForm, setShowForm] = useState(false)
    const { user } = useContext(UserContext)
    const { dispatch} = useContext(HabitContext)
    const [todo, setTodo] = useState('')
    const [todoList, setTodoList] = useState(habit.todos)
    const [formSetting, setFormSetting] = useState('add')

    useEffect(() => {
        setTodoList(habit.todos)
    }, [habit, habit.todos])

    const deleteTodo = async(id) => {
        try {
            await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/remove-todo`, {id:id}, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"DELETE_TODO", payload: {id:habit._id, todoId:id}})
            console.log("todo deleted")
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const addTodo = async(e) => {
        e.preventDefault()

        try {
            if(formSetting === 'add') {
                const newTodo = {
                    todo: todo.todo,
                    isComplete: false
                }
                const res = await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/add-todo`, newTodo, {
                    headers: {authorization:'Bearer ' + user.token}
                })
                dispatch({type:"ADD_TODO", payload: res.data})
            }

            else if(formSetting === 'edit') {
                await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/update-todo`, todo, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_TODO", payload: {id: habit._id, todo:todo}})
            setFormSetting('add')
            }
            setTodo('')
        } catch (err) {
            console.error(err.response.data)
        }
    }

    const updateChecked = async(todo) => {
        const updatedTodo= {
            ...todo,
            isComplete: !todo.isComplete
        }
        await axiosJWT.put(`http://localhost:5000/server/habit/${habit._id}/update-todo`, updatedTodo, {
                headers: {authorization:'Bearer ' + user.token}
            })
            dispatch({type:"UPDATE_TODO", payload: {id: habit._id, todo:updatedTodo}})
    }

    const editClick = (todo) => {
        setTodo(todo)
        setFormSetting('edit')
        setShowForm(showForm)
    }

    return(
        <TodoList>
            <div>Todos</div>
            <List>
                {todoList && todoList.map(todo => {
                    return (
                        <ListItem key={todo._id} secondaryAction={
                            <>
                                <Tooltip title="Edit">
                                    <IconButton edge="end" aria-label="edit" onClick={() => editClick(todo)}>
                                        <EditIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Delete">
                                    <IconButton edge="end" aria-label="delete" onClick={() => deleteTodo(todo._id)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Tooltip>
                            </>
                          }>
                            <ListItemAvatar>
                                    <Checkbox
                                        icon={<CheckCircleOutlinedIcon />}
                                        checkedIcon={<CheckCircleIcon />}
                                        checked={todo.isComplete}
                                        onChange={() => updateChecked(todo)}
                                    />
                            </ListItemAvatar>
                            <ListItemText primary={todo.todo}/>
                        </ListItem>
                    )
                })}
            </List>

            {showForm ? 
            <form onSubmit={addTodo}>
                <TextField
                    id="outlined-basic"
                    label={formSetting === 'add' ? 'Add new todo' : ''}
                    variant="outlined"
                    value={todo.todo || ''}
                    onChange={(e) => setTodo({...todo, todo:e.target.value})}
                />
                <Button type="submit" variant="text">add to list</Button>
            </form>
             :  <Fab onClick={() => setShowForm(!showForm)} color="primary" size="medium" aria-label="add">
                    <AddIcon />
                </Fab>}

            
        </TodoList>
    )
}