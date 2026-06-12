import Carousel from 'react-bootstrap/Carousel';
import React,{ useState } from 'react';

// استيراد الصور
import sliderimg from "../../Image/slider1.png"
import slider4 from "../../Image/slider4.png"
import prod3 from "../../Image/prod3.png"
import prod4 from "../../Image/prod4.png"
//The use of flex-row
export default function SliderBootStrap() {
    const [index, setIndex] = useState(0)
    const handlSelect = (selectedIndex) =>{
        setIndex(index)
    }
  return (
    <Carousel>
      <Carousel.Item className='slider-background' interval={2000} onSelect={handlSelect}>
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <img
            style={{height:"296px", width:"313.53px"}}
            className=""
            src={sliderimg}
            alt="First slide"
            />
        </div>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='slider-background2' interval={2000}>
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <img
            style={{height:"296px", width:"313.53px"}}
            className=""
            src={slider4}
            alt="First slide"
            />
        </div>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='slider-background3' interval={2000}>
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <img
            style={{height:"296px", width:"313.53px"}}
            className=""
            src={prod3}
            alt="First slide"
            />
        </div>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item className='slider-background4' interval={2000}>
        <div className='d-flex flex-row justify-content-center align-items-center'>
            <img
            style={{height:"296px", width:"313.53px"}}
            className=""
            src={prod4}
            alt="First slide"
            />
        </div>

        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>

    </Carousel>
  );
}
