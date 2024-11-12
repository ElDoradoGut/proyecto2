import { Schema, model } from "mongoose";

const eventSchema = new Schema([
    {
        metrics: [
            {
                description: {
                    type: String,
                    required: true
                },
                maxpoints: {
                    type: Number,
                    required: true
                }
            }
        ]
    }, {
        round: {
            type: Number,
            required: true
        }
    }, {
        state: {
            type: String,
            enum: ["pending", "active", "finished"],
            lowercase: true,
            require: true
        }
    }, {
        teams: [
            {
                type: Schema.Types.ObjectId,
                require: true
            }
        ]
    }, {
        judges: [
            {
                type: Schema.Types.ObjectId,
                require: true
            }
        ]
    }
]);

export const modelEvent = model('score', eventSchema);