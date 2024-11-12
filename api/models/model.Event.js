import { Schema, model } from "mongoose";

const eventSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    }, {
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
        maxrounds: {
            type: Number,
            required: true
        }
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
                ref: 'teams',
                require: true
            }
        ]
    }, {
        judges: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
                require: true
            }
        ]
    }
]);

export const modelEvent = model('event', eventSchema);