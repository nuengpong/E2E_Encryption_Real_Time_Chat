export const getResponseSuccess = (): any => {
    return {
        returnCode: '0000',
        returnMessage: 'success'
    };
}

export const getResponseSuccessWithResult = (result: any): any => {
    return {
        returnCode: '0000',
        returnMessage: 'success',
        result
    };
}

export const getResponseError = (returnMessage: string): any => {
    return {
        returnCode: '1000',
        returnMessage
    };
}

export const getResponseErrorWithResult = (returnMessage: string, result: any): any => {
    return {
        returnCode: '1000',
        returnMessage,
        result
    };
}

export default {
    getResponseSuccess,
    getResponseSuccessWithResult,
    getResponseError,
    getResponseErrorWithResult,
}