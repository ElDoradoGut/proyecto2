import { modelEvent } from "../models/model.Event.js";

//Method for creating event
export const createEvent = async (req, res) => {
    try {
        //Make sure metrics are stored in an array
        const {name, metrics, maxrounds, round, state} = req.body;

        if (!Array.isArray(metrics) || metrics.length == 0) {
            return res.status(400).json({ message: "Metrics must be sent as an array." });
        }

        //Validate that each metric is complete
        const incompleteMetrics = metrics.filter(metrics => (!metrics.description) || (metrics.maxpoints === undefined));
        if (incompleteMetrics.length > 0) {
            return res.status(400).json({ message: "Metrics must be complete (description and max points)." });
        }

        //Validate that descriptions are strings and points aren't zero or negative.
        const invalidMetrics = metrics.filter(metrics => typeof metrics.description !== "string" || metrics.description.length === 0 || metrics.maxpoints <= 0);
        if (invalidMetrics.length > 0) {
            return res.status(400).json({ message: "Metrics descriptions and maxpoints must be valid (strings and positive numbers)" });
        }

        //Create event
        const event = {
            name: name,
            metrics: metrics,
            maxrounds: maxrounds,
            round: round,
            state: state
        };

        await modelEvent.create(event);
        return res.status(201).json({ message: "Event created successfully." });
    } catch (e) {
        //Error handling
        console.error(e);
        return res.status(500).json({ error: "Error when creating event", details: e.message });
    }
}

//Get events
export const getEvents = async (req, res) => {
    try {
        const users = await modelEvent.find();
        return res.status(200).json(users)
    } catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Error when fetching event", details: e.message });
    }
}