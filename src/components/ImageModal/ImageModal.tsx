import React, { FC } from "react";
import "./ImageModal.scss";

interface imgModalProps {
  src: string;
  alt: string;
  toggle: (e: React.MouseEvent) => void
}

const ImageModal: FC<imgModalProps> = (props: imgModalProps) => {
  return (
    <>
      {/* <!-- The Modal --> */}
      <div id="myModal" className="modal">
        {/* <!-- The Close Button --> */}
        <span className="close" onClick={props.toggle}>
          &times;
        </span>

        {/* <!-- Modal Content (The Image) --> */}
        <img className="modal-content" id="img01" src={props.src} />

        {/* <!-- Modal Caption (Image Text) --> */}
        <div id="caption">{props.alt}</div>
      </div>
    </>
  );
};

export default ImageModal;
