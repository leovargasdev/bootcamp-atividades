import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  SubmitButton,
  Form,
  Input,
  List,
  User,
  ProfileButton,
  ProfileButtonText,
  Avatar,
  Name,
  Bio,
  RemoveProfileButton,
  RemoveProfileButtonText,
} from './styles';

import api from '../../services/api';

export default class Main extends Component {
  static navigationOptions = () => ({
    title: 'Usuários',
  });

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  state = {
    users: [],
    loading: false,
    newUser: '',
  };

  // async componentDidMount() {
  //   const users = await AsyncStorage.getItem('users');

  //   if (users) {
  //     this.setState({
  //       users: JSON.parse(users),
  //     });
  //   }
  // }

  componentDidUpdate(_, prevState) {
    const { users } = this.state;

    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const { users, newUser } = this.state;
    this.setState({ loading: true });
    const response = await api.get(`users/${newUser}`);

    const data = {
      name: response.data.name,
      login: response.data.login,
      bio: response.data.bio,
      avatar: response.data.avatar_url,
    };

    this.setState({
      users: [...users, data],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const { navigation } = this.props;
    navigation.navigate('User', { user });
  };

  handleRemoveUser = user => {
    const { users } = this.state;
    const itemRemove = users.findIndex(s => s.login === user.login);
    console.tron.log(itemRemove);
    users.slice(itemRemove, 1);
    this.setState({
      users,
    });
  };

  render() {
    const { users, newUser, loading } = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({ newUser: text })}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton loading={loading} onPress={this.handleAddUser}>
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>
        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({ item }) => (
            <User>
              <Avatar source={{ uri: item.avatar }} />
              <Name>{item.name}</Name>
              {item.bio ? <Bio>{item.bio}</Bio> : null}
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver Perfil</ProfileButtonText>
              </ProfileButton>

              <RemoveProfileButton onPress={() => this.handleRemoveUser(item)}>
                <RemoveProfileButtonText>
                  Remover Perfil
                </RemoveProfileButtonText>
              </RemoveProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
