var page = 1;
var pageSize = 10
var query = "bitcoin";
var url =  "";
var query_string = url.search;
var search_params = new URLSearchParams(query_string); 
let root = document.getElementById("news")  


function loadDoc() {
    url = new URL("https://newsapi.org/v2/everything?q="+query+"&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize="+pageSize+"&page="+page+"");
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        var output = '';
        for(var i in data.articles){
            output += '<div class="news-list-item">'+
            '<div class="news-img">'+ 
            '<img src="'+ data.articles[i].urlToImage +'" />'+
            '</div>'+
            '<div class="news-details">' + 
            '<h1 class="news-title">' + data.articles[i].title + 
            '</h1>' + 
            '<p>'+ data.articles[i].description+ '</p>'+
            '</div>'+
            '</div>'
        }
        root.innerHTML = output;

        if(data.totalResults == 0){
            root.innerHTML = '<div class="progress-loader"><h1>OOPS!! No Results</h1></div>';
        }

      }else if(this.readyState == 3){
        root.innerHTML = '<div class="progress-loader"><img src="preloader.gif"/></div>';
      }else{
          root.innerHTML = '<div class="progress-loader"><img src="preloader.gif"/></div>';

      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }
loadDoc();

// setInterval(function(){
//     loadDoc()
// }, 30000)

function validateForm(e){
    e.preventDefault()
    query = e.target.search.value;
    search_params.set('q', query);
    url.search = search_params.toString();
    url.toString();
    loadDoc()
}

onscroll = function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 400) {
        page = page + 1;
        search_params.set('page', page);
        // search_params.set('pageSize', pageSize);
        url.search = search_params.toString();
        url.toString();
        loadDoc()
    }
};