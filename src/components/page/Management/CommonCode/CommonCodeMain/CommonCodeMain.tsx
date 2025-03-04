import { useContext, useEffect, useState } from "react";
import { CommonCodeMainStyled } from "./styled";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";
import axios, { AxiosResponse } from "axios";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { useRecoilState } from "recoil";
import { modalState } from "../../../../../stores/modalState";
import { CommonCodeModal } from "../CommonCodeModal/CommonCodeModal";
import { Portal } from "../../../../common/potal/Portal";
import { useNavigate } from "react-router-dom"
import { searchApi } from "../../../../../api/CommonCodeApi/searchApi";
import { CommonCode } from "../../../../../api/api";
import { ICommonCode } from "../../../../../models/interface/ICommonCode";
import { Column, StyledTable } from "../../../../common/StyledTable/StyledTable";

export const CommonCodeMain = () => {
    interface ICommonCodeResponse {
        commonCode: ICommonCode[];
        commonCodeCnt: number;
    }

    const { searchKeyword } = useContext(CommonCodeContext);
    const [commonCodeList, setCommonCodeList] = useState<ICommonCode[]>();
    const [modal, setModal] = useRecoilState<Boolean>(modalState);
    const [groupId, setGroupId] = useState<number>(0);
    const navigate = useNavigate();

    const columns = [
        { key: "groupIdx", title: "번호" },
        { key: "groupCode", title: "그룹코드", clickable: true },
        { key: "groupName", title: "그룹코드명" },
        { key: "note", title: "그룹코드 설명" },
        { key: "createdDate", title: "등록일" },
        { key: "useYn", title: "사용여부" },
        { key: "actions", title: "비고" },
    ] as Column<ICommonCode>[];

    useEffect(() => {
        searchCommonCode();
    }, [searchKeyword]);

    const searchCommonCode = async (currentPage?: number) => {
        currentPage = currentPage || 1;

        const result = await searchApi<ICommonCodeResponse>(CommonCode.searchList, {
            ...searchKeyword,
            pageSize: 5,
            currentPage,
        });

        if (result) {
            setCommonCodeList(result.commonCode);
        }
    }

    const handlerModal = (id: number) => {
        setModal(!modal);
        setGroupId(id);
    }

    const postSuccess = () => {
        setModal(!modal);
        searchCommonCode();
    }

    return (
        <CommonCodeMainStyled>
            <StyledTable
                data={commonCodeList}
                columns={columns}
                renderAction={(row) => <StyledButton size="small" onClick={() => {
                    handlerModal(row.groupIdx)
                }}>수정</StyledButton>}
                onCellClick={(row, column) => {
                    if (column === "groupCode") {
                        navigate(`${row.groupCode}`, { state: { groupCode: row.groupCode } })
                    }
                }}
            />
            {
                modal && (
                    <Portal>
                        <CommonCodeModal groupId={groupId} setGroupId={setGroupId} postSuccess={postSuccess} />
                    </Portal>
                )
            }
        </CommonCodeMainStyled>
    );
};
