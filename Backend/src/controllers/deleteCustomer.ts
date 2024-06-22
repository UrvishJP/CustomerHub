import { ObjectId } from 'mongodb';

export const deleteCustomerController = async (req: any, res: any) => {
    try {
      const { db } = req.app;
      const { id } = req.params;
  
      // Delete the customer with the given ID
      const result = await db.collection("customers").deleteOne({ _id: new ObjectId(id) });
  
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      res.status(200).json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.toString() });
    }
  };
  