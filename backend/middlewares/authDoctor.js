import jwt from "jsonwebtoken";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;

    if (!dtoken) {
      res.json({ success: false, message: "Not authorised" });
    }

    const decode_token = jwt.verify(dtoken, process.env.JWT_SECRET_KEY);


    if(req.body){
      req.body.docId = decode_token
    }else{
      req.docId = decode_token;
    }


    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
}

export default authDoctor