import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, from, of } from "rxjs";
import { mergeMap } from "rxjs/operators";
import { TokenService } from "../services/token.service";
import { environment } from "src/environments/environment";

@Injectable()
export class SHInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if the request URL is the one for addUser
        // if (req.url === environment.verifyOtpUrlEmail || re) {
        //     // Clone the request with the 'Authorization' header
        //     const clonedReq = req.clone({
        //         setHeaders: {
        //             Authorization: `Bearer ${environment.token}`,
        //             'Content-Type': 'application/json'
        //         }
        //     });

        //     return next.handle(clonedReq);
        // }
        if (req.url === environment.addUserURL || req.url === environment.sendEmailOtpUrl || req.url === environment.verifyOtpUrlEmail || req.url === environment.verifyOtpUrlPhone || req.url === environment.generateLoginOtpUrl) {
            const clonedReq = req.clone({
                setHeaders: {
                    'Content-Type': 'application/json',
                }
            });
            return next.handle(clonedReq);
        }
        else {
            // For other requests, use the interceptor logic
            return from(this.tokenService.getToken()).pipe(
                mergeMap((token: string | null) => {
                    if (!token) {
                        // Handle case where token is null
                        // For example, you might want to redirect to login page or handle the error
                        // For now, we'll just return an empty observable
                        return of(); // Return an empty observable that immediately completes
                    }

                    // Clone the request with the 'Authorization' header
                    const clonedReq = req.clone({
                        setHeaders: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        }
                    });
                    console.log("Token check : ", token);

                    return next.handle(clonedReq);
                })
            );
        }
    }
}
