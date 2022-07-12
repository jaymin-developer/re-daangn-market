import dynamic from "next/dynamic";
import * as Write from "../../../styles/market/write/MarketWrite.style";
import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import React, { useState } from "react";
import { checkFileValidation } from "../../../src/commons/libraries/validation";
import { FuncButtonMain, MoveButtonSub } from "../../common/Button.component";

const ToastEditor = dynamic(
  () => import("../../../components/common/ToastEditor.component"),
  { ssr: false }
);

const MarketWriteComponent = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const onClickRegister = () => {};

  return (
    <Write.WrapperDiv>
      <ImgCrop rotate>
        <Upload
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          fileList={fileList}
          onChange={onChange}
          onPreview={onPreview}
          beforeUpload={checkFileValidation}
          maxCount={5}
        >
          {fileList.length < 5 && "+ Upload"}
        </Upload>
      </ImgCrop>
      <Write.InputBoxDiv>
        <Write.TitleInput placeholder="글 제목" />
        <Write.RemarksInput placeholder="한줄평" />
        <Write.PriceInput placeholder="가격" />
        <Write.TagsInput placeholder="태그(최대 5개)" />
      </Write.InputBoxDiv>
      <Write.ToastEditorBoxDiv>
        <ToastEditor />
      </Write.ToastEditorBoxDiv>
      <Write.HeaderBoxDiv>
        <MoveButtonSub name="목록으로" page="/market" />
        <FuncButtonMain name="등록하기" func={onClickRegister} />
      </Write.HeaderBoxDiv>
    </Write.WrapperDiv>
  );
};

export default MarketWriteComponent;
