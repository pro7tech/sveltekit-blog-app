![SvelteKitBlogApp](https://user-images.githubusercontent.com/29139306/223408199-decaa65b-6213-462b-891f-2996d7f7590c.png)

## About

The Real-World App (https://github.com/gothinkster/realworld) named the “mother of all demo apps” provides a fullstack Medium.com blog clone with a variety of frontend and backend stacks to demo the features needed for a robust web application.

This app demos the same features of “querying & persisting data to a database, an authentication system, session management, full CRUD for resources” while simplifying the app to an integrated stack of:

- **SvelteKit:** A top framework for developer retention in the 2021 and 2022 State of JS Survey ([Source](https://2022.stateofjs.com/en-US/libraries/rendering-frameworks/))
- **Tailwind:** Consistently the most popular CSS Framework in the annual State of CSS Survey ([Source](https://2022.stateofcss.com/en-US/css-frameworks/))
- **EdgeDB:** Open Source Database with 10 Years of Development providing the best of both worlds between SQL and an ORM ([Source](https://www.edgedb.com/blog/a-solution-to-the-sql-vs-orm-dilemma))

## Features
- **Simplicity:** Minimizes 3rd party dependencies in favor of using the platform to keep things simple
- **Modern Tailwind Design:** Uses the latest best practices for a beautiful design
- **Desktop and Mobile-friendly:** Looks great on both large-screen and small-screen (mobile) devices.
- **Authentication and Authorization:** Built-in users management with role based authorization 
- **100% Performance Score** on Google Lighthouse
- **Modern Admin Panel:** Elegant admin dashboard demoing CRUD operations for Posts, Comments, Tags, and Users

## Screenshots

### Frontend Pages
A blog overview page, blog page with comments, sign-in, sign-up and error pages.
![frontend](https://user-images.githubusercontent.com/29139306/223408688-22e9d832-6d05-4272-9d4f-b3a46ab61b08.png)

### User Profile Screens
Pages for users to update their profile and password.
![profile](https://user-images.githubusercontent.com/29139306/223408403-f49b4e52-09aa-4c5a-b7fd-35e2a24cde96.png)

### Admin Pages
Only users with role of ‘admin’ can access these pages.  CRUD pages for users, posts, comments, tags.  
![admin](https://user-images.githubusercontent.com/29139306/223407889-93cab579-ebe9-48e7-9283-413a808a5f2a.png)

### Mobile Friendly
![mobile](https://user-images.githubusercontent.com/29139306/223408426-a0a08c4c-854b-478b-8c9f-685bdbdc0866.png)

### EdgeDb UI 

Run command 'edgedb ui' in root folder to see the database explorer and query REPL
![Screenshot 2023-03-15 at 9 54 05 PM](https://user-images.githubusercontent.com/29139306/225521291-ab5f18b8-ea6f-4686-b27d-f6f0dace7b99.png)
![Screenshot 2023-03-15 at 9 54 45 PM](https://user-images.githubusercontent.com/29139306/225521308-a3671129-64a6-4551-8220-1c375bddbf45.png)


### Performance
100% Performance on Google Lighthouse
![Screenshot 2023-03-15 at 4 26 31 PM](https://user-images.githubusercontent.com/29139306/225521173-0e4c09fb-61b4-4928-a0ae-1840642b78fe.png)

### Code Show Feature
Use Keyboard shortcut for your platform (Command ⌘ + Shift ⇧ on Mac) to activate a hover component that shows the code generating the UI under the mouse cursor
![Screenshot 2023-03-15 at 10 05 34 PM](https://user-images.githubusercontent.com/29139306/225521088-694050c9-f6ce-4e37-8950-b41d4cce9e25.png)
![ezgif-1-c611e45007](https://user-images.githubusercontent.com/29139306/226241441-e2534ddf-6da6-414d-a2cc-ff8d6ba2d441.gif)

## Installation:

EdgeDb is a prerequisite: https://www.edgedb.com/install

1. Clone the repository and install dependencies:

```
git clone https://github.com/pro7tech/sveltekit-blog-app.git
cd sveltekit-blog-app
npm install
```

2. Initialize files for connecting to database

```
edgedb project init
npx @edgedb/generate edgeql-js
```

3. Run the dev server

```
npm run dev
```

Then navigate to the root directory of the app to automatically seed the database: http://localhost:5173/ 

You can then login to the admin pages with:
* email: admin@example.com
* password: password

## Deploying to Production with Digital Ocean and Vercel

1. Use the Digital Ocean on click deploy tutorial to setup your database: https://www.edgedb.com/docs/guides/deployment/digitalocean#one-click-deploy
2. Copy your Database Connection String (DSN) from step 1.  It has the format edgedb://username:password@hostname:port
3. Run the migration file against your remote database

```
$ edgedb migrate --dsn edgedb://username:password@hostname:port --tls-security insecure
```

4. Deploy this app to Vercel with the link below.

https://vercel.com/new/git/external?repository-url=https://github.com/pro7tech/sveltekit-blog-app&repository-name=sveltekit-blog-app&env=EDGEDB_DSN,EDGEDB_CLIENT_TLS_SECURITY

When Prompted:
* Set EDGEDB_DSN to your database’s DSN
* Set EDGEDB_CLIENT_TLS_SECURITY to insecure. This will disable EdgeDB’s default TLS checks.

## License

MIT Licensed

