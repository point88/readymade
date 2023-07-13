import { LandTitle } from '../../Components/Titles'
import {
  // ServicesTitle,
  ServiceCards,
} from '../../Services/constants/LandingPage'
import { ServiceCard } from '../../Components/Cards/LandingPage'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import LeftArrowIcon from '../../Assests/Images/leftarrow.png'
import RightArrowIcon from '../../Assests/Images/rightarrow.png'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
export default function SectionServices() {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1400 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop1: {
      breakpoint: { max: 1399, min: 1300 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1299, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet1: {
      breakpoint: { max: 1023, min: 768 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 767, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    // const {
    //   onMove,
    //   carouselState: { currentSlide, deviceType }
    // } = rest
    return (
      <Box
        onClick={() => onClick()}
        component="img"
        src={LeftArrowIcon}
        className="cursor-pointer absolute bg-transparent rounded-full top-[45%] left-0"
      />
    )
  }
  const { t } = useTranslation()
  const CustomRightArrow = ({ onClick, ...rest }) => {
    // const {
    //   onMove,
    //   carouselState: { currentSlide, deviceType }
    // } = rest
    return (
      <Box
        onClick={() => onClick()}
        component="img"
        src={RightArrowIcon}
        className="cursor-pointer absolute bg-transparent rounded-full top-[45%] right-0"
      />
    )
  }

  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full px-[26px] sm:px-[40.89px] xl:px-[93px] pt-[19px] sm:pt-[45px] xl:pt-[52px]">
        <LandTitle text={t('servicetitle')} />
        <div className="pt-[28px] -mx-[21px] w-[cal(100%-21px)] sm:-mx-[0px] sm:w-[cal(100%-0px)] xl:-mx-[15px] xl:w-[cal(100%-93px)]">
          <Carousel
            swipeable={false}
            draggable={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            containerClass="carousel-container w-full"
            shouldResetAutoplay={false}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            arrows={true}
          >
            {ServiceCards.map((CardData, index) => (
              <div
                key={index}
                className="px-[21px] sm:px-[13.5px] xl:px-[15px]"
              >
                <ServiceCard
                  id={index}
                  image={CardData.image}
                  subTitle={t(CardData.subTitle)}
                  title={t(CardData.title)}
                />
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  )
}
