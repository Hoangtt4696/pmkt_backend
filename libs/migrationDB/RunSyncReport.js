import SyncAccount from "./SyncAccount"
import SyncBanker from "./SyncBanker"
import SyncFormula from "./SyncFormula"
import SyncUser from "./SyncUser"
import SyncCurrency from "./SyncCurrency"
import SyncLanguage from "./SyncLanguage"
import SyncReport from "./SyncReport"

const _limit = Number(process.argv[2]) || 100
const _skip = Number(process.argv[3]) || 0
const _maxSkip = Number(process.argv[4])

Promise.all([

    // Sync Report
    SyncReport.ReportHandle(_limit, _skip, _maxSkip),
    SyncReport.ReportDetail(_limit, _skip, _maxSkip),

]).then(_ => {
    console.log("===================== Migration Data Done ================================")
})