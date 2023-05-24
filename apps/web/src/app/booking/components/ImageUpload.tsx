"use client";
import React from "react";
import { ReactSVG } from "react-svg";
import Viewer from "./SVGViewer";

interface IProps {}

interface IState {
  file: any;
  imagePreviewUrl: any;
}

class ImageUpload extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      file: "",
      imagePreviewUrl: "",
    };
  }

  handleImageChange(e: any) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsText(file);
  }

  handleSubmit(e: any) {
    e.preventDefault();
  }

  render() {
    let { imagePreviewUrl, file } = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = <ReactSVG src={imagePreviewUrl} />;
    } else {
      $imagePreview = <div>Preview</div>;
    }
    return (
      <>
        <form>
          <input
            className="fileInput"
            type="file"
            accept=".svg"
            onChange={(e) => this.handleImageChange(e)}
          />
          <button type="submit" onClick={(e) => this.handleSubmit(e)}>
            Upload Image
          </button>
        </form>
        {imagePreviewUrl && <Viewer svg={file[0]} />}

        {imagePreviewUrl?.toString()}
      </>
    );
  }
}
export default ImageUpload;
