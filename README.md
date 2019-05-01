
# SHAKO - SIMPLE FACEBOOK OFFICAL API HELPER
## Install
  Install from npmjs
   ```bash   
      npm install --save shako
   ```
  Install latest beta versions
   ```bash   
      npm install --save Notekunn/shako
   ```
## Super simple to use
Example:

```js
const shako = require('shako');
(async () => {
    const api = await shako({ access_token : "YOUR_TOKEN" });
    const result = await api.user.getID('zuck')
    console.log(result);
})().catch((e) => console.log('ERROR: ' + e));
```


## Table of contents

- [Login](#login)
- [Group Api](#group-api)
- [User Api](#user-api)
- [Custom Api](#custom-api)

Request also offers [convenience methods](#convenience-methods) like
`request.defaults` and `request.post`, and there are
lots of [usage examples](#examples) and several
[debugging techniques](#debugging).


---


## Login

You can login by token

```js
const shako = require('shako');
(async () => {
    const api = await shako({ access_token: "YOUR_TOKEN" });
    const result = await api.user.getID('zuck')
    console.log(result);
})().catch((e) => console.log('ERROR: ' + e));
```

Or appState

```js
const shako = require('shako');
const appState = require('../config/appstate.json');
(async () => {
    const api = await shako({ appState });
    const result = await api.user.getID('zuck')
    console.log(result);
})().catch((e) => console.log('ERROR: ' + e));
```




[back to top](#table-of-contents)


---


## Group Api
Api to contact with group (return a Promise).
Example:
```js
const shako = require('shako');
const appState = require('../config/appstate.json');
(async () => {
    const api = await shako({ appState });
    const result = await api.group.joinGroup('10000');
})().catch((e) => console.log('ERROR: ' + e));

```
- [Add(Remove) Member](#addremove-member).
- [Join Group](#join-group).
- [Reply Question](#reply-question).
- [Open(Close) Comment](#openclose-comment).
- [Block(Unblock) Member](#blockunblock-member).


#### Add(Remove) Member
Api to add or remove member from group.
```js
  //Add member
  api.group.addMember(ID_GROUP, ID_MEMBER);
  //remove member
  api.group.removeMember(ID_GROUP, ID_MEMBER);

```
#### Join Groups
Api to join a group.
```js

  api.group.joinGroup(ID_GROUP);

```
#### Reply Question
Api to reply question of group.
```js

  api.group.replyQuestion(ID_GROUP, function(question){
     //Do something with variable `question`
     return somthing || question;
  });

```
#### Open(Close) Comment
Api to open and close comment of a post.
```js

  //open comment
  api.group.openComment(ID_POST);
  //close comment
  api.group.closeComment(ID_POST);

```
#### Block(Unblock) Member
Api to block or unblock member from group.
```js
  //Add block
  api.group.blockMember(ID_GROUP, ID_MEMBER);
  //remove unblock
  api.group.unblockMember(ID_GROUP, ID_MEMBER);

```
[back to top](#table-of-contents)
---


## USER API
Api to work with user.
Example:
```js
const shako = require('shako');
const appState = require('../config/appstate.json');
(async () => {
    const api = await shako({ appState });
    const result = await api.user.getID('zuck');
})().catch((e) => console.log('ERROR: ' + e));

```
- [Get ID](#get-id).
- [Get Token](#get-token).
- [Post Bio](#post-bio).

#### Get ID
Api to get ID from username.
```js

  api.user.getID(USER_NAME);

```
#### Get Token
Api to get Token.
```js

  api.user.getToken();

```
#### Get ID
Api to post a bio.
```js

  api.user.postBio(CONTENT, PUBLIC/*(true, false)*/);

```
[back to top](#table-of-contents)

---
## PAGE API
Api to work with page.
Example:
```js
const shako = require('shako');
const appState = require('../config/appstate.json');
(async () => {
    const api = await shako({ appState });
    const result = await api.page.createPage({name: 'zuck'});
})().catch((e) => console.log('ERROR: ' + e));

```
- [Create Page](#create-page).

#### Create Page
Api to create A new Page.
```js

  api.page.createPage({ name: 'PAGE_NAME', super_category, category});

```
List id category in [here](https://jsoneditoronline.org/?id=4177d3ba24d840e48963cc39eebdcfde)

[back to top](#table-of-contents)

---
## CUSTOM API
You can custom your api

#### GET

   ```js
    api.get(URL, QUERY_OBJECT);
   ```
#### POST

   ```js
    api.post(URL, FORM_POST, QUERY_OBJECT);
   ```   
#### POST FORMDATA

   ```js
    api.postFormData(URL, FORM_POST, QUERY_OBJECT);
   ```      