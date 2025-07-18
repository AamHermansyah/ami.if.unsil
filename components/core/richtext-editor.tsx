'use client'

import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
} from 'lucide-react'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FC, useEffect } from 'react'
import Placeholder from '@tiptap/extension-placeholder'
import { Button } from '../ui/button'

const IconButton: FC<{
  onClick: () => void
  isActive?: boolean
  icon: React.ReactNode
  title?: string
}> = ({ onClick, isActive, icon, title }) => (
  <Button
    onClick={onClick}
    variant={isActive ? 'default' : 'outline'}
    className="size-7"
    title={title}
    type="button"
  >
    {icon}
  </Button>
)

const MenuBar: FC<{ editor: Editor | null }> = ({ editor }) => {
  if (!editor) return null

  return (
    <div className="bg-secondary border-b p-2 overflow-x-auto">
      <div className="flex w-max gap-1">
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold />}
          title="Bold"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic />}
          title="Italic"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={<Strikethrough />}
          title="Strikethrough"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List />}
          title="Bullet List"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered />}
          title="Ordered List"
        />
      </div>
    </div>
  )
}

interface IProps {
  id?: string;
  placeholder?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

function RichTextEditor({ id, placeholder, value = '', onValueChange }: IProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder,
      }),
    ],
    content: value,
  });

  // Update editor content if `value` prop changes from outside
  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || '', false); // false = no history update
    }
  }, [value, editor]);

  // Emit value change to parent
  useEffect(() => {
    if (!editor || !onValueChange) return;

    const handleUpdate = () => {
      const html = editor.getHTML();
      onValueChange(html);
    };

    editor.on('update', handleUpdate);
    return () => {
      editor.off('update', handleUpdate);
    };
  }, [editor, onValueChange]);

  return (
    <div className="rounded-lg border overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent
        id={id}
        editor={editor}
        className="min-h-[150px] p-4 bg-card prose dark:prose-invert max-w-none"
      />
    </div>
  );
}

export default RichTextEditor;
