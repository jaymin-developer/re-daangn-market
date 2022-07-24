import dynamic from "next/dynamic";
import * as Write from "../../../src/styles/market/write/MarketWrite.style";
import { Modal } from "antd";
import React, { ChangeEvent, KeyboardEvent, SetStateAction, useRef, useState } from "react";
import { FuncButtonMain, MoveButtonSub } from "../../common/Button.component";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { CREATE_USED_ITEM, UPDATE_USED_ITEM, UPLOAD_FILE } from "../../../src/api/market/write/MarketWrite.qureies";
import { FormValues, IPropsMarketWrite } from "../../../src/types/market/write/MarketWrite.types";
import { Editor } from "@toast-ui/react-editor";

const ToastEditorComponent = dynamic(() => import("../../../components/common/ToastEditor.component"), { ssr: false });

const MarketWriteComponent = (props: IPropsMarketWrite) => {
  const router = useRouter();

  //useRef
  const editorRef = useRef<Editor>(null);

  //useState
  const [requiredInfo, setReqieredInfo] = useState<FormValues>({
    name: "",
    remarks: "",
    price: 0,
  });
  const [images, setImages] = useState<SetStateAction<string[]>>([]);
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");
  const [youtubeUrls, setYoutubeUrls] = useState<string[]>([]);

  //useMutation
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);

  //onChange
  //필수입력사항 체크
  const onChangeRequiredInfo = (e: ChangeEvent<HTMLInputElement>) => {
    setReqieredInfo((prev) => {
      return {
        ...prev,
        [e.target.id]: e.target.id === "price" ? Number(e.target.value) : e.target.value,
      };
    });
  };

  //사진 파일 업로드
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

  // 태그 변화
  const onChangeTag = (event: ChangeEvent<HTMLInputElement>) => {
    setTag(event.target.value);
  };

  // 태그 등록
  const onKeyUpTags = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tag.includes("#") && tags.includes(tag) === false && tags.length < 5) {
      setTags((prev) => [...prev, tag]);
      setTag("");
    }
  };

  // 게시글 등록
  const onClickSubmit = async () => {
    // 게시글 필수입력사항 누락 체크
    if (Object.values(requiredInfo).some((el) => el === "")) {
      Modal.warn({ content: "누락된 내용이 있습니다" });
      return;
    }

    // HTML로 가져오기
    let changedContents = editorRef.current?.getInstance().getHTML();

    // 유튜브 썸네일에서 iframe으로 변경
    if (youtubeUrls.length > 0) {
      for (let i = 0; i < youtubeUrls.length; i++) {
        if (changedContents?.includes(`${youtubeUrls[i]}`)) {
          console.log(youtubeUrls[i]);
          changedContents = changedContents.replace(
            `<p><img src="https://img.youtube.com/vi/${youtubeUrls[i]}/hqdefault.jpg" contenteditable="false"><img class="ProseMirror-separator" alt=""><br class="ProseMirror-trailingBreak"></p>`,
            `<div class="youtube-iframe"><iframe width='560' height='315' src='https://www.youtube.com/embed/${youtubeUrls[i]}' title='YouTube video player' frameBorder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowFullScreen></iframe></div>`
          );
        }
      }
    }

    // 게시글 등록 args
    const writeVariables = {
      createUseditemInput: {
        ...requiredInfo,
        contents: changedContents,
        images,
        tags,
        useditemAddress: {
          address,
        },
      },
    };

    //
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

  // 게시글 업데이트
  const onClickUpdate = async () => {
    const contents = editorRef.current?.getInstance().getHTML();
    try {
      await updateUseditem({
        variables: {
          useditemId: router.query.detail,
          updateUseditemInput: {
            ...requiredInfo,
            contents,
            images,
            tags,
          },
        },
      });
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/market/${router.query.detail}`);
    } catch (error) {
      error instanceof Error && Modal.error({ content: error.message });
    }
  };

  return (
    <Write.WrapperDiv>
      <Write.InputBoxDiv>
        <Write.TitleInput id="name" type="text" placeholder="상품명(필수)" onChange={onChangeRequiredInfo} />
        <Write.RemarksInput id="remarks" type="text" placeholder="한줄평(필수)" onChange={onChangeRequiredInfo} />
        <Write.PriceInput id="price" type="number" placeholder="가격(필수)" onChange={onChangeRequiredInfo} />
        <Write.TagsInput placeholder="태그(선택, 최대 5개)" />
      </Write.InputBoxDiv>
      <Write.ToastEditorBoxDiv>
        <ToastEditorComponent editorRef={editorRef} youtubeUrls={youtubeUrls} setYoutubeUrls={setYoutubeUrls} />
      </Write.ToastEditorBoxDiv>
      <Write.HeaderBoxDiv>
        <MoveButtonSub type="button" name="목록으로" page="/market" />
        <FuncButtonMain type="button" name="등록하기" func={onClickSubmit} />
      </Write.HeaderBoxDiv>
    </Write.WrapperDiv>
  );
};

export default MarketWriteComponent;
