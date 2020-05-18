export class Environment{
    apiKey: string;
    production: boolean;
    fbDbUrl: string
}

export class FbAuthResponse{
    idToken: string;
    expiresIn: string;
}