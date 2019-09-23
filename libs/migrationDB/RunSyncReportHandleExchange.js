import SyncReport from "./SyncReport"

Promise.all([
    // Sync Report
    SyncReport.ReportHandleExchange()

]).then(_ => {
    console.log("===================== Migration Data Done ================================")
})