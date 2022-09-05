# Todo App

Create todo app with Typescript

Example video:

[![Example Video](https://res.cloudinary.com/woufu/video/upload/q_auto,c_pad,b_auto:predominant/v1661682721/example_f4kfjg.jpg)](https://res.cloudinary.com/woufu/video/upload/v1661682721/example_f4kfjg.mov)

## Your tasks:

- Create Project
- Desgin UI look like with fix data
- Add todo
- List all todo
- Update todo
- Remove todo
- Toggle todo
- Show total incomplete
- Clear completed
- Filters (All, Active, Completed)

### React features you need to use:

- useState
- useEffect
- useContext

Todo Interface

```ts
// types.ts
interface ITodo {
  id: string;
  title: string;
  completed: boolean;
}
```

## Create project

```sh
npm create vite@latest

# typing the project name. Ex: todo-app
? Project name: › vite-project

# Select `React`
? Select a framework: › - Use arrow-keys. Return to submit.
    vanilla
    vue
❯   react
    preact
    lit
    svelte

# Select typescript
? Select a variant: › - Use arrow-keys. Return to submit.
    react
❯   react-ts


cd todo-app
npm install
npm run dev
```

## Git and Github

First you need to fork this repository to your own repositry and push your code to your reposity and then you can pull request to me for review your code.

```sh
# Go to your project folder
cd todo-app

# initialize git
git init

# before add files to git make sure you have .gitignore ignore (node_modules, ...)
git add .

# commit change
git commit -m "your change message"

git branch -M main

git remote add origin https://github.com/{username}/{repositry}.git

git push -u origin main
```

### Recommended folders strutures:

```sh
- node_modules
- public    # public assets
- src       # source code
  - assets  # local asset use in our components
  - components # shares components
  - contexts   # our react context (todos)
    - todos.tsx
  - App.tsx # mount to react root
  - index.css # global stylesheet
  - main.tsx # main entry point that include in html
  - types.tsx # share types
  - vite-env.d.ts # vite build tool types
- .gitignore # ignore files or folders you don't need push to the repo
- index.html
- tsconfig*.json # typescript configuration
  ....
```

_Happy hacking! 🥳_
