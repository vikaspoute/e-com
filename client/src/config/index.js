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
      { id: 1, label: "Electronics" },
      { id: 2, label: "Fashion" },
      { id: 3, label: "Home & Furniture" },
      { id: 4, label: "Books" },
      { id: 5, label: "Sports" },
      { id: 6, label: "Toys" },
      { id: 7, label: "Groceries" },
      { id: 8, label: "Beauty & Health" },
      { id: 9, label: "Automotive" },
      { id: 10, label: "Stationery" },
      { id: 11, label: "Jewelry" },
      { id: 12, label: "Appliances" },
    ],
  },
  {
    name: "brand",
    label: "Brand",
    componentType: "select",
    options: [
      { id: 1, label: "Apple" },
      { id: 2, label: "Samsung" },
      { id: 3, label: "Nike" },
      { id: 4, label: "Adidas" },
      { id: 5, label: "Sony" },
      { id: 6, label: "LG" },
      { id: 7, label: "Puma" },
      { id: 8, label: "Levi's" },
      { id: 9, label: "Dell" },
      { id: 10, label: "HP" },
      { id: 11, label: "Asus" },
      { id: 12, label: "Lenovo" },
      { id: 13, label: "Unilever" },
      { id: 14, label: "Philips" },
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
