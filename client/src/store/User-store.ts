import { action, makeObservable, observable } from "mobx";
import { AuthResponse, CandidateForNewUsers, UserData } from "../types";
import AuthRequest from "../http/Auth-request";
import axios, { AxiosError, AxiosResponse } from "axios";
import { API_URL } from "../utils/consts";

class UserStore {
    userData = {} as UserData;
    isAuth = false;
    isLoading = false;

    constructor() {
        makeObservable(this, {
            userData: observable,
            isAuth: observable,
            isLoading: observable,
            setUserData: action,
            setIsAuth: action,
            setIsLoading: action,
        })
    }

    setUserData(data: UserData) {
        this.userData = data;
    }

    setIsAuth(flag: boolean) {
        this.isAuth = flag;
    }

    setIsLoading(flag: boolean) {
        this.isLoading = flag;
    }

    async registration(candidate: CandidateForNewUsers) {
        try {
            const response = await AuthRequest.registration(candidate);
            return response.data;
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message);
            }
        }
    }

    async login(login: string, password: string) {
        try {
            const response = await AuthRequest.login(login, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setUserData(response.data.user);
            this.setIsAuth(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                throw new Error(error.response?.data?.message);
            }
        }
    }

    async logout() {

        try {
            await AuthRequest.logout();
            localStorage.removeItem('accessToken');
            this.setUserData({} as UserData);
            this.setIsAuth(false);
            
        } catch (error) {
            if (error instanceof AxiosError) {
                // throw new Error(error.response?.data?.message);
                console.error(error.response?.data?.message);
            }
        }
    }

    async checkAuth() {
        this.setIsLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${API_URL}/token/refreshToken`, { withCredentials: true });
            localStorage.setItem('accessToken', response.data.accessToken);
            this.setUserData(response.data.user);
            this.setIsAuth(true);
        } catch (error) {
            if (error instanceof AxiosError) {
                // throw new Error(error.response?.data?.message);
                console.error(error.response?.data?.message);
                // localStorage.removeItem('accessToken');
            }
        }
        finally {
            this.setIsLoading(false);
        }
    }
}

export default UserStore;