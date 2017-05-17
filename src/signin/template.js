var yo = require('yo-yo');
var landing = require('../landing');
var translate = require('../translate');

var signinForm = yo`<div class="col s12 m7">
  <div class="row">
    <div class="signup-box">
      <h1 class="fotogram">Fotogram</h1>
      <form class="signup-form">
       <h2>${translate.message('signin_subheading')}</h2>
        <div class="section">
          <a class="btn btn-fb hide-on-small-only">${translate.message('signup_facebook')}</a>
          <a class="btn btn-fb hide-on-med-and-up">
            <i class="fa fa-facebook" aria-hidden="true"></i> ${translate.message('signup_text')}
          </a>
        </div>
        <div class="divider"></div>
        <div class="section">

            <div class="input-field">
              <input id="username" type="text" name='username' class="validate">
              <label for="username">${translate.message('username')}</label>
            </div>

            <div class="input-field">
              <input id="password" type="password" name='password' class="validate">
              <label for="password">${translate.message('password')}</label>
            </div>

          <button class="btn waves-effect waves-light btn-signup" type="submit">${translate.message('signup_text')}</button>
        </div>
      </form>
    </div>
  </div>
  <div class="row">
    <div class="login-box">
      ${translate.message('signin_not_have_account')} <a href="/signup">${translate.message('signin')}</a>
    </div>
  </div>
</div>
</div>`;

module.exports = landing(signinForm);
