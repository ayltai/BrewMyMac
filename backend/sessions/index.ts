import { AzureFunction, Context, HttpRequest, } from '@azure/functions';

import { init, createSession, getSessionScript, deleteSessions, } from '../libs/database';

const httpTrigger : AzureFunction = async (context : Context, req : HttpRequest) : Promise<void> => {
    try {
        switch (req.method) {
            case 'GET':
                if (req.query.sessionId) {
                    await init();

                    const script = await getSessionScript(req.query.sessionId);

                    context.res = script ? {
                        status : 200,
                        body   : script,
                    } : {
                        status : 404,
                    };
                } else {
                    context.res = {
                        status : 400,
                    };
                }

                break;

            case 'POST':
                if (req.body) {
                    await init();

                    context.res = {
                        status : 200,
                        body   : await createSession(req.body),
                    };
                } else {
                    context.res = {
                        status : 400,
                    };
                }

                break;

            case 'DELETE':
                if (req.query.days) {
                    await init();

                    await deleteSessions(Number(req.query.days));

                    context.res = {
                        status : 200,
                    };
                } else {
                    context.res = {
                        status : 400,
                    };
                }

                break;

            default:
                throw new Error(`The HTTP ${req.method} method is not supported.`);
        }
    } catch (error) {
        context.res = {
            status : 500,
            body   : error ? JSON.stringify(error) : null,
        };
    }

};

export default httpTrigger;
