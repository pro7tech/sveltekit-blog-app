# SvelteKit Blog App

## Installation:

EdgeDb is a prerequisite: https://www.edgedb.com/install

### 1. Clone the repository:

    git clone https://github.com/pro7tech/sveltekit-blog-app.git

    cd sveltekit-blog-app

    npm install

### 2. Install dependencies with Bun:

    cd sveltekit-blog-app

    bun install

### 3. Prepare Database

Make sure your database is clear from any previous installs:

    edgedb project unlink -D
      Do you really want to unlink and
      delete instance sveltekit_blog_app?
      (type `Yes`)
      > Yes

### 4. Initialize files for connecting to database

    edgedb project init

    bunx @edgedb/generate edgeql-js

### 5. Run the dev server

    bun --bun run dev

Then navigate to the root directory of the app to automatically seed the database: http://localhost:5173/

You can then login to the admin pages with:
* email: `admin@example.com`
* password: `password`
