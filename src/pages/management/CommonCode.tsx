import React, { FC, useState } from "react";
import { ContentBox } from "../../components/common/ContentBox/ContentBox";
import { CommonCodeMain } from "../../components/page/Management/CommonCode/CommonCodeMain/CommonCodeMain";
import { CommonCodeSearch } from "../../components/page/Management/CommonCode/CommonCodeSearch/CommonCodeSearch";
import { CommonCodeProvider } from "../../api/Provider/CommonCodeProvider";



export const CommonCode = () => {
    return (
        <CommonCodeProvider>
            <ContentBox variant='primary' fontSize='large'>
                공통코드관리
            </ContentBox>
            <CommonCodeSearch />
            <CommonCodeMain />
        </CommonCodeProvider>
    );
};
