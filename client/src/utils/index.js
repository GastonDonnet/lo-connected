exports.catchAsync = (fn) => {
  try {
    fn();
  } catch (error) {
    //console.log('error');
    if (process.env.NODE_ENV == 'development') {
      console.log(error.response);
    }
  }
};
