'use strict';

var popUp = document.querySelector('.setup');
var popUpOpenbtn = document.querySelector('.setup-open');
var popUpClosebtn = popUp.querySelector('.setup-close');
var userNameInput = popUp.querySelector('.setup-user-name');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var similarWizard = document.querySelector('.setup-similar');
var names = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColors = ['black', 'red', 'blue', 'yellow', 'green'];
var fireballColors = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_AMOUNT = 4;
var newWizCoat = popUp.querySelector('.wizard-coat');
var newWizEyes = popUp.querySelector('.wizard-eyes');
var newWizFireball = popUp.querySelector('.setup-fireball-wrap');

similarWizard.classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  popUp.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  popUp.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

popUpOpenbtn.addEventListener('click', openPopup);

popUpOpenbtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

popUpClosebtn.addEventListener('click', closePopup);

popUpClosebtn.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

userNameInput.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

var getRandomValue = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomWizard = function () {
  var randomWizardList = [];

  for (var i = 0; i < WIZARDS_AMOUNT; i++) {
    var randomWizard = {
      name: getRandomValue(names) + ' ' + getRandomValue(surnames),
      coatColor: getRandomValue(coatColors),
      eyeColor: getRandomValue(eyesColors)
    };
    randomWizardList.push(randomWizard);
  }
  return randomWizardList;
};

var renderWizards = function () {
  var fragment = document.createDocumentFragment();
  var setupSimilarList = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content;
  var randomWizardList = getRandomWizard();

  for (var i = 0; i < randomWizardList.length; i++) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.wizard-coat').style.fill = randomWizardList[i].coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = randomWizardList[i].eyeColor;
    wizardElement.querySelector('.setup-similar-label').textContent = randomWizardList[i].name;
    fragment.appendChild(wizardElement);
  }
  setupSimilarList.appendChild(fragment);
};

var getRandomCoat = function () {
  var coatInput = popUp.querySelector('input[name=coat-color]');

  coatInput.value = getRandomValue(coatColors);
  newWizCoat.style.fill = coatInput.value;
};

var getRandomEyes = function () {
  var eyesInput = popUp.querySelector('input[name=eyes-color]');

  eyesInput.value = getRandomValue(eyesColors);
  newWizEyes.style.fill = eyesInput.value;
};

var getRandomFireball = function () {
  var fireballInput = popUp.querySelector('input[name=fireball-color]');

  fireballInput.value = getRandomValue(fireballColors);
  newWizFireball.style.backgroundColor = fireballInput.value;
};

newWizCoat.addEventListener('click', getRandomCoat);
newWizEyes.addEventListener('click', getRandomEyes);
newWizFireball.addEventListener('click', getRandomFireball);

renderWizards();
