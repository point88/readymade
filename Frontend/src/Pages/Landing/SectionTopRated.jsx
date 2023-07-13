import { useEffect, useState } from 'react'
import { LandTitle } from '../../Components/Titles'
import { TopRatedCards } from '../../Services/constants/LandingPage'
import { TopRatedCard } from '../../Components/Cards/LandingPage'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import LeftArrowIcon from '../../Assests/Images/leftarrow.png'
import RightArrowIcon from '../../Assests/Images/rightarrow.png'
import { Box } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AuthService from '../../Services/auth'

export default function SectionTopRated() {
  const [toprates, setToprates] = useState([])
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1646 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1645, min: 956 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet1: {
      breakpoint: { max: 955, min: 661 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 660, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  const CustomLeftArrow = ({ onClick, ...rest }) => {
    // const {
    //   onMove,
    //   carouselState: { currentSlide, deviceType },
    // } = rest
    return (
      <Box
        onClick={() => onClick()}
        component="img"
        src={LeftArrowIcon}
        className="xl:hidden cursor-pointer absolute bg-transparent rounded-full top-[60%] sm:top-[45%] left-0"
      />
    )
  }

  const CustomRightArrow = ({ onClick, ...rest }) => {
    // const {
    //   onMove,
    //   carouselState: { currentSlide, deviceType },
    // } = rest
    return (
      <Box
        onClick={() => onClick()}
        component="img"
        src={RightArrowIcon}
        className="xl:hidden cursor-pointer absolute bg-transparent rounded-full top-[60%] sm:top-[45%] right-0"
      />
    )
  }

  const { t } = useTranslation()

  useEffect(() => {
    const getdata = async () => {
      const data = await AuthService.getTopRates(5)
      setToprates(data)
    }
    getdata()
  }, [])
  return (
    <div className="w-full flex justify-center items-center">
      <div className="w-full px-[26px] sm:px-[40.89px] xl:px-[93px] pt-[19px] sm:pt-[45px] xl:pt-[52px]">
        <LandTitle text={t('topratedsectiontitle')} />
        <div className="pt-[28px] flex -mx-[21px] w-[cal(100%-21px)] sm:-mx-[0px] sm:w-[cal(100%-0px)] xl:-mx-[38.5px] xl:w-[cal(100%-93px)]">
          <Carousel
            swipeable={false}
            draggable={false}
            showDots={true}
            responsive={responsive}
            ssr={true}
            infinite={true}
            containerClass={
              'carousel-container w-full h-[380px] mb:h-[400px] xl:h-[550px]'
            }
            shouldResetAutoplay={false}
            customLeftArrow={<CustomLeftArrow />}
            customRightArrow={<CustomRightArrow />}
            arrows={true}
          >
            {TopRatedCards.map((CardData, index) => (
              <div
                key={index}
                className="flex px-[21px] sm:px-[13.5px] xl:px-[38.5px]"
              >
                <TopRatedCard
                  image={CardData.image}
                  rating={CardData.rating}
                  title={t(CardData.title)}
                  name={CardData.name}
                  hourlyRate={CardData.hourlyRate}
                  bio={t(CardData.bio)}
                  skills={CardData.skills}
                />
              </div>
            ))}
            {/* {toprates.map((CardData, index) => (
              <div
                key={index}
                className="px-[21px] sm:px-[13.5px] xl:px-[38.5px]"
              >
                <TopRatedCard
                  image={CardData.profile_image}
                  rating={CardData.rating}
                  title={t('expertfreelancer')}
                  name={CardData.first_name + ' ' + CardData.last_name}
                  hourlyRate={CardData.hourly}
                  bio={CardData.bio}
                  skills={CardData.category}
                />
              </div>
            ))} */}
          </Carousel>
        </div>
      </div>
      <style>{`
                .react-multi-carousel-dot button {
                    background: #c2c2c2;
                    width: 15px;
                    height: 15px;
                    border: none;
                }
                .react-multi-carousel-dot--active button {
                    background: #009c00;
                    width: 15px;
                    height: 15px;
                    border: none;
                }
                .react-multi-carousel-list {
                    display: flex;
                    align-items: stretch;
                    overflow: hidden;
                    position: relative;
                }
            `}</style>
    </div>
  )
}
