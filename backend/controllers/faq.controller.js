// const FAQ = require("../models/faq.model");

// async function getAllFAQs(req, res) {
//     try {
//         const faqs = await FAQ.find().sort({ order: 1 });
    
//         res.status(200).json({
//           success: true,
//           count: faqs.length,
//           data: faqs
//         });
//       } catch (error) {
//         res.status(500).json({
//           success: false,
//           message: error.message
//         });
//       }
// }

// async function CreateNewFAQs(req, res) {
//    try {
//        const faqCount = await FAQ.countDocuments();
   
//     //    if (faqCount >= 5) {
//     //      return res.status(400).json({
//     //        success: false,
//     //        message: "Maximum 5 FAQs allowed"
//     //      });
//     //    }
   
//        const { question, answer, order } = req.body;
   
//        const faq = new FAQ({
//          question,
//          answer,
//          order
//        });
   
//        await faq.save();
   
//        res.status(201).json({
//          success: true,
//          message: "FAQ created successfully",
//          data: faq
//        });
//      } catch (error) {
//        res.status(500).json({
//          success: false,
//          message: error.message
//        });
//      }
// }

// async function deleteFaqById(req, res) {
//     try {
//     await FAQ.findByIdAndDelete(req.params.id);

//     res.status(200).json({
//       success: true,
//       message: "FAQ deleted successfully"
//     });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// }


// module.exports = {
//     getAllFAQs,
//     CreateNewFAQs,
//     deleteFaqById

// }


const FAQ = require("../models/faq.model");

// ✅ PUBLIC: Get all FAQs
exports.getAllFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().sort({ order: 1 });

    res.status(200).json({
      success: true,
      faqs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
