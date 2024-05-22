import { UserData } from './../types.js';



class UserDto implements UserData {
    id: number;
    firstname: string;
    lastname: string;
    middlename: string;
    login: string;
    supervisor: string;

    constructor(model: UserData) {
        this.id = model.id;
        this.firstname = model.firstname;
        this.lastname = model.lastname;
        this.middlename = model.middlename;
        this.login = model.login;
        this.supervisor = model.supervisor;
    }
}

export default UserDto;