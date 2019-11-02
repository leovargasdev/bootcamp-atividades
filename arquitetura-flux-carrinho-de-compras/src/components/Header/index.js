import React from 'react';
import { Link } from 'react-router-dom';
import { MdShoppingBasket } from 'react-icons/md';
import { connect } from 'react-redux';

import { Container, Cart } from './styles';

import logo from '../../assets/images/logo.svg';

function Header({ cartQuant }) {
  return (
    <Container>
      <Link to="/">
        <img src={logo} alt="Rockeshoes" />
      </Link>
      <Cart to="/cart">
        <div>
          <strong>Meu carrinho</strong>
          <span>{cartQuant} itens</span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
}

export default connect(state => ({
  cartQuant: state.cart.length,
}))(Header);
