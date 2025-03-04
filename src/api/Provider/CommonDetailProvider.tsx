import React, { FC, createContext, useState } from "react";

interface ISearchKeyword {
    searchKeyword?: object;
    setSearchKeyword?: React.Dispatch<React.SetStateAction<object>>;
}

export const CommonDetailCodeContext = createContext<ISearchKeyword>({});

export const CommonDetailCodeProvider: FC<{
    children: React.ReactNode | React.ReactNode[];
}> = ({ children }) => {
    const [searchKeyword, setSearchKeyword] = useState<object>({});

    return (
        <CommonDetailCodeContext.Provider value={{ searchKeyword, setSearchKeyword }}>
            {children}
        </CommonDetailCodeContext.Provider>
    )
};