import React, { Component } from 'react';
import './App.css';
import Header from './components/header';
import Footer from './components/footer';
import Posts from './components/posts';
import SelectedPost from './components/selectedpost';
import Links from './components/links';
import UserAlbums from './components/useralbums';
import Photos from './components/photos';
import './/redux/reducers/reducer';
import NetworkService from './components/networkservice';

class App extends Component {
  constructor(){
    super();
    this.state = {
      users: [],
      posts: [],
      view: "posts", 
      activePost: {},
      selectedUserId: 1,
      selectedUser: "",
      selectedAlbum: 1,
      albumName: "",
    }
  }
  
  async componentDidMount(){
      this.getUsers(this.getPosts);    
  }

  navigate = (selectedView) =>{
    if(selectedView === 'selectedPost'){
      this.setState({view: "selectedPost"});
    }else if(selectedView === 'posts'){
      this.setState({view: "posts"});
    }else if(selectedView === 'albums'){
      this.setState({view: "albums"});
    }else if(selectedView === 'photos'){
      this.setState({view: "photos"});
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

  setSelectedUser = (id, name) =>{
    this.setState({
      selectedUserId: id,
      selectedUser: name
    });
    this.navigate('albums');
  }

  setSelectedAlbum = (id, title)=>{
    this.setState({
      selectedAlbum: id,
      albumName: title
    });
    this.navigate('photos');
  }

  render() {
    return (
      <div>
        <Header />
        <Links navigate={this.navigate}/>
        {this.state.view === 'photos' && <Photos user={this.state.selectedUser} albumTitle={this.state.albumName} album={this.state.selectedAlbum}/>}
        {this.state.view === 'albums' && <UserAlbums setAlbum={this.setSelectedAlbum} selectedUser={this.state.selectedUserId} selectedUserName={this.state.selectedUser} selectedAlbum={this.setSelectedAlbum}/>}
        {this.state.view === 'posts' && <Posts posts={this.state.posts} setActivePost = {this.setActivePost}/>}
        {this.state.view === 'selectedPost' && <SelectedPost setSelectedUser = {this.setSelectedUser} activePost={this.state.activePost} navigate={this.navigate}/>}
        <Footer />
      </div>
    );
  }
}

export default App;
