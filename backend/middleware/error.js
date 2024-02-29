class ErrorHandlar extends Error{
    constructor(message,statuscode){
        super(message)
        this.statuscode=statuscode
    }
}

export const errorMiddleware=(err,req,resp,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statuscode=err.statuscode|| 500;

    if(err.name==='caseError'){
        const message=`Resource not found Invalid  ${err.path}`
        err=new ErrorHandlar(message,400);

    }
    if(err.code===11000){
        const message=`Duplicate ${Object.keys(err.keyValue)} Entered`
        err=new ErrorHandlar(message,400);
    }
    if(err.name='JsonWebTokenError'){
        const message=`Json web Token Invalid , Try Again`
        err=new ErrorHandlar(message,400);

    }
    if(err.name='TokenExpiredError'){
        const message=`Token Expired  , Try Again`
        err=new ErrorHandlar(message,400);
    }
    return resp.status(err.statuscode).json({
        success:false,
        message:err.message,
    })
}

export default ErrorHandlar;