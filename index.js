// Form Submit Handling

const form = document.getElementById('form');

form.addEventListener('submit', (event) => {
  const isValid = form.checkValidity();
  console.log(isValid);
  if (!isValid) {
    event.preventDefault();
    showErrors();
    console.log(form.elements);
    [...form.elements].forEach((formControl) => {
    if (!formControl.checkValidity()) {
        formControl.classList.add('flashError');
        setTimeout(() => {
          formControl.classList.remove('flashError');
        }, 300)
      }
    })
    
    if (!document.getElementById('zipInput').checkValidity()) {
      const zipError = document.querySelector('#countryZipContainer>.error');
      zipError.classList.add('flashError');
      setTimeout(() => {
        zipError.classList.remove('flashError');
      }, 300)
    }
  }
})

const showErrors = () => {
  showErrorEmail();
  showErrorZip();
  showErrorPassword();
  showErrorPasswordConfirmation();
}

// Email Validation

const validateEmail = () => {
  const emailInput = document.getElementById('emailInput');

  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  if (emailInput.value.length === 0) {
    emailInput.setCustomValidity('Email required')
  } else if (emailRegEx.test(emailInput.value)) {
    emailInput.setCustomValidity('');
  } else {
    emailInput.setCustomValidity('Must match email format')
  }
}
validateEmail();

const showErrorEmail = () => {
  const emailInput = document.getElementById('emailInput');
  document.querySelector('#emailInput+.error').textContent = emailInput.validationMessage;
}

document.getElementById('emailInput').addEventListener('input', () => {
  validateEmail();
  showErrorEmail();
})

// Zip Validation

const validateZip = () => {
  // For each country, defines the pattern that the ZIP has to follow
  const constraints = {
    ch: [
      "^(CH-)?\\d{4}$",
      "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
    ],
    fr: [
      "^(F-)?\\d{5}$",
      "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
    ],
    de: [
      "^(D-)?\\d{5}$",
      "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
    ],
    nl: [
      "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
      "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
    ],
  };

  // Read the country id
  const countryValue = document.getElementById("countryInput").value;

  // Get the NPA field
  const zipInput = document.getElementById("zipInput");

  // Build the constraint checker
  const constraint = new RegExp(constraints[countryValue][0], "");
  console.log(constraint);

  // Check it!
  if (zipInput.value.length === 0) {
    zipInput.setCustomValidity('ZIP required')
  } else if (constraint.test(zipInput.value)) {
    // The ZIP follows the constraint, we use the ConstraintAPI to tell it
    zipInput.setCustomValidity("");
  } else {
    // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
    // give a message about the format required for this country
    zipInput.setCustomValidity(constraints[countryValue][1]);
  }
}
validateZip();

const showErrorZip = () => {
  zipInput = document.getElementById('zipInput');
  document.querySelector('#countryZipContainer .error').textContent = zipInput.validationMessage;
}

document.getElementById('countryInput').addEventListener('change', () => {
  validateZip();
  showErrorZip();
});
document.getElementById('zipInput').addEventListener('input', () => {
  validateZip();
  showErrorZip();
});

// Password Validation

const validatePassword = () => {
  const passwordInput = document.getElementById('passwordInput');

  if (passwordInput.value.length === 0) {
    passwordInput.setCustomValidity('Password required')
  } else if (passwordInput.value.length <= 6) {
    passwordInput.setCustomValidity('Must be more than 6 characters')
  } else if (passwordInput.value.length >= 16) {
    passwordInput.setCustomValidity('Must be less than 16 characters')
  } else {
    passwordInput.setCustomValidity('');
  }
}
validatePassword();

const showErrorPassword = () => {
  const passwordInput = document.getElementById('passwordInput');
  document.querySelector('#passwordInput+.error').textContent = passwordInput.validationMessage;
}

document.getElementById('passwordInput').addEventListener('input', () => {
  validatePassword();
  showErrorPassword();
})

// Password Confirmation Validation

const validatePasswordConfirmation = () => {
  const passwordConfirmationInput = document.getElementById('passwordConfirmationInput');
  const passwordInput = document.getElementById('passwordInput');

  if (passwordConfirmationInput.value.length === 0) {
    passwordConfirmationInput.setCustomValidity('Password confirmation required');
  } else if (passwordConfirmationInput.value === passwordInput.value) {
    passwordConfirmationInput.setCustomValidity('');
  } else {
    passwordConfirmationInput.setCustomValidity('Must match password');
  }
}
validatePasswordConfirmation();

const showErrorPasswordConfirmation = () => {
  const passwordConfirmationInput = document.getElementById('passwordConfirmationInput');
  document.querySelector('#passwordConfirmationInput+.error').textContent = passwordConfirmationInput.validationMessage;
}

document.getElementById('passwordConfirmationInput').addEventListener('input', () => {
  validatePasswordConfirmation();
  showErrorPasswordConfirmation();
})