"use client";

import { Control, FieldValues, Path } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ChangeEvent, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

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
      <Avatar className="w-24 h-24">
        <AvatarImage src={preview} />
        <AvatarFallback>BU</AvatarFallback>
      </Avatar>

      <FormField
        control={control}
        name={name}
        render={({ field: { onChange, ...rest } }) => (
          <>
            <FormItem>
              <FormLabel>Circle Image</FormLabel>
              <FormControl>
                <Input
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
              <FormDescription>
                Choose best image that bring spirits to your circle.
              </FormDescription>
              <FormMessage />
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
