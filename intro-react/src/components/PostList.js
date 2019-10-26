import React, {Component} from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import faker from 'faker';
import Post from './Post';

faker.locale = "pt_BR";

class PostList extends Component {
  state = {  posts: []  };
  
  setAuthor = () => {
    const idPhoto = Math.floor(Math.random() * (10000000 - 19999999)) + 19999999;
    return {
      name: faker.name.findName(),
      avatar: `https://avatars2.githubusercontent.com/u/${idPhoto}?s=460&v=4`,
    };
  }

  setDatePrettier = () => format( 
    faker.date.past(),
    "dd 'de' MMMM 'de' yyyy 'às' H:mm'h'",
    { locale: pt }
  );

  setComment = (postId) => {
    return {
      id: postId,
      author: this.setAuthor(),
      content: faker.lorem.lines(),
    }
  }

  setComments = () => {
    const nComments = Math.floor(Math.random() * (5)), comments = [];
    for(let c = 0; c < nComments; c++){
      comments.push(this.setComment(c));
    }
    return comments;
  }

  setNewPost = () => {
    return {
      id: this.state.posts.length,
      author: this.setAuthor(),
      date: this.setDatePrettier(),
      content: faker.lorem.sentences(),
      comments: this.setComments(),
    };
  }

  // Ao carregar a página verifica se não existe posts no localStorage.
  componentDidMount(){
    const posts = localStorage.getItem('posts')
    
    if(posts) this.setState({posts: JSON.parse(posts)})
  }

  componentDidUpdate(_, prevState) {
    if(prevState.posts !== this.state.posts){
      localStorage.setItem('posts', JSON.stringify(this.state.posts))
    }
  }

  handleNewPost = () => {
    this.setState({
      posts: [...this.state.posts, this.setNewPost()],
    });
  };

  handleResetPost = () => {
    this.setState({ posts: [] });
  };

  handleNewComment = (postId) => {
    const { posts } = this.state;
    posts[postId].comments.push(this.setComment(posts[postId].comments.length));
    this.setState({ posts });
  };

  render() {
    return(
      <div id="post-list">
        <button id="btn-reset-posts" onClick={this.handleResetPost}>
          Reset Posts
        </button>
        {this.state.posts.map(post => <Post {...post} key={post.id} newComment={() => this.handleNewComment(post.id)}/>)}
        <button id="btn-new-post" onClick={this.handleNewPost}>
          New Post
        </button>
      </div>
    );
  }
}

export default PostList;