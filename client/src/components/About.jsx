import HabitList from "./HabitList"
import { AboutStyled } from "./styles/About.styled"
import Paper from "@mui/material/Paper"

export default function About({lg}){
    return(
        lg ?
        <AboutStyled>
            <Paper className="paper">
                <div className="content">
                    <p>
                    HabitBuild has been designed as a tool to help aid habit formation, as building and maintaining new habits 
                    can be challenging for many. Other applications designed to support habit formation, although popular, often 
                    aren't backed by research, and can lead to dependency where once the user stops using the app, they stop carrying 
                    out the habit. Therefore, HabitBuild's goal is to provide a way to successfully aid the habit formation process.
                    </p>
                    
                    <p>
                    Habits are formed when a new behaviour is repeated in the same context, as overtime intentions and goals become 
                    less of the influence to carry them out, and the influence of habit begins to increase. Many existing habit 
                    tracking applications use time-based cues to remind users to complete the new behaviour, which can result in 
                    dependency of the application as users start relying on these reminders to carry out the habit. Therefore, 
                    this application relies on event-based cues to help integrate new habits into your daily routine. These are events 
                    that you want to integrate the habit around. For example, after breakfast, or before going to bed. To begin with 
                    you’ll receive daily notifications after the event cue has passed to help keep you on track, but these will begin to 
                    be faded out over time.
                    </p>

                    <p>
                    Another aspect this application focuses on is dealing with conflicting thoughts and feelings which may arise and 
                    lead to unwanted actions. When you add a new habit, you'll be asked to identify any thoughts or actions that may 
                    prevent you from wanting to carry out the habit, and then what you could do or tell yourself in these situations. 
                    An example is if you are trying to implement healthier eating habits, you could tell yourself you will ignore any 
                    thoughts regarding the foods you are trying to avoid.
                    </p>

                    <p>
                    In addition to these features, for each habit you can add a list of to-dos and monitor any thoughts or notes in the 
                    journal section. Perhaps you could use this section to keep track of wins and successes to provide yourself with even 
                    more motivation. Lastly, you can mark your progress on the calendar and view this data in a chart to see your progress!
                    </p>

                    <p>
                    To start monitoring your first habit, click the green + button at the bottom left of this page.
                    </p>
                </div>
            </Paper>
        </AboutStyled>
            : <HabitList />   
    )
}