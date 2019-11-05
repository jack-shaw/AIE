let chai= require("chai")
let chaiHttp = require("chai-http")
let expect = chai.expect
let mongoose = require("mongoose")

let db = mongoose.connection
let server = null
let datastore = null

chai.use(chaiHttp)
chai.use(require("chai-things"))
let bcrypt = require("bcrypt-nodejs")
let password = bcrypt.hashSync("Admin1..")
// let _ = require("lodash")
let jwt = require("jsonwebtoken")
let token = null
let admin = [
  {
    "admin_name": "Jane",
    "admin_id":"001",
    "email":"admin1@qq.com",
    "password":password
  }
]
describe("Admin", () => {
  before(function (done) {
    delete require.cache[require.resolve("../../bin/www")]
    datastore = require("../../models/admin")
    server = require("../../bin/www")
    token = jwt.sign({email: datastore.email}, "AdminJwtKey")
    try {
      db.collection("admindb").insertMany(admin)
      console.log("Admins inserted successfully.")

    } catch (e) {
      console.log(e)
    }
    done()
  })
  after(function (done) {
    try {
      db.collection("admindb").remove({"email": {$in: ["admin1@qq.com"]}})
      console.log("Admins deleted successfully.")
      done()
    } catch (e) {
      console.log(e)
    }
  })

  describe("POST /admin/login", () => {
    describe("Login function", function () {
      it("should return message about login successfully", function (done) {
        let admin = {
          "email": "jackshawhia@gmail.com",
          "password": "123456789o"
        }
        chai.request(server)
          .post("/admin/login")
          .send(admin)
          .end(function (err, res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Welcome to our website! ")
            done()
          })
      })

    })

    it("should return admin does't exist message", function (done) {
      let admin = {"email": "12@qq.com", "password": "Hia123..."}
      chai.request(server).post("/admin/login").send(admin).end(function (err, res) {
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property("message").equal("Please sign up first!")
        expect(res.body.data).to.equal(null)
        done()
      })
    })

    it("should return wrong password message", function (done) {
      let member = {"email": "admin1@qq.com", "password": "5111"}
      chai.request(server).post("/admin/login").send(member).end(function (err, res) {
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property("message").equal("Wrong password!")
        expect(res.body.data).to.equal(null)
        done()
      })
    })
  })

  describe("GET /admin", () => {
    it("should return all admins in an array", function (done) {
      chai.request(server)
        .get("/admin")
      // .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a("array")
          done()
        })
    })
  })
  describe("GET /admin/admin1@qq.com", () => {
    it("should return a admin ", function (done) {
      chai.request(server)
        .get("/admin/admin1@qq.com")
      // .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a("array")
          done()
        })
    })
  })
  describe("DELETE /:admin/member/:email", () => {
    it("should return unauthorized error", function (done) {
      chai.request(server)
        .delete("/member/10949@qq.com")
        .end((err, res) => {
          expect(res).to.have.status(404)
          done()
        })
    })
    it("should return member deleted successfully message", function (done) {
      chai.request(server)
        .delete("/jackshawhia@gmail.com/member/666@qq.com")
        .set("token", token)
        .end((err, res) => {
          expect(res.body).to.have.property("message").equal("Member deleted successfully")
          done()
        })
    })
  })
})

