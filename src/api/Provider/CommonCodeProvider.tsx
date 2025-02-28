import React, { FC, createContext, useState } from "react";

//초기값의 타입
interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

// 다른 컴포넌트에서 사용이 가능한 context를 만든다.
export const CommonCodeContext = createContext<ISearchKeyword>({});

// 만들어진 값에(CommonCodeContext) searchKeyword, setSearchKeyword을 넣어서
// searchKeyword, setSearchKeyword를 자식 노드에서 자유롭게 호출하게 한다.
export const CommonCodeProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});

    return (
        <CommonCodeContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </CommonCodeContext.Provider>
    );
};
