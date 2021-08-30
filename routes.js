const router = require('express').Router();

const Reports = require('./model/reports');

// Answer for POST /reports

router.post('/reports', async (req, res) => {
  try {
    if (!req.body.reportDetails.price && !req.body.reportDetails.convFctr)
      throw new Error('request not have price and convfctr');

    const pricePerKG =
      req.body.reportDetails.price / req.body.reportDetails.convFctr;

    if (!req.body.reportDetails.cmdtyID && !req.body.reportDetails.marketID)
      throw new Error('request not have cmdtyID and marketID');

    const report = await Reports.findOne({
      cmdtyID: req.body.reportDetails.cmdtyID,
      marketID: req.body.reportDetails.marketID,
    });

    if (!report) {
      req.body.reportDetails.users = new Array();
      req.body.reportDetails.users[0] = req.body.reportDetails.userID;
      req.body.reportDetails.price = pricePerKG;
      req.body.reportDetails.priceUnit = 'Kg';

      const SavedReport = await Reports.create(req.body.reportDetails);

      return res.status(200).json({
        success: true,
        reportID: SavedReport._id,
      });
    } else {
      const meanPrice = (report.price + pricePerKG) / 2;

      const updatedReport = await Reports.findByIdAndUpdate(
        report._id,
        {
          $set: { price: meanPrice },
          $push: { users: req.body.reportDetails.userID },
        },
        {
          new: true,
        }
      );

      return res.status(200).json({
        success: true,
        reportID: updatedReport._id,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

// Answer for Request
// GET /reports?reportID=949832f8-48c7-4cb2-8dcd-98f046a9a2e3

router.get('/reports', async (req, res) => {
  try {
    if (!req.query.reportID)
      throw new Error('req not have a reportID query param');

    const id = req.query.reportID;
    const report = await Reports.findById(id);

    if(!report){
      return res.status(400).json({});
    }else{
      return res.status(200).json(report);
    }

  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
