import React, {Component} from 'react';

class UserAlbums extends Component{
    constructor(){
        super();
        this.state={
            albums: [],
        } 
    }

    async componentDidMount(){
        await this.getAlbums();
    }

    getAlbums = async()=>{
        const resp = await fetch("https://jsonplaceholder.typicode.com/albums?userId="+this.props.selectedUser);
        const albumData = await resp.json();
        this.setState({albums: albumData});
    }

    selectAlbum = (id, title) => {
        this.props.setAlbum(id, title);
    }

    render(){
        const {albums} = this.state;
        return(
            <div>
                <h4>Albums for {this.props.selectedUserName}</h4>
                <div>
                    {
                        albums.map(album => 
                            <div key={album.id}><span className="link" onClick={()=> this.selectAlbum(album.id, album.title)}>{album.title}</span></div>
                        )
                    }

                </div>
            </div>
        );
    }
}


export default UserAlbums;