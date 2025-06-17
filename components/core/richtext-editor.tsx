'use client'

import {
  Bold,
  Heading1,
  Heading2,
  Heading3,
  Italic,
  Strikethrough,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  LetterText,
  List,
  ListOrdered,
} from 'lucide-react'
import TextAlign from '@tiptap/extension-text-align'
import { EditorContent, useEditor, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { FC } from 'react'
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
    className="size-8"
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
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          isActive={editor.isActive('heading', { level: 1 })}
          icon={<Heading1 className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Heading 1"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          isActive={editor.isActive('heading', { level: 2 })}
          icon={<Heading2 className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Heading 2"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          isActive={editor.isActive('heading', { level: 3 })}
          icon={<Heading3 className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Heading 3"
        />
        <IconButton
          onClick={() => editor.chain().focus().setParagraph().run()}
          isActive={editor.isActive('paragraph')}
          icon={<LetterText className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Paragraph"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          isActive={editor.isActive('bold')}
          icon={<Bold className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Bold"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          isActive={editor.isActive('italic')}
          icon={<Italic className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Italic"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleStrike().run()}
          isActive={editor.isActive('strike')}
          icon={<Strikethrough className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Strikethrough"
        />
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          isActive={editor.isActive({ textAlign: 'left' })}
          icon={<AlignLeft className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Align Left"
        />
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          isActive={editor.isActive({ textAlign: 'center' })}
          icon={<AlignCenter className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Align Center"
        />
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          isActive={editor.isActive({ textAlign: 'right' })}
          icon={<AlignRight className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Align Right"
        />
        <IconButton
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          isActive={editor.isActive({ textAlign: 'justify' })}
          icon={<AlignJustify className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Justify"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          isActive={editor.isActive('bulletList')}
          icon={<List className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Bullet List"
        />
        <IconButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          isActive={editor.isActive('orderedList')}
          icon={<ListOrdered className="w-3 h-3 sm:w-4 sm:h-4" />}
          title="Ordered List"
        />
      </div>
    </div>
  )
}

interface IProps {
  id?: string;
  placeholder?: string;
}

function RichTextEditor({ id, placeholder }: IProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Placeholder.configure({
        placeholder: placeholder,
      }),
    ],
    content: '',
  });

  return (
    <div className="rounded-lg border overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent
        id={id}
        editor={editor}
        className="min-h-[150px] p-4 bg-card prose dark:prose-invert max-w-none"
      />
    </div>
  )
}

export default RichTextEditor
