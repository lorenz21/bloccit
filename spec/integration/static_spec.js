const request = require('request');
const server = require('../../src/server');
const base = "http://localhost:3000/";

describe("routes: static", () => {
	 
	describe("GET /", () => {
		it("should return status code 200 and have 'Welcome to Bloccit' in the body of the response", (done) => {
			request.get(base, (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toContain("Welcome to Bloccit");
				done();
			});
		});
	});
	 
	describe("GET /marco", () => {
		it("should return status code 200 from /marco and have 'polo' in the body", (done) => {
			request.get(base + 'marco', (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toContain("polo");
				done();
			});
		});
	});

	describe("GET /about", () => {
		it("should return status code 200 from /about and have 'About Us' in the body", (done) => {
			request.get(base + 'about', (err, res, body) => {
				expect(res.statusCode).toBe(200);
				expect(res.body).toContain("About Us");
				done();
			});
		});
	});

});