import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";

@Injectable({
    providedIn: "root"
})

export class TranslateConfigService {
    currentLang: any;
    constructor(private translateService: TranslateService){
        this.currentLang = localStorage.getItem('lang');
    }

    getDefaultLanguage(){
        if(this.currentLang){
            this.translateService.setDefaultLang(this.currentLang);
        } else {
            localStorage.setItem('lang', this.translateService.getBrowserLang()!);
            this.currentLang = this.translateService.getBrowserLang();
            this.translateService.setDefaultLang(this.currentLang);
        }
        return this.currentLang;
    }

    setLanguage(setLang: string){
        this.translateService.use(setLang);
        localStorage.setItem('lang', setLang);
    }

    getCurrentLanguage(){
        return localStorage.getItem('lang');
    }
}