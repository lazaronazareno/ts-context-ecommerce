import fullStar from '../assets/star.png'
import halfStar from '../assets/star-half.png'
import emptyStar from '../assets/star-empty.png'

interface Props {
  rating: number
  maxStars: number
  userReviews: number
}

const Rating: React.FC<Props> = ({ rating, maxStars, userReviews }) => {
  const fullStars = Math.floor(rating)
  const isHalfStar = rating % 1 >= 0.5

  return (
    <div className='rating'>
      {Array(fullStars).fill(0).map((_item, index) => (
        <img key={index} src={fullStar} alt="Full star" />
      ))}

      {isHalfStar && (
        <img src={halfStar} alt="Half star" />
      )}

      {Array(maxStars - fullStars - (isHalfStar ? 1 : 0)).fill(0).map((_item, index) => (
        <img key={index} src={emptyStar} alt="Empty star" />
      ))}

      {
        (userReviews !== 0)
          ? <p>({userReviews})</p>
          : <p>(17)</p>
      }
    </div>
  )
}

export default Rating
