
// function fetchData(url) {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("GET", 'https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1');
//       xhr.onload = () => resolve(JSON.parse(xhr.responseText));
//       xhr.onerror = () => reject(xhr.statusText);
//       xhr.send();
//     });
//   }

// console.log(fetchData());

var data;
var url_string = "https://newsapi.org/v2/everything?q=reactjs&apiKey=363d26dd3d664d199ca63adc371e22aa&pageSize=10&page=1";
var url = new URL(url_string);
var c = url.searchParams.get("name");
console.log(c)

function imageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
}

function loadDoc(data) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        let item
        let root = document.getElementById("news")  
        let data = JSON.parse(this.responseText)
        data.articles.map(article => {
            item = document.createElement("DIV")
            // let details = document.createElement("DIV")
            // details.setAttribute('class', 'news-details')
            // let title = document.createElement("H2")
            item.setAttribute('class', 'news-list-item');
            let img = document.createElement("IMG")
            let imgExist = imageExists(article.urlToImage, function(exists) {
                return exists
            });  
            item.innerHTML = "<div class='news-img'>"+ "<img src="+(imgExist? "https://via.placeholder.com/150":article.urlToImage)+">"+"</div>"+"<div class='news-details'>" + "<h1 class='news-title'>" + article.title +"</h1>" + "<p>"+article.description+"</p>"+"</div>";
            root.appendChild(item);
        })
      }
    };
    xhttp.open("GET", url_string, true);
    xhttp.send();
  }
loadDoc(data);

function validateForm(e){
    e.preventDefault()
    console.log('submitted')
}
