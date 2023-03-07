![SvelteKitBlogApp](https://user-images.githubusercontent.com/29139306/223408199-decaa65b-6213-462b-891f-2996d7f7590c.png)

SvelteKit Blog app is a MIT Licensed full-stack, responsive blog built on:
* SvelteKit 
* Tailwind
* EdgeDb

# Features 

## Frontend Pages
A blog overview page, blog page with comments, sign-in, sign-up and error pages.
![frontend](https://user-images.githubusercontent.com/29139306/223408688-22e9d832-6d05-4272-9d4f-b3a46ab61b08.png)

## User Profile Screens
Pages for users to update their profile and password.
![profile](https://user-images.githubusercontent.com/29139306/223408403-f49b4e52-09aa-4c5a-b7fd-35e2a24cde96.png)

## Admin Pages
Only users with role of ‘admin’ can access these pages.  CRUD pages for users, posts, comments, tags.  
![admin](https://user-images.githubusercontent.com/29139306/223407889-93cab579-ebe9-48e7-9283-413a808a5f2a.png)

## Mobile Friendly
![mobile](https://user-images.githubusercontent.com/29139306/223408426-a0a08c4c-854b-478b-8c9f-685bdbdc0866.png)

# Installation:
EdgeDb is a prerequisite: https://www.edgedb.com/install

1. Clone the repository and install dependencies:

```
git clone https://github.com/pro7tech/sveltekit-blog-app.git
cd sveltekit-blog-app
npm install
```

2. Initialize the database and run the migration script

```
edgedb project init
npm run migrate
```

3. Run the dev server

```
npm run dev
```

Then navigate to the root directory of the app to automatically seed the database: http://localhost:5173/ 

You can then login to the admin pages with:
* email: admin@example.com
* password: password
