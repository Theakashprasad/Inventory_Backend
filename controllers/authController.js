import bcrypt from "bcryptjs";
import User from "../model/userModel.js";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const signUp = async (req, res) => {
  const { fullname, email, password } = req.body.data;
  try {
    const user = await User.findOne({ email });

    console.log(user);
    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${fullname}`;

    const newUser = new User({
      fullname,
      email,
      password: hashedPassword,
      profilePic: boyProfilePic,
    });
    console.log(newUser);

    if (newUser) {
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {}
};


 const login = async (req, res) => {
	try {
    
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
    
		if (!user || !isPasswordCorrect) {
      console.log("eroor");
      
			return res.status(400).json({success: false, message: "Invalid username or password" });
		}

		generateTokenAndSetCookie(user._id, res);
    const token = jwt.sign( {userId: user._id} , process.env.JWT_SECRET, {
      expiresIn: "15d",
    });
console.log('sdf',token);

		res.status(200).json({success: true, 
			_id: user._id,
			fullname: user.fullname,
			email: user.email,
			profilePic: user.profilePic,
      token
		});

	} catch (error) { 
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};

 const postInventory = async (req, res) => {
	try {
   console.log(req.body);
   
	} catch (error) {
		console.log("Error in login controller", error.message);
		res.status(500).json({ error: "Internal Server Error" });
	}
};


export default { signUp, login, postInventory };
