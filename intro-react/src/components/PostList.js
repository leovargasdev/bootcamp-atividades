import React, {Component} from 'react';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import faker from 'faker';
import Post from './Post';

faker.locale = "pt_BR";

class PostList extends Component {
  state = {  posts: []  };
  
  getAuthor = () => {
    const idPhoto = Math.floor(Math.random() * (10000000 - 19999999)) + 19999999;
    return {
      name: faker.name.findName(),
      avatar: `https://avatars2.githubusercontent.com/u/${idPhoto}?s=460&v=4`,
    };
  }

  getDatePrettier = () => format( 
    faker.date.past(),
    "dd 'de' MMMM 'de' yyyy 'às' H:mm'h'",
    { locale: pt }
  );

  getComments = () => {
    const nComments = Math.floor(Math.random() * (10)), comments = [];
    for(let c = 0; c < nComments; c++){
      comments.push({
        id: c,
        author: this.getAuthor(),
        date: this.getDatePrettier(),
        content: faker.lorem.lines(),
      });
    }
    return comments;
  }

  setNewPost = () => {
    return {
      id: this.state.posts.length,
      author: this.getAuthor(),
      date: this.getDatePrettier(),
      content: faker.lorem.sentences(),
      comments: this.getComments(),
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

  render() {
    return(
      <div id="post-list">
        {this.state.posts.map(post => <Post {...post} key={post.id} />)}
        <button onClick={this.handleNewPost}>Novo Post</button>
      </div>
    );
  }
}

export default PostList;