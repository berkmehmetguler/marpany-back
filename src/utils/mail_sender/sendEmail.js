import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();
// Amazon SES configuration
AWS.config.update({
  accessKeyId: "AKIAVFVZWG5OW2J7BIMP",
  secretAccessKey: "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",
  region: "us-east-1",
});
export const sendMailVerification = (data) => {
  const params = {
    Destination: {
      /* required */

      ToAddresses: [
        data.email,
        /* more items */
      ],
    },

    Message: {
      /* required */

      Body: {
        /* required */
        Html: {
          Charset: "UTF-8",
          Data: data.body,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: data.subject,
      },
    },
    Source: process.env.AWS_SES_SOURCE_EMAIL,
  };

  const sendPromise = new AWS.SES({ apiVersion: "2010-12-01" })
    .sendEmail(params)
    .promise();

  sendPromise
    .then((data) => {
      console.log(data.MessageId);
    })
    .catch((err) => {
      console.error(err, err.stack);
    });
};
