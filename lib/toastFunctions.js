const showToast = (message, type, toggleToast) => {
  toggleToast({ status: true, message: message, type: type });
};

const hideToast = (toggleToast) => {
  toggleToast({ status: false, message: "", type: "" });
};

export { showToast, hideToast };
