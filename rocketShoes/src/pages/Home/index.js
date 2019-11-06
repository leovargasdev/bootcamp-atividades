import React, { useState, useEffect } from 'react';

import { List } from 'react-native';
import { Container, Titulo, Product } from './styles';
import api from '../../services/api';

export default function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function loadProduts() {
      const response = await api.get('products');
      const data = response.data.map(product => ({
        ...product,
        priceFormatted: 'formatPrice(product.price)',
      }));
      console.tron.log(data);
      setProducts(data);
    }
    loadProduts();
  }, []);

  return (
    <Container>
      <Titulo>asda</Titulo>

      {/* <List
        data={products}
        keyExtractor={product => product.id}
        renderItem={({ item }) => (
          <Product>
            <Titulo>{item.title}</Titulo>
            <Titulo>{item.price}</Titulo>
          </Product>
        )}
      /> */}
    </Container>
  );
}
