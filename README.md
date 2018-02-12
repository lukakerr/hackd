# hackd

A Hacker News React Native powered iOS application. Built to learn React Native and Redux.

Currently a work in progress.

### Features

- [x] Browse anonymously or login
- [x] 6 feeds to choose from:
	- Top
	- New
	- Best
	- Ask
	- Show
	- Jobs
- The user can:
	- [ ] Share posts
	- [ ] Search, filter and view posts (stories, show, ask), comments, polls and users
	- [x] Read articles in app with Safari View Controller
	- [x] Collapse comments
- If logged in, the user can also:
	- [x] Upvote posts
	- [ ] Upvote comments
	- [ ] Comment
	- [ ] Submit a post
	- [x] Save a post
	- [ ] Add a post to offline reading section
	- [ ] View their recently viewed articles
	- [x] View their own profile
- [x] Users can login/logout of multiple accounts without losing their saved/upvoted/offline/viewed posts

### Run Locally

```bash
# Clone hackd
$ git clone https://github.com/lukakerr/hackd.git

# Change directories
$ cd hackd

# Install dependencies
$ npm install

# Link native libraries
$ react-native link

# Run the app
$ react-native run-ios
```

### Design

Inspired by [Apollo App](https://apolloapp.io), I tried to design hackd around an iOS centric theme.

The comments design in hackd is based off a stripped down version of Apollo's comments.

Hackd also supports font scaling for readers who want smaller or larger text.

### Screenshots

<div align="center">
  <img src="https://i.imgur.com/E51wWRN.png" width="400" alt="hackd1">
  <img src="https://i.imgur.com/QFXfpCC.png" width="400" alt="hackd2">
</div>