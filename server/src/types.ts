interface CandidateForNewUsers {
    firstname: string,
    lastname: string,
    middlename: string,
    login: string,
    password: string,
    supervisor: string
};

interface UserData extends Omit<CandidateForNewUsers, 'password'> {
    id: number
}

interface AuthUserData {
    accessToken: string,
    refreshToken: string,
    user: UserData
}
interface Task {
    title: string,
    description: string,
    dateEnd: Date,
    dateCreate: Date,
    updateDate: Date,
    priority: string,
    creator: string,
    responsible: string
}

interface TaskUpdate extends Task {
    id: number
}

export {
    CandidateForNewUsers,
    AuthUserData,
    UserData,
    Task,
    TaskUpdate
}