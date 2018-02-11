import React, {Component} from 'react';

class Photos extends Component{
    constructor(){
        super();
        this.state={
            photos: [],
        }
    }

    async componentDidMount(){
        await this.getPhotos();
    }

    getPhotos = async() => {
        const resp = await fetch("https://jsonplaceholder.typicode.com/photos?albumId="+this.props.album);
        const photoData = await resp.json();
        this.setState({photos: photoData});
    }

    render(){

        const {photos} = this.state;

        return(
            <div>
                    <h4>{this.props.user}'s Album, {this.props.albumTitle}</h4>
                    {photos.map(photo=>
                        <div key={photo.id}><img src={photo.url} alt={photo.title}/></div>
                    )}

            </div>
        );
    }
}

export default Photos;