let chai= require("chai")
let chaiHttp = require("chai-http")
let expect = chai.expect
let mongoose = require("mongoose")

let db = mongoose.connection
let server = null
let datastore

chai.use(chaiHttp)
chai.use(require("chai-things"))
// let _ = require("lodash")
// let jwt = require("jsonwebtoken")

let artwork = [
  {
    "art_name": "Sunshine",
    "author":"Cathy",
    "description":"nothing",
    "view_times":"1"
  }

]
describe("artwork", () => {
  before(function (done) {
    delete require.cache[require.resolve("../../bin/www")]
    datastore = require("../../models/artwork")
    server = require("../../bin/www")
    try {
      db.collection("artworkdb").insertMany(artwork)
      console.log(" Artworks inserted successfully.")

    } catch (e) {
      console.log(e)
    }
    done()
  })
  after(function (done) {
    try {
      db.collection("artworkdb").remove({"art_name": {$in: ["Sunshine"]}})
      console.log("Artworks deleted successfully.")
      done()
    } catch (e) {
      console.log(e)
    }
  })

  describe("GET /artwork", () => {

    it("should return all artworks in an array", function (done) {
      chai.request(server)
        .get("/artwork")
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a("array")
          done()
        })
    })
  })
  describe("GET /artwork/5db304557c213e556143e1f4", () => {
    it("should return an artwork ", function (done) {
      chai.request(server)
        .get("/artwork/5db304557c213e556143e1f4")
      // .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a("array")
          done()
        })
    })
  })

  describe("DELETE /artwork/:art_name", () => {
    it("should return artwork deleted successfully message", function (done) {
      chai.request(server)
        .delete("/artwork/Sunshine")
        .end((err, res) => {
          expect(res.body).to.have.property("message").equal("Artwork deleted successfully")
          done()
        })
      after(function (done) {
        chai.request(server)
          .get("/artwork")
          .end(function (err, res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a("array")
            expect(res.body.length).to.equal(1)
            done()
          })
      })
    })
  })
})
