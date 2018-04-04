import axios from "axios";

export default {
  // Gets nyt articles
 

  getNYTArticles: function(SearchTerm, begin, end) {

        var queryURL = 'https://api.nytimes.com/svc/search/v2/articlesearch.json'+ '?api-key=b9f91d369ff59547cd47b931d8cbc56b:0:74623931&q=';

        var q = SearchTerm;

        if (begin) {
            q += '&begin_date=' + begin + '0101';
        }

        if (end) {
            q += '&end_date=' + end + '1231';
        }

        return axios.get(queryURL + q)
      
    },

 //get saved articles
 getArticles: function() {
    return axios.get("/api/articles");
  },
  
  // getArticles: function(id) {
  //   return axios.get("/api/articles/" + id);
  // },
  
  deleteArticles: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  
  saveArticles: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
  