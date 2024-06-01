const prisma=require('../../DB/config')




const searchContactsByName = async (req, res) => {
    const { name } = req.query;
  
    try {
      const contacts = await prisma.contact.findMany({
        where: {
          name: {
            contains: name,
            mode: 'insensitive',
          },
        },
        orderBy: [
          {
            name: 'asc',
          },
        ],
      });
      res.status(200).json({data:contacts,message:"Successfull Fetched the users"});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  const searchContactsByPhoneNumber = async (req, res) => {
    const { phone } = req.query;
  
    try {
      //  search for a registered user with the given phone number
      const registeredUser = await prisma.user.findUnique({
        where: { phone },
        include: { contacts: true },
      });

     console.log("Registered User>>>",registeredUser)
  
      if (registeredUser) {
        // If a registered user is found, return only that user
        const result = {
          name: registeredUser.name,
          phone: registeredUser.phone,
          email: registeredUser.email,
          isSpam: false,
         contacts: registeredUser.contacts,
        };
        return res.status(200).json({ data: [result], message: 'Successfully fetched the registered user' });
      }
  
      // If no registered user is found, search for contacts with the given phone number
      const contacts = await prisma.contact.findMany({
        where: { phone },
      });
  
      res.status(200).json({ data: contacts, message: 'Successfully fetched the contacts' });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  module.exports = { searchContactsByName, searchContactsByPhoneNumber };