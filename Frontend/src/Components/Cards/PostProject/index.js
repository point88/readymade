import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n'

const PostCard = ({
  selected,
  isRecommend,
  icon,
  title,
  description,
  onClick,
  rate,
}) => {
  const { t } = useTranslation()
  const lng = i18n.language === 'en' ? true : false
  return (
    <div
      onClick={onClick}
      className={`rounded-md relative w-full cursor-pointer mt-5 ${
        selected
          ? 'border-2 border-green'
          : 'border border-lightgreen shadow-md'
      }`}
    >
      {isRecommend && (
        <div
          className={`absolute ${
            lng
              ? '-right-3 bg-[url("./Assests/Images/bookmarkrtl.svg")]'
              : '-left-3 bg-[url("./Assests/Images/bookmarkltr.svg")] text-left'
          } w-28 sm:w-32 h-5 sm:h-6 top-2 px-5 bg-no-repeat bg-contain text-xs sm:text-sm text-white`}
        >
          {t('post.recommend')}
        </div>
      )}
      <div className="flex items-center my-3 mx-4 py-0 sm:py-5 px-2">
        <img src={icon} className="mt-3" alt="Icon" />
        <div className={`${lng ? 'ml-5' : 'mr-5'} relative`}>
          <div className="font-bold text-[15px] sm:text-lg lg:text-xl">
            {title}
          </div>
          <div className="mt-2 sm:mt-4 text-xs sm:text-sm lg:text-base leading-4 sm:leading-6 max-w-2/3">
            {description}
          </div>
          {!!rate && (
            <div className="text-right sm:text-left mt-0 sm:mt-5 text-xs sm:text-base">
              {rate}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCard
