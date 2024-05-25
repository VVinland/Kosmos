interface UserData {
    id: number,
    firstname: string,
    lastname: string,
    middlename: string,
    login: string,
    supervisor: string
}

interface AuthResponse {
    accessToken: string,
    user: UserData
}

interface CandidateForNewUsers {
    firstname: string,
    lastname: string,
    middlename: string,
    login: string,
    password: string,
    supervisor: string
}

interface Task {
    id?: number,
    title: string,
    description: string,
    dateEnd: string
    dateCreate: string,
    updateDate: string,
    priority: string,
    creator: string,
    responsible: string,
    status: string
}

interface RouteStructure {
    path: string,
    component: () => React.JSX.Element
}

export {
    UserData,
    AuthResponse,
    CandidateForNewUsers,
    Task,
    RouteStructure
}