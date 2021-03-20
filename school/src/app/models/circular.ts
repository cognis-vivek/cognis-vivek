export class Circular{
    messageId: any;
    messageSubject: any;
    messageBody: any;
    date: any;

    constructor(
        messageId: any,
        messageSubject: any,
        messageBody: any,
        date: any
    ){
        this.messageId = messageId;
        this.messageSubject = messageSubject;
        this.messageBody = messageBody;
        this.date = date;
    }

    // Getters 
    public getMessageId(): any{
        return this.messageId;
    }

    public getMessageSubject(): any{
        return this.messageSubject;
    }

    public getMessageBody(): any{
        return this.messageBody;
    }

    public getDate(): any{
        return this.date;
    }

    
    
}