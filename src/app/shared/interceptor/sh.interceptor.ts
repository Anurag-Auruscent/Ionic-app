import { Injectable, Component } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";
import { TokenService } from "../services/token.service";

@Injectable()
export class SHInterceptor implements HttpInterceptor {

    constructor(
        private tokenService: TokenService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.tokenService.getToken();

        req = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${token}`).append('Content-Type', 'application/json')
        });

        return next.handle(req);
    }
}