export const LoginStart = (credentials) => ({
    type: "LOGIN_START",
})

export const LoginSuccess = (user) => ({
    type: "LOGIN_SUCCESS",
    payload: user,
})

export const LoginFail = (err) => ({
    type: "LOGIN_FAIL",
    payload: err,
})

export const updateTokens = (user) => ({
    type: "UPDATE_TOKENS",
    payload: user,
})

// update account
// delete account