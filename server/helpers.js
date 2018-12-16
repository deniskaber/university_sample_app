module.exports = {
    setResponseError: (res, message = 'Error', code = 400) => {
        res.status(code);
        res.json({
            success: false,
            error: message,
        });
    },
};
