/* eslint-disable */
"use client";

import { Config } from "@measured/puck";
import React, { useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Underline from '@tiptap/extension-underline';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import ListItem from '@tiptap/extension-list-item';
import { Extension } from '@tiptap/core'; 
import styles from './RichTextBlock.module.css';

// Custom extension to handle Google Docs specific styles
const GoogleDocsExtension = Extension.create({
  name: 'googleDocs',
  addGlobalAttributes() {
    return [
      {
        types: ['paragraph', 'heading'],
        attributes: {
          style: {
            default: null,
            parseHTML: element => element.getAttribute('style'),
            renderHTML: attributes => {
              if (!attributes.style) return {};
              return { style: attributes.style };
            },
          },
          class: {
            default: null,
            parseHTML: element => element.getAttribute('class'),
            renderHTML: attributes => {
              if (!attributes.class) return {};
              return { class: attributes.class };
            },
          },
        },
      },
    ];
  },
});

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className={styles.menuBar}>
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? styles.isActive : ''}
        type="button"
      >
        B
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive('italic') ? styles.isActive : ''}
        type="button"
      >
        I
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? styles.isActive : ''}
        type="button"
      >
        U
      </button>
      <button
        onClick={() => editor.chain().focus().setParagraph().run()}
        className={editor.isActive('paragraph') ? styles.isActive : ''}
        type="button"
      >
        P
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={editor.isActive('heading', { level: 1 }) ? styles.isActive : ''}
        type="button"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={editor.isActive('heading', { level: 2 }) ? styles.isActive : ''}
        type="button"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? styles.isActive : ''}
        type="button"
      >
        • List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? styles.isActive : ''}
        type="button"
      >
        1. List
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('left').run()}
        className={editor.isActive({ textAlign: 'left' }) ? styles.isActive : ''}
        type="button"
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('center').run()}
        className={editor.isActive({ textAlign: 'center' }) ? styles.isActive : ''}
        type="button"
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign('right').run()}
        className={editor.isActive({ textAlign: 'right' }) ? styles.isActive : ''}
        type="button"
      >
        Right
      </button>
    </div>
  );
};

type RichTextBlockProps = {
  content: string;
};

const RichTextBlockComponent: Config<{ RichTextBlock: RichTextBlockProps }>["components"] = {
  RichTextBlock: {
    label: "Rich Text Block",
    fields: {
      content: {
        type: "custom",
        render: ({ value, onChange }) => {
          const editor = useEditor({
            extensions: [
              StarterKit.configure({
                heading: {
                  levels: [1, 2, 3, 4, 5, 6]
                },
              }),
              Link.configure({
                openOnClick: true,
                HTMLAttributes: {
                  class: styles.link
                }
              }),
              Image.configure({
                HTMLAttributes: {
                  class: styles.image
                }
              }),
              TextAlign.configure({
                types: ['heading', 'paragraph'],
                alignments: ['left', 'center', 'right', 'justify'],
              }),
              Underline,
              TextStyle,
              Color,
              ListItem.configure({
                HTMLAttributes: {
                  class: styles.listItem
                }
              }),
              GoogleDocsExtension,
            ],
            content: value,
            editable: true,
            parseOptions: {
              preserveWhitespace: 'full',
            },
            editorProps: {
              attributes: {
                class: styles.proseMirror,
              },
              transformPastedHTML(html) {
                // Clean up Google Docs specific markup while preserving styles
                return html
                  .replace(/style="font-family:[^"]*"/g, '') // Remove font-family
                  .replace(/<span style="[^"]*">/g, match => {
                    // Preserve color and background-color styles
                    const hasColor = match.includes('color:');
                    const hasBgColor = match.includes('background-color:');
                    if (!hasColor && !hasBgColor) return '';
                    const style = [];
                    if (hasColor) {
                      const color = match.match(/color:\s*([^;}"]*)/)?.[1];
                      if (color) style.push(`color: ${color}`);
                    }
                    if (hasBgColor) {
                      const bgColor = match.match(/background-color:\s*([^;}"]*)/)?.[1];
                      if (bgColor) style.push(`background-color: ${bgColor}`);
                    }
                    return style.length ? `<span style="${style.join(';')}">` : '';
                  })
                  .replace(/<span>/g, '')
                  .replace(/<\/span>/g, '')
                  .replace(/class="[^"]*"/g, ''); // Remove Google Docs specific classes
              },
            },
            onUpdate: ({ editor }) => {
              onChange(editor.getHTML());
            },
          });

          useEffect(() => {
            if (editor && value !== editor.getHTML()) {
              editor.commands.setContent(value || '');
            }
          }, [value, editor]);

          if (!editor) {
            return <div>Loading...</div>;
          }

          return (
            <div className={styles.richTextEditor}>
              <MenuBar editor={editor} />
              <div className={styles.richTextBlock}>
                <EditorContent editor={editor} />
              </div>
            </div>
          );
        }
      }
    },
    render: ({ content }) => {
      const editor = useEditor({
        extensions: [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3, 4, 5, 6]
            },
          }),
          Link.configure({
            openOnClick: true,
            HTMLAttributes: {
              class: styles.link
            }
          }),
          Image.configure({
            HTMLAttributes: {
              class: styles.image
            }
          }),
          TextAlign.configure({
            types: ['heading', 'paragraph'],
            alignments: ['left', 'center', 'right', 'justify'],
          }),
          Underline,
          TextStyle,
          Color,
          ListItem.configure({
            HTMLAttributes: {
              class: styles.listItem
            }
          }),
          GoogleDocsExtension,
        ],
        content,
        editable: false,
        parseOptions: {
          preserveWhitespace: 'full',
        },
        editorProps: {
          attributes: {
            class: styles.proseMirror,
          },
        },
      });

      useEffect(() => {
        if (editor && content !== editor.getHTML()) {
          editor.commands.setContent(content || '');
        }
      }, [content, editor]);

      if (!editor) {
        return <div>Loading...</div>;
      }

      return (
        <div className={styles.richTextBlock}>
          <EditorContent editor={editor} />
        </div>
      );
    }
  }
};

export const RichTextBlock = RichTextBlockComponent; 