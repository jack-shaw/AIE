const chai = require("chai");
const expect = chai.expect;
const request = require("supertest");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;
const Artwork = require("../../../models/artwork");
const mongoose = require("mongoose");

const _ = require("lodash");
let server;
let mongod;
let db, validID;