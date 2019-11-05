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
let password = bcrypt.hashSync("Hia123...")
// let _ = require("lodash")
let jwt = require("jsonwebtoken")
let token = null
let member = [
  {
    "member_name": "Jack",
    "email":"666@qq.com",
    "password":password,
    "confirmpwd":password
  },
  {
    "member_name": "Yvette",
    "email":"777@qq.com",
    "password":password,
    "confirmpwd":password
  }
]
describe("Member", () => {
  before(function (done) {
    delete require.cache[require.resolve("../../bin/www")]
    datastore = require("../../models/member")
    server = require("../../bin/www")
    token = jwt.sign({email: datastore.email}, "memberJwtKey")
    try {
      db.collection("memberdb").insertMany(member)
      console.log("Members inserted successfully.")

    } catch (e) {
      console.log(e)
    }
    done()
  })
  after(function (done) {
    try {
      db.collection("memberdb").remove({"email": {$in: ["666@qq.com", "777@qq.com","123@qq.com"]}})
      console.log("Members deleted successfully.")
      done()
    } catch (e) {
      console.log(e)
    }
  })
  describe("POST /member/signup", () => {
    describe("Sign Up function",function () {
      it("should return message about sign up successfully", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "123@qq.com",
          "password": "Hia123...",
          "confirmpwd": "Hia123..."
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res).to.have.status(200)
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Sign Up Successfully!")
            done()
          })
      })

      it("should return message about account already exists", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "666@qq.com",
          "password": "Hia123...",
          "confirmpwd": "Hia123..."
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Account already exists! Please change another email.")
            done()
          })
      })

      it("should return message about wrong email format", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "666qq.com",
          "password": "Hia123...",
          "confirmpwd": "Hia123..."
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Wrong email format!")
            done()
          })
      })

      it("should return message about password length too short", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "666@qq.com",
          "password": "Hia123.",
          "confirmpwd": "Hia123."
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Password should be more than 8 characters!")
            done()
          })
      })

      it("should return message about password length too long", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "666@qq.com",
          "password": "Hia123456789....",
          "confirmpwd": "Hia123456789...."
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Password should be less than 15 characters!")
            done()
          })
      })

      it("should return message about password complexity", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "666@qq.com",
          "password": "Hia12345",
          "confirmpwd": "Hia12345"
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Password must have number,special character, lowercase and capital Letters!")
            done()
          })
      })

      it("should return message about the password and confirm password should be same", function (done) {
        let member = {
          "member_name": "Jack",
          "email": "666@qq.com",
          "password": "Hia12345..",
          "confirmpwd": "Hia12345..."
        }
        chai.request(server)
          .post("/member/signup")
          .send(member)
          .end(function (err,res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Please input the same password!")
            done()
          })
      })

    })
  })

  describe("POST /member/login", () => {
    describe("Login function", function () {
      it("should return message about login successfully", function (done) {
        let member = {
          "email": "666@qq.com",
          "password": "Hia123..."
        }
        chai.request(server)
          .post("/member/login")
          .send(member)
          .end(function (err, res) {
            expect(res.body).to.be.a("object")
            expect(res.body).to.have.property("message").equal("Welcome to our website! Jack")
            expect(res.body.data).to.have.property("member_name", "Jack")
            // this.timeout(10000);
            done()
          })
      })

    })

    it("should return member does't exist message", function (done) {
      let member = {"email": "12@qq.com", "password": "Hia123..."}
      chai.request(server).post("/member/login").send(member).end(function (err, res) {
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property("message").equal("Please sign up first!")
        expect(res.body.data).to.equal(null)
        done()
      })
    })

    it("should return wrong password message", function (done) {
      let member = {"email": "666@qq.com", "password": "5111"}
      chai.request(server).post("/member/login").send(member).end(function (err, res) {
        expect(res.body).to.be.a("object")
        expect(res.body).to.have.property("message").equal("Wrong password!")
        expect(res.body.data).to.equal(null)
        done()
      })
    })
  })


  describe("PUT /member/changePassword/:member", () => {
    it("should return password changed successfully message", function (done) {
      let member = {
        "password": "Hin123...",
        "confirmpwd": "Hin123..."
      }
      chai.request(server)
        .put("/member/changePassword/777@qq.com")
        .set("token", token)
        .send(member)
        .end((err, res) => {
          expect(res.body).to.have.property("message").equal("Password changed successfully!")
          done()
        })
    })

    it("should return error message about length of password ", function (done) {
      let member = {
        "password": "123",
        "confirmpwd": "123"
      }
      chai.request(server)
        .put("/member/changePassword/777@qq.com")
        .set("token", token)
        .send(member)
        .end((err, res) => {
          expect(res.body).to.have.property("message").equal("Password should be more than 8 characters!")
          done()
        })
    })
    it("should return error message about complexity of password ", function (done) {
      let member = {
        "password": "12345678",
        "confirmpwd": "12345678"
      }
      chai.request(server)
        .put("/member/changePassword/777@qq.com")
        .set("token", token)
        .send(member)
        .end((err, res) => {
          expect(res.body).to.have.property("message").equal("Password must has number,special character, lowercase and capital Letters!")
          done()
        })
    })
    it("should return error message about the same of password and confirm password", function (done) {
      let member = {
        "password": "Zz123...",
        "confirmpwd": "Zz123.."
      }
      chai.request(server)
        .put("/member/changePassword/777@qq.com")
        .set("token", token)
        .send(member)
        .end((err, res) => {
          expect(res.body).to.have.property("message").equal("Please input the same password!")
          done()
        })
    })
  })
  describe("GET /member", () => {
    // it('should return an error of unauthorized', function (done) {
    //     chai.request(server)
    //         .get('/member')
    //         .end(function (err, res) {
    //             expect(res).to.have.status(404);
    //             // expect(res.body).to.have.property('message').equal('You can not do this operation!');
    //             done();
    //         });
    // });
    it("should return all members in an array", function (done) {
      chai.request(server)
        .get("/member")
      // .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a("array")
          done()
        })
    })
  })
  describe("GET /member/666@qq.com", () => {
    it("should return a member ", function (done) {
      chai.request(server)
        .get("/member/666@qq.com")
      // .set('token', token)
        .end(function (err, res) {
          expect(res).to.have.status(200)
          expect(res.body).to.be.a("array")
          done()
        })
    })
  })

})
// })
// });

