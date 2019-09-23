import "../utils/LoadEnv"

const AppConfig = {
	API_SERVER_PORT						: process.env.API_SERVER_PORT || 8080,
	LOCALE								: process.env.LOCALE || "vi_VN",
	TIME_ZONE							: process.env.TIME_ZONE || "Asia/Ho_Chi_Minh",
}

export default AppConfig
