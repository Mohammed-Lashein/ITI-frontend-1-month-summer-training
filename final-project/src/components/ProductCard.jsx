import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'

function ProductCard({ product: { title, image } }) {
  return (
    <Card
      sx={{
        width: 250,
        height: 230,
        '&:hover': {
          bgcolor: '#f6f6f6',
        },
        // The .MuiCardActionArea-focusHighlight is for an annoying span that is added by MUI on hovering
        // over the CardActionArea component.
        // I disabled that span because I want ALL of the ProductCards to have the
        // background effect on hover (Not just the Action area part)
        '& .MuiCardActionArea-focusHighlight': {
          display: 'none',
        },
        // A nice transition on card hover
        '&:hover .MuiCardMedia-img': {
          transform: 'scale(0.9)',
        },
      }}
    >
      <CardActionArea disableRipple>
        <CardMedia
          component='img'
          height='140'
          image={image}
          alt='green iguana'
          sx={{
            objectFit: 'contain',
            transition: 'transform 0.3s ease-out',
          }}
        />
        <CardContent>
          <Typography
            gutterBottom
            component='div'
            sx={{ fontSize: '16px' }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
export default ProductCard
