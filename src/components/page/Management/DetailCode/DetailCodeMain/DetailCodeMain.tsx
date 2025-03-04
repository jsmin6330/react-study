import { useLocation, useNavigate, useParams } from "react-router-dom";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { DetailCodeMainStyled } from "./styled";
import axios, { Axios, AxiosResponse } from "axios";
import { useContext, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { Portal } from "../../../../common/potal/Portal";
import { DetailModal } from "../DetailModal/DetailModal";
import { CommonDetailCodeContext } from "../../../../../api/Provider/CommonDetailProvider";


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

export const DetailCodeMain = () => {
    interface ICommonDetailCodeResponse {
        commonDetailCode: ICommonDetailCode[],
        commonDetailCodeCnt: number
    }

    const navigate = useNavigate();
    const { state } = useLocation();
    const { groupIdx } = useParams();
    const [commonDetailCodeList, setCommonDetailCodeList] = useState<ICommonDetailCode[]>();
    const { searchKeyword } = useContext(CommonDetailCodeContext);
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [commonDetailId, setCommonDetailId] = useState<number>();

    useEffect(() => {
        searchDetailCode();
    }, [searchKeyword]);


    const searchDetailCode = () => {
        axios.post("/management/commonDetailCodeListBody.do", {
            ...searchKeyword,
            groupCode: state.groupCode,
            pageSize: 5,
            currentPage: 1,
        }).then((res: AxiosResponse<ICommonDetailCodeResponse>) => {
            setCommonDetailCodeList(res.data.commonDetailCode);
        });
    }

    const handlerModal = (id: number) => {
        setModal(!modal);
        setCommonDetailId(id);
    }

    return (
        <DetailCodeMainStyled>
            <table>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>그룹코드</th>
                        <th>상세코드</th>
                        <th>상세코드명</th>
                        <th>상세코드설명</th>
                        <th>사용여부</th>
                        <th>비고</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        commonDetailCodeList?.length > 0 ?
                            (
                                commonDetailCodeList.map((detailCode) => {
                                    return (
                                        <tr key={detailCode.detailIdx}>
                                            <td>{detailCode.detailIdx}</td>
                                            <td>{detailCode.groupCode}</td>
                                            <td>{detailCode.detailCode}</td>
                                            <td>{detailCode.detailName}</td>
                                            <td>{detailCode.note}</td>
                                            <td>{detailCode.useYn}</td>
                                            <td><StyledButton onClick={() => handlerModal(detailCode.detailIdx)}>수정</StyledButton></td>
                                        </tr>
                                    )
                                })
                            )
                            :
                            (
                                <tr>
                                    <td colSpan={7}>조회 내역이 없습니다.</td>
                                </tr>
                            )
                    }

                </tbody>
            </table>
            {
                modal && (
                    <Portal>
                        <DetailModal commonDetailId={commonDetailId} />
                    </Portal>
                )
            }

            <StyledButton onClick={() => { navigate(-1) }}>뒤로가기</StyledButton>
        </DetailCodeMainStyled>
    );
};
