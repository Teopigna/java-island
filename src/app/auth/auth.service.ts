import { Injectable } from "@angular/core";
import {HttpClient} from "@angular/common/http"

export interface AuthResponseData {
    kind: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({providedIn: 'root'})
export class AuthService {

    constructor(private http: HttpClient) {}

    //SignUp temporaneo su FireBase
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAXV4EliA62QyHDYEvyUbpvtEvKpzG3mAI',
            {
                email: email, 
                password: password,
                returnSecureToken: true
            }
        )
    }
    
    //SignUp con EndPoint reale
    signUpReal(name: string, surname: string, email:string, birthDate: string, password:string){
        return this.http.post<AuthResponseData>(
            'https://localhost:8756/api/auth/signup',
            {   
                firstName: name,
                lastName: surname,
                email: email, 
                birthDate: birthDate,
                password: password,
            }
        )
    }

    login(email: string, password: string){
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAXV4EliA62QyHDYEvyUbpvtEvKpzG3mAI',
            {
                email: email, 
                password: password,
                returnSecureToken: true
            }
        )
    }
}