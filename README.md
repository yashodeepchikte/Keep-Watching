# Keep-Watching
Keep-Watching is a movie recommendation and review app build using React for the front-end, express for the back-end, 
flask for handelling the recommendations and similar movies section, mongoDB for the database<br />
### Here is the final website : https://keepwatching.herokuapp.com/

### Here is the flask server  https://github.com/yashodeepchikte/Keep-Watching-server

This project uses SurpriseLib for dealing with Cosine similarity based nearest neighbours algorithm for generating recommendations. <br />
For implimentation purpose dummy users are created using moviewlens 100K dataset. Each user has at least 20 movie ratings. 
<hr />

<br />
![](Images/homepage.PNG)<br />

# Features
<ul>
<li>

Recommendations are based on similar users(UserBased Collaborative Filtering) and similar movies (itemBased colaborative filtering)
<br/>(in deployment the item based model exceeds the available memory limit on the free tier of Heroku do this has not been included)
<br />
<img src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/recommendations1.PNG" alt="" /><br />
<img src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/recommendations2.PNG" alt="" /><br />

</li>
<li>
signin/sugnup with email <br>
Signin in with Google Signin with Github (not added to the deployed build yet)
<br/>
<img src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/sign-page.PNG" alt="" />
  <br />
<img alt="" src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/signup%20page.PNG" /><br />
</li>
<li>
Follow users to see their activity in your Feed<br />
<img alt="user feed image" src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/Feed.PNG" />
  <hr />
</li>
<li>
Search Movies and See their description, imdb ratings, budget, Earnings, director, cast etc.
<img src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/searchMovies.PNG" alt="searchMovies.PNG" />
  <br />
<img src="https://github.com/yashodeepchikte/Keep-Watching/blob/master/Images/movie.PNG" alt="searchMovies.PNG" />
  <hr />
</li>
<li>
Add Movies to WishList
</li>
<li>
Admin View
</li>
<li>
User activity page
</li>

</ul>

# Setup And Usage
Clone the repo or download and unzip it <br />
Use command propmt to navigate to the extracted folder<br />
Run <br />
<code> npm install </code><br />
navigate to the Client folder and run <br />
<code> npm install </code> <br />

For Developement <br />

#### For deployment npm was used so avoid using yarn to avooid the .loc file conflicts in deployment

in the root folder<br/>
<code>
// in  the root folder in the cmd run <br/>
npm run dev   <br/>// this will run both the client and the server in the same command prompt
</code> <br />
Otherwise to run the client and server seperately <br />
in the root folder run<br />
<code>nodemon server.js</code><br />
in another command prompt in the client folder run<br />
<code>npm start </code><br />

# Login Credentials
<ul>
<li>
you can login with your Google or GitHub account
</li>
<li>
you can Sign up using any valid email (dosent have to be a valid email)
</li>
<li>
you can use this dummy user<br />
email : keepwatching@gmail.com <br />
Password : 123456
</li>
</ul>

