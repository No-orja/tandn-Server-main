import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
//Image
import mobile from '../../Image/mobile.png'
import LeftButton from './LeftButton';
import RightButton from './RightButton';

export default function ProductGellery({id, products}){
    console.log(products)
    // Build the gallery from the cover + extra images, dropping empties and any
    // duplicate of the cover so a single uploaded image never shows twice.
    const sources = [products.imageCover, ...(products.images || [])]
        .filter(Boolean)
        .filter((src, index, arr) => arr.indexOf(src) === index);
    const images = sources.map((src) => ({ original: src }));
    return(
        <div className="product-gallary-card d-flex justfiy-content-center  align-items-center pt-2" style={{height:"100%", width:"100%"}}>
            <ImageGallery
                additionalClass="tandin-gallery"
                items={images}
                defaultImage={mobile}
                showFullscreenButton={false}
                isRTL={true}
                showPlayButton={false}
                showThumbnails={false}
                renderRightNav={RightButton}
                renderLeftNav={LeftButton}
            />
        </div>
    )
}