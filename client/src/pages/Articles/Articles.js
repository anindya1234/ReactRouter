import React, { Component } from "react";
import {DeleteBtn,SaveBtn} from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";

class Articles extends Component {
  
 

  state = {
     articles:[],
     topic : "",

     start : "",
     end : "",
     savedArticles: []  
  };
  
  
componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    API.getArticles()
      .then(res => {
        console.log(res,res.data);
        this.setState({
          savedArticles: res.data
        })
        //console.log(savedArticles);
      })
      .catch(err => console.log(err));
  };


  saveArticles = article => {
    //pass the object containg all  info related to article to create article in DB /show up in front end

    API.saveArticles({
      title: article.title,
      url: article.url,
      date: article.date,
    })
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  deleteArticles = id => {
    API.deleteArticles(id)
      .then(res => this.loadArticles())
      .catch(err => console.log(err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    console.log(this.state.topic,this.state.start,this.state.end);
    // if (this.state.topic) {
      API.getNYTArticles(this.state.topic,this.state.start,this.state.end)
      .then((NYTdata) => {
               let responses = [];

                for (var i = 0; i < 5; i++) {
                    var doc = NYTdata.data.response.docs[i];
                   
                    var article = {
                        title: doc.headline.main,
                        url: doc.web_url,
                        date: doc.pub_date.split('T')[0],
                        
                    };

                    responses.push(article);
                }
                console.log(responses);
               


//change state of articles to response from api
        this.setState({articles: responses, topic:"",start:"",end:""}),
        console.log(this.state.articles, this.state.topic)
      })
        
        .catch(err => console.log(err));
    // }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Jumbotron>
              <h1>Search Articles</h1>
            </Jumbotron>
            <form>
              <Input
                value={this.state.topic}
                onChange={this.handleInputChange}
                name="topic"
                placeholder="Topic (required)"
              />
              <Input
                value={this.state.start}
                onChange={this.handleInputChange}
                name="start"
                placeholder="start Year (required)"
              />
              <Input
                value={this.state.end}
                onChange={this.handleInputChange}
                name="end"
                placeholder="end Year (Optional)"
              />
              <FormBtn
                disabled={!(this.state.topic && this.state.start)}
                onClick={this.handleFormSubmit}
              >
                Submit Articles
              </FormBtn>
            </form>
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>Results</h1>
            </Jumbotron>
            {this.state.articles.length ? (
              <List>
                {this.state.articles.map((article) => (
                  <ListItem key={article.url}>
                      <strong>
                        <h3>{article.title} </h3>
                        <a href={article.url} target='_blank'>
                          Link: {article.url}
                        </a>
                      </strong>
                    <SaveBtn onClick={() => this.saveArticles(article)} />

                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
          <Col size="md-12">
            <Jumbotron>
              <h1>Saved Articles</h1>
            </Jumbotron>
            {this.state.savedArticles.length ? (
              <List>
                {this.state.savedArticles.map(article => (
                  <ListItem key={article._id}>
                      <strong>
                        <h3>{article.title} </h3>
                        <a href={article.url} target='_blank'>
                          Link: {article.url}
                        </a>
                      </strong>
                    <DeleteBtn onClick={() => this.deleteArticles(article._id)} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3>No Results to Display</h3>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Articles;
