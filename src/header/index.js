var yo = require('yo-yo');
var translate = require('../translate');
var empty = require('empty-element');

var el = yo`<nav class='header'>
                <div class='nav-wrapper'>
                    <div class='container'>
                        <div class='row'>
                            <div class='col s4'>
                                <a href='/' class='fotogram'>Fotogram</a>
                            </div>
                            <div class='col s4 offset-s4 right-align'>
                                <a href='#' class='btn btn-large btn-flat dropdown-button' data-activates='drop-user'>
                                    <i class="fa fa-user-circle fotogram-icons" aria-hidden="true"></i>
                                </a>
                                <ul id='drop-user' class='dropdown-content'>
                                    <li href='#'>${translate.message('logout')}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>`;

module.exports = function header(ctx, next) {
    var container = document.getElementById('header-container');
    empty(container).appendChild(el);
    next();
};
