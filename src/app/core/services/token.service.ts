import { Injectable } from "@angular/core";
import { of } from 'rxjs';


interface Token {
  key: string;
  value: string;
}

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  
  isExistToken(key: string = 'token') {
    return !!this.getToken(key) ? of(true) : of(false);
  }

  setToken(tk: Token) {
    localStorage.setItem(tk.key, tk.value);
  }

  getToken(key: string = 'token') {
    return localStorage.getItem(key);
  }

  removeToken(key: string = 'token') {
    return localStorage.removeItem(key);
  }

  clear() {
    localStorage.clear();
  }
      
}