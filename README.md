# Recovery Club America Technical Challenge
## Simple Login App

This is a simple application with a login page, a registration (new user) page, and a home page that requires authenticted user credentials to access. Try it out at [https://jovial-khapse-ccfdce.netlify.app/](https://jovial-khapse-ccfdce.netlify.app/) with the following test user credentials:

```
username: gandalf
password: YouShallNotPass!
```

or scroll down for local hosting instructions

#### The Login page 

- takes a username and password
- authenticates the data
- navigates the user to the home page upon successful authentication

#### The New User page 
- Is linked from the login page and allows the creation of a new user
- Accepts a username, password, and password confirmation
- Checks that the password is longer than 8 characters
- Checks that the password contains at least one uppercase letter
- Checks that the password contains at least one special character
- Checks that both passwords match
- Logs the new user into the application and navigates to the home page upon successful creation

## Getting Started

You can try out the live application at [https://jovial-khapse-ccfdce.netlify.app/](https://jovial-khapse-ccfdce.netlify.app/). If you prefer testing locally, you will need node.js and npm installed. Pull down the repository

```
git clone git@github.com:ryanmphill/RCA-SoftwareEnginnerInterview.git
```

and switch to the branch `rp-dev`

```
git checkout rp-dev
```

Then install dependencies

```
npm install
```

and start up the development server

```
npm run dev
```

## Technologies Used
#### Frontend
- JavaScript and React
- React-Router for client side routing
#### Backend
- [PocketBase](https://pocketbase.io/) for a quick and simple RESTish API and built in authentication

#### Dependencies
- react-router-dom
- react-loading-icons
- PocketBase JavaScript SDK

## Conclusion

Thanks for viewing, and feel free to reach out with any questions or feedback!