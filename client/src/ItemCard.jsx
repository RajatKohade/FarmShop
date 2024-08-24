import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import {Link} from 'react-router-dom'
export default function ItemCard(props) {
  return (
    <Card sx={{ maxWidth: 345 ,margin:'10px'}}>
      <CardMedia
        sx={{ height: 140 }}
        image={props.obj.path}
        title={props.obj.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" >
          {props.obj.title}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Seller : {props.obj.seller}
        </Typography>
        <Typography gutterBottom variant="h6" component="div">
          Price : {props.obj.price} Rs/kg
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Discription : {props.obj.decription}
        </Typography>
      </CardContent>
      <CardActions>
      <TextField
          id="outlined-number"
          label="Quantity"
          type="number"
          defaultValue={1}
          InputLabelProps={{
            shrink: true,
          }}/>
        <Link to='/addcart'>Add to Cart</Link>
      </CardActions>
    </Card>
  );
}