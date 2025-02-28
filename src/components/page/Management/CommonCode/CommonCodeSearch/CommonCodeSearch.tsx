import { useContext, useRef, useState } from "react";
import { StyledButton } from "../../../../common/StyledButton/StyledButton";
import { StyledSelectBox } from "../../../../common/StyledSelectBox/StyledSelectBox";
import { CommonCodeSearchStyled } from "./styled"
import { StyledInput } from "../../../../common/StyledInput/StyledInput";
import { CommonCodeContext } from "../../../../../api/Provider/CommonCodeProvider";

export const CommonCodeSearch = () => {
    const options = [
        { label: "그룹코드명", value: "groupName" },
        { label: "그룹코드", value: "groupCode" },
    ];

    const [selectValue, setSelectValue] = useState<string>("groupName");
    const inputValue = useRef<HTMLInputElement>();
    const { setSearchKeyword } = useContext(CommonCodeContext);


    const handlerSearch = () => {
        setSearchKeyword({
            groupCodeSelect: selectValue,
            searchTitle: inputValue.current.value
        })
    }

    return (
        <CommonCodeSearchStyled>
            <StyledSelectBox options={options} value={selectValue} onChange={setSelectValue} />
            <StyledInput ref={inputValue} />
            <StyledButton onClick={handlerSearch}>검색</StyledButton>
            <StyledButton>등록</StyledButton>
        </CommonCodeSearchStyled >
    );
};
