import "../utils/LoadEnv"

const SessionConfig = {
	SESSION_SECRET_KEY		: process.env.SESSION_SECRET_KEY,
	SESSION_MAX_AGE			: JSON.parse(process.env.SESSION_MAX_AGE),
}

export default SessionConfig
