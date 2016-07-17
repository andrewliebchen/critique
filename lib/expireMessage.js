import moment from 'moment';

const expireMessage = (lifespan) => {
  if (lifespan > 0) {
    const duration = lifespan > 0 ? `${Math.round(lifespan)} hours` : `${Math.round(lifespan * 60)} minutes`;
    return `Image expires in ${duration} at ${moment().add(lifespan, 'hour').format('h:mma [on] dddd[,] MMMM D')}`;
  } else {
    return 'Image never expires 🌟';
  }
}

export default expireMessage;
