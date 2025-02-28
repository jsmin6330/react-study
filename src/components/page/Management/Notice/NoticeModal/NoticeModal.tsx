import { FC, useEffect, useRef, useState } from "react";
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
    postSuccess: () => void;
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

interface IPostResponse {
    result: "success" | "fail";
}

export const NoticeModal: FC<INoticeModalProps> = ({ noticeId, setNoticeId, postSuccess }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [detail, setDetail] = useState<INoticeDetail>();
    const formRef = useRef<HTMLFormElement>(null);

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

    const saveNotice = () => {
        axios.post("/management/noticeSave.do", formRef.current).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("저장되었습니다.");
                postSuccess();
            }
        });
    };

    const updateNotice = () => {
        const formData = new FormData(formRef.current);
        formData.append("noticeId", noticeId.toString());
        axios.post("/management/noticeUpdate.do", formData).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("수정되었습니다.");
                postSuccess();
            }
        });
    }

    const deleteNotice = () => {

        axios.post("/management/noticeDeleteJson.do", { noticeId: noticeId }).then((res: AxiosResponse<IPostResponse>) => {
            if (res.data.result === "success") {
                alert("삭제되었습니다.");
                postSuccess();
            }
        });
    }

    return (
        <NoticeModalStyled>
            <div className='container'>
                <form ref={formRef}>
                    <label>
                        제목 :<StyledInput type='text' name='title' defaultValue={detail?.title}></StyledInput>
                    </label>
                    <label>
                        내용 : <StyledInput type='text' name='content' defaultValue={detail?.content}></StyledInput>
                    </label>
                    파일 :<StyledInput type='file' id='fileInput' style={{ display: "none" }}></StyledInput>
                    <label className='img-label' htmlFor='fileInput'>
                        파일 첨부하기
                    </label>
                    <div></div>
                    <div className={"button-container"}>
                        <StyledButton type='button' onClick={noticeId ? updateNotice : saveNotice}>
                            {noticeId ? "수정" : "저장"}
                        </StyledButton>
                        {!!noticeId && <StyledButton type='button' onClick={deleteNotice}>삭제</StyledButton>}
                        <StyledButton type='button' onClick={() => setModal(!modal)}>나가기</StyledButton>
                    </div>
                </form>
            </div>
        </NoticeModalStyled>
    );
};

