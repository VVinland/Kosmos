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
    id?: number,
    title: string,
    description: string,
    dateEnd: string,
    dateCreate: string,
    updateDate: string,
    priority: string,
    creator: string,
    responsible: string,
    status: string
}

export {
    CandidateForNewUsers,
    AuthUserData,
    UserData,
    Task,
}