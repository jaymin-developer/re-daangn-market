export const checkFileValidation = (file?: File) => {
  console.log(file);
  if (!file?.size) {
    alert("파일이 없습니다.");
    return;
  }

  if (file.size > 1024 * 1024 * 2) {
    alert("파일 용량이 너무 큽니다.(제한: 2MB)");
    return;
  }

  if (
    !file.type.includes("jpg") &&
    !file.type.includes("jpeg") &&
    !file.type.includes("png")
  ) {
    alert("jpg, jpeg 파일 또는 png 파일만 업로드 가능합니다");
    return;
  }

  return true;
};
