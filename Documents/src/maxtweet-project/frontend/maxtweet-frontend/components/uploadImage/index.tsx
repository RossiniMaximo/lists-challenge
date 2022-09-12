import React, { Component } from "react";
import styles from "./uploadImage.module.css";
import { app } from "lib/fb";
import { Spinner } from "components/spinner";

class UploadImageForTweet extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      url: null,
      isLoading: false,
    };
    this.fileHandler = this.fileHandler.bind(this);
    this.fileUploadHandler = this.fileUploadHandler.bind(this);
  }
  fileHandler = async (e) => {
    const file = e.target.files[0];
    this.setState({
      image: file,
    });
  };
  fileUploadHandler = async () => {
    const storageRef = app.storage().ref();
    const filePath = storageRef.child(this.state.image.name);
    await filePath.put(this.state.image);
    this.setState({ isLoading: true });
    const fileUrl = await filePath.getDownloadURL();
    if (fileUrl) {
      this.setState({ isLoading: false });
      this.props.onFile({ file: this.state.image, url: fileUrl });
    }
  };
  render() {
    const style = {
      display: "none",
    };
    const inputRef = React.createRef() as any;
    return (
      <div className={styles.container}>
        {this.state.isLoading ? (
          <div className={styles.spinner_container}>
            <Spinner />
          </div>
        ) : (
          ""
        )}
        <input
          style={{ display: "none" }}
          type="file"
          onChange={this.fileHandler}
          ref={inputRef}
        />
        <div
          style={this.state.isLoading ? style : {}}
          onClick={() => {
            inputRef.current.click();
          }}
          className={styles.pick_file}
        >
          Pick File
        </div>
        <div
          onClick={this.fileUploadHandler}
          className={styles.submit_file}
          style={this.state.isLoading ? style : {}}
        >
          Upload
        </div>
      </div>
    );
  }
}
export { UploadImageForTweet };
