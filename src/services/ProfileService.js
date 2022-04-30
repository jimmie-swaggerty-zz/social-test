import faker from "@faker-js/faker"

const ProfileService = {
    createPost(user, date) {
        let newPost = {}
        if (date) {
            newPost.createdOn = faker.date.recent(10, date)
        }
        else {
            newPost.createdOn = faker.date.recent(10)
        }
        newPost.postId = faker.database.mongodbObjectId()
        if (user) {
            newPost.userName = user.userName
            newPost.profileImg = user.profileImg
        }
        else {
            newPost.userName = faker.internet.userName(newPost.firstName, newPost.lastName)
            newPost.profileImg = faker.image.people(800, 800, true)
        }
        newPost.img = faker.image.nightlife(800, 800, true)
        newPost.descriptor = faker.lorem.sentences(2)
        newPost.reacts = {
            heart: [faker.datatype.number({ min: 0, max: 150 }),false],
            like: [faker.datatype.number({ min: 0, max: 150 }),false],
            pride: [faker.datatype.number({ min: 0, max: 150 }),false],
            sad: [faker.datatype.number({ min: 0, max: 150 }),false],
        }
        return newPost
    },
    createUser(userName) {
        let newUser = {}
        newUser.userId = faker.database.mongodbObjectId()
        newUser.firstName = faker.name.firstName()
        newUser.lastName = faker.name.lastName()
        newUser.userName = userName? userName : faker.internet.userName(newUser.firstName, newUser.lastName)
        newUser.profileImg = faker.image.people(800, 800, true)
        newUser.bio = faker.lorem.paragraph()
        return newUser
    },
    createUserList() {
        let userList = []
        for (let i = 0; i < 100; i++) {
            userList.push(this.createUser())
        }
        return userList.sort((a, b) => a.userName - b.userName)
    },
    createPosts(user, number, date) {
        let posts = []
        if (date) {
            for (let i = 0; i < number; i++) {
                posts.push(this.createPost(user, date))

            }
        }
        else {
            for (let i = 0; i < number; i++) {
                posts.push(this.createPost(user))

            }
        }
        return posts.sort((a, b) => a.createdOn - b.createdOn)
    },
    createFeed() {
        let feed = []
        let userList = this.createUserList(true)
        userList.forEach(user => {
            feed = [...feed, ...this.createPosts(user, 20)]
        })
        feed.sort((a, b) => a.createdOn - b.createdOn)
        return { feed: feed, userList: userList }
    }
}

export default ProfileService