interface Transaction {
  entry: string,
  type: string,
  category: string,
  amount: number,
  description: string,
  createdAt: string
}

export default {Transaction};
