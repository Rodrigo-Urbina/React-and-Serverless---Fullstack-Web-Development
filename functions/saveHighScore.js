const { table, getHighScores } = require("./utils/airtable");

exports.handler = async (event) => {
  console.log(event);

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ err: "That method is not allowed" }),
    };
  }

  const { score, name } = JSON.parse(event.body);
  if (!score || !name) {
    return {
      statusCode: 400,
      body: JSON.stringify({ err: "Bad Request" }),
    };
  }

  try {
    const records = await getHighScores(false);
    console.log(records);
    const lowestRecord = records[9];
    console.log(lowestRecord);

    if (
      typeof lowestRecord.fields.score === "undefined" ||
      score > lowestRecord.fields.score
    ) {
      //update this record with the incoming score
      const updatedRecord = {
        id: lowestRecord.id,
        fields: { name, score },
      };
      console.log(updatedRecord);
      await table.update([updatedRecord]);
      return {
        statusCode: 200,
        body: JSON.stringify(updatedRecord),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({}),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ err: "Failed to save to save in airtable" }),
    };
  }
};
