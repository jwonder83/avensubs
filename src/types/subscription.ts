export type Subscription = {
  id: string;
  user_id: string;
  name: string;
  price: number;
  category: string;
  icon: string;
  color: string;
  status: 'active' | 'inactive';
  billing_cycle: 'monthly' | 'yearly' | 'weekly';
  next_payment: string;
  created_at: string;
  updated_at: string;
}; 