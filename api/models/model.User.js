import { Schema, model } from "mongoose";

const mailRegex = /^(([^<>()\[\]\.,;:\s@"]+(\.[^<>()\[\]\.,;:\s@"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Schema([
    {
        name: {
            type: String,
            required: true
        }
    }, {
        mail: {
            type: String,
            required: [true, 'E-mail address required'],
            match: [mailRegex, 'E-mail address not valid']
        }
    }, {
        curp: {
            type: String,
            required: true
        }
    }, {
        role: {
            type: String,
            required: true
        }
    }, {
        password: {
            type: String,
            required: true
        }
    }
]);

export const modelUser = model('user', userSchema);