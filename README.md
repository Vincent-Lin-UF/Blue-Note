#  Blue Note - First Place Winner at Swamp Hacks

This project was created for [Swamp Hacks](https://2023.swamphacks.com/) on 1/27/23-1/29/23. Please check out our [DevPost](https://devpost.com/software/blue-note-1m70e3?ref_content=my-projects-tab&ref_feature=my_projects)!

## Table of Contents
- [How to Use](#how-to-use)
- [Inspiration](#inspiration)
- [What is Blue Note?](#what-is-bluenote)
- [How we built it](#how-we-built-it)
- [Challenges](#challenges)
- [Accomplishments](#accomplishments)
- [Team](#team)

---
## How to Use
  1) Create an .env file at the project root directory
  2) Input Firebase's Web Configuration in the following way
  ```
        REACT_APP_API_KEY =XXXXXXXXXXXXXXXXXXXX
        REACT_APP_AUTH_DOMAIN =XXXXXXXXXXXXXXXXXXXX
        REACT_APP_PROJECT_ID =XXXXXXXXXXXXXXXXXXXX
        REACT_APP_STORAGE_BUCKET =XXXXXXXXXXXXXXXXXXXX
        REACT_APP_MESSAGING_SENDER_ID =XXXXXXXXXXXXXXXXXXXX
        REACT_APP_APP_ID =XXXXXXXXXXXXXXXXXXXX
  ```
  3) Input the following as it is
  ```
        FLASK_APP=app
        FLASK_ENV=development
  ```
  4) Go to OpenAI and obtain the OpenAI Key
  ```
        OPENAI_API_KEY=XXXXXXXXXXXXXXXXXXXX
  ```
  5) On the terminal navigate to the project root directory and run 
  ```
        npm install
  ```
  7) On another terminal navigate from the project root directory and go into src/flask and run 
  ```
        pip install -r requirements.txt
  ```
  9) On the terminal within flask directory, run 
  ```
        python -m flask run
  ```
  11) On the terminal in the project root directory run 
  ```
        npm start
  ```
      
## Inspiration
Having to watch extensive and tedious videos on YouTube in an educational setting has consistently been a source of frustration for us. We believe that the essential content of these videos could be condensed and distilled into only the most important topics, thereby increasing our productivity.

## What it does
The system provides an easy way for users to understand video content by summarizing the video and defining the key terms in the video. It allows users to register and log in with ease and input any YouTube video simply by pasting a URL. A generated summary, keywords, and definitions are subsequently displayed to the user and also stored locally for future reference. This allows users to refer back to the information at any time, making it a convenient and efficient tool for video content consumption. 

## How we built it
The system is built using a combination of technologies and APIs. The registration process begins by offering the user the choice of utilizing either email and password authentication or Google authentication through Firebase. The React frontend is used to accept the URL, video title, and genre from the user. This information is then processed by a Flask backend where the Youtube Transcript API is called to get the transcript of the video. The transcript is then processed by the OpenAI GPT-3 API, and a summary as well as keywords are generated. These keywords are then defined by Wikipedia via the Wikipedia API, and then everything is shown back to the user.

## Challenges we ran into
During the development process, we encountered various challenges related to the generation of suitable prompts for the ChatGPT model. Additionally, we encountered difficulties in utilizing the Firebase Firestore database for efficient storage and retrieval of queries. Furthermore, there were multiple merging conflicts within our Git repository. Moreover, we faced issues related to the compatibility of the Flask framework on certain devices, leading to difficulties in deployment. Lastly, we encountered challenges related to the setup and containerization of our application using Docker.

## Accomplishments that we're proud of
One of our greatest accomplishments during the hackathon was being able to implement OpenAI's ChatGPT model and successfully utilizing Firebase for user authentication. Additionally, having the Wikipedia API and Dictionary API to work properly after numerous testing was an accomplishment.

## What we learned
During the course of the project, our team acquired a diverse set of skills and knowledge in various technologies and tools that are widely used in web development and cloud computing. One of the key technologies we learned was ReactJS, a JavaScript library for building user interfaces. This allowed us to create a dynamic and responsive front-end for our application. Firebase, a platform for developing mobile and web applications, was also a key technology we learned. Additionally, we learned Bootstrap, a widely used framework for creating responsive web pages. This helped us to create a polished and professional-looking front-end.

We also had experience in working with APIs, such as the YouTube Transcript API, which we used to extract the transcript of the video, GPT-3 API, which we used to generate summary and informative video title, Wikipedia API and dictionary API which we used to generate more relevant information. We also utilized Flask, a micro web framework for Python, to build some of the back-end of our application.

Moreover, we also learnt version control and team collaboration by using Git and Github which were crucial for managing the codebase and resolving conflicts. 

## What's next for Blue Note
For future implementations, we plan to fully integrating Firebase's function and Firestore. This is because Firebase contains robust and secure user authentication and data storage capabilities. Additionally, if we incorporate a web scraping solution, we can open up the possibility of adding new features and services to our application, such as providing users with more accurate and comprehensive information.

Scalability is also an important aspect of our project that we see as a future implementation. As our application continues to gain popularity, we will be able to handle more users and traffic by leveraging cloud technologies and optimizing our codebase. This will enable us to continue to provide a seamless and reliable user experience even as the number of users increases.

## Team
Sanjay Taylor - https://www.linkedin.com/in/sanjaytaylor/  
Vincent Lin - https://www.linkedin.com/in/vincent-lin-uf/  
Michael Logsdon - https://www.linkedin.com/in/michaellogsdon1/  
Aran Gain - https://www.linkedin.com/in/aran-gain/
