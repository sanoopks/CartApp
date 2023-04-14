import React, {useEffect, useState} from 'react';
import {
  Box,
  FlatList,
  Input,
  Pressable,
  ScrollView,
  Text,
  useToast,
} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {addItem} from '../cart/CartSlice';
import {
  fetchCategories,
  fetchProducts,
  getApiStatus,
  getCategories,
  getProducts,
} from './HomeSlice';
import Item from './Item';
import Category from './Category';

function Home(props) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const apiStatus = useSelector(getApiStatus);
  const categories = useSelector(getCategories);
  const products = useSelector(getProducts);
  const toast = useToast();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  useEffect(() => {
    if (categories.length) {
      fetchCategoryProducts(categories[0].strCategory);
    }
  }, [categories]);

  useEffect(() => {
    filterProducts(search);
  }, [search]);

  const fetchCategoryProducts = category => {
    dispatch(fetchProducts(category));
  };

  const filterProducts = key => {
    if (key !== '' && products.length) {
      const newItems = products.filter(p => {
        console.log('P', p.strMeal, key);
        let myReg = new RegExp(key, 'gi');
        // return p.strMeal.startsWith(key);
        return p.strMeal.match(myReg);
      });
      if (newItems.length) {
        setFilteredProducts(newItems);
      } else {
        toast.show({
          description: 'No data found',
        });
        setFilteredProducts([]);
      }
    } else {
      setFilteredProducts([]);
    }
  };

  return (
    <Box marginY={3} marginX={2}>
      <Input onChangeText={setSearch} value={search} margin={2} />
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
        {categories.map(category => (
          <Category
            data={category}
            onChange={category => fetchCategoryProducts(category)}
          />
        ))}
      </ScrollView>
      <FlatList
        data={filteredProducts.length ? filteredProducts : products}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <Pressable
            my={2}
            flex={1}
            mx={2}
            onPress={() => {
              props.navigation.navigate('Detail', {
                data: item,
              });
            }}>
            <Item data={item} />
          </Pressable>
        )}
        keyExtractor={item => item.idMeal}
        columnWrapperStyle={{
          paddingHorizontal: 3,
        }}
        contentContainerStyle={{
          paddingBottom: 30,
        }}
        style={{
          marginTop: 10,
        }}
        ListEmptyComponent={() =>
          apiStatus == '' || apiStatus == 'pending' ? (
            <Text>Loading....</Text>
          ) : (
            <Text>No data found</Text>
          )
        }
      />
    </Box>
  );
}

export default Home;
