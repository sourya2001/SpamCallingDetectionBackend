const prisma=require('../../DB/config')


const addContact=async(req,res)=>{
const {name,phone}=req.body;

try{
    if (!name || !phone || !req.user.Id) {
        throw new Error('Missing required fields');
      }

      //importing the contact of the user
    const contact=await prisma.contact.create({
        data:{
            name,
            phone,
            userId: req.user.id
        }
    })
    res.status(201).json({
        data:contact,
        messgae: "Contact added successfully"

    })
}
catch (error) {
    console.error(error);

    //validation errors
    if (error.name === 'ValidationError') {
      res.status(400).json({ error: 'Validation error: ' + error.message });
    } else if (error.name === 'Prisma.UniqueConstraintError') {
      res.status(409).json({ error: 'Duplicate contact' });
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
}

}



//finding the contacts for the user
const getContacts = async (req, res) => {
    try {
      
      if (!req.user || !req.user.id) {
        return res.status(401).json({ error: 'Unauthorized access' });
      }
  
      const contacts = await prisma.contact.findMany({
        where: { userId: req.user.id },
      });
  
      // If no contacts are found, return a 404 status
      if (contacts.length === 0) {
        return res.status(404).json({ error: 'No contacts found for this user' });
      }
  
      
      res.json(contacts);
    } catch (error) {
      console.error(error);
  
    
      if (error instanceof prisma.Prisma.PrismaClientKnownRequestError) {
        
        return res.status(400).json({ error: 'Database request error' });
      }
  
      
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  
  


  module.exports={addContact,getContacts}