import AddIcon from '@mui/icons-material/Add';
import { useHistory } from "react-router-dom";

export default function NoGoals() {
    // Set hooks as variables 
    const history = useHistory();


    return(
        <div className="home">
            <div className="border">
                <h2 className="home__title">Let's set a Goal</h2>

                <AddIcon onClick={() => history.push("/creategoal")} className="home__Icon" />

                <h4 className="home__subtitle">
                    Click the '+' to add a Goal
                    <br />
                    <br />
                    These goals should be something you strive to accomplish on a daily basis
                </h4>
            </div>
        </div>
    )
}