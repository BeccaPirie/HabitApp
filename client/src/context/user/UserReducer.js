const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                error: false
            }

            case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                error: false
            }

            case "LOGIN_FAIL":
            return {
                user: null,
                isFetching: false,
                error: action.payload
            }

            case "UPDATE_TOKENS":
            return {
                ...state,
                user: {
                    ...state.user,
                    token: action.payload.accessToken,
                    refreshToken: action.payload.refreshToken
                }
            }
        default:
            return state
    }
}

export default UserReducer