
import React from 'react'
import '../styles/ItemCard.css'

function ProductCard(props) {

    return (
        <div className="itemCardDiv">

            <img className="itemImage" src={`http://localhost:5000/images/${props.ImageUrl}`} />

            <div className="starImagesDiv">
                <img className="starImage" src={props.Quality > 0 ? "/images/fullStar.png" : "/images/emptyStar.png"} />
                <img className="starImage" src={props.Quality > 1 ? "/images/fullStar.png" : "/images/emptyStar.png"} />
                <img className="starImage" src={props.Quality > 2 ? "/images/fullStar.png" : "/images/emptyStar.png"} />
                <img className="starImage" src={props.Quality > 3 ? "/images/fullStar.png" : "/images/emptyStar.png"} />
                <img className="starImage" src={props.Quality > 4 ? "/images/fullStar.png" : "/images/emptyStar.png"} />
            </div>

            <span className="priceSpan">Price: {props.Price}🪙</span>
            <span className="descriptionSpan">{props.Description}</span>
            
        </div>
    )
    
}

export default ProductCard;
