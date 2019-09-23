process.env.NODE_ENV = "test"

import chai from "chai"

import Exception from "../../src/utils/Exception"

/*
|--------------------------------------------------------------------------
| Test /Get routes
|--------------------------------------------------------------------------
*/
describe("Feature Exception", () => {
    it("Exception should be work", (done) => {
        console.log(Exception.getMessage(Exception.AUTH.UNAUTHORIZED))
        done()
    })
})

