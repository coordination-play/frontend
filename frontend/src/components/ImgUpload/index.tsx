"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { EditIcon, PlusIcon } from "lucide-react";

export const ImgUpload = <T extends FieldValues = FieldValues>({
  control,
  name,
}: {
  control?: Control<T> | undefined;
  name: Path<T>;
}) => {
  const [preview, setPreview] = useState("");

  return (
    <>
      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, ...rest } }) => (
          <>
            <FormItem>
              <FormLabel>
                <div className="relative border-2 w-full h-40 p-3 flex-col gap-2 rounded-md border-foreground/660 border-dotted flex items-center justify-center">
                  {preview ? (
                    <>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="absolute top-3 right-3 flex gap-2 items-center"
                      >
                        <div>
                          <EditIcon className="w-3 h-3" />
                          Edit
                        </div>
                      </Button>

                      <Avatar className="w-24 h-24">
                        <AvatarImage className="object-fit" src={preview} />
                        <AvatarFallback>BU</AvatarFallback>
                      </Avatar>
                    </>
                  ) : (
                    <>
                      <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="border-dotted border-2 rounded-full h-20 w-20 p-0 cursor-pointer"
                      >
                        <div>
                          <PlusIcon className="w-8 h-8" />
                        </div>
                      </Button>

                      <p className="text font-normal text-foreground/80">
                        Click to Upload
                      </p>

                      <FormMessage />
                    </>
                  )}
                </div>
              </FormLabel>

              <FormControl>
                <Input
                  className="hidden"
                  type="file"
                  {...rest}
                  value=""
                  onChange={(event) => {
                    const {
                      // files,
                      displayUrl,
                    } = getImageData(event);
                    setPreview(displayUrl);

                    // onChange(event);
                    onChange(event.target.files ? event.target.files[0] : null);
                  }}
                />
              </FormControl>
            </FormItem>
          </>
        )}
      />
    </>
  );
};

const getImageData = (event: ChangeEvent<HTMLInputElement>) => {
  // FileList is immutable, so we need to create a new one
  const dataTransfer = new DataTransfer();

  // Add newly uploaded images
  Array.from(event.target.files!).forEach((image) =>
    dataTransfer.items.add(image)
  );

  const files = dataTransfer.files;
  const displayUrl = URL.createObjectURL(event.target.files![0]);

  return { files, displayUrl };
};
