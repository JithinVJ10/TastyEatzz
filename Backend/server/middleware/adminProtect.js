// adminAuthMiddleware.js
import jwt from 'jsonwebtoken';

const adminCred = {
  AdminEmail:'admin@gmail.com',
  AdminPassword: '1234'
}

export const adminAuthMiddleware = async (req, res , next) => {
  try { 
      // console.log(req.header('authorization'), '#######');
      let token = req.header('authorization').split(' ')[1];
      
      if(token === null){         
        throw new Error("Not authorized or Invalid token");
      }

      token = token.replaceAll('"',"");

      const decodedToken = jwt.verify(token, process.env.JWT_Secret);
      

      if(adminCred.AdminEmail === decodedToken.id){
        req.admin = adminCred;
        next(); 
      }else{
        throw new Error("Not authorized or Invalid token");
      }


  } catch (error) {
      console.log(error , 'midlwre error');
      next(error)
  }
}

export default adminAuthMiddleware;
