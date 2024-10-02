// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface RegisterResponse {
  id: number;
  username: string;
  email: string;
}

interface LoginResponse {
  id: number;
  username: string;
  email: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:44397/api/auth'; // URL de tu API backend

  constructor(private http: HttpClient) {}

  // Registro de usuario
  register(request: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, request);
  }

  // Login de usuario
  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, request);
  }

  // Logout del usuario
  logout(): Observable<any> {
    return this.http.post(`${this.baseUrl}/logout`, {});
  }

  // Guardar el usuario en el local storage
  setUser(user: LoginResponse): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  // Obtener el usuario desde el local storage
  getUser(): LoginResponse | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  // Eliminar el usuario del local storage
  clearUser(): void {
    localStorage.removeItem('user');
  }

  // Verificar si el usuario está logueado
  isAuthenticated(): boolean {
    return !!this.getUser();
  }
}
