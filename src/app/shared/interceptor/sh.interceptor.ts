import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable, from } from "rxjs";
import { switchMap } from "rxjs/operators";
import { TokenService } from "../services/token.service";

@Injectable()
export class SHInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return from(this.tokenService.getToken()).pipe(
            switchMap((token: string) => {
                // Clone the request with the 'Authorization' header
                const clonedReq = req.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                return next.handle(clonedReq);
            })
        );
    }
}