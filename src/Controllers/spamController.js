const prisma=require('../../DB/config')



const markAsSpam = async (req, res) => {
    const { phone } = req.body;
  
    try {
      if (!phone) {
        return res.status(400).json({message:"No phone numbewr present"})
      }

      const contact = await prisma.contact.upsert({
        where: { phone },
        update: { isSpam: true },
        create: { name: 'Unknown', phone, isSpam: true, userId: req.user.id },
      });
      res.status(200).json({message:"the number is marked as spam"});
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  const checkSpam = async (req, res) => {
    const { phone } = req.params;
  
    try {
      const contact = await prisma.contact.findUnique({ where: { phone } });
      res.json({ "Is Spam?": contact?.isSpam || false });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error: error.message });
    }
  };
  
  module.exports = { markAsSpam, checkSpam };