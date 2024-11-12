import { Schema, model } from "mongoose";

const teamSchema = new Schema([
    {
        name: {
            type: String,
            require: true
        }
    }, {
        members: [
            {
                type: Schema.Types.ObjectId,
                required: true
            }
        ]
    }, {
        leader: {
            type: Schema.Types.ObjectId,
            required: true
        }
    }, {
        round: {
            type: Number,
            required: true
        }
    }, {
        scores: [
            {
                type: Schema.Types.ObjectId,
                required: true
            }
        ]
    }
]);

export const modelTeam = model('score', teamSchema);