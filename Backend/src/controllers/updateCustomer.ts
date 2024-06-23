import { ObjectId } from 'mongodb';

export const updateCustomerController = async (req: any, res: any) => {
  try {
    const { db } = req.app;
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const result = await db.collection("customers").updateOne(
      { _id: new ObjectId(id) },
      { $set: { name, email, phone, address } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json({ message: "Customer updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.toString() });
  }
};