import axios, { AxiosResponse } from "axios";

export const postApi = async (api: string, param: object) => {
    try {
        const result: AxiosResponse<{ result: string }> = await axios.post(api, param);

        if (result.status === 200) {
            return result.data;
        } else {
            throw new Error(`HTTP Error: ${result.status} - ${result.statusText}`);
        }
    } catch (error) {
        console.error(`api 호출 도중 오류 발생`, error);
    }
};
