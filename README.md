# react-easy-facebook

An abstracted approach to handling Facebook OAuth using Hooks and Typescript!

**Requires react >= 16.8.0**

## Installation

Install the package using your package manager of choice.

```sh
$ npm install react-easy-facebook
$ yarn add react-easy-facebook
```

## Usage

### Basic demo

```tsx
const App = () => {

  /* Initializing the hook by giving it the facebook app id. */

  const { fbRes, login } = useFacebook({
    appId: "5135128098923510", // Fake id but hey, give it a try.
  });

  const handleLogin = () => {
    login();
  }

  /*
   fbRes is a react state so subscribe to its updates however you'd like to.
   Here, I'm printing it inside a useEffect.
  */

  React.useEffect(() => {
    if (fbRes) console.log(fbRes);
  }, [fbRes]);

  /* Trigger the login action by calling login() */

  return (<button onClick={handleLogin}>login</button>);
};
```

### Using with custom scopes

```tsx
  const { fbRes, login } = useFacebook({
    appId: "5135128098923510",
    options: {
      scope: ["email", "user_birthday"]
    },
  });
```

Or

```tsx
  const { fbRes, login } = useFacebook({
    appId: "5135128098923510",
    options: {
      scope: "email,user_birthday"
    },
  });
```

### Using with custom scopes and fields

```tsx
  const { fbRes, login } = useFacebook({
    appId: "5135128098923510",
    options: {
      scope: ["email", "user_birthday"]
    },
    fields: ["id", "name", "email"],
  });
```

Or

```tsx
  const { fbRes, login } = useFacebook({
    appId: "5135128098923510",
    options: {
      scope: "email,user_birthday"
    },
    fields: "id,name,email",
  });
```

Generally, you should use the array syntax to get intellisense hints. But you'll always need to use the string syntax when hitting an edge like picture.

#### Example

```tsx
  const { fbRes, login } = useFacebook({
    appId: "5135128098923510",
    options: {
      scope: "email"
    },
    fields: "id,name,email,picture{height,width,url,is_silhouette}",
  });
```

For more information about the different fields and edges, visit [the Facebook docs](https://developers.facebook.com/docs/graph-api/reference/user).

### Calling login() with different fields

You may override the fields specified in the hook initialization by passing the new fields to the login function.

```tsx
const App = () => {
  const { fbRes, login } = useFacebook({
    appId: "5135128098923510",
    fields: ["id", "email"],
  });

  const handleLogin = () => {
    login(["id","email", "name"]);
    // or
    // login("id,email,name")
  }

  React.useEffect(() => {
    if (fbRes) console.log(fbRes);
  }, [fbRes]);

  return (<button onClick={handleLogin}>login</button>);
};
```

## Development

Install the project dependencies and run yarn link.

```sh
$ yarn
$ yarn link
```

Navigate to the project you'd like to test the package in and run the following command to link the package to your local project.

```sh
$ cd path/to/your_local_project
$ yarn link react-easy-facebook
```

Now, simply start you local project.

**If you get the rules of hooks error, do the instructions specified [*in this issue*](https://github.com/facebook/react/issues/14257#issuecomment-595183610)**

## LICENSE

[MIT](https://github.com/osamaadam/react-easy-facebook/blob/master/LICENSE)