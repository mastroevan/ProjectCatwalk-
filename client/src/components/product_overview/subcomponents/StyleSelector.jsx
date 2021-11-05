import React, { useEffect } from 'react';
import ReviewsStars from './styleSelectorSubComponents/ReviewsStars.jsx';


const StyleSelector = ({ product, styles, currentStyle, setCurrentStyle }) => {

    let sizes = [];
    let quantities = [];

    if (styles[0] !== undefined) {
        let skus = styles[currentStyle].skus
        let highest = 0
        for (var sku in skus) {
            sizes.push(skus[sku].size);
            if (skus[sku].quantity > highest) {
                highest = skus[sku].quantity
            }
            quantities.push(skus[sku].quantity)
        }
    }

    return (
        <div style={{ background: 'none', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignContent: 'center', flexBasis: '42%', padding: '25px' }}>
            <ReviewsStars />
            <span style={{ fontSize: '1.25em' }}>{product.category}</span>
            <span style={{ fontSize: '3em', fontWeight: 'bold' }}>{product.name}</span>
            <span style={{ fontSize: '1.25em', paddingTop: '15px' }}>${styles[0] ? styles[currentStyle].original_price : ''}</span>
            <div style={{ fontSize: '1.25em', paddingTop: '20px', display: 'flex' }}>
                <span style={{ fontWeight: 'bold', marginRight: '10px' }}>STYLE: </span>
                <span>{styles[0] ? styles[currentStyle].name : ''}</span>
            </div>
            {/* Style Images  */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', padding: '20px', width: '450px' }}>
                {styles[0] ?
                    styles.map((style, index) => {
                        return <div style={{ width: '70px', height: '70px', padding: '.75em' }}>
                            <img src={style.photos[0].thumbnail_url} id={index} alt="" onClick={(e) => { setCurrentStyle(e.target.id) }} style={{ border: '2px solid black', width: '100%', height: '100%', objectFit: 'cover', marginBottom: '1em', borderRadius: '50px' }} />
                        </div>
                    })
                    : <img></img>
                }
            </div>
            {/* Options */}
            <div>
                <select name="size" id="size" style={{ fontSize: '1.5em', paddingLeft: '50px', paddingRight: '70px', paddingTop: '20px', paddingBottom: '20px', marginLeft: '.2em', marginRight: '.25em' }}>
                    <option value="SELECT SIZE" selected='selected' disabled>SELECT SIZE</option>
                    {sizes.length > 0 ? 
                        sizes.map(size => {
                            return <option>{size}</option>
                        })
                    : <option value="SELECT SIZE" defaultValue disabled></option>
                    }
                </select>
                <select name="quantity" id="quantity" style={{ fontSize: '1.5em', paddingLeft: '50px', paddingRight: '70px', paddingTop: '20px', paddingBottom: '20px', marginLeft: '.2em', marginRight: '.2em' }}>
                    <option value="-" selected='selected' disabled></option>
                    {quantities.length > 0 ? 
                        quantities.map(quantity => {
                            return <option>{quantity}</option>
                        })
                    : <option value="-" defaultValue disabled></option>
                    }
                </select>
            </div>
            {/* Add To Cart and Favorite  */}
            <div>
                <select name="quantity" id="quantity" style={{ fontSize: '1.5em', paddingLeft: '50px', paddingRight: '70px', paddingTop: '20px', paddingBottom: '20px', marginLeft: '.2em', marginRight: '.2em', marginTop: '1em' }}>
                    <option value="">ADD TO BAG</option>
                </select>
                <select name="quantity" id="quantity" style={{ fontSize: '1.5em', paddingLeft: '50px', paddingRight: '70px', paddingTop: '20px', paddingBottom: '20px', marginLeft: '.2em', marginRight: '.2em', marginTop: '1em' }}>
                    <option value="">&#9734;</option>
                </select>
            </div>
        </div>
    )

}

export default StyleSelector;