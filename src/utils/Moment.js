import moment from "moment-timezone"

import AppConfig from "../configs/AppConfig"

const Moment = moment().locale(AppConfig.LOCALE).tz(AppConfig.TIME_ZONE)

export default Moment