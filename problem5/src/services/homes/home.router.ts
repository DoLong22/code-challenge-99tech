import { Router } from "express";

const router = Router();

router.get('/:id', (req, res) => {
    res.send(`Welcome to Home ID ${req.params.id}`);
});
export default router;
