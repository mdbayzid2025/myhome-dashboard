import { useRef, useMemo } from "react";
import JoditReact from "jodit-react";

interface Props {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

const JoditEditorComponent = ({
  value,
  onChange,
  placeholder = "Start writing...",
  height = 400,
}: Props) => {
  const editor = useRef(null);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder,
      height,
      toolbarAdaptive: false,
      buttons: [
        "bold",
        "italic",
        "underline",
        "strikethrough",
        "|",
        "ul",
        "ol",
        "|",
        "h1",
        "h2",
        "h3",
        "|",
        "image",
        "link",
        "|",
        "align",
        "|",
        "font",
        "fontsize",
        "brush",
        "|",
        "table",
        "hr",
        "|",
        "undo",
        "redo",
        "|",
        "fullsize",
        "preview",
        "source",
      ],
      uploader: {
        insertImageAsBase64URI: true,
      },
      style: {
        fontFamily: "inherit",
        fontSize: "14px",
      },
    }),
    [placeholder, height]
  );

  return (
    <JoditReact
      ref={editor}
      value={value}
      config={config}
      onBlur={(newContent: string) => onChange(newContent)}
      onChange={() => {}}
    />
  );
};

export default JoditEditorComponent;