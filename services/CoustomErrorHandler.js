class CoustomErrorHandler extends Error {
    constructor(status, msg){
        this.status = status;
        this.message = msg;
    }

    static alreadyExist(message){
        return new CoustomErrorHandler(409, message);
    }
}

export default CoustomErrorHandler;