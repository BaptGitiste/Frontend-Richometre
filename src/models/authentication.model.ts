export type AuthRequestDto = {
    email: string,
    password: string
}

export type AuthResponseDto = {
    email: string,
    token: string,
    expiresIn: number
}

export type AuthLocalStorage = {
    token?: string,
    expiresAt?: string
}