# Law & CS Group D Project
Research using LLMs to verify compliance of privacy policy with data privacy law.

# Requirements
- [Node.js](https://nodejs.org/en/download)
- As an editor, I recommend [VS Code](https://code.visualstudio.com/)

# React/Next.js
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
For the purposes of this project, it can be regarded as a React project.

## Getting Started

First, install the dependencies (node modules) by running:
```bash
npm install
```
in the folder containing `package.json`.

To run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The main file can be found in `src/app/page.tsx`.
This makes a call to our api `api/routes.ts` which calls the OpenAI api.
We'll do our "logic" in the api and use the components for the UI only.

## Learn More

- [React Documentation](https://react.dev/reference/react)
- [Learn React](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
