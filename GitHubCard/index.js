/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// Axios call to my github page
axios.get('https://api.github.com/users/aniigar')
  .then(response => {

    // Create entry point 
    const entryPoint = document.querySelector('.cards');
    // Create user card for my github account
    const aniigar = githubUser(response);
    // Attach my user card to the DOM via the entry point
    entryPoint.appendChild(aniigar);

    // Return response to be used in the next chained .then
    return response;
  })
  .then(response => {
    
    // Axios call to my friends list inside .then handler 
    // This call passes in the original response object from the previous .then (above) and drills down to it's followers_url key
    axios.get(response.data.followers_url)
      .then(response =>{

        // Create array to hold followers from response
        const followersArray = [];

        // Iterate over response data object  to get the url key 
        response.data.forEach((object) => {
          const followerUrl = object.url;
          // Push the extracted urls to followersArray to create array of only followers github url
          followersArray.push(followerUrl);
        })

          // Use followersArray in forEach loop to create card for each follower
          followersArray.forEach((follower) => {

              // Axios call is done with each followers passed in url from followerArray
              axios.get(follower)
                .then(response => {

                  // Create entry point again since this is in a different scope from the last entryPoint variable
                  const entryPoint = document.querySelector('.cards');
                  // Create user card for each passed in follower's github account 
                  const newFollower = githubUser(response);
                  // Attach my follower's card to the DOM via the entry point
                  entryPoint.appendChild(newFollower);
                })
                .catch(error => {
                  console.log('Error, Inside the followersArray.forEach:', error);
                })
           // Closing bracket for followersArray.forEach
          })

      })
      .catch(error => {
        console.log('Error, inside 3rd .then nested inside of 2nd:', error);
      })
  })
  .catch( error => {
    console.log("Error, Inside 1st or 2nd .then chain:", error);
  })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

// const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <div>
    <img src={image url of user} />
    <div class="card-info">
      <h3 class="name">{users name}</h3>
      <p class="username">{users user name}</p>
      <p>Location: {users location}</p>
      <p>Profile:  
        <a href={address to users github page}>{address to users github page}</a>
      </p>
      <p>Followers: {users followers count}</p>
      <p>Following: {users following count}</p>
      <p>Bio: {users bio}</p>
    </div>
  </div>
  <div>
    <img>
  </div>
</div>

*/

const githubUser = (object) => {

  // Create all elements
  const githubCard = document.createElement('div');
    const holder = document.createElement('div');
        const githubImg = document.createElement('img');
        const innerDiv = document.createElement('div');
            const innerDivH3 = document.createElement('h3');
            const usernameP = document.createElement('p');
            const locationP = document.createElement('p');
            const profileP = document.createElement('p');
              const addressLink = document.createElement('a');
            const followersP = document.createElement('p');
            const followingP = document.createElement('p');
            const bioP = document.createElement('p');
      const secondDiv = document.createElement('div');
          const calendar = document.createElement('img');


  // Add classes to created elements
  githubCard.classList.add('flex');
  githubCard.classList.add('card');  
  githubImg.classList.add('profileImg');
  holder.classList.add('flexRow');
  innerDiv.classList.add('card-info');
  innerDivH3.classList.add('name');
  usernameP.classList.add('username');
  secondDiv.classList.add('card');
  secondDiv.classList.add('div2');
  calendar.classList.add('calendar');


  // Attach all elements to their parent element
  githubCard.appendChild(holder);
    holder.appendChild(githubImg);
    holder.appendChild(innerDiv);
        innerDiv.appendChild(innerDivH3);
        innerDiv.appendChild(usernameP);
        innerDiv.appendChild(locationP);
        innerDiv.appendChild(profileP);
            profileP.appendChild(addressLink);
        innerDiv.appendChild(followersP);
        innerDiv.appendChild(followingP);
        innerDiv.appendChild(bioP);
  githubCard.appendChild(secondDiv);
      secondDiv.appendChild(calendar);

  // Assign content to all elements
  githubImg.src = object.data.avatar_url;
  innerDivH3.textContent = object.data.name;
  usernameP.textContent = object.data.login;
  locationP.textContent = object.data.location;
  addressLink.href = object.data.html_url;
  addressLink.textContent = object.data.html_url;
  followersP.textContent = `Followers: ${object.data.followers}`;
  followingP.textContent = `Following: ${object.data.following}`;
  bioP.textContent = object.data.bio;
  calendar.src = `http://ghchart.rshah.org/6d32a8/${object.data.login}`;
  calendar.alt = `${object.data.login}'s Github Chart`;
  
  // Return the whole user card
  return githubCard;
};

// console.log(githubUser());

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

// // Stretch: Added contribution calendar 
// const entryPoint = document.querySelector('.cards');



// // const firstCard = document.querySelector('.card');
// entryPoint.prepend(calImg);

// console.log(calImg);