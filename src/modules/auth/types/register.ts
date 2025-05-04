
export interface IRegisterStepOne{
    email: string
    phoneNumber: string
    password: string
    confirmPassword: string
}

export interface IRegisterStepTwo{
    name: string
    surname: string
    date: string
    username: string
}

export type RegisterFull = IRegisterStepOne & IRegisterStepTwo
