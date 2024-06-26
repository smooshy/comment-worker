const shouldDebug = false;

const getCaptchaResponseAndOriginalRequest = (captchaResponse, request) => {
  return 'Captcha Response:' + JSON.stringify(captchaResponse) + ' User Request:' + JSON.stringify(request);
}

const captchaScoreIsNotValid = (score) =>  score < 0.5;

const validateCaptcha = async (token, secret_key, shouldDebug = false) => {
  if (!token) {
      if (shouldDebug) console.log('No reCaptcha token providied');
      return false;
  }

  const captchaUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${token}`;
  const result = await fetch(captchaUrl);
  const json = await result.json();

  if (!json.success) {
      if (shouldDebug) console.log('Invalid captcha response.' + getCaptchaResponseAndOriginalRequest(json, request));
      return false;
  }

  if (captchaScoreIsNotValid(json.score)) {
      if (shouldDebug) console.log('Low Captcha Score. ' + getCaptchaResponseAndOriginalRequest(json, request));
      return false;
  }

  return true;
}

export { validateCaptcha };
