# Spelling Master

This project was made usng react and converted into an android app using Ionic Capacitor. It contains the following features/development practices:
- Various levels managed on a single page using state
- Use of cookies
- Curried functions
- NPM libraries
- Dynamic graphs, wordsearch and sound effects
- CSS animations

See a live deployment here: [https://spell-master.vercel.app/](Spelling Master)

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

## Adding words and images

To add images:
- Add a line for it in ./src/components/word/words2.ts
- Create a folder named the same as the word (in lower-case) in ./public/words
- Create a folder inside this named 'images' and add any photos you would like
- Navigate to ./public/words using wsl
- Run the command: tree -J > ../../src/components/words/files.json
This final command writes a list of all files in the public/words folder for the app to use.
