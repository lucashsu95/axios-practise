export const API_RESPONSE = {
  MSG_EMAIL_EXISTS: "電子郵件已存在",
  MSG_USER_NOT_EXISTS: "使用者不存在",
  MSG_MISSING_FIELDS: "缺少欄位",
} as const;

type ApiResponseKey = keyof typeof API_RESPONSE;

type ApiResponseError = {
  response: {
    data: {
      message: string;
    };
  };
};

export function fail(error: ApiResponseError) {
  const errorMessage = error.response.data.message;
  return Object.keys(API_RESPONSE).includes(errorMessage as ApiResponseKey)
    ? API_RESPONSE[errorMessage as ApiResponseKey]
    : errorMessage;
}
