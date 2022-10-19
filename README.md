# How to change React UI theme according to the environment

As you may know for the most cases, we can use environment variables for different environments rather than hard coding the API URLs, API Keys, and other config stuff. The mostly using environments are development and production.

There is another use case, which may want to use environment configurations. Which is to change the theme according to the environment. Same app for two or more different vendors. This is the best solution, if the same app gives to different customers, they may delightfully, if the app has same theme which mapping to their business theme.

## env-cmd

**A simple node program for executing commands using an environment from an env file.**

For the different environment configuration stuff can use ‘.env-cmdrc.json’ file. Can write our configs as json format, which give more readability and maintainability. Which should locate at the root directory.(see figure 1)

![image](https://user-images.githubusercontent.com/18750243/196567746-7fc6685a-0413-4a03-9c8d-5e701b9e97bc.png)

##  How to install

### `npm install env-cmd or npm install -g env-cmd`

Sample of .env-cmdrc.json file

{
“client1”: {
“REACT_APP_NAME”: “client-1”
},
“client2”: {
“REACT_APP_NAME”: “client-2”
}
}

Above, json config, put two configuration environments for two different clients. Which is client-1 and client-2. All the configs names should start prefix with “REACT_APP”.

## How can we start with needed environment?

In package.json file, there is script section. As my example,

“scripts”: {
“start”: “react-scripts start”,
“build”: “react-scripts build”
}

In that script we can see command from the left side (json property name). The right side, we can see particular script file. While changing left side property, we can set out an argument, As above example, we can start the react app by using “npm run start” command. Here we use “start” property name as argument. As the same way we can set our argument according to environment.

“scripts”: {
“start:client1”: “env-cmd -e client1 react-scripts start”,
“start:client2”: “env-cmd -e client2 react-scripts start”,
“build:client1”: “env-cmd -e client1 react-scripts build”,
“build:client2”: “env-cmd -e client2 react-scripts build”
}

Here set separate arguments for separate environments. As property value, can set env-cmd script by passing the environment name, which mentioned in the .env-cmdrc.json. So can start the app for the client1 (environment variable) by using “npm run start:client1”.

### `styling`

Here using SCSS files for styling. Then can pass style values as parameters. SCSS can use if supose to use common styling files. Otherwise it is not required thing to use SCSS file. Before use SCSS file, it is required to install node-sass package.

### npm install node-sass

![image](https://user-images.githubusercontent.com/18750243/196568221-0bf69985-bc3c-4c79-9498-b7cd613ca3e1.png)

According to the above image, create a resource folder inside ‘src’. Likewise create separate ‘scss’ files for the different client and there is main style.scss file, which will be imported by other ‘env.scss’ files.

### resource/env/client1/env.scss

    // client-1 env.scss file
    $theme: red;

    @import “../../style.scss”;
    
### resource/env/client2/env.scss

    // client-2 scss file
    $theme: blue;

    @import “../../style.scss”;
 

### resource/style.scss

.App {
background: $theme;
}

Finally, I can import required ‘scss’ file in ‘App.js’ file and use it’s styles.

if (process.env.REACT_APP_NAME === ‘client-1’) {
require(“./resource/env/client1/env.scss”);
}
else {
require(“./resource/env/client2/env.scss”);
}

or

require("./resource/env/"+process.env.REACT_APP_NAME+"/env.scss");

## Demo…

npm run start:client1

![image](https://user-images.githubusercontent.com/18750243/196568547-6f352ade-3209-4e16-97b7-bbb9bb4c4138.png)

npm run start:client2

![image](https://user-images.githubusercontent.com/18750243/196568579-12d16e5e-16bd-4847-95ea-cf0b018e62b4.png)
