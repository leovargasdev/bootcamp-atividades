import React from 'react';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';

export default function Home() {
  return (
    <ProductList>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-direct-masculino/20/D22-2835-120/D22-2835-120_zoom1.jpg"
          alt=""
        />
        <strong>Tênis Topper</strong>
        <span>R$ 1.000,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 10
          </div>
          <span>Adicionar ao Carrinho</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-direct-masculino/20/D22-2835-120/D22-2835-120_zoom1.jpg"
          alt=""
        />
        <strong>Tênis Tope Tope Tope Tope Tope Tope Tope Tope Tope Tope</strong>
        <span>R$ 1.000,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 10
          </div>
          <span>Adicionar ao Carrinho</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-direct-masculino/20/D22-2835-120/D22-2835-120_zoom1.jpg"
          alt=""
        />
        <strong>Tênis Topper</strong>
        <span>R$ 1.000,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 10
          </div>
          <span>Adicionar ao Carrinho</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-direct-masculino/20/D22-2835-120/D22-2835-120_zoom1.jpg"
          alt=""
        />
        <strong>Tênis Topper</strong>
        <span>R$ 1.000,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 10
          </div>
          <span>Adicionar ao Carrinho</span>
        </button>
      </li>
      <li>
        <img
          src="https://static.netshoes.com.br/produtos/tenis-olympikus-direct-masculino/20/D22-2835-120/D22-2835-120_zoom1.jpg"
          alt=""
        />
        <strong>Tênis Topper</strong>
        <span>R$ 1.000,00</span>

        <button type="button">
          <div>
            <MdAddShoppingCart size={16} color="#fff" /> 10
          </div>
          <span>Adicionar ao Carrinho</span>
        </button>
      </li>
    </ProductList>
  );
}
