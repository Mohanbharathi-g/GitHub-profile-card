'use strict';

// elements

const btnEl = document.getElementById('btn-search');

const inputEl = document.getElementById('input');

const loadingEl = document.getElementById('loader');

const resultEl = document.getElementById('result');

const profileImg = document.getElementById('profile');

const nameEl = document.getElementById('profile-name');

const followers = document.getElementById('followers');
const following = document.getElementById('following');
const repositories = document.getElementById('repositories');
const publicGits = document.getElementById('public');
const place = document.getElementById('location');

const link = document.getElementById('link');

// global variables
console.log(profileImg);

// function
// 'https://docs.github.com/rest';

function getUser() {
  let userName = inputEl.value;
  let url = `https://api.github.com/users/${userName}`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        alert('user not found');
        throw new Error('no profile found !');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      displayResult(data);
    });
}
// time function
function setTime() {
  setTimeout(() => {
    console.log(`its time out function`);
    loadingEl.style.visibility = 'hidden';
    getUser();
  }, 1500);
}

// display function

function displayResult(data) {
  console.log(`its display function
  `);
  // image
  profileImg.innerHTML = `<div class="image-container" id="profile">
          <img src="${data.avatar_url}" alt="" class="image" />
        </div>`;
  console.log();

  // name

  if (data.name == '') {
    nameEl.innerHTML = ` <h2 id="profile-name">
          <i class="fa-brands fa-github"></i>-
        </h2>`;
  } else {
    nameEl.innerHTML = ` <p id="profile-name">
          <i class="fa-brands fa-github">${data.name}</i>
        </p>`;
  }

  followers.innerHTML = `<span id="followers">${data.followers}</span>`;

  following.innerHTML = ` <span id="following">${data.following}</span>`;

  repositories.innerHTML = ` <span id="following">${data.public_repos}</span>`;

  publicGits.innerHTML = `<span id="public">${data.public_gists}</span>`;

  place.innerHTML = `<h3 class="location" id="location">
          <i class="fa-solid fa-location-dot"></i>${data.location}
        </h3>`;

  link.innerHTML = `<a href="${data.html_url}" id="link"> visit profile</a>`;

  resultEl.style.visibility = `visible`;
}

// event listeners

btnEl.addEventListener('click', () => {
  // console.log(inputEl.value);
  // getUser();

  if (inputEl.value === '') {
    alert('please enter the input');
  } else {
    console.log(inputEl.value);
    loadingEl.style.visibility = 'visible';

    setTime();
  }
});
