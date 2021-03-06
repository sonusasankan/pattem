let page = 1;
let pageSize = 10
let query = "bitcoin";
let url =  '';
let query_string = url.search;
let search_params = new URLSearchParams(query_string); 
let root = document.getElementById("news")  


function loadDoc() {
    url = new URL("https://newsapi.org/v2/everything?q="+query+"&apiKey=0503377bfa6c4bde92bc48232a90f047&pageSize="+pageSize+"&page="+page+"");
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let data = JSON.parse(this.responseText);
        var output = '';
        for(let i in data.articles){
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

setInterval(function(){
    loadDoc()
}, 30000)

function validateForm(e){
    e.preventDefault()
    if(e.target.search.value != ""){
        query = e.target.search.value;
        search_params.set('q', query);
        url.search = search_params.toString();
        url.toString();
        loadDoc()
    }else{
        root.innerHTML = '<div class="progress-loader"><h1>OOPS!! No Results</h1></div>';
    }
        
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