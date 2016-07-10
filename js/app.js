// Create global object with empty array
// get response data and input into array
// in the for loop, access data from response


var source = $("#titleTemplate").html();
var template = Handlebars.compile(source);

var template2 = $('#link-template').html();
var linkTemplate = Handlebars.compile(template2);

$('#popUp').removeClass('hidden');
$('.closePopUp').hide();

$.get("https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json", function(results) {

  $(this).ready(function() {
    console.log('Mashable loaded');
  });

  $('#popUp').addClass('hidden');

  console.log(results);
  var articles = results.hot;

  articles.forEach(function(article){

    // Article images
    var returnedImage = article.image;
    var articleImage = returnedImage;

    // Image alt
    var returnedAlt = article.title;
    var imageAlt = returnedAlt;

    // Article title, image alt, channel and shares
    var articleTitle = article.title;
    var articleChannel = article.channel;
    var articleShares = article.shares.total;

    // Contents for popup
    var articleCopy = article.content.plain;
    var articleLink = article.link;

    // Templating
    var articleContent = {  title: articleTitle,
                            alt: imageAlt,
                            channel: articleChannel,
                            shares: articleShares,
                            thumbnailImage: articleImage
    };

    // Handlbars Templates
    var templateHtml = template(articleContent);

    // Create jQuery object
    var $html = $(templateHtml);

    // console.log($(html));

    // Open popup
    $html.click(function() {
      $('#popUp').removeClass('hidden');

      console.log('Popup Opened');

      var linkContents = {  link: articleLink,
                            title: articleTitle,
                            copy: articleCopy
      };

      // complile and append template
      var compiledLinkTemplate = linkTemplate(linkContents);
      $("#popUp").append(compiledLinkTemplate);

      $('.container').fadeIn('slow');
      $('.closePopUp').fadeIn('slow');

      $('#popUp').removeClass('loader');

        event.preventDefault();
    });

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
