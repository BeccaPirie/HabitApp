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
import { useState } from "react"

export default function Todos() {
    const [showForm, setShowForm] = useState(false)

    return(
        <TodoList>
            <div>Todos</div>
            <List>
                <ListItem secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
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
                    <ListItemText primary="Todo name"/>
                </ListItem>

                <ListItem secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
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
                    <ListItemText primary="Todo name"/>
                </ListItem>

                <ListItem secondaryAction={
                    <>
                        <IconButton edge="end" aria-label="delete">
                            <EditIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete">
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
                    <ListItemText primary="Todo name"/>
                </ListItem>
            </List>

            {showForm ? 
            <>
                <TextField id="outlined-basic" label="Add new todo" variant="outlined"/>
                <Button variant="text">add to list</Button>
            </>
             :  <Fab onClick={() => setShowForm(!showForm)} color="primary" size="medium" aria-label="add">
                    <AddIcon />
                </Fab>}

            
        </TodoList>
    )
}