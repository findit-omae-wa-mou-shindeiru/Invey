import { client } from "../utils/connection.js"

export const createSurvey = async (req, res) => {
    try {
        await client.connect();

        const database = client.db("invey")

        const survey = database.collection("survey")

        const result = await survey.insertOne(req.body)

        res.status(200).json(result)
    } finally {
        await client.close();
    }

    res.status(400).send("Error inserting survey")
}

