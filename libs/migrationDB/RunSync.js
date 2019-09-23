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
    // // Sync users
    // SyncUser.Users(_limit, _skip, _maxSkip),

    // // Sync currencies
    // SyncCurrency.MCurrency(_limit, _skip, _maxSkip),
    // SyncCurrency.TCurrency(_limit, _skip, _maxSkip),

    // // // Sync bankers
    // SyncBanker.Book(_limit, _skip, _maxSkip),
    // SyncBanker.Banker(_limit, _skip, _maxSkip),

    // Sync accounts
    SyncAccount.Account(_limit, _skip, _maxSkip),
    SyncAccount.AccountFormula(_limit, _skip, _maxSkip),

    // Sync formula
    SyncFormula.FormulaField(_limit, _skip, _maxSkip),
    SyncFormula.FormulaFormat(_limit, _skip, _maxSkip),
    SyncFormula.Formula(_limit, _skip, _maxSkip),
    SyncFormula.FormulaGroup(_limit, _skip, _maxSkip),

    // // Sync Language
    // SyncLanguage.Language(_limit, _skip, _maxSkip),
    // SyncLanguage.Notice(_limit, _skip, _maxSkip),

    // Sync Report
    SyncReport.Report(_limit, _skip, _maxSkip)

]).then(_ => {
    console.log("===================== Migration Data Done ================================")
})