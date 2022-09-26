import { connect, model, Schema, } from 'mongoose';
import { v4, } from 'uuid';

type Session = {
    sessionId    : string,
    creationDate : Date,
    script       : string,
};

const SessionSchema = new Schema<Session>({
    sessionId    : {
        type    : String,
        default : v4,
        index   : true,
    },
    creationDate : {
        type    : Date,
        default : Date.now,
        index   : true,
    },
    script       : String,
});

const SessionModel = model<Session>('Session', SessionSchema, 'sessions');

let db : typeof import('mongoose') | null = null;

export const init = async () => {
    if (!db) db = await connect(process.env.CONNECTION_STRING!);
};

export const createSession = async (script : string) => {
    const session = await SessionModel.create({
        script,
    });

    return session.sessionId;
};

export const deleteSessions = async (days : number) => await SessionModel.find({}).where('creationDate').lt(Date.now() - days * 24 * 60 * 60 * 1000).deleteMany().exec();

export const getSessionScript = async (sessionId : string) => {
    const session = await SessionModel.findOne({
        sessionId,
    }).lean();

    return session?.script;
};
