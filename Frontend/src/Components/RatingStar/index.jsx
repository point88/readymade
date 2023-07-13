import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';
import StarFillIcon from '../../Assests/Images/starfill.png';
import StarEmptyIcon from '../../Assests/Images/starempty.png';
import { Box } from '@mui/material';
const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
      color: '#ff6d75',
    },
    '& .MuiRating-iconHover': {
      color: '#ff3d47',
    },
  });

export default function RatingStar({value}) {
    return (
        // <Rating name="read-only" value={value} readOnly className=''/>
        <StyledRating
        name="customized-color"
        value={value}
        readOnly 
        className='gap-[3px]'
        precision={0.5}
        icon={<Box component="img" src={StarFillIcon} />}
        emptyIcon={<Box component="img" src={StarEmptyIcon} />}
      />
    );
}