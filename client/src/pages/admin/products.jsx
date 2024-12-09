import ProductImageUpload from "@/components/admin/image-upload";
import AdminProductTile from "@/components/admin/product-tile";
import CommonForm from "@/components/common/form";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { addProductFormElements } from "@/config";
import { useToast } from "@/hooks/use-toast";
import {
  createProduct,
  deleteProduct,
  fetchAllProducts,
  updateProduct,
} from "@/store/product-slice";
import { Plus } from "lucide-react";
import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const initialFormData = {
  image: null,
  title: "",
  description: "",
  category: "",
  brand: "",
  price: "",
  sellPrice: "",
  totalStock: "",
};

const AdminProducts = () => {
  const [openCreateProductsDialog, setOpenCreateProductsDialog] =
    useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imageLoadingState, setImageLoadingState] = useState(false);
  const [currentEditedId, setCurrentEditedId] = useState(null);
  const { products } = useSelector((state) => state.adminProducts);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    currentEditedId !== null
      ? dispatch(
          updateProduct({ id: currentEditedId, productData: formData })
        ).then((data) => {
          console.log("product updated data: ", data);
          if (data?.payload?.success) {
            dispatch(fetchAllProducts({}));
            setOpenCreateProductsDialog(false);
            setFormData(initialFormData);
            setCurrentEditedId(null);
            toast({
              title: data?.payload?.message,
            });
          }
        })
      : dispatch(
          createProduct({
            ...formData,
            image: imageUrl,
          })
        ).then((data) => {
          console.log(data, "data");
          if (data?.payload?.success) {
            dispatch(fetchAllProducts({}));
            setOpenCreateProductsDialog(false);
            setImageFile(null);
            setFormData(initialFormData);
            toast({
              title: data?.payload?.message,
            });
          }
        });
  }

  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, [dispatch]);

  function isFormValid() {
    return Object.keys(formData)
      .map((key) => formData[key] !== null)
      .every((item) => item);
  }

  function handelDelete(getCurrentProductId) {
    console.log(getCurrentProductId);
    dispatch(deleteProduct(getCurrentProductId)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        dispatch(fetchAllProducts({}));
      }
    });
  }

  return (
    <Fragment>
      <div className="mb-5 flex justify-end w-full">
        <Button onClick={() => setOpenCreateProductsDialog(true)}>
          <Plus />
          Add new Product
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-4 lg:grid-cols-4">
        {products && products.length > 0
          ? products.map((product) => (
              <AdminProductTile
                setCurrentEditedId={setCurrentEditedId}
                setOpenCreateProductsDialog={setOpenCreateProductsDialog}
                setFormData={setFormData}
                product={product}
                key={product.id}
                handelDelete={handelDelete}
              />
            ))
          : null}
      </div>
      <Sheet
        open={openCreateProductsDialog}
        onOpenChange={() => {
          setOpenCreateProductsDialog(false);
          setCurrentEditedId(null);
          setFormData(initialFormData);
        }}
      >
        <SheetContent side="right" className="overflow-auto">
          <SheetHeader>
            <SheetTitle>
              {currentEditedId !== null ? "Edit Product" : "Add New Product"}
            </SheetTitle>
          </SheetHeader>
          <ProductImageUpload
            imageFile={imageFile}
            setImageFile={setImageFile}
            imageUrl={imageUrl}
            setImageUrl={setImageUrl}
            imageLoadingState={imageLoadingState}
            setImageLoadingState={setImageLoadingState}
            isEditMode={currentEditedId !== null}
          />
          <div className="py-6">
            <CommonForm
              formControls={addProductFormElements}
              formData={formData}
              setFormData={setFormData}
              onSubmit={onSubmit}
              buttonText={`${currentEditedId !== null ? "Update" : "Add"}`}
              isButtonDisabled={!isFormValid()}
            />
          </div>
        </SheetContent>
      </Sheet>
    </Fragment>
  );
};

export default AdminProducts;
