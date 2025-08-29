export const isTokenExpired = () => {
  const expiry = localStorage.getItem("tokenExpiry");
  if (!expiry) return true;
  return Date.now() > expiry; // true if expired
};

export const logoutUser = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem("tokenExpiry")
    localStorage.removeItem("userID");
}