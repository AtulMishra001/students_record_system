# Student Record System 

Student Record System is a web app which can store students information like Id, Name, Course, Number, Email, Address you can also update and delete the information of existing students.

## Folder Structure
```
|_app.js
|_index.html
|_input.css
|_output.css
|_package-lock.json
|_package.json
```

## Set Up To Run
Clone this repo or download the zip folder in you IDE open the folder and run the following commands in your terminal.
This project uses [Tailwind 4.1+](https://tailwindcss.com/docs/installation/tailwind-cli) and you should have [nodejs 18+](https://nodejs.org/en/download) for this to work properly.


```bash
npm install
npx @tailwindcss/cli -i ./input.css -o ./output.css --watch
```

open the live server and you are good to go.


### From Validation

I have triend to implement form vaidation by both HTML and javascript some of the checks are
* ID only takes numbers
* Name can only take characters no number no special characters
* Class/course has basic empty white space check which is for all the fields.
* Only a valid email can be submitted.
* Number can't be less than 10 digits.
* Address has basic empty white space check.