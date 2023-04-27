const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server");

chai.should();
chai.use(chaiHttp);
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoicGF0aWVudCIsIm51bWJlciI6Ijk0OTI4NjM2MzYiLCJpZCI6IjY0NGEzYTg4OGM2N2U5ZGY1OWQ0OGI1OSIsImlhdCI6MTY4MjYxMTQzN30.UXFDCBo0v-CES4FyTRFjrovXLJrrXYOOhyNPQRbYiNg";

describe("Patients API", () => {
  it("Should get all the doctors", (done) => {
    chai
      .request(server)
      .get("/patient/getdoctors?department=ENT")
      .set({ authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("array");
        done();
      });
  });

  it("Should return 403", (done) => {
    chai
      .request(server)
      .get("/patient/getdoctors?department=ENT")
      .set({ authorization: `Bearer` })
      .end((err, response) => {
        response.should.have.status(403);
        done();
      });
  });

  it("Should get patient info", (done) => {
    chai
      .request(server)
      .get("/patient/644a3a888c67e9df59d48b59/getinfo")
      .set({ authorization: `Bearer ${token}` })
      .end((err, response) => {
        response.should.have.status(200);
        response.body.should.be.a("object");
        done();
      });
  });
});

describe("Login Test", () => {
    const valid_body = {
      number: "9492863636",
      password: "123456"
    };

    const invalid_body = {
      number: "9492863636",
      password: "12345"
    };

    it("Should return 401",(done) => {
        chai
        .request(server)
        .post("/login")
        .send(invalid_body) 
        .end((err,response) => {
            response.should.have.status(401)
            done()
        }) 
    })

    it("Should return 200",(done) => {
        chai
        .request(server)
        .post("/login")
        .send(valid_body)
        .end((err,response) => {
            response.body.should.have.property('user').eq("patient")
            response.body.should.have.property("id").eq("644a3a888c67e9df59d48b59");
            done()
        })
    })
});
