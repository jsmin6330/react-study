import { useContext, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { DetailSearchStyled } from "./styled";
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonDetailCodeContext } from "../../../../../api/Provider/CommonDetailProvider";

export const DetailSearch = () => {
    const options = [
        { label: "상세코드명", value: "detailCodeName" },
        { label: "상세코드", value: "detailCode" },
    ];

    const [selectValue, setSelectValue] = useState<string>("detailCodeName");
    const inputValue = useRef<HTMLInputElement>();
    const { setSearchKeyword } = useContext(CommonDetailCodeContext);

    const handlerSearch = () => {
        setSearchKeyword({
            detailCodeSelect: selectValue,
            detailCodeSearchTitle: inputValue.current.value
        })
    }

    return (
        <DetailSearchStyled>
            <StyledSelectBox options={options} value={selectValue} onChange={setSelectValue} />
            <StyledInput ref={inputValue} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </DetailSearchStyled>
    );
};
