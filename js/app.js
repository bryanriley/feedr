// Create global object with empty array
// get response data and input into array
// in the for loop, access data from response


var source = $("#titleTemplate").html();
var template = Handlebars.compile(source);
// var source2 = $('#link-template').html();
// var containerTemplate = Handlebars.compile(source2);

$('#popUp').removeClass('hidden');

$.get("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json", function(results) {
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
    var $html = $(html);

    // console.log(html);

    console.log($(html));

    // Open popup
    $html.click(function(event) {
      $('#popUp').removeClass('hidden');
      console.log('popup opened');

      $('#popUp').load($(this).attr('href'), function() {
          $('#container').modal({
              backdrop: true
          });
          event.preventDefault();
      });
    })

    $("#main").append($html);




  });

  // Close popup
  $('.closePopUp').click(function() {
    $('#popUp').addClass('hidden');
  });

  // Search input expand
  $('#search a').click(function() {
    $('#search').toggleClass('active');
  });

  $('#search').keypress(function(e) {
    if(e.which == 13) {
      $(this).removeClass('active');
    }
  });

});

  // $('#search').click(function() {
  //   if( $(this).hasClass('active') ){
  //     console.log('has');
  //     $(this).removeClass('active');
  //   } else {
  //     console.log('hasnt');
  //     $(this).addClass('active');
  //   }
  // });








  $('#popUp').addClass('hidden');
