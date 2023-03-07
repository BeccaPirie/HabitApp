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

export const UpdateTokens = (tokens) => ({
    type: "UPDATE_TOKENS",
    payload: tokens,
})

export const UpdateFirebaseToken = (token) => ({
    type: "UPDATE_FIREBASE_TOKEN",
    payload: token
})

// update account
// delete account