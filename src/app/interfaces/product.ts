export interface Product {
  id: number;              
  title: string;            
  price: number;             
  description: string;       
  category: string;       
  image: string;              
  rating: {                  
    rate: number;           
    count: number;          
  };
  isFavourite?: boolean;      
  cart?:boolean;
  sku: string;
}
