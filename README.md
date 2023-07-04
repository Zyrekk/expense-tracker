# web-dev-parleto-app

## Live demo

https://parleto-recruitment.netlify.app/

## Login Page test user credentials
```
login: test
password: test
```
## Pages not required auth

### /login 
```
User can log in to the account after entering the login and password
```
### /register
```
User can register after entering the e-mail address, login and password
```
## Pages required auth
### /profile
```
After the first login, the user will be redirected to the profile page in order to complete the name and surname. You can modify them at a later stage. Requires authorization after logging in
```
### /dashboard
```
User can add new expense categories here and view them, and if he has expenses, he can see their short summary on the chart
```
### /expenses
```
The user can add new expenses, filter them in many ways and search by name and other fields
```
### /reports
```
On this page, the user finds a summary of expenses by category or date, but also the total price
```
### /settings
```
User can change the password and delete the account
```

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

## Authors

- [@Zyrekk](https://github.com/Zyrekk)

