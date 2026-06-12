import React from 'react'
import "react-image-gallery/styles/css/image-gallery.css";
import ImageGallery from "react-image-gallery";
//Image
import mobile from '../../Image/mobile.png'
import LeftButton from './LeftButton';
import RightButton from './RightButton';

export default function ProductGellery({id, products}){
    console.log(products)
    const images = [
        { original: products.imageCover },
        ...(products.images ? products.images.map(img => ({ original: img })) : [])
    ];
    return(
        <div className="product-gallary-card d-flex justfiy-content-center  align-items-center pt-2" style={{height:"100%", width:"100%"}}>
            <ImageGallery 
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