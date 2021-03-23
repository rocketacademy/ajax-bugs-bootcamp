// const containerDiv = document.createElement('div');
// containerDiv.classList.add('container', 'main-container');
// document.body.appendChild(containerDiv);

// const rowDiv = document.createElement('div');
// rowDiv.classList.add('row');
// containerDiv.appendChild(rowDiv);

// const columnDiv = document.createElement('div');
// columnDiv.classList.add('col', 'col-md-12');
// rowDiv.appendChild(columnDiv);
const loginDiv = document.createElement('div');
document.body.appendChild(loginDiv);

const emailDiv = document.createElement('div');
loginDiv.appendChild(emailDiv);
const emailLabel = document.createElement('label');
emailLabel.setAttribute('for', 'email');
emailLabel.textContent = 'email: ';
emailDiv.appendChild(emailLabel);
const emailInput = document.createElement('input');
emailInput.setAttribute('id', 'email');
emailDiv.appendChild(emailInput);

const passwordDiv = document.createElement('div');
loginDiv.appendChild(passwordDiv);
const passwordLabel = document.createElement('label');
passwordLabel.setAttribute('for', 'password');
passwordLabel.textContent = 'password: ';
passwordDiv.appendChild(passwordLabel);
const passwordInput = document.createElement('input');
passwordInput.setAttribute('id', 'password');
passwordDiv.appendChild(passwordInput);

const loginBtn = document.createElement('button');
loginBtn.setAttribute('type', 'submit');
loginBtn.textContent = 'log in';
loginDiv.appendChild(loginBtn);

loginBtn.addEventListener('click', () => {
  axios
    .post('/login', {
      email: document.querySelector('#email').value,
      password: document.querySelector('#password').value,
    })
    .then((response) => {
      console.log(response.data);
      loginBtn.remove();
      document.querySelector('#email').value = '';
      document.querySelector('#password').value = '';
      const logoutBtn = document.createElement('button');
      logoutBtn.textContent = 'log out';
      loginDiv.appendChild(logoutBtn);
    });
});

const btnContainer = document.createElement('div');
btnContainer.classList.add('btn-container');
document.body.appendChild(btnContainer);
const showFormBtn = document.createElement('button');
showFormBtn.classList.add('form-btn');
showFormBtn.textContent = 'create a bug';
btnContainer.appendChild(showFormBtn);

const createFeatureDiv = document.createElement('div');
createFeatureDiv.classList.add('create-feature');
const createFeatureTitle = document.createElement('p');
createFeatureTitle.textContent = 'Create a feature';
createFeatureDiv.appendChild(createFeatureTitle);
const featureInputLabel = document.createElement('label');
featureInputLabel.setAttribute('for', 'feature');
featureInputLabel.textContent = 'feature: ';
createFeatureDiv.appendChild(featureInputLabel);
const featureInput = document.createElement('input');
featureInput.setAttribute('id', 'feature');
createFeatureDiv.appendChild(featureInput);

const featureInputBtn = document.createElement('button');
featureInputBtn.setAttribute('type', 'submit');
featureInputBtn.textContent = 'submit feature';
createFeatureDiv.appendChild(featureInputBtn);

featureInputBtn.addEventListener('click', () => {
  console.log(document.querySelector('#feature').value);

  axios
    .post('/add-feature', {
      name: document.querySelector('#feature').value,
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));
});

document.body.appendChild(createFeatureDiv);

// const bugListDiv = document.createElement('div');
axios
  .get('/index')
  .then((response) => {
    const allBugsContainer = document.createElement('div');
    allBugsContainer.classList.add('buglist-container');
    document.body.appendChild(allBugsContainer);
    response.data.allBugs.forEach((element) => {
      const bugListDiv = document.createElement('div');
      bugListDiv.classList.add('single-bug');
      const bugListName = document.createElement('p');
      bugListName.textContent = element.name;
      bugListDiv.appendChild(bugListName);
      const bugListError = document.createElement('p');
      bugListError.textContent = element.errorText;
      bugListDiv.appendChild(bugListError);
      const bugListCommit = document.createElement('p');
      bugListCommit.textContent = element.commit;
      bugListDiv.appendChild(bugListCommit);
      allBugsContainer.appendChild(bugListDiv);
    });
  })
  .catch((error) => console.log(error));

const modalDiv = document.createElement('div');
modalDiv.setAttribute('id', 'modal');
modalDiv.classList.add('modal');
document.body.appendChild(modalDiv);

