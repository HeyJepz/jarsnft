MOR / Thesis Project by Alrae, Patrick, Jeffrey, Rigor

## Getting Started
First install Node.js from their website by using this link here: https://nodejs.org/en
Then install the following:
- Tailwind.css
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
- Node packages / dependencies
Type this to the terminal
```
npm i
```

Second, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

```bash
npx depcheck --detailed
#Generate a report of all the unused packages in the project and any missing dependencies

ncu -u
#Generate a list of all the packages the project that can be updated

npm prune
#Removes the packages that are no longer listed in package.json file and are not in use.

npx npm-check-updates -u -a --prune
#Will automatically update all the packages and remove the unnecessary packages.
```

```
cmds:
[both]
git pull
npm i

[back-end]
npx prisma db pull
npx prisma generate

[node]
npm run dev

[using bun]
bun run dev:bun
```
