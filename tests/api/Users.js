process.env.NODE_ENV = "test"

import chai from "chai"
import chaiHttp from "chai-http"

import app from "../../src/app"

const should = chai.should()

chai.use(chaiHttp)


/*
|--------------------------------------------------------------------------
| Test /Get routes
|--------------------------------------------------------------------------
*/
describe("/GET /api/v1/users", () => {
    it("it should GET all the users", (done) => {
        chai.request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.data.should.not.be.empty
                done()
            })
    })
})

/*
|--------------------------------------------------------------------------
| Test /Post routes
|--------------------------------------------------------------------------
*/
describe("/POST /api/v1/users", () => {
    it("it should GET all the users", (done) => {
        chai.request(app)
            .get("/api/v1/users")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.data.should.not.be.empty
                done()
            })
    })
})