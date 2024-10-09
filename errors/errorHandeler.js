// const { StatusCodes } = require('http-status-codes');
// const statsMassages = require('./../utilities/statsMassages')

// const errorHandler = async (res, error) => {
//     const er = new Error()
//     if (error.message) {
//         res
//             .status(StatusCodes.BAD_REQUEST).json({
//                 status: statsMassages.Error,
//                 message: error.message,
//             })
//     }
//     else if (error.errors[0]) {
//         const errorArray = console.errors.map((e) => e.msg);

//         res
//             .status(StatusCodes.BAD_REQUEST).json({
//                 status: statsMassages.FAIL,
//                 message: errorArray
//             })
//     }
//     else {
//         res
//             .status(StatusCodes.INTERNAL_SERVER_ERROR).json({
//                 status: statsMassages.FAIL,
//                 message: error,

//             })
//     }


// }
// module.exports = errorHandler