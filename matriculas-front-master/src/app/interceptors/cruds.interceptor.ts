import { HttpInterceptorFn } from "@angular/common/http";

export const loggerInter:HttpInterceptorFn = (req,next)=>{
    const token = localStorage.getItem('token');


    const authreq = req.clone({
        headers:req.headers.set( 'Authorization', `Bearer ${token}`)
    })
    return next(authreq)
}
