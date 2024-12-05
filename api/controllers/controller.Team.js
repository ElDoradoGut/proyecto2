import { modelTeam } from "../models/model.Team.js";
import { modelEvent } from "../models/model.Event.js";

const nameRegex = /^[a-zA-Z]+$/;

//Method for creating a new team
export const createTeam = async (req, res) => {
    try {
        //VALIDATION
        //Validate team name
        if (!nameRegex.test(req.body.name)) {
            return res.status(400).json({ message: "Team name can only contain letters and numbers." });
        }

        //Validate name length > 3, < 15
        if (req.body.name.length < 3 || req.body.name > 15) {
            return res.status(400).json({ message: "Team name must have a length between 3 and 15 characters." });
        }

        //Validate memberID is integer
        /* if (!Array.isArray(req.body.memberID) || !req.body.memberID.every(id => typeof id === "ObjectId")) {
            return res.status(400).json({ message: "MemberID must be ObjectID." });
        } */

        //Validate team size < 8
        if (req.body.memberID.length > 8) {
            return res.status(400).json({ message: "Team cannot have more than 8 members." });
        }

        //Create team object
        const team = {
            name: req.body.name,
            memberID: req.body.memberID,
            leaderID: req.body.leaderID,
            round: 1
        };

        await modelTeam.create(team);
        return res.status(201).json({ message: "Team created successfully." });
    } catch (e) {
        //Error handling
        console.log(e);
        return res.status(500).json({ message: "Error when creating team: " + e });
    }
}

//Get teams
export const getTeams = async (req, res) => {
    try {
        const team = await modelTeam.find();
        return res.status(200).json(team)
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Error when fetching team", details: e.message });
    }
}


//Method for registering a team to an event
export const registerEvent = async (req, res) => {
    //Verification
    try {
        //Verifying that the team exists
        const teamID = req.params.teamID;
        const team = await modelTeam.findById(teamID);
        if (!team) {
            return res.status(400).json({ message: "No such team" });
        }

        //Verifying that the event exists
        const eventID = req.params.eventID;
        const event = await modelEvent.findById(eventID);
        if (!event) {
            return res.status(400).json({ message: "No such event" });
        }

        //Register team to event
        await modelEvent.findByIdAndUpdate(eventID, {
            $push: {
                "teams": teamID
            }
        });
        return res.status(201).json({ message: "Team registered successfully." });
    } catch (e) {
        //Error handling
        console.log(e);
        return res.status(500).json({ message: "Error when registering team to event.", details: e.message });
    }
}