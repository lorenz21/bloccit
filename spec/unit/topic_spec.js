const sequelize = require("../../src/db/models/index").sequelize;
const Post = require("../../src/db/models").Post;
const Topic = require("../../src/db/models").Topic;
const User = require("../../src/db/models").User;

describe("Topic", () => {
   beforeEach((done) => {
    this.topic;
    this.post;
    this.user;

    sequelize.sync({force: true}).then((res) => {

// #2
      User.create({
        email: "starman@tesla.com",
        password: "Trekkie4lyfe"
      })
      .then((user) => {
        this.user = user; //store the user

// #3
        Topic.create({
          title: "Expeditions to Alpha Centauri",
          description: "A compilation of reports from recent visits to the star system.",

// #4
          posts: [{
            title: "My first visit to Proxima Centauri b",
            body: "I saw some rocks.",
            userId: this.user.id
          }]
        }, {

// #5
          include: {
            model: Post,
            as: "posts"
          }
        })
        .then((topic) => {
          this.topic = topic; //store the topic
          this.post = topic.posts[0]; //store the post
          done();
        })
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
           topicId: this.topic.id,
           userId: this.user.id
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