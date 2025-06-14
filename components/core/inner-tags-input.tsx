"use client"

import { useEffect, useId, useState } from "react"
import { Tag, TagInput } from "emblor"

type InnerTagsInputProps = {
  placeholder?: string;
  defaultTags?: Tag[];
  tags?: Tag[];
  onChange?: (tags: Tag[]) => void;
}

export function InnerTagsInput({
  placeholder = "Add a tag",
  defaultTags = [],
  tags: values,
  onChange
}: InnerTagsInputProps) {
  const id = useId()
  const [tags, setTags] = useState<Tag[]>(values || defaultTags)
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null)

  useEffect(() => {
    if (defaultTags && onChange) onChange(defaultTags);
  }, []);

  return (
    <TagInput
      id={id}
      tags={tags}
      setTags={(values) => {
        setTags(values);
        if (onChange) onChange(values as Tag[]);
      }}
      placeholder={placeholder}
      activeTagIndex={activeTagIndex}
      setActiveTagIndex={setActiveTagIndex}
      styleClasses={{
        inlineTagsContainer:
          "border-input rounded-md bg-background shadow-xs transition-[color,box-shadow] focus-within:border-ring outline-none focus-within:ring-[3px] focus-within:ring-ring/50 p-1 gap-1",
        input: "w-full min-w-[80px] shadow-none px-2 h-7",
        tag: {
          body:
            "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
          closeButton:
            "absolute -inset-y-px -end-px p-0 rounded-e-md flex size-7 transition-[color,box-shadow] outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] text-muted-foreground/80 hover:text-foreground",
        },
      }}
    />
  )
}
