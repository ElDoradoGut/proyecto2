import { Schema, model } from "mongoose";

const teamSchema = new Schema([
    {
        name: {
            type: String,
            require: true
        }
    }, {
        memberID: [
            {
                type: Schema.Types.ObjectId,
                ref:'users',
                required: true
            }
        ]
    }, {
        leaderID: {
            type: Schema.Types.ObjectId,
            ref: 'users',
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
                ref: 'scores',
                required: true
            }
        ]
    }
]);

export const modelTeam = model('score', teamSchema);