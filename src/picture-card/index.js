var yo = require('yo-yo');
var moment = require('moment');
var translate = require('../translate');

module.exports = function pictureCard(pic) {

    var el;

    function render(info) {
        return yo`<div class="card ${info.liked ? 'liked' : ''}">
                      <div class="card-image">
                        <img class="activator" src="${info.url}">
                      </div>
                      <div class="card-content">
                        <a href='/user/${info.user.username}'>
                            <img src="${info.user.avatar}" class="avatar">
                            <span class="username">${info.user.username}</span>
                        </a>
                        <small class="right time">${moment(info.createdAt).fromNow()}</small>
                        <p>
                            <a class="left" href="#" onclick=${like.bind(null, true)}>
                                <i class="fa fa-heart-o" aria-hidden="true"></i>
                            </a>
                            <a class="left" href="#" onclick=${like.bind(null, false)}>
                                <i class="fa fa-heart" aria-hidden="true"></i>
                            </a>
                            <span class="left likes">${translate.message('likes', {likes: info.likes})}</span>
                        </p>
                      </div>
                </div>`;
    }

    function like(liked) {
        pic.liked = liked;
        pic.likes += liked ? 1 : -1;
        var new_element = render(pic);
        yo.update(el, new_element);
        return false;
    }

    el = render(pic);
    return el;

}
