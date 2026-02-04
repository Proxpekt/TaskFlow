export const DB_NAME: string = "taskFlow";
export const LIMIT: string = "16kb";

interface opt {
    httpOnly: boolean;
    secure: boolean;
}
export const OPTIONS: opt = {
    httpOnly: true,
    secure: true,
};
