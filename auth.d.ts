declare const auth: (options: Options, callback: Callback) => void;

interface Options {
    bot_id: string;
    request_access?: boolean;
    lang?: string;
}

interface Data {
    auth_date: number;
    first_name: string;
    hash: string;
    id: number;
    last_name: string;
    username: string;
    // I think there could be other properties too
}

type Callback = (dataOrFalse: Data | false) => void;

auth(
    { bot_id: process.env.BOT_USERNAME as string, request_access: true },
    (data: any) => {
        if (!data) {
            // authorization failed
        }

        // Here you would want to validate data like described there https://core.telegram.org/widgets/login#checking-authorization
        console.log(data);
    }
);