import dynamic from "next/dynamic";
import * as Write from "../../../styles/market/write/MarketWrite.style";
import { Modal } from "antd";
import React, {
  ChangeEvent,
  KeyboardEvent,
  SetStateAction,
  useState,
} from "react";
import { FuncButtonMain, MoveButtonSub } from "../../common/Button.component";
import { useRouter } from "next/router";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  CREATE_USED_ITEM,
  UPDATE_USED_ITEM,
  UPLOAD_FILE,
} from "../../../queries/market/write/MarketWrite.qureies";
import {
  IQuery,
  IQueryFetchUseditemArgs,
} from "../../../src/commons/types/generated/types";

interface IPropsMarketWrite {
  isEdit?: boolean;
  data?: Pick<IQuery, "fetchUseditem">;
}
interface FormValues {
  name?: string;
  remarks?: string;
  contents?: string;
  price?: number;
}

const schema = yup.object().shape({
  name: yup
    .string()
    .max(20, "최대 20자까지 작성 가능합니다.")
    .required("상품명은 필수 입력 사항입니다."),
  price: yup.string().required("판매 가격은 필수 입력 사항입니다."),
  remarks: yup
    .string()
    .min(10, "10자 이상 작성해주세요.")
    .max(100, "100자 까지 작성가능합니다.")
    .required("한줄평은 필수 입력 사항입니다."),
  contents: yup
    .string()
    .min(10, "설명란에 10자 이상 작성해주세요.")
    .required("설명란은 필수 입력 사항입니다."),
});

const ToastEditor = dynamic(
  () => import("../../../components/common/ToastEditor.component"),
  { ssr: false }
);

const MarketWriteComponent = (props: IPropsMarketWrite) => {
  const router = useRouter();
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createUseditem] = useMutation(CREATE_USED_ITEM);
  const [updateUseditem] = useMutation(UPDATE_USED_ITEM);
  const [images, setImages] = useState<SetStateAction<string[]>>([]);
  const [address, setAddress] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tag, setTag] = useState("");

  const { register, handleSubmit, formState, setValue, trigger, getValues } =
    useForm({
      mode: "onChange",
      resolver: yupResolver(schema),
      // 리액트 훅 폼과 연결한다.
    });

  const onChangeFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    try {
      const result = await uploadFile({
        variables: { file },
      });
      const imageUrl = result.data?.uploadFile.url;
      setImages((prev: string[]) => [...prev, imageUrl]);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
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

  const onClickSubmit = async (data: FormValues) => {
    if (!(data.name && data.remarks && data.price && data.contents)) {
      Modal.warn({ content: "필수 입력 사항입니다!" });
      return;
    }

    const writeVariables = {
      createUseditemInput: {
        name: data.name,
        remarks: data.remarks,
        contents: data.contents,
        price: Number(data.price),
        images: images,
        tags: tags,
        useditemAddress: {
          address,
        },
      },
    };

    try {
      const result = await createUseditem({
        variables: writeVariables,
      });
      alert("제품 등록 성공!");
      router.push(`/useditems/${result.data.createUseditem._id}`);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
    }
  };

  const onClickUpdate = async (data: FormValues) => {
    try {
      await updateUseditem({
        variables: {
          useditemId: router.query.id,
          updateUseditemInput: {
            name: data.name,
            remarks: data.remarks,
            contents: data.contents,
            price: Number(data.price),
            images: images,
            tags: tags,
          },
        },
      });
      Modal.success({ content: "수정이 완료되었습니다." });
      router.push(`/useditems/${router.query.id}`);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  return (
    <Write.WrapperForm
      onSubmit={
        props.isEdit ? handleSubmit(onClickUpdate) : handleSubmit(onClickSubmit)
      }
    >
      <Write.InputBoxDiv>
        <Write.TitleInput
          type="text"
          placeholder="상품명"
          {...register("name")}
        />
        <Write.RemarksInput placeholder="한줄평" {...register("remarks")} />
        <Write.PriceInput placeholder="가격" {...register("price")} />
        <Write.TagsInput placeholder="태그(최대 5개)" />
      </Write.InputBoxDiv>
      <Write.ToastEditorBoxDiv>
        <ToastEditor />
      </Write.ToastEditorBoxDiv>
      <Write.HeaderBoxDiv>
        <MoveButtonSub name="목록으로" page="/market" />
        <FuncButtonMain name="등록하기" />
      </Write.HeaderBoxDiv>
    </Write.WrapperForm>
  );
};

export default MarketWriteComponent;
