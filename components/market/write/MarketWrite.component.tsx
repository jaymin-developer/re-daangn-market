import dynamic from "next/dynamic";
import * as Write from "../../../src/styles/market/write/MarketWrite.style";
import { Modal } from "antd";
import React, {
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";
import { FuncButtonMain, MoveButtonSub } from "../../common/Button.component";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import {
  CREATE_USED_ITEM,
  UPDATE_USED_ITEM,
  UPLOAD_FILE,
} from "../../../src/api/market/write/MarketWrite.qureies";
import {
  FormValues,
  IPropsMarketWrite,
} from "../../../src/types/market/write/MarketWrite.types";
import { Editor } from "@toast-ui/react-editor";

const ToastEditor = dynamic(
  () => import("../../../components/common/ToastEditor.component"),
  { ssr: false }
);

const MarketWriteComponent = (props: IPropsMarketWrite) => {
  const router = useRouter();

  const editorRef = useRef<Editor>(null);

  const [requiredInfo, setReqieredInfo] = useState<FormValues>({
    name: "",
    remarks: "",
    price: 0,
  });
  const [images, setImages] = useState<SetStateAction<string[]>>([]);
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);

  const onChangeRequiredInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setReqieredInfo((prev) => {
      return {
        ...prev,
        [e.target.id]:
          e.target.id === "price" ? Number(e.target.value) : e.target.value,
      };
    });
  };

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    try {
      const result = await uploadFile({
        variables: { file },
      });
      const imageUrl = result.data?.uploadFile.url;
      setImages((prev: string[]) => [...prev, imageUrl]);
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  const onKeyUpTags = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      event.key === "Enter" &&
      tag.includes("#") &&
      tags.includes(tag) === false &&
      tags.length < 5
    ) {
      setTags((prev) => [...prev, tag]);
      setTag("");
    }
  };

  const onClickSubmit = async () => {
    const contents = editorRef.current?.getInstance().getHTML();

    if (Object.values(requiredInfo).some((el) => el === "")) {
      Modal.warn({ content: "필수 입력 사항입니다!" });
      return;
    }

    const writeVariables = {
      createUseditemInput: {
        ...requiredInfo,
        contents,
        images,
        tags,
        useditemAddress: {
          address,
        },
      },
    };

    try {
      const result = await createUseditem({
        variables: writeVariables,
      });
      Modal.success({ content: "제품 등록 성공!" });
      router.push(`/market/${result.data.createUseditem._id}`);
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = async () => {
    const contents = editorRef.current?.getInstance().getHTML();
    try {
      await updateUseditem({
        variables: {
          useditemId: router.query.id,
          updateUseditemInput: {
            ...requiredInfo,
            contents,
            images,
            tags,
          },
        },
      });
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/useditems/${router.query.id}`);
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  return (
    <Write.WrapperDiv>
      <Write.InputBoxDiv>
        <Write.TitleInput
          id="name"
          type="text"
          placeholder="상품명"
          onChange={onChangeRequiredInfo}
        />
        {/* <div>{errors.name?.message}</div> */}
        <Write.RemarksInput
          id="remarks"
          type="text"
          placeholder="한줄평"
          onChange={onChangeRequiredInfo}
        />
        {/* <div>{errors.remarks?.message}</div> */}
        <Write.PriceInput
          id="price"
          type="number"
          placeholder="가격"
          onChange={onChangeRequiredInfo}
        />
        {/* <div>{errors.price?.message}</div> */}
        <Write.TagsInput placeholder="태그(최대 5개)" />
      </Write.InputBoxDiv>
      <Write.ToastEditorBoxDiv>
        <ToastEditor editorRef={editorRef} />
      </Write.ToastEditorBoxDiv>
      <Write.HeaderBoxDiv>
        <MoveButtonSub type="button" name="목록으로" page="/market" />
        <FuncButtonMain type="button" name="등록하기" func={onClickSubmit} />
      </Write.HeaderBoxDiv>
    </Write.WrapperDiv>
  );
};

export default MarketWriteComponent;
