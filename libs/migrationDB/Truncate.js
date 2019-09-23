import SyncAccount from "./SyncAccount"
import SyncBanker from "./SyncBanker"
import SyncFormula from "./SyncFormula"
import SyncUser from "./SyncUser"
import SyncCurrency from "./SyncCurrency"
import SyncLanguage from "./SyncLanguage"

Promise.all([
    // Sync users
    SyncUser.Truncate(),

    // Sync currencies
    SyncCurrency.Truncate(),

    // Sync bankers
    SyncBanker.Truncate(),

    // Sync accounts
    SyncAccount.Truncate(),

    // Sync formula
    SyncFormula.Truncate(),

    // Sync language
    SyncLanguage.Truncate(),
]).then(_ => {
    console.log("===================== Truncate Data Done ================================")
})
