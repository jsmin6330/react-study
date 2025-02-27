import { FC, useEffect, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { NoticeModalStyled } from "./styled";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import axios, { AxiosResponse } from "axios";
import { INotice } from "../NoticeMain/NoticeMain";

interface INoticeModalProps {
    noticeId: number;
    setNoticeId: React.Dispatch<React.SetStateAction<number>>;
}

interface INoticeDetail extends INotice {
    fileName: string | null;
    fileExt: string | null;
    fileSize: number;
    physicalPath: string | null;
    logicalPath: string | null;
}

interface INoticeDetailResponse {
    detailValue: INoticeDetail;
}

export const NoticeModal: FC<INoticeModalProps> = ({ noticeId, setNoticeId }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();

    useEffect(() => {
        noticeId && searchDetail();

        return () => {
            setNoticeId(0);
        };
    }, [])

    const searchDetail = () => {
        axios.post("/management/noticeDetailBody.do", { noticeId })
            .then((res: AxiosResponse<INoticeDetailResponse>) => {
                setDetail(res.data.detailValue);
            });
    }

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form>
                    <label>
                        제목 :<StyledInput type='text' name='fileTitle' defaultValue={detail?.title}></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='fileContent' defaultValue={detail?.content}></StyledInput>
                    </label>
                    파일 :<StyledInput type='file' id='fileInput' style={{ display: "none" }}></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div></div>
                    <div className={"button-container"}>
                        <StyledButton type='button'>저장</StyledButton>
                        <StyledButton type='button' onClick={() => setModal(!modal)}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};
