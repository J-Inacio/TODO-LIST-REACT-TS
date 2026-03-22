export const actionOnKeyDown = (
  ev: React.KeyboardEvent<HTMLInputElement> | React.KeyboardEvent<HTMLTextAreaElement>,
  keyName: string,
  action: () => void,
) => {
  if (ev.key === keyName) {
    action();
  }
};
