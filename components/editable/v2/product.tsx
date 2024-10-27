// import { getProducts } from "@/actions/product";
// import { productsAtom } from "@/app/shop-builder/_atoms/product-atom";
// import { Product as IProduct } from "@/app/interfaces/product";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useApplyRef } from "@/hooks/useApplyRef";
import { useSetting } from "@/hooks/useSetting";
import { cn } from "@/lib/utils";
import { icons } from "@/public/icons";
import clsx from "clsx";
import { useAtom } from "jotai";
import { Check, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";

interface IProductProps {
  bgColor?: string;
  padding?: string;
  margin?: string;
  contentAlign?: "flex-start" | "center" | "flex-end";
  selectedProductId?: number | null;
}

// interface PreviewProduct {
//   id: number;
//   name: string;
//   price: number;
// }

export const ProductSetting = () => {
  const { props, handlePropChange } = useSetting();
  // const { bgColor, padding, margin } = props;
  const [openModal, setOpenModal] = React.useState(false);
  // const [foundProducts] = useAtom(productsAtom);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(
    props.selectedProductId
  );

  // useEffect(() => {
  //   console.log({ foundProducts });
  // }, []);

  // const handleSearchProductsByName = async (name: string) => {
  //   if (name) {
  //     const res = await getProducts({
  //       name,
  //     });
  //     const products = res.metadata;
  //     console.log(res.metadata);
  //     if (products.length > 0) {
  //       setOpenModal(true);
  //     }
  //   }
  // };

  return (
    <div className="flex flex-col gap-4">
      <Popover open={openModal} onOpenChange={setOpenModal}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openModal}
            className="w-full justify-between"
          >
            {selectedProductId
              ? [].find((p) => p.id === selectedProductId)?.name
              : "Select product..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
          <Command defaultValue={props.selectedProductId}>
            <CommandInput placeholder="Search framework..." />
            <CommandList defaultValue={props.selectedProductId}>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup defaultValue={props.selectedProductId}>
                {[].map((foundProduct) => (
                  <CommandItem
                    key={foundProduct.id}
                    value={foundProduct.id.toString()}
                    onSelect={(currentValue) => {
                      setSelectedProductId(parseInt(currentValue));
                      handlePropChange("selectedProductId", currentValue);
                      setOpenModal(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        selectedProductId === foundProduct.id
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                    {foundProduct.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      {/* <Popover open={openModal} onOpenChange={setOpenModal}>
        <PopoverAnchor>
          <SearchInput delay={200} onValueChange={handleSearchProductsByName} />
        </PopoverAnchor>
        <PopoverContent className="px-0">
          {foundProducts.map((foundProduct) => (
            <div
              key={foundProduct.id}
              className="flex cursor-pointer flex-col gap-1 px-4 py-2 hover:bg-gray-50"
            >
              <p className="text-sm font-bold text-gray-700">
                {foundProduct.name}
              </p>
              <p className="text-xs text-gray-600">{foundProduct.price} VND</p>
            </div>
          ))}
        </PopoverContent>
      </Popover> */}
      {/* <div onClick={findProducts}>Setting</div> */}
    </div>
  );
};

export const Product = ({
  bgColor,
  padding,
  margin,
  contentAlign,
  selectedProductId,
}: IProductProps) => {
  // const [products] = useAtom(productsAtom);
  const selectedProduct = useMemo(
    () => [].find((p) => p.id === Number(selectedProductId)),
    [selectedProductId]
  );
  const { applyRef } = useApplyRef();
  return (
    <div ref={applyRef} className="flex w-full flex-col gap-2">
      <div className="p-2">
        <div
          className={clsx(
            "relative flex h-[282px] w-full items-center justify-center",
            {
              "bg-[#D9DCE9]": !selectedProduct,
            }
          )}
        >
          <Image
            src={selectedProduct?.images[0].url ?? icons.productPlaceholder}
            fill
            alt="product"
            className="object-contain"
          />
        </div>
      </div>

      <div className="text-center text-sm text-gray-600">
        <p>BRAND</p>
        <p>{selectedProduct?.name ?? "Product name"}</p>
        <p className="mt-2">{selectedProduct?.price ?? 300.0} vnd</p>
      </div>
    </div>
  );
};

Product.craft = {
  props: {
    bgColor: "#ffffff",
    contentAlign: "center",
    selectedProductId: null,
  },
  related: {
    setting: ProductSetting,
  },
  data: {
    name: "Product",
  },
};
