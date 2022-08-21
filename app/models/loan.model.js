const mongoose = require("mongoose");

const LoanSchema = mongoose.Schema(
  {
    fullName: String,
    nic: String,
    email: String,
    gurantors: [
      {
        fullName: String,
        nic: String,
        email: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Loan", LoanSchema);
