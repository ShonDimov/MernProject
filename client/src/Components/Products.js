
import React from 'react'
import '../styles/Products.css'
import ProductCard from './ProductCard';
import { getCards } from '../api'

function Products(props) {

    const [products, setProducts] = React.useState([])

    React.useEffect(() => {

        getCards()
            .then(response => response.data)
            .then(data => {
                setProducts(data)
            })

    })

    return (
        <div>

            <div className="coinsDiv">
                <span>🪙x{props.coins}</span>
            </div>

            <div className="itemCardsDiv">
                { products.map(product =>
                    <ProductCard
                        Name={ product.Name }
                        ImageUrl={ product.ImageUrl }
                        Quality={ product.Quality }
                        Price={ product.Price }
                        Description={ product.Description }
                    />) }
            </div>

        </div>
    )

}

export default Products;
