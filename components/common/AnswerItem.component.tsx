import moment from "moment";
import "moment/locale/ko";
import * as AnswerItem from "../../src/styles/common/AnswerItem.styles";
import { IUseditemQuestionAnswer } from "../../src/types/generated/types";

interface IPropsAnswerItem {
  key: string;
  el: IUseditemQuestionAnswer;
}

const AnswerItemComponent = (props: IPropsAnswerItem) => {
  return (
    <AnswerItem.WrapperDiv>
      <AnswerItem.WrapperHeadDiv>
        <AnswerItem.UserProfileImg
          src={String(props.el?.user.picture)}
          onError={(e) => {
            e.currentTarget.src = "/logo_daangn.png";
          }}
        />
        <AnswerItem.UserNameCreatedAtDiv>
          <AnswerItem.UserNameP>{props.el?.user.name}</AnswerItem.UserNameP>
          <AnswerItem.CreatedAtP>
            {moment(props.el?.createdAt).format("LLL")}
          </AnswerItem.CreatedAtP>
        </AnswerItem.UserNameCreatedAtDiv>
      </AnswerItem.WrapperHeadDiv>
      <AnswerItem.ContentsBoxDiv>
        <AnswerItem.BlankDiv />
        <AnswerItem.ContentsP>{props.el?.contents}</AnswerItem.ContentsP>
      </AnswerItem.ContentsBoxDiv>
    </AnswerItem.WrapperDiv>
  );
};

export default AnswerItemComponent;
