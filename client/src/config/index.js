export const registerFormControls = [
  {
    name: "username",
    label: "User Name",
    placeholder: "Enter your username",
    componentType: "input",
    type: "text",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const loginFormControls = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    componentType: "input",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter your password",
    componentType: "input",
    type: "password",
  },
];

export const addProductFormElements = [
  {
    name: "title",
    label: "Title",
    placeholder: "Enter product title",
    componentType: "input",
    type: "text",
  },
  {
    name: "description",
    label: "Description",
    placeholder: "Enter product description",
    componentType: "textarea",
    type: "text",
  },
  {
    name: "category",
    label: "Category",
    componentType: "select",
    options: [
      { id: "men", label: "Men" },
      { id: "women", label: "Women" },
      { id: "kids", label: "Kids" },
      { id: "accessories", label: "Accessories" },
      { id: "footwear", label: "Footwear" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    componentType: "select",
    options: [
      { id: "apple", label: "Apple" },
      { id: "samsung", label: "Samsung" },
      { id: "nike", label: "Nike" },
      { id: "adidas", label: "Adidas" },
      { id: "sony", label: "Sony" },
      { id: "lg", label: "LG" },
      { id: "puma", label: "Puma" },
      { id: "levis", label: "Levi's" },
      { id: "dell", label: "Dell" },
      { id: "hp", label: "HP" },
      { id: "asus", label: "Asus" },
      { id: "lenovo", label: "Lenovo" },
      { id: "unilever", label: "Unilever" },
      { id: "philips", label: "Philips" },
    ],
  },
  {
    name: "price",
    label: "Price",
    placeholder: "Enter product price",
    componentType: "input",
    type: "number",
  },
  {
    name: "sellPrice",
    label: "Sell Price",
    placeholder: "Enter sell price",
    componentType: "input",
    type: "number",
  },
  {
    name: "totalStock",
    label: "Total Stock",
    placeholder: "Enter total stock",
    componentType: "input",
    type: "number",
  },
];

export const shoppingViewHeaderMenuItems = [
  {
    id: "home",
    label: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    label: "Men",
    path: "/shop/listing",
  },
  {
    id: "women",
    label: "Women",
    path: "/shop/listing",
  },
  {
    id: "kids",
    label: "Kids",
    path: "/shop/listing",
  },
  {
    id: "footwear",
    label: "Footwear",
    path: "/shop/listing",
  },
  {
    id: "accessories",
    label: "Accessories",
    path: "/shop/listing",
  },
];

export const filterOptions = {
  category: [
    { id: "men", label: "Men" },
    { id: "women", label: "Women" },
    { id: "kids", label: "Kids" },
    { id: "accessories", label: "Accessories" },
    { id: "footwear", label: "Footwear" },
  ],
  brand: [
    { id: "apple", label: "Apple" },
    { id: "samsung", label: "Samsung" },
    { id: "nike", label: "Nike" },
    { id: "adidas", label: "Adidas" },
    { id: "sony", label: "Sony" },
    { id: "lg", label: "LG" },
    { id: "puma", label: "Puma" },
    { id: "levis", label: "Levi's" },
    { id: "dell", label: "Dell" },
    { id: "hp", label: "HP" },
    { id: "asus", label: "Asus" },
    { id: "lenovo", label: "Lenovo" },
    { id: "unilever", label: "Unilever" },
    { id: "philips", label: "Philips" },
  ],
};

export const sortOptions = [
  {
    id: "price-lowtohigh",
    label: "Price: Low to High",
  },
  {
    id: "price-hightolow",
    label: "Price: High to Low",
  },
  {
    id: "title-atoz",
    label: "Title: A to Z",
  },
  {
    id: "title-ztoa",
    label: "Title: Z to A",
  },
];
