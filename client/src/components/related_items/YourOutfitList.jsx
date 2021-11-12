import React, {useState, useEffect} from 'react';
import useLocalStorageState from 'use-local-storage-state';
import OutfitCard from './YourOutfitCard.jsx';
import {CarouselProvider, Slider, Slide, ButtonBack, ButtonNext } from 'pure-react-carousel';
import {PlusCircle} from 'react-bootstrap-icons';
import api from '../../utils/api.js';

const YourOutfitList = ({product_id}) => {
  const [storageOutfitItems, setStorageOutfitItems] = useLocalStorageState('outfitItems', [])
  const [outfitItems, setOutfitItems] = useState(storageOutfitItems)
  useEffect (() => setStorageOutfitItems(outfitItems),[]);

  useEffect (() => setStorageOutfitItems(outfitItems),[outfitItems]);

  const getProductFunction = async () => {
    let productData;

    await api.getProduct(product_id)
      .then(res => productData = res.data)
      .then(() => api.getMetadata({product_id}))
      .then(res => productData['ratings'] = res.data.ratings)
      .then(() => api.getProductStyles(product_id))
      .catch(() => console.log('error, cannot fetch API', err))
      .then(res => productData['image'] = res.data.results[0].photos[0].thumbnail_url)
      .then(() => setOutfitItems([...outfitItems, productData]))
      .catch(err => console.log('error, cannot change outfit items state', err))
  };

  const addNewOutfitClick = (productId) => {
    let productFound = false;

    for (let i = 0; i < outfitItems.length; i++) {
      if (product_id === outfitItems[i].id) {
        productFound = true;
      }
    }
    if (productFound === false) {
      getProductFunction()
    } else return;
  };

  const removeListItem = (id) => {
    let filteredItems = outfitItems.filter(outfitItem => outfitItem.id !== id);
    setOutfitItems(filteredItems);
  };

  return(
    <div className = 'product-list'>
    <h1 className = 'heading-list'>YOUR OUTFITS</h1>
    <CarouselProvider
      className = 'items-carousel'
      // naturalSlideHeight = {200}
      // naturalSlideWidth = {200}
      totalSlides = {outfitItems.length + 1}
      visibleSlides = {3}
      dragEnabled = {false}
    >
      <Slider className = 'carousel__slider'>
         <Slide
            index = {0}
            style = {{
              width: '23rem',
              height: '32rem',
              border: 'none',
              marginRight: '3rem',
              position: 'relative',
              zIndex: '2',
              borderRadius: '15px',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
            <div data-testid="addition-card" className = 'product-card add-card' onClick = {(event) => addNewOutfitClick(product_id)}>
              <PlusCircle size = {55}
                 style = {{
                   display: 'block',
                }}
              />
              <p className = 'plus-card-caption'>Add to Outfit</p>
            </div>
        </Slide>
        {outfitItems.map(outfitItem => (
          <Slide
            key = {outfitItem.id}
            index = {Math.random()}
            style = {{
              width: '23rem',
              height: '32rem',
              marginTop: '0',
              marginBottom: '1rem',
              border: 'none',
              marginRight: '3rem',
              position: 'relative',
              borderRadius: '15px',
              boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
            }}
          >
          <OutfitCard
            key = {outfitItem.id}
            id = {outfitItem.id}
            image = {outfitItem.image}
            name = {outfitItem.name}
            category = {outfitItem.category}
            price = {outfitItem.default_price}
            rating = {outfitItem.ratings}
            removeListItem = {removeListItem}
          />
        </Slide>
        ))}
      </Slider>
    </CarouselProvider>
  </div>
  )
};

export default YourOutfitList;