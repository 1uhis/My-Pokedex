import express from "express";
import { Species } from "../../data/schema.js";

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let filter = {};
        let options = {};

        // Handle pagination only if 'page' is specified
        if (req.query.page !== undefined) {
            const page = parseInt(req.query.page);
            if (isNaN(page) || page < 0) {
                return res.status(422).json({ message: "Invalid page parameter" });
            }

            // Default resultsPerPage to 20 if not specified
            let resultsPerPage = 20;
            if (req.query.resultsPerPage !== undefined) {
                resultsPerPage = parseInt(req.query.resultsPerPage);
                if (isNaN(resultsPerPage) || resultsPerPage <= 0) {
                    return res.status(422).json({ message: "Invalid resultsPerPage parameter" });
                }
            }

            options.skip = page * resultsPerPage;
            options.limit = resultsPerPage;
        }

        // Handle type filter
        if (req.query.type) {
            filter.types = req.query.type;
        }

        // Handle text search filter
        if (req.query.text) {
            filter.$text = { $search: req.query.text };
        }

        const allSpecies = await Species.find(filter, null, options);
        res.json(allSpecies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
