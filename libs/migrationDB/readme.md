### Install dependency
yarn add esm moment-timezone mongoose

### Truncate Data
node -r esm Truncate.js

### Start Sync Data
### node -r esm RunSyncReportHandleExchange.js --limit --skip --maxSkip
node -r esm RunSyncReportHandleExchange.js

### node -r esm RunSync.js --limit --skip --maxSkip
node -r esm RunSync.js 100 0 100
node -r esm RunSync.js 100 100 200
node -r esm RunSync.js 100 200 300
node -r esm RunSync.js 100 300 400
node -r esm RunSync.js 100 400 500
node -r esm RunSync.js 100 500 600
node -r esm RunSync.js 100 600

### node -r esm RunSyncFormula.js --limit --skip --maxSkip
node -r esm RunSyncFormula.js 100 0 500
node -r esm RunSyncFormula.js 100 500 1000
node -r esm RunSyncFormula.js 100 1500 2000
node -r esm RunSyncFormula.js 100 2000 2500
node -r esm RunSyncFormula.js 100 2500 3000
node -r esm RunSyncFormula.js 100 3000 3500
node -r esm RunSyncFormula.js 100 3500


### node -r esm RunSyncReport.js --limit --skip --maxSkip
node -r esm RunSyncReport.js 1000 0 1000
node -r esm RunSyncReport.js 1000 1000 2000
node -r esm RunSyncReport.js 1000 2000 3000
node -r esm RunSyncReport.js 1000 3000 4000
node -r esm RunSyncReport.js 1000 4000 5000
node -r esm RunSyncReport.js 1000 5000 6000
node -r esm RunSyncReport.js 1000 6000

