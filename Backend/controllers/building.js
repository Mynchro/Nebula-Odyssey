import Building from "../models/Buildings.js";

export const updateBuildingStatus = async (req, res) => {
    const { _id } = req.params;
    const { status } = req.body;

    try {
        const building = await Building.findByIdAndUpdate(
            _id,
            { status },
            { new: true }
        );

        if (!building) {
            return res.status(404).json({ error: "Gebäude nicht gefunden" });
        }

        res.status(200).json({
            message: "Status erfolgreich aktualisiert",
            building,
        });
    } catch (error) {
        console.error("Fehler beim Aktualisieren des Status:", error);
        res.status(500).json({ error: "Fehler beim Aktualisieren des Status" });
    }
};
