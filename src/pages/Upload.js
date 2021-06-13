import React, { useState, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography, Button } from "@material-ui/core";
import { useDropzone } from "react-dropzone";
import firebase, { storage } from "../config/firebase";

const Upload = () => {
    const [myFiles, setMyFiles] = useState([]);
    const [clickable, setClickable] = useState(false);
    const [src, setSrc] = useState("");
    const onDrop = useCallback(async (acceptedFiles) => {
        if (!acceptedFiles[0]) return;
        try {
            setMyFiles([...acceptedFiles]);
            setClickable(true);
            handlePreview(acceptedFiles);
        } catch (error) {
            alert(error);

        }
    }, []);

    // const onDropRejected = () => {
    //     alert("画像のみ受け付けることができます。");
    // };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        // onDropRejected,
    });
    const handleUpload = async (accepterdImg) => {
        try {
            // アップロード処理
            const uploadTask = storage
                .ref(`/images/${myFiles[0].name}`)
                .put(myFiles[0]);
            // uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, next, error);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
            // console.log('src:', src);
        }
        catch (error) {
            //     console.log("エラーキャッチ", error);
        }
    };
    const handlePreview = (files) => {
        if (files === null) {
            return;
        }
        const file = files[0];
        if (file === null) {
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setSrc(reader.result);
        };
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h6">Upload</Typography>
                {/* <p>File should be Jpeg, Png,...</p> */}
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {myFiles.length === 0 ? (
                        <p>Drag&Drop your images here</p>
                    ) : (
                        <div>
                            {myFiles.map((file: File) => (
                                <React.Fragment key={file.name}>
                                    {src && <img src={src} />}
                                </React.Fragment>
                            ))}
                        </div>
                    )}
                </div>
                <Button
                    disabled={!clickable}
                    type="submit"
                    variant="contained"
                    fullWidth
                    style={{ marginTop: "16px" }}
                    onClick={() => handleUpload(myFiles)}
                >
                    UPLOAD
        </Button>
            </CardContent>
        </Card>
    );
};
export default Upload;
