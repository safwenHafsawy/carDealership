/**
 * Displays a toast notification based on the response status.
 * @param {string} message - The message to display in the toast.
 * @param {string} type - The type of toast (e.g., 'danger', 'success').
 * @param {function} setToggleToast - Function to control the toast display state.
 */
const showToast = (message, type, toggleToast) => {
  toggleToast({ status: true, message: message, type: type });
};

const hideToast = (toggleToast) => {
  toggleToast({ status: false, message: "", type: "" });
};

export { showToast, hideToast };
