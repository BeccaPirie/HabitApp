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

            case "UPDATE_USER":
            return {
                ...state,
                user: action.payload
            }

            case "UPDATE_PASSWORD":
            return {
                ...state,
                user: {
                    ...state.user,
                    password: action.payload
                }
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

            case "UPDATE_FIREBASE_TOKEN":
            return {
                ...state,
                user: {
                    ...state.user,
                    firebaseToken: [...state.user.firebaseToken, action.payload]
                }
            }

            case "DELETE_USER":
            return {
                ...state,
                user: null
            }
            
        default:
            return state
    }
}

export default UserReducer