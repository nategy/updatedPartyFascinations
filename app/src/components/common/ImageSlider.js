import React, {useState} from 'react'
import { SliderData } from './SliderData'
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from 'react-icons/bs'
import image1 from '../common/images/teal.jpg'
import image2 from '../common/images/differentcolors.jpg'
import image3 from '../common/images/lightblue.jpg'
import image4 from '../common/images/orange.jpg'
import image5 from '../common/images/purple.jpg'
import image6 from '../common/images/charcoal.png'
import image7 from '../common/images/textured.jpg'
import image8 from '../common/images/red-textured.jpg'
import image9 from '../common/images/teal-textured.jpg'
import image10 from '../common/images/purple-textured.jpg'
import image11 from '../common/images/beige-textured.jpg'
import image12 from '../common/images/neon.jpg'
import image13 from '../common/images/circular.jpg'

const ImageSlider = ({slides}) => {
  const [current, setCurrent] = useState(0)
  const length = slides.length

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0: current + 1);
  };

  const prevSlide = () =>{
    setCurrent(current === 0 ? length - 1: current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0){
    return null;
  }

  return (
    <section className='slider'>
      
      <BsFillArrowLeftCircleFill className='left-arrow' onClick={prevSlide} />
      {SliderData.map((slide,index) => {
          return(
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
              <img src={slide.image} alt='plain color' className='image' />
              )}
            </div>
          )
        })}
      <BsFillArrowRightCircleFill className='right-arrow' onClick={nextSlide} />
    </section>
  )
}

export default ImageSlider

/*
        {SliderData.map((slide,index) => {
          return(
            <div className={index === current ? 'slide active' : 'slide'} key={index}>
              {index === current && (
              <img src={slide.image} alt='plain color' className='image' />
              )}
            </div>
          )
        })}
                <img src={image1} alt='' className='image' />
        <img src={image2} alt='' className='image' />
        <img src={image3} alt='' className='image' />
        <img src={image4} alt='' className='image' />
        <img src={image5} alt='' className='image' />
        <img src={image6} alt='' className='image' />
        <img src={image7} alt='' className='image' />
        <img src={image8} alt='' className='image' />
        <img src={image9} alt='' className='image' />
        <img src={image10} alt='' className='image' />
        <img src={image11} alt='' className='image' />
        <img src={image12} alt='' className='image' />
        <img src={image13} alt='' className='image' />

*/