import moment from "moment-timezone"

import AppConfig from "../config/AppConfig"

const Moment = moment().locale(AppConfig.LOCALE).tz(AppConfig.TIME_ZONE)

export default Moment