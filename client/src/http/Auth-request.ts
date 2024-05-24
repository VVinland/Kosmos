import { AxiosResponse } from 'axios';
import { AuthResponse, CandidateForNewUsers } from '../types';
import api from './index';

class AuthRequest {

    static async registration(candidate: CandidateForNewUsers): Promise<AxiosResponse<boolean>> {        
        return api.post<boolean>('/user/registration', candidate );
    }

    static async login(login: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/user/login', { login, password });
    }

    static async logout(): Promise<void> {
        return api.get('/user/logout');
    }
}

export default AuthRequest;