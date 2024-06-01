const prisma=require('../../DB/config')
const bycrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')


//adding registering Controller

const register=async(req,res)=>{
    const {name,phone,email,password}=req.body
    const hashedPasword=await bycrypt.hash(password,10);

    try{
        const user=await prisma.user.create({
            data:{
                name,
                phone,
                email,
                password:hashedPasword
            }
        });
        res.status(201).json({data:user,message:"User Registered Successfully"})
    }
    catch (error) {
        res.status(400).json({ error: error.message });
      }

}


//adding login controller 

const login=async(req,res)=>{
    const {phone,password}=req.body

    try {
        //finding unique user phone number based on phone
        const user = await prisma.user.findUnique({ where: { phone } });

        //console.log(">>>>>>>",user)

        //chking io the hashed password is same
        if (user && (await bcrypt.compare(password, user.password))) {
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
              expiresIn: '1h',
            });
            res.json({ token });
          } else {
            res.status(401).json({ error: 'Invalid credentials' });
          }

    } catch (error) {
        res.status(500).json({ error: error.message });
    }

}

module.exports={register,login};