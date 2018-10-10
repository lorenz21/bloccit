const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;

describe("Topic", () => {
   beforeEach((done) => {
      this.topic;
      this.post;
      sequelize.sync({force: true}).then((res) => {
         Topic.create({
            title: "Front-end Frameworks",
            description: "It's all about the front-end"
         })
         .then((topic) => {
            this.topic = topic;
            Post.create({
               title: "Gatsby JS",
               body: "Build blazing fast websites",
               topicId: this.topic.id
            })
            .then((post) => {
               this.post = post;
               done();
            })
            .catch((err) => {
               console.log(err);
               done();
            });
         })
      });
   });

   describe("#create()", () => {
      it("should create a topic with a title and description", (done) => {
         Topic.create({
            title: "Backend Frameworks",
            description: "Node is blazing fast"
         })
         .then((topic) => {
            expect(topic.title).toBe("Backend Frameworks");
            expect(topic.description).toBe("Node is blazing fast");
            done();
         })
         .catch((err) => {
            console.log(err);
            done();
         });
      });
      it("should not create a topic with missing title or description assigned to topic", (done) => {
         Topic.create({
            title: "Middleware scare",
         })
         .then((topic) => {
            done();
         })
         .catch((err) => {
            expect(err.message).toContain("Topic.description cannot be null");
            done();
         });
      });
   });

   describe("#getPosts()", () => {
      it("should add a post to a topic, then return the associated posts", (done) => {
         Post.create({
           title: "Meteor JS",
           body: "Build web, mobile, and desktop apps",
           topicId: this.topic.id
         })
         .then((post) => {
           this.topic.getPosts()
           .then((posts) => {
             expect(this.topic.id).toBe(post.topicId);
             expect(this.topic.id).toBe(posts[1].topicId);
             done();
           });
         }) 
       });
   });

});