const modalContentDiv = document.createElement('div');
modalContentDiv.classList.add('modal-content');
modalDiv.appendChild(modalContentDiv);

const modalHeaderDiv = document.createElement('div');
modalHeaderDiv.classList.add('modal-header');
modalContentDiv.appendChild(modalHeaderDiv);

const modalHeaderText = document.createElement('p');
modalHeaderText.textContent = 'Bug Form';
modalHeaderDiv.appendChild(modalHeaderText);

const xclose = document.createElement('span');
xclose.classList.add('closeBtn');
xclose.innerHTML = '&times;';
modalHeaderDiv.appendChild(xclose);

const modalBodyDiv = document.createElement('div');
modalBodyDiv.classList.add('modal-body');
modalContentDiv.appendChild(modalBodyDiv);

const problemInputDiv = document.createElement('div');

const problemInputLabel = document.createElement('label');
problemInputLabel.setAttribute('for', 'problem');
problemInputLabel.textContent = 'Problem: ';
problemInputDiv.appendChild(problemInputLabel);

const problemInput = document.createElement('input');
problemInput.setAttribute('id', 'problem');
problemInputDiv.appendChild(problemInput);

modalBodyDiv.appendChild(problemInputDiv);

const errorInputDiv = document.createElement('div');

const errorInputLabel = document.createElement('label');
errorInputLabel.setAttribute('for', 'error');
errorInputLabel.textContent = 'Error text: ';
errorInputDiv.appendChild(errorInputLabel);

const errorInput = document.createElement('input');
errorInput.setAttribute('id', 'errorText');
errorInputDiv.appendChild(errorInput);

modalBodyDiv.appendChild(errorInputDiv);

const commitInputDiv = document.createElement('div');

const commitInputLabel = document.createElement('label');
commitInputLabel.setAttribute('for', 'commit');
commitInputLabel.textContent = 'Commit: ';
commitInputDiv.appendChild(commitInputLabel);

const commitInput = document.createElement('input');
commitInput.setAttribute('id', 'commit');
commitInputDiv.appendChild(commitInput);

modalBodyDiv.appendChild(commitInputDiv);

const featureDiv = document.createElement('div');
featureDiv.classList.add('feature-div');
modalContentDiv.appendChild(featureDiv);

axios
  .get('/features')
  .then((response) => {
    console.log(response.data.features);

    for (let i = 0; i < response.data.features.length; i++) {
      const featureBtn = document.createElement('button');

      featureBtn.classList.add('featureBtn');
      featureBtn.textContent = `${response.data.features[i].name}`;
      featureDiv.appendChild(featureBtn);

      featureBtn.addEventListener('click', (e) => {
        console.log(`${response.data.features[i].id}`);
        // remove class from all feature buttons document.queryselectorall. selectedfeature btn

        console.log(e.target);
        if (e.target) {
          e.target.classList.add('selectedFeatureBtn');
          e.target.setAttribute('value', `${response.data.features[i].id}`);
          e.target.setAttribute('id', 'selected');
        }
        // } else if (featureBtn.style.backgroundColor === 'red') {
        //   featureBtn.style.backgroundColor = 'blue';
        //   featureBtn.removeAttribute('value');
        // }
      });
    }
  });

const submitBtnDiv = document.createElement('div');
submitBtnDiv.classList.add('submit-btn-div');
modalContentDiv.appendChild(submitBtnDiv);

const submitBtn = document.createElement('input');
submitBtn.setAttribute('id', 'submit');
submitBtn.setAttribute('type', 'submit');
submitBtn.textContent = 'submit';
submitBtnDiv.appendChild(submitBtn);

const modal = document.getElementById('modal');

const showForm = document.querySelector('.form-btn');

const closeBtn = document.querySelector('.closeBtn');

const submitForm = document.getElementById('submit');

showForm.addEventListener('click', () => {
  modal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  modal.style.display = 'none';
});

submitForm.addEventListener('click', () => {
  console.log(document.querySelector('#problem').value);
  console.log(document.querySelector('#errorText').value);
  console.log(document.querySelector('#commit').value);
  console.log(document.querySelector('#selected').value);

  axios
    .post('/add-bug', {

      problem: document.querySelector('#problem').value,
      errorText: document.querySelector('#errorText').value,
      commit: document.querySelector('#commit').value,
      featureId: Number(document.querySelector('#selected').value),
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => console.log(error));

  modal.style.display = 'none';
});
