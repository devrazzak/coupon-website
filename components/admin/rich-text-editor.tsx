'use client';

import Placeholder from '@tiptap/extension-placeholder';
import { EditorContent, useEditor, useEditorState } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
    Bold,
    Code,
    Heading2,
    Heading3,
    Italic,
    List,
    ListOrdered,
    Quote,
    Redo2,
    Undo2,
} from 'lucide-react';

import { Button } from '@/components/ui/button';

const toolbarButtonClass = 'h-8 w-8';

type RichTextEditorProps = {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
};

export function RichTextEditor({
    value,
    onChange,
    placeholder = 'Write your content...',
}: RichTextEditorProps) {
    const editor = useEditor({
        extensions: [StarterKit, Placeholder.configure({ placeholder })],
        content: value,
        immediatelyRender: false,
        onCreate: ({ editor: createdEditor }) => {
            createdEditor.view.dispatch(createdEditor.state.tr.setStoredMarks([]));
        },
        onUpdate: ({ editor: currentEditor }) => {
            onChange(currentEditor.getHTML());
        },
    });
    const editorState = useEditorState({
        editor,
        selector: ({ editor: currentEditor }) => ({
            selection: currentEditor?.state.selection,
            document: currentEditor?.state.doc,
        }),
    });

    if (!editor) {
        return (
            <div className="min-h-56 rounded-xl border border-border bg-background p-4 text-sm text-muted-foreground">
                Loading editor...
            </div>
        );
    }

    return (
        <div
            className="overflow-hidden rounded-xl border border-border bg-background shadow-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10"
            data-editor-state={editorState ? 'ready' : 'loading'}
        >
            <div className="flex flex-wrap items-center gap-1 border-b border-border bg-surface p-2">
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleBold().run()}
                    data-active={editor.isActive('bold')}
                    aria-label="Bold"
                    title="Bold"
                >
                    <Bold className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleItalic().run()}
                    data-active={editor.isActive('italic')}
                    aria-label="Italic"
                    title="Italic"
                >
                    <Italic className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    data-active={editor.isActive('code')}
                    aria-label="Inline code"
                    title="Inline code"
                >
                    <Code className="h-4 w-4" />
                </Button>
                <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    data-active={editor.isActive('heading', { level: 2 })}
                    aria-label="Heading 2"
                    title="Heading 2"
                >
                    <Heading2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    data-active={editor.isActive('heading', { level: 3 })}
                    aria-label="Heading 3"
                    title="Heading 3"
                >
                    <Heading3 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    data-active={editor.isActive('bulletList')}
                    aria-label="Bullet list"
                    title="Bullet list"
                >
                    <List className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    data-active={editor.isActive('orderedList')}
                    aria-label="Numbered list"
                    title="Numbered list"
                >
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().toggleBlockquote().run()}
                    data-active={editor.isActive('blockquote')}
                    aria-label="Quote"
                    title="Quote"
                >
                    <Quote className="h-4 w-4" />
                </Button>
                <span className="mx-1 h-5 w-px bg-border" aria-hidden="true" />
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().undo().run()}
                    disabled={!editor.can().undo()}
                    aria-label="Undo"
                    title="Undo"
                >
                    <Undo2 className="h-4 w-4" />
                </Button>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={toolbarButtonClass}
                    onClick={() => editor.chain().focus().redo().run()}
                    disabled={!editor.can().redo()}
                    aria-label="Redo"
                    title="Redo"
                >
                    <Redo2 className="h-4 w-4" />
                </Button>
            </div>
            <EditorContent
                editor={editor}
                className="tiptap-editor min-h-56 px-4 py-3 text-[14px] text-foreground outline-none"
            />
        </div>
    );
}
