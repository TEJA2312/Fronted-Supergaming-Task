# Frontend Documentation

## Tech Stack Used
- React JS + Vite
- Tailwinds CSS (for faster development)
- Redux
- React Hook Form for validations
- Lucide Icons for Icons

## Features
- After user logs in the User info and tokens are saved in Redux using redux persists
- Axios Instance is create to intercept every request made to Backend
- When the api give 403 error with message "Your access token has expired" then it renews the access token using a Refresh Token saved in httpOnly Cookie
Hopefully Rest of the Code is pretty standard!.

