# hackd

A Hacker News React Native powered iOS application. Built to learn React Native and Redux.

Currently a work in progress.

### Features

##### Main
- [x] Browse anonymously or login
- [x] 6 feeds to choose from:
	- Top
	- New
	- Best
	- Ask
	- Show
	- Jobs
- The user can:
	- [x] Share posts
	- [ ] Search, filter and view posts (stories, show, ask), comments, polls and users
	- [x] Read articles in app with Safari View Controller
	- [x] Collapse/expand comments
- If logged in, the user can also:
	- [x] Upvote posts
	- [x] Upvote comments
	- [x] Unvote comments
	- [ ] Comment
	- [ ] Submit a post
	- [x] Save a post
	- [ ] Add a post to offline reading section
	- [ ] View their recently viewed articles
	- [x] View their own profile
- [x] Users can login/logout of multiple accounts without losing their saved/upvoted/offline/viewed posts

##### Other
- [x] Haptic feedback for common actions
- [x] 3D touch preview (peek and pop)<sup>1</sup>

### Run Locally

```bash
# Clone hackd
$ git clone https://github.com/lukakerr/hackd.git

# Change directories
$ cd hackd

# Install dependencies
$ npm install

# Link native libraries
$ npm run link

# Run the app
$ npm run start
# Or for iPhone X
$ npm run start:x
```

### Test

Jest is used for testing. To test, run:

```bash
$ npm run test
```

### Design

Inspired by [Apollo App](https://apolloapp.io), I tried to design hackd around an iOS centric theme.

The comments design in hackd is based off a stripped down version of Apollo's comments.

Hackd also supports font scaling for readers who want smaller or larger text.

I've tried to add and support as many native API's as possible such as haptic feedback and 3D touch. Although many new API's aren't available in the React Native environment yet. 

### Screenshots

<p align="center">
  <img src="https://i.imgur.com/h7b8sfc.png" width="200" alt="hackd1">
  <img src="https://i.imgur.com/FE1Q6iR.png" width="200" alt="hackd2">
  <img src="https://i.imgur.com/Tv2CsZi.png" width="200" alt="hackd3">
</p>

<p align="center">
  <img src="https://i.imgur.com/D1WmGOG.png" width="200" alt="hackd4">
  <img src="https://i.imgur.com/MciVZK1.png" width="200" alt="hackd5">
  <img src="https://i.imgur.com/PbuheBP.png" width="200" alt="hackd6">
</p>

<br><br>

<sup>1</sup> 3D touch is only available on supported devices. Currently only Wix's [react-native-navigation](https://github.com/wix/react-native-navigation) supports it, although there is a [relatively major bug](https://github.com/wix/react-native-navigation/issues/2445) that hasn't been fixed yet. This bug is present in Hackd.