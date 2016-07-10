var source = $("#titleTemplate").html();
var template = Handlebars.compile(source);

var feedr = {

  // Empty Mashable object
  Mashable: {
    articles: []
  },
  // Empty Digg Object
  Digg: {
    articles: []
  },
  // Empty Reddit object
  Reddit: {
    articles: []
  },


  // Function for Mashable JSON response

  responseMashable : function(response) {
      // console log json response
      console.log(response);
      // something to do with closures... apparently the Feedr object isn't available inside the forEach function without the variable being defined here.
      var self = this;

      response.new.forEach(function(result){

        // push an object with all required article details for each article
        self.Mashable.articles.push({
          featuredImage: result.responsive_images[0].image,
          articleLink: result.link,
          articleTitle: result.title,
          articleCategory: result.channel,
          impressions: result.shares.total,
          description: result.content.plain,
          dateTime: Utilities.convertDate(result.post_date)
        });

        // populate tamplate with article content
        var articleContents = { sourceName: "mashable",
                                dateTime: Utilities.convertDate(result.post_date),
                                featuredImage: result.responsive_images[0].image,
                                articleLink: result.link,
                                articleTitle: result.title,
                                articleCategory: result.channel,
                                impressions: result.shares.total
        };

        // complile and append template
        var compiledTemplate = articleTemplate(articleContents);
        $("#main").append(compiledTemplate)

      })
  },









  getSourceMashable : function() {
    $.get('https://accesscontrolalloworiginall.herokuapp.com/http://mashable.com/stories.json', $.proxy(Feedr.responseMashable, Feedr))
        .done(function(){
          console.log( "Mashable source loaded");
        });
        .fail(function() {
          alert( "Unable to load Mashable content" );
        });
  }

  getSourceReddit : function() {
    $.get('https://www.reddit.com/top.json', $.proxy(Feedr.responseReddit, Feedr))
        .done(function(){
          console.log( "Reddit source loaded");
        });
        .fail(function() {
          alert( "Unable to load Reddit content" );
        });
  }

  getSourceDigg : function() {
    $.get('https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json', $.proxy(Feedr.responseDigg, Feedr))
        .done(function(){
          console.log( "Digg source loaded");
        })
        .fail(function() {
          alert( "Unable to load Digg content" );
        });
  }

}
