export const sendToken = (res, token) =>{ res.cookie('token', token, {
      expires: new Date(Date.now() + process.env.COOKIES_EXPIRES * 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: true, ///process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'None' // Set to 'None' for cross-site cookies
})
}

export const sendExpireToken = (res, token) =>{ 
      res.cookie('token', "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      // domain:process.env.CLIENT_URL,
      
})
}