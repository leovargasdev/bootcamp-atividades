import React, { Component } from 'react';
import PropTypes from 'prop-types';
import api from '../../services/api';

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  LoadingStars,
} from './styles';

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  });

  static propTypes = {
    navigation: PropTypes.shape({
      getParam: PropTypes.func,
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    stars: [],
    loadingStars: true,
    page: 1,
    user: {},
    refreshing: false,
  };

  async componentDidMount() {
    const { navigation } = this.props;
    const user = navigation.getParam('user');

    const response = await api.get(`users/${user.login}/starred`);
    console.tron.log(response.data.length);
    this.setState({
      user,
      stars: response.data,
      loadingStars: false,
      refreshing: false,
    });
  }

  refreshList = () => {
    this.setState({ refreshing: true, stars: [] }, this.loadMore);
  };

  loadMore = async () => {
    const { stars, user, page } = this.state;
    const auxPage = page + 1;
    console.tron.log(stars.length);
    const response = await api.get(`users/${user.login}/starred`, {
      params: { auxPage },
    });
    this.setState({
      stars: [...stars, ...response.data],
      page: auxPage,
    });
  };

  handleNavigate = repo => {
    const { navigation } = this.props;
    navigation.navigate('Repository', { repo });
  };

  render() {
    const { stars, loadingStars, user, refreshing } = this.state;
    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loadingStars ? (
          <LoadingStars size={100} />
        ) : (
          <Stars
            // onRefresh={this.refreshList}
            // refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item && item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    );
  }
}
