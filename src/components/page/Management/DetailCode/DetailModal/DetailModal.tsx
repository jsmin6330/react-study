import { useRecoilState } from "recoil";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { DetailModalStyled } from "./styled";
import { modalState } from "../../../../../stores/modalState";
import { FC, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";


interface ICommonDetailCodeModalProps {
    commonDetailId: number;
}

interface ICommonDetailCode {
    detailIdx: number;
    groupCode: string;
    detailCode: string;
    detailName: string;
    useYn: string;
    createdDate: string;
    author: string;
    note: string;
}

const initCommonDetailCode = {
    detailIdx: 0,
    groupCode: "",
    detailCode: "",
    detailName: "",
    useYn: "N",
    createdDate: "",
    author: "",
    note: ""
}

export const DetailModal: FC<ICommonDetailCodeModalProps> = ({ commonDetailId }) => {
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [commonDetailCode, setCommonDetailCode] = useState<ICommonDetailCode>(initCommonDetailCode);

    useEffect(() => {
        commonDetailId && commomDetailCodeDetail();
    }, [])

    const commomDetailCodeDetail = () => {
        axios.post("/management/commonDetailCodeDetailBody.do", { detailIdx: commonDetailId })
            .then((res: AxiosResponse<{ detailValue: ICommonDetailCode }>) => {
                setCommonDetailCode(res.data.detailValue);
            });
    }

    return (
        <DetailModalStyled>
            <div className='container'>
                <label>
                    그룹코드*
                    <StyledInput type='text' readOnly defaultValue={commonDetailCode.groupCode}></StyledInput>
                </label>
                <label>
                    상세코드*
                    <StyledInput type='text' defaultValue={commonDetailCode.detailCode}></StyledInput>
                </label>
                <label>
                    상세코드명*
                    <StyledInput type='text' defaultValue={commonDetailCode.detailName}></StyledInput>
                </label>
                <label>
                    상세코드설명*
                    <StyledInput type='text' defaultValue={commonDetailCode.groupCode}></StyledInput>
                </label>
                <label>
                    사용여부*
                    <div className='radio-group'>
                        <label>Yes</label>
                        <StyledInput type='radio' name='useYn' value={"Y"} checked={commonDetailCode.useYn === "Y"} />

                        <label>No</label>
                        <StyledInput type='radio' name='useYn' value={"N"} checked={commonDetailCode.useYn === "N"} />
                    </div>
                </label>
                <div className={"button-container"}>
                    <StyledButton type='button'>저장</StyledButton>
                    <StyledButton type='button' onClick={() => { setModal(!modal) }}>나가기</StyledButton>
                </div>
            </div>
        </DetailModalStyled>
    );
};
