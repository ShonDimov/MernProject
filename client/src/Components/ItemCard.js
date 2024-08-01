
import React from 'react'
import '../styles/ItemCard.css'

function ItemCard() {

    return (
        <div className="itemCardDiv">

            <img className="itemImage" src="/images/blank.png" />

            <div className="starImagesDiv">
                <img className="starImage" src="/images/emptyStar.png" />
                <img className="starImage" src="/images/emptyStar.png" />
                <img className="starImage" src="/images/emptyStar.png" />
                <img className="starImage" src="/images/emptyStar.png" />
                <img className="starImage" src="/images/emptyStar.png" />
            </div>
            
            <span className="priceSpan">Price: 100$</span>
            <span className="descriptionSpan">aaaa afg asjdfghakuf gnafu gnafuil gbafu gbaf ugbaf gbaf h gf</span>
            
        </div>
    )
    
}

export default ItemCard;
