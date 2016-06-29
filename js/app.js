/*
  Please add all Javascript code to this file.
*/

var source = $("#titleTemplate").html();
var template = Handlebars.compile(source);

$.get("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json", function(results){
  console.log(results);
  var articles = results.hot;

  articles.forEach(function(article){

    // article images
    var returnedImage = article.image;
    var addImage = returnedImage;

    // article title, channel and shares
    var title = article.title;
    var channel = article.channel;
    var shares = article.shares.total;

    var context = {title: title, channel: channel, shares: shares, thumbnail: addImage};
    var html = template(context);

    $("#main").append(html);

    var articleLink = article.link;

    // console.log(articleLink);


    // Open popup
    $('section').click(function() {
      $('#popUp').removeClass('hidden');
    });

    // Close popup
    $('.closePopUp').click(function() {
      $('#popUp').addClass('hidden');
    });






  })
});
