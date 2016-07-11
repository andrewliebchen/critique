import moment from 'moment';

const expireMessage = (lifespan) => {
  if (lifespan > 0) {
    return `Image expires in ${Math.round(lifespan)} hour${lifespan > 1 ? 's' : ''} at ${moment().add(lifespan, 'hour').format('h:mma [on] dddd MMM Do')}`;
  } else {
    return 'Image never expires 🌟';
  }
}

export default expireMessage;
