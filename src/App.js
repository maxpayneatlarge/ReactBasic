import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Posts from './components/posts';
import SelectedPost from './components/selectedpost';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: [],
      view: "posts", 
      activePost: {}
    }
  }
  
  async componentDidMount(){
      this.getUsers(this.getPosts);    
  }

  navigate = (selectedView) =>{
    if(selectedView === 'selectedPost'){
      this.setState({view: "selectedPost"});
    }
  }
  

  getPosts = async() => {
      try{
          const resp  = await fetch('https://jsonplaceholder.typicode.com/posts');
          const postData = await resp.json();

          postData.map( (object) => {
              this.state.users.forEach(user => {
                  if(user.id === object.userId){
                      object.userName = user.name;
                      object.userWebsite = user.website;
                      object.userPhone = user.phone;
                      object.userCompanyName = user.company.name;
                  }
              });
              return object;
          });
          this.setState({posts: postData});
      }catch(error){
          console.log("Error getting Posts: "+error);
      }
  }

  getUsers = async(cb) => {
      const resp = await fetch("https://jsonplaceholder.typicode.com/users");
      const usersData = await resp.json();
      this.setState({users: usersData});
      cb();
  }

  setActivePost = (id) =>{
    this.state.posts.forEach(post => {
      if(post.id === id){
        this.setState({activePost: post});
      }
    });
    this.navigate('selectedPost');
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.view === 'posts' && <Posts posts={this.state.posts} setActivePost = {this.setActivePost}/>}
        {this.state.view === 'selectedPost' && <SelectedPost activePost={this.state.activePost} />}
        <Footer />
      </div>
    );
  }
}

export default App;
