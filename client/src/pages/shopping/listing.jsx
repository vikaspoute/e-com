import ProductFilter from "@/components/shopping/filter";
import ShoppingProductTile from "@/components/shopping/product-tile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { sortOptions } from "@/config";
import {
  fetchAllFilteredProducts,
  fetchProductDetails,
} from "@/store/shop/shop-slice";
import { ArrowUpDownIcon, FilterIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { data, useSearchParams } from "react-router-dom";
import ProductDetailsDialog from "./product-details";
import ProductDetailsSheet from "./product-details";
import { addToCart, getCart } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";

function createSearchParamsHelper(searchParams) {
  const queryParams = [];
  for (const [key, value] of Object.entries(searchParams)) {
    if (Array.isArray(value) && value.length > 0) {
      const para = value.join(","); // Fixed .joint to .join
      queryParams.push(`${key}=${encodeURIComponent(para)}`);
    }
  }
  return queryParams.join("&");
}

export const ShoppingListing = () => {
  const dispatch = useDispatch();
  const { products, product } = useSelector((state) => state.shopProducts);
  const { user } = useSelector((state) => state.auth);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({});
  const [sort, setSort] = useState("price-lowtohigh");
  const [searchParams, setSearchParams] = useSearchParams();
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (filters !== null && sort !== null)
      dispatch(
        fetchAllFilteredProducts({
          filterParams: filters,
          sortParams: sort,
        })
      );
  }, [dispatch, filters, sort]);

  useEffect(() => {
    if (product !== null) setOpen(true);
  }, [product]);

  function handleFilter(getSectionId, getCurrentOption) {
    let copy = { ...filters };
    const index = Object.keys(copy).indexOf(getSectionId);
    if (index === -1) {
      copy = {
        ...copy,
        [getSectionId]: [getCurrentOption],
      };
    } else {
      const index = copy[getSectionId].indexOf(getCurrentOption);
      if (index === -1) copy[getSectionId].push(getCurrentOption);
      else copy[getSectionId].splice(index, 1);
    }

    setFilters(copy);
    sessionStorage.setItem("filters", JSON.stringify(copy));
  }

  useEffect(() => {
    // Initialize filters from sessionStorage
    const savedFilters = JSON.parse(sessionStorage.getItem("filters")) || {};
    setFilters(savedFilters);
  }, []);

  useEffect(() => {
    if (filters && Object.keys(filters).length > 0) {
      const queryString = createSearchParamsHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  }, [filters, setSearchParams]);

  function fetchProduct(productId) {
    dispatch(fetchProductDetails(productId));
  }

  function handleAddToCart({ productId, quantity }) {
    dispatch(
      addToCart({ productId: productId, quantity: quantity, userId: user?._id })
    )
      .then((data) => {
        if (data?.payload?.success) {
          dispatch(getCart(user._id));
          toast({
            title: data?.payload?.message,
          });
        }
      })
      .then(() => {
        toast({
          title: "Product added successfully",
        });
      });
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
        {/* Desktop Filter */}
        <div className="hidden md:block">
          <ProductFilter filters={filters} handleFilter={handleFilter} />
        </div>

        {/* Mobile Filter Sheet */}
        <div className="md:hidden block mb-4">
          <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <FilterIcon className="mr-2 h-4 w-4" /> Filter Products
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px]">
              <ProductFilter filters={filters} handleFilter={handleFilter} />
            </SheetContent>
          </Sheet>
        </div>

        <div className="space-y-6">
          {/* Header with sorting and product count */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground">
              All Products
              <span className="text-muted-foreground text-sm ml-2">
                ({products?.length || 0} items)
              </span>
            </h2>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full sm:w-auto flex items-center justify-center gap-2"
                  >
                    <ArrowUpDownIcon className="h-4 w-4" />
                    <span>Sort by</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value={sort} onValueChange={setSort}>
                    {sortOptions.map((option) => (
                      <DropdownMenuRadioItem key={option.id} value={option.id}>
                        {option.label}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-auto gap-3 sm:gap-4 lg:gap-6">
            {products && products.length > 0 ? (
              products.map((product) => (
                <ShoppingProductTile
                  key={product._id}
                  product={product}
                  className="w-full"
                  fetchProduct={fetchProduct}
                  handleAddToCart={handleAddToCart}
                />
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground py-8">
                No products found
              </div>
            )}
          </div>
        </div>
      </div>
      <ProductDetailsSheet
        open={open}
        setOpen={setOpen}
        product={product}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default ShoppingListing;
