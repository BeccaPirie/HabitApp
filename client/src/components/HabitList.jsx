import { Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { StyledHabitList } from "./styles/HabitList.styled"
import { HabitContext } from "../context/habit/HabitContext"
import { Fab } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

// import { styled, useTheme } from '@mui/material/styles';
// import Drawer from '@mui/material/Drawer';
// import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
// import MenuIcon from '@mui/icons-material/Menu';
// import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
// import ListItemButton from '@mui/material/ListItemButton';
// import ListItemIcon from '@mui/material/ListItemIcon';
// import ListItemText from '@mui/material/ListItemText';
// import DeleteIcon from '@mui/icons-material/Delete';

// const drawerWidth = 280;

// const DrawerHeader = styled('div')(({ theme }) => ({
//   display: 'flex',
//   alignItems: 'center',
//   padding: theme.spacing(0, 1),
//   // necessary for content to be below app bar
//   ...theme.mixins.toolbar,
//   justifyContent: 'flex-end',
// }));


export default function HabitList() {
    const { userHabits } = useContext(HabitContext)
    const [sortedHabits, setSortedHabits] = useState([])

    // const theme = useTheme();
    
    // const handleDrawerOpen = () => {
    //     setOpen(true);
    //   };
    
    //   const handleDrawerClose = () => {
    //     setOpen(false);
    //   };

    // sort habits
    useEffect(() => {
        if(userHabits) {
        const uncompleted = userHabits.filter(habit => !habit.habitCompleted)
        const completed = userHabits.filter(habit => habit.habitCompleted)
        setSortedHabits(uncompleted.concat(completed))
        }
    }, [userHabits])

    return(
        <StyledHabitList>
        {/* <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar> */}

            {/* <Drawer sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            > */}
{/* 
            <DrawerHeader>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </DrawerHeader> */}

            <Divider />

            <Link to={'/'}>
                <h2 className="list-header">Habit App</h2>
            </Link>

            <Divider />

            <List>
            {sortedHabits.length > 0 && sortedHabits.map((habit) => (
                <Link key={habit._id} to={`/${habit._id}`}>
                <ListItem className={`habitListItem-${habit.habitCompleted}`}>
                    <span>{habit.name}</span>
                </ListItem>
                </Link>
            ))}
            </List>

            {/* <ul>            
                {sortedHabits.length > 0 && sortedHabits.map((habit) => (
                    <Link key={habit._id} to={`/${habit._id}`}>
                        <li className={`habitListItem-${habit.habitCompleted}`}>
                            <span>{habit.name}</span>
                        </li>
                    </Link>
                ))}
            </ul> */}

            <Link to={'/add'}>
                <div className="addBtn">
                    {/* <span>+</span> */}
                    <Fab aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
                
            </Link>

            {/* </Drawer> */}

        </StyledHabitList>
    )
}