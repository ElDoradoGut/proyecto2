import { Schema, SchemaType, model } from "mongoose";

const scoreSchema = new Schema([
    {
        teamID: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        round: {
            type: Number,
            required: true
        }
    },
    {
        eventID: {
            type: Schema.Types.ObjectId,
            required: true
        }
    },
    {
        score: [
            {
                metricID: {
                    type: Schema.Types.ObjectId,
                    required: true
                },
                scr: {
                    type: Number,
                    required: true
                }
            }
        ]
    }
]);

export const modelScore = model('score', scoreSchema